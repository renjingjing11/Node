/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1568703787863_6348';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',

        /**
         * 1.security:安全机制
         * 2.multipart：上传文件需要配置的字段
         * 3.mysql：连接数据库
         */
        security: {
            csrf: false
        },
        multipart: {
            mode: 'file'
        },
        mysql: {
            // 单数据库信息配置
            client: {
                // host
                host: 'localhost',
                // 端口号
                port: '3306',
                // 用户名
                user: 'root',
                // 密码
                password: 'root',
                // 数据库名
                database: 'db',
            },
            // 是否加载到 app 上，默认开启
            app: true,
            // 是否加载到 agent 上，默认关闭
            agent: false,
        }
    };

    return {
        ...config,
        ...userConfig,
    };
};