const { createServer } = require("http")
createServer((req, res) => {
    res.end("hello world")
}).listen(8080, () => {
    console.log("serve is 8080")
})