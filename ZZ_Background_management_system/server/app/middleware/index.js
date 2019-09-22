module.exports = () => {

    // 配置白名单
    const whiteList = ["/login", '/registry']

    return async function gzip(ctx, next) {

        /**
         * 1.单个路由拦截的方法
         *  console.log(ctx.header.token)
                if (ctx.request.header.token) {
                    await next();
                } else {
                    ctx.status = 401
                    ctx.body = {
                        code: 0,
                        data: []
                }
            }
         */

        /**
         * 2.多个路由请求拦截的方法
         * inwhiteList：过滤下白名单(判断条件：白名单里面的路径是否与ctx.request.url一致) 返回一个数组
         *      if            (inwhiteList.length               ||           ctx.request.header.token)：
         * 白名单的length(若有数组的长度就可以有,若无数组的长度就无)||ctx.request.header.token就可打印到客户端传来的token值
         * await next()：若true则进行home.js接口
         * ctx.status=401：若false则往前端返回401(报错信息：GET http://localhost:3000/getList 401 (Unauthorized))
         */
        let inwhiteList = whiteList.filter(item => {
            return item === ctx.request.url
        })
        if (inwhiteList.length || ctx.request.header.token) {
            await next();
        } else {
            ctx.status = 401
            ctx.body = {
                code: 0,
                data: []
            }
        }
    }
}