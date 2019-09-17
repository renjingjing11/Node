'use strict';

const Controller = require('egg').Controller;
const fs = require("fs")
const path = require("path")

class HomeController extends Controller {
    async upload() {
        const { ctx, app } = this;
        /**
         * 1.files ：  返回是前端上传图片的路径(数组第一项)
            * [ { field: 'avatar',
                filename: '1000.jpg',
                encoding: '7bit',
                mime: 'image/jpeg',
                fieldname: 'avatar',
                transferEncoding: '7bit',
                mimeType: 'image/jpeg',
                filepath:
                'C:\\Users\\任明明\\AppData\\Local\\Temp\\egg-multipart-tmp\\server\\201
                9\\09\\17\\14\\552c95e5-a471-46be-a5f1-c293525e0a11.jpg' } ]
            2.filedata ：  读取上传路径下的文件
            3.avatarPath ： 拼接路径 D:\rk\ZK3\server\app\public\avatar\1000.jpg
         */
        let files = ctx.request.files[0]
        let filedata = fs.readFileSync(files.filepath)
        let avatarPath = path.join(process.cwd(), "app/public/avatar", files.filename)
        console.log(avatarPath)
        const results = fs.writeFileSync(avatarPath, filedata)
        if (results) {
            ctx.body = {
                code: 1,
                data: "upload faild"
            }
        } else {
            ctx.body = {
                code: 1,
                data: "upload success",
                imgUrl: `http:localhost:7001/public/avatar/${files.filename}`
            }
        }

    }
}

module.exports = HomeController;