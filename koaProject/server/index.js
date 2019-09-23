const koa = require("koa")
const koaRouter = require("koa-router")
const bodyParser = require("koa-bodyparser")
const mysql = require("mysql")
const md5 = require("md5")
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db'
});
const app = new koa()
const router = new koaRouter()
const koaBody = require('koa-body')({
    multipart: true, // 允许上传多个文件
})

// 封装的函数获取数据库的数据、由于它是异步请求的,所以要封装Promise
function query($sql) {
    return new Promise((resolve, reject) => {
        connection.query($sql, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

// 登录
router.post("/login", async(ctx) => {
    let { phone, password } = ctx.request.body
    let token = md5(phone, password)
    let $sql = `SELECT * FROM login WHERE phone='${phone}' and password=${password}`
    let results = await query($sql)
    ctx.body = {
        code: 1,
        token,
        msg: "login success"
    }
})

// 注册
router.post("/registry", async(ctx) => {
    let { phone, password } = ctx.request.body
    let $sql = `INSERT INTO login(id,phone,password) VALUES (null,'${phone}',${password})`
    let results = await query($sql)
    console.log(results)
    ctx.body = {
        code: 1,
        msg: "registry success"
    }
})

// 获取数据
router.get("/getList", async(ctx) => {
    let $sql = `select * from reactlist`
    let results = await query($sql)
    ctx.body = {
        code: 1,
        data: results
    }
})

// 删除
router.post("/del", async(ctx) => {
    let { id } = ctx.request.body
    let $sql = `DELETE FROM reactlist WHERE id = ${id}`
    let results = await query($sql)
    ctx.body = {
        code: 1,
        msg: "del success"
    }
})

// 编辑
router.post("/edit", async(ctx) => {
    let { id, shop, price } = ctx.request.body
    let $sql = `UPDATE reactlist SET shop = '${shop}', price = ${price} WHERE id = ${id} `
    let results = await query($sql)
    ctx.body = {
        code: 1,
        msg: "edit success"
    }
})

// 添加
router.post("/add", async(ctx) => {
    let { shop, price } = ctx.request.body
    let $sql = `INSERT INTO reactlist(id,shop,price) VALUES(null,'${shop}',${price})`
    let results = await query($sql)
    ctx.body = {
        code: 1,
        msg: "add success"
    }
})

// 分页
router.post("/page", async(ctx) => {
    let { pageSize, pageCount } = ctx.request.body
    let $sql = `select * from reactlist limit ${pageSize},${pageCount}`
    let results = await query($sql)
    ctx.body = {
        code: 1,
        data: results
    }
})

// 模糊搜索
router.post("/search", async(ctx) => {
    let { keyword } = ctx.request.body
    let $sql = `select * from reactlist where shop like '%${keyword}%'`
    let results = await query($sql)
    ctx.body = {
        code: 1,
        data: results
    }
})


// 注意点：bodyParser()必须挂载最前面,加入不放在前面出现的bug:获取不到客户端传到服务端的参数
app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
app.listen(8080, () => {
    console.log("server is 8080")
})