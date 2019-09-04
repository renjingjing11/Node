const { createServer } = require("http")
createServer((req, res) => {
    res.end("9090")
}).listen(9090, () => {
    console.log("server is 9090")
})