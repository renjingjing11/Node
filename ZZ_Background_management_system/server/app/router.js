'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    /** 
     * 1.mid1.中间件所有路由请求拦截
     *        const { router, controller, middleware } = app;
     * 2.[config.default.js]配置字段
     *        middleware: ['index']
     * */
    const { router, controller, middleware } = app;
    /** 
     * 1.mid1.中间件单个路由使用方法请求拦截
     * const gzip = middleware.index()
     * router.get("/getList",gzip, controller.home.getList)
     * */
    router.post("/login", controller.home.login)
    router.post("/registry", controller.home.registry)
    router.get("/getList", controller.home.getList)
    router.post("/edit", controller.home.edit)
    router.post("/del", controller.home.del)
};