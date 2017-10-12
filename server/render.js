import path from 'path'
import fs from 'fs'
import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import configureStore from '../src/store/configureStore'
import App from '../src/containers/App'
import { fetchSiteInfo } from '../src/actions/site'
import { fetchTopMenu } from '../src/actions/menu'
import { fetchSinglePage } from '../src/actions/page'
import { getSlugFromUrl } from '../src/utils'

// We are going to fill these out in the sections to follow
export default function handleRender(req, res) {
  // Create a new Redux store instance
  const store = configureStore()
  let topMenu = []
  const renderHtml = () => {
    const context = {}
    // Render the component to a string
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          <App topMenu={topMenu} />
        </StaticRouter>
      </Provider>,
    )

    // Grab the initial state from our Redux store
    const preloadedState = store.getState()

    // Send the rendered page back to the client
    const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
      if (err) {
        return res.status(404).end()
      }

      const renderedApp = htmlData.replace('{{SSR}}', html)
        .replace(
          '<script id="preloaded-state"></script>',
          `<script id="preloaded-state">window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}</script>`,
        )

      return res.send(renderedApp)
    })
  }

  store.dispatch(fetchSiteInfo())
    .then(() => store.dispatch(fetchTopMenu()))
    .then(({ response }) => {
      topMenu = response
      let slug = req.path.split('/')[1]
      if (slug === '') {
        slug = 'home'
      }
      const currentMenu = topMenu.find(menu => getSlugFromUrl(menu.url) === slug)

      const pageId = currentMenu && currentMenu.objectId

      return pageId && store.dispatch(fetchSinglePage(pageId))
    })
    .then(() => {
      renderHtml()
    })
    .catch(error => {
      res.json({
        error: error.message,
      })
    })
}
