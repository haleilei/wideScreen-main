
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    outputDir: "dist",
    assetsDir: "static",
    productionSourceMap: false,
    chainWebpack: config => {
        config.performance.hints(false);
    },
    lintOnSave: "error",
    devServer: {
        disableHostCheck: true,
        open: true,
        host: '0.0.0.0',
        port: 8081,
        proxy: {
            // '/mediastore':{
            //     target: process.env.NODE_ENV === 'production' ?'http://192.168.1.107:8080/mediastore': 'http://localhost:8080/mediastore',  // 后台api
            //     changeOrigin: true,  //是否跨域
            //     // secure: true,m
            //     pathRewrite: {
            //         '^/mediastore': '^/mediastore'   //需要rewrite的,
            //     }
            // },
            '/api/v1':{
                target: process.env.NODE_ENV === 'development' ? 'http://192.168.1.107:8080/api/v1':'http://localhost:8080/api/v1',  // 后台api
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/api/v1': '^/api/v1'   //需要rewrite的,
                }
            }

        }
    }

    // devServer: {
    //     '/django-api': {
    //         port: 8080,
    //         proxy: 'http://public-data.51easymaster.com'l
    //     },
    //     '/baidu': {
    //         target: 'http://api.map.baidu.com',
    //         ws: true,
    //         changeOrigin: true,
    //         pathRewrite: {
    //             '^/baidu': '/baidu'
    //         }
    //     }
    // }
};