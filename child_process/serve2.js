const { createServer } = require("http")
createServer((req, res) => {

    // 必须是res.end("") 是字符串
    res.end('111')

}).listen(9090, () => {
    console.log("serve is 9090")
})