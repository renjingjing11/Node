/*
 * @Author: ming 
 * @Date: 2019-09-03 14:30:24 
 * @Last Modified by: ming
 * @Last Modified time: 2019-09-04 21:20:18
 */
// 命令行启动：node 文件名称
const { createServer } = require("http")

// req:request res:response
createServer((req, res) => {

    // 必须是res.end("") 是字符串
    res.end('111')

}).listen(8080, () => {
    console.log("serve is 8080")
})