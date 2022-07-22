module.exports = {
    //关闭eslint
    lintOnSave: false,
    // 开启代理服务器
    devServer:{
        proxy:'http://121.4.92.135:3000'
    },
    publicPath:'/',
}