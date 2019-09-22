const proxy = require('http-proxy-middleware')

module.exports = (app) => {
    app.use(
        proxy('/api/', {
            target: "http://localhost:3000",
            changeOrigin: true
        })
    )
    app.use(
        proxy('/store/', {
            target: "http://148.70.121.59:9001",
            changeOrigin: true
        })
    )
}