#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

// 对于前端工程化而言，模板的封装许多是基于cli，这时候就要用到commander库，进而简化cli。配合inquirer
const commander = require("commander")
const inquirer = require("inquirer")
const { version } = require("../package.json")

// sourceFolder：bin/index.js路径
// targetFolder：输入命令行的路径
const copy = (sourceFolder, targetFolder) => {
    // 判断是否有文件夹 没有则创建
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder)
    }
    // 读取 sourceFolder 文件夹 (报错信息,所有的文件)
    fs.readdir(sourceFolder, (err, files) => {
        console.log(sourceFolder)
        if (err) return console.error(err)
        files.forEach(file => {
            // 拼接路径
            const sourceFile = path.join(sourceFolder, file)
            const targetFile = path.join(targetFolder, file)

            // fs.state 获取文件信息。
            fs.stat(sourceFile, (err, stats) => {
                if (err) return console.error(err)

                // stats.isFile()是文件
                if (stats.isFile()) {
                    // 是文件读取文件
                    fs.readFile(sourceFile, (err, chunck) => {
                        if (err) return console.error(err)

                        // 写到打开命令行的地址去
                        fs.writeFile(targetFile, chunck, err => {
                            if (err) return console.error(err)
                            console.log("write success")
                        })
                    })
                } else {
                    // 不是文件则调用递归
                    copy(sourceFile, targetFile)
                }
            })
        })
    })
}

function Fn() {
    inquirer
        .prompt([{
                name: "name",
                type: "input",
                message: "Project name"
            },
            {
                name: "type",
                type: "list",
                message: "Project type",
                choices: ["vue", "react"]
            }
        ])
        .then(res => {
            console.log(res)

            // __dirname:是当前文件路径 eg:bin/index.js
            // "../lib":跳出当前路径进入lib,
            // res.type:是lib下的vue，react

            // process.cwd():是打开小黑板/输入命令行的路径

            let sourceFolder = path.join(__dirname, "../lib", res.type)
            let targetFolder = path.join(process.cwd(), res.name)
                // console.log(sourceFolder, targetFolder)
            copy(sourceFolder, targetFolder)
        })
}

commander

// 添加版本号
    .version(version)


//添加命令：
.command("init")

//添加执行：
.action(Fn)
commander.parse(process.argv)