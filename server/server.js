import Express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import path from 'path'

// Webpack Requirements
import webpack from 'webpack'
import config from '../webpack.config.dev'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

// Initialize the Express App
const app = new Express()

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}

// React And Redux Setup
import configureStore from '../shared/redux/configureStore'
import { Provider } from 'react-redux'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

// Import required modules
import routes from '../shared/routes'
import { fetchComponentData } from './util/fetchData'
import recipes from './routes/recipes.routes'
import serverConfig from './config'

// MongoDB Connection
mongoose.connect(serverConfig.mongo.url, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!')  // eslint-disable-line
    throw error
  }
})

// Apply body Parser and server public assets and routes
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }))
app.use(Express.static(path.resolve(__dirname, '../static')))
app.use('/api/recipes', recipes)

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const cssPath = process.env.NODE_ENV === 'production' ? '/css/app.min.css' : '/css/app.css'
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Ordini</title>
        <link rel="stylesheet" href=${cssPath} />
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css' />
        <link rel="stylesheet" href="https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/css/bootstrap.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `
}

// Server Side Rendering based on routes matched by React-router.
app.use((req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end('Internal server error')
    }

    if (!renderProps) {
      return res.status(404).end('Not found!')
    }

    const initialState = { recipes: [] }

    const store = configureStore(initialState)

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )
        const finalState = store.getState()

        res.status(200).end(renderFullPage(initialView, finalState))
      })
      .catch(() => {
        res.end(renderFullPage('Error', {}))
      })
  })
})

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`App is running on port: ${serverConfig.port}.`) // eslint-disable-line
  }
})

export default app
