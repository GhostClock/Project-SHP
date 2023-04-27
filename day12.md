1.个人订单页 完善
使用分页器

2.全局路由守卫
未登录访问时：交易相关(trade)、支付相关(pay、paysuccess)、用户中心(center)相关跳转到登录页

3.路由内独享守卫
只有从购物车界面才能跳转到交易页面(创建订单)
只有聪交易页面(创建订单)才能跳转到支付页面
只有从支付页面才能跳转到支付成功页面

4.图片懒加载
vue-lazyload
自定义插件

5.表单验证
vee-validate
基本使用
1.安装
    npm i --save vee-validate@2      
2.插件安装和引入
    import zh_CN from 'vee-validate/dist/locale/zh_CN'
    import VeeValidate from 'vee-validate'
    Vue.use(VeeValidate)
3.提示信息校验
表单校验
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同`  // 修改内置规则的message,让确认密码和密码相同
    },
    attributes: { // 给校验的field属性名映射中文名称
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        isCheck: '协议',
    }
})

自定义校验
VeeValidate.Validator.extend('agree', {
validate: value => {
    return value
},
getMessage: field => field + '必须同意'

4.基本使用
    校验输入框使用：
    <input placeholder="请输入验证码"   
        v-model="code"  name="code"   
        v-validate="{ required: true, regex: /^\d{6}$/ }"  
        :class="{ invalid: errors.has('code') }" 
    />
    自定义校验使用：
    <input type="checkbox"
        v-model="agree" 
        name="agree" 
        v-validate="{ required: true,  agree: true}"
        :class="{ invalid: errors.has('agree') }"
    />
})

6.路由懒加载
 component: () => import('@/pages/Home'), // 路由懒加载

7.打包上线
7.1.打包
    npm run build
项目打包后，代码都是经过压缩加密的，如果运行时报错，输入的错误信息无法准确得知是哪里的代码报错
有个map就可以想未加密的代码一样，准确的输入是哪一行哪一列有错
所以该文件如果项目不需要是可以去除的
配置map
    vue.config.js
    productionSourceMap: false



