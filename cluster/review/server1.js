const { createServer } = require("http")

createServer((req, res) => {
    res.end("8080")
}).listen(8080, () => {
    console.log("server is 8080")
})
process.on("message", (port) => {
    console.log(port)
})

// 结束进程
// process.exit()