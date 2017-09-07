import path from 'path'
import fs from 'fs'
import express from 'express'
import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import configureStore from '../src/store/configureStore'
import App from '../src/containers/App'

const app = express()
const PORT = process.env.PORT || 8080

// Serve static files
app.use('/static', express.static('build/static'))

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  const context = {}
  // Create a new Redux store instance
  const store = configureStore()

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App topMenu={[]} />
      </StaticRouter>
    </Provider>,
  )

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()

  // Send the rendered page back to the client
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }

    const renderedApp = htmlData.replace('{{SSR}}', html)
      .replace(
        '<script id="preloaded-state"></script>',
        `<script id="preloaded-state">window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>`,
      )

    return res.send(renderedApp)
  })
}

// This is fired every time the server side receives a request
app.use(handleRender)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})
