import path from 'path'
import fs from 'fs'
import express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'

import appReducer from './common/reducers'
import App from './common/containers/App'

const app = express()
const PORT = process.env.PORT || 3001

// Serve static files
app.use('/static', express.static('static'))

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  // Create a new Redux store instance
  const store = createStore(appReducer)

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
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
