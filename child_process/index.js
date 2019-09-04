// child_process（子进程）
// spawn
// exec
// execFile
// fork
const { spawn, exec, execFile, fork } = require("child_process")

// spawn 查看版本号
// const version = spawn('node', ['-v'])
// version.stdout.on('data', stdout => {
//     console.log(stdout.toString())
// })

// exec 查看版本号
// exec('node -v', (err, stdout, stderr) => {
//     if (err) return console.error(err)
//     console.log(stdout)
// })

// execFile 查看版本号
// execFile('node', ['--version'], (error, stdout, stderr) => {
//     if (error) {
//         throw error;
//     }
//     console.log(stdout);
// });

// fork 启动http服务
// const serve = fork("./http.js")
// console.log(serve)

// 监听两个任务 同时启动http服务
// const tasks = ["./serve1.js", "./serve2.js"]
// const createServer = tasks => {
//     tasks.forEach(task => {
//         fork(task)
//     })
// }
// createServer(tasks)