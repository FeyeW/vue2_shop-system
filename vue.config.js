module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
        },
    },
    lintOnSave: false, //关闭语法检查
    //开启代理服务器(方式一:配置单一 优先匹配前端资源)
    // devServer: {
    //     proxy: 'http://localhost:5000'
    // }

    //开启代理服务器(方式二:配置多个客户端)
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                pathRewrite: { '^/api': '' },
                ws: true,
                changeOrigin: true
            },
        }
    }
}