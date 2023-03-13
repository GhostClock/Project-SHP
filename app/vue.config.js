const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // eslint校验功能关闭
  lintOnSave: false,
})
