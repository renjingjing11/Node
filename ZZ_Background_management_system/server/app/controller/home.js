'use strict';

/**
 * 1.fs：fs内置模块(读取文件)
 * 2.path:path内置模块(拼接路径)
 * 3.md5：需要下载,md5加密
 * 4.ListPath：拼接好文件的路径
 */
const Controller = require('egg').Controller;
const fs = require("fs")
const path = require("path")
const md5 = require("md5")
const ListPath = path.join(__dirname, "../public/list.json")

class HomeController extends Controller {
    // 登录
    async login() {
        const { ctx, app } = this;
        let { phone, password } = ctx.request.body
        let results = await app.mysql.get('login', { phone, password });
        let token = md5(phone, password)
        if (results) {
            ctx.status = 200
            ctx.body = {
                code: 1,
                token,
                msg: "login success"
            }
        } else {
            ctx.status = 403
            ctx.body = {
                code: 0,
                msg: "no user"
            }
        }

    }

    // 注册
    async registry() {
        let { ctx, app } = this;
        let { phone, password } = ctx.request.body.values
        console.log(phone, password)
        await app.mysql.insert('login', { phone, password });
        ctx.body = {
            code: 1,
            msg: "registry success"
        }
    }

    // 列表
    async getList() {
        const { ctx, app } = this;
        let results = await app.mysql.select("ordermanagement")
        ctx.body = {
            code: 1,
            data: results
        }
    }

    // 编辑
    async edit() {
        const { ctx, app } = this
        let { customerName, phone, id } = ctx.request.body.row
        let obj = { id, customerName, phone }
        let results = await app.mysql.update('ordermanagement', obj)
        console.log(results)
        ctx.body = {
            code: 1,
            msg: "edit success"
        }
    }

    // 删除
    async del() {
        const { ctx, app } = this;
        const { id } = ctx.request.body
        console.log(id)
        const result = await app.mysql.delete('ordermanagement', { id });
        ctx.body = {
            code: 1,
            msg: "del success"
        }
    }
}

module.exports = HomeController;