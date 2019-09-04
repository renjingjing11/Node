/* parent.js */
// child_process:子进程
// process:进程
const { fork } = require("child_process")

// 1.引入child.js
// 2.child.send 向 child 发送
var child = fork('./child.js');
child.send({ name: "rrr" })

child.on("message", data => {
    console.log(data)
})