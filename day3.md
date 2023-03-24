1.完成一级分类动态添加背景颜色
第一种解决方案：采用样式完成 可以实现
第二种解决方案：通过JS完成 事件的委派实现

2.通过JS控制二三级分类的展示和隐藏
2.1.最开始的时候，是通过CSS样式display：block|none显示和隐藏
2.2.使用:style="{display: currentIndex == index ? 'block' : 'none'}"进行显示和隐藏

