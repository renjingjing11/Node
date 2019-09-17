'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg

    // 读取静态资源需要开启
    static: {
        enable: true,
    },
    mysql: {
        enable: true,
        package: 'egg-mysql'
    }
};