面试：防抖、节流、存储 经常被问到
1.删除选中产品的操作
注意：没有一次删除很多产品的接口，但是有以通过id删除单个
Promise.all([p1, p2, p3]) 每个都是Promise对象，如果一个失败，都失败

2.全选操作

3.登录与注册静态组件 -- 处理公用图片资源问题
3.1.登录和注册必须要会
3.2.assets文件夹是放置项目公用的文件
3.3.在样式中也可以使用@符号[src的别名] 说用方法：~@

4.注册的业务 --- 表单验证先不做,最后统一处理
4.1.获取验证码 /api/user/passport/sendCode/{phone}
4.2.注册用户

5.登录业务
5.1.前提是先注册 通过数据库存储用户信息 存储了手机号和密码
5.2.登录 服务器返回token

6.token令牌理解
用户唯一标识

注意：vuex仓库存储数据---不是持久化的