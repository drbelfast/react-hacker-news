const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config.js')

const isDeveloping = process.env.NODE_EVN !== 'production'
const port = isDeveloping ? 3000 : process.env.PORT
const app = express()

if (isDeveloping) {
    const compiler = webpack(config)
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.putblicPath,
        contentBase: 'src',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    })

    app.use(middleware)
    app.use(webpackHotMiddleware(compiler))
    app.get('*', (req, res) => {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
        res.end()
    })
} else {
    app.use(express.static(path.join(__dirname, 'dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'))
    })
}

app.listen(port, () => {
    console.log('listening on port ' + port)
})