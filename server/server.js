import express from 'express'
import Loadable from 'react-loadable'

import indexRoute from './routes/index'
import handleRender from './render'

const app = express()
const PORT = process.env.PORT || 8080

// Specially use render in index, or will render by static index.html in build by priority
app.use('/', indexRoute)

// Serve static files
app.use(express.static('build'))

// This is fired every time the server side receives a request
app.use(handleRender)

Loadable.preloadAll().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
  })
})
