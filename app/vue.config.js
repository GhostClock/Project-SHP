const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // eslint校验功能关闭
  lintOnSave: false,
  configureWebpack: {
    devtool: "source-map",
  },
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn', // 服务器域名
        // pathRewrite: {'^/api': ''},// 不进行路径重写
      },
    }
  }
})
