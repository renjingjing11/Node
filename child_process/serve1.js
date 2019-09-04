const { createServer } = require("http")
createServer((req, res) => {

    // 必须是res.end("") 是字符串
    res.end('111')

}).listen(8080, () => {
    console.log("serve is 8080")
})

process.on("message", data => {
    if (data === "exit") {
        console.log("子进程将要退出")
        process.exit()
    }
})