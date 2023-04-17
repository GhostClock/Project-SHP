1.登录过后展示首页+用户信息
1.1.当用户注册完成，用户登录 用户名+密码向服务器发请求 组件派发action：userLogin
登录成功后：获得token，存储在本地,跳转到home

1.2.在首页的mounted派发getUserInfo，获取用户信息，动态展示header组件内容

1.3.存在问题
1.多个组件展示用户信息，需要在每个组件中mounted触发getUserInfo 不行
2.用户已经登录了，就不应该再回登录页

2.退出登录