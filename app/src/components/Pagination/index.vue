<template>
    <div class="pagination">
        <button>上一页</button>
        <button>1</button>
        <button>···</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>

        <button>···</button>
        <button>{{ totalPage }}</button>
        <button>下一页</button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>
  
<script>
export default {
    name: "Pagination",
    props: ["pageNo", "pageSize", "total", "continues"],
    computed: {
        // 总共的页数
        totalPage() {
            // 向上取整
            return Math.ceil(this.total / this.pageSize)
        },
        // 计算出连续的页面的起始数字与结束数字【连续的页码数字：至少是5】
        startNumEenNum() {
            // 向对象上的实例进行结果
            const { continues, pageNo, totalPage } = this
            // 先定义开始数字和结束数字
            let start = 0, end = 0
            // 连续的页码为5：至少5页 ，如果出现不正常的现象：不够5页
            if (continues > totalPage) {
                // 不正常：总页数没有连续页码多
                start = 1, end = totalPage
            } else {
                // 正常情况 连续页码为5，总页数大于5
                /*
                例1：当前是第8页， 连续页码5
                6 7 8 9 10
                例2：当前是第8页， 连续页码7
                5 6 7 8 9 10 11
                */
                start = pageNo - parseInt(continues / 2)

                // 结束数据
                end = pageNo + parseInt(continues / 2)

                // 出现不正常的数据 start出现0和负数 需要纠正
                if (start < 1) {
                    start = 1, end = continues
                }
                // 把出现不正常的现象 end大于总页码 需要纠正
                if (end > totalPage) {
                    end = totalPage, start = totalPage - continues + 1
                }
            }

            return { start, end }
        }
    },
}
</script>
  
<style lang="less" scoped>
.pagination {
    text-align: center;
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>
  