const cluster = require("cluster")
const { cpus } = require("os")
const cpulength = cpus().length
const { fork } = require("child_process")

// 通过创建集群并守护进程
if (cluster.isMaster) {
    for (let i = 0; i < cpulength; i++) {
        const worker = cluster.fork()

        // cluster也可监听多个事件
        // cluster.on("exit", () => {
        //     console.log("cluster is end")
        // })

        worker.send(111)

    }
} else {
    require("./server1")
}
// 通过子进程创建服务并守护进程
// require引进来的是子线程
// const tasks = ["./server1.js", "./server2.js"]
// const createServer = tasks => {
//     tasks.forEach(task => {

//         const worker = fork(task)

//         // fork(task)：可以监听很多事件
//         worker.on('exit', code => {
//             createServer([task])
//             console.log("sever1 即将推出")
//         })

//         // worker.pid：每次打印的都是不同的
//         // console.log(worker.pid) //ChildProcess对象{pid}
//     })
// }
// createServer(tasks)