<template>
  <div>
    <h2>效果一：显示TODO列表时，已完成的TODO绿色</h2>
    <!-- 子组件，数据来源于父组件 -->
    <List :todos="todos">
      <template slot-scope="todo">
        <span :style="{ color: todo.todo.isComplete ? 'green' : 'red' }">
          {{ todo.todo.text }}
        </span>
      </template>
    </List>

    <hr />

    <h2>效果二：显示TODO列表时，带序号，TODO的颜色为蓝绿色搭配</h2>
    <List1 :todos="todos">
        <template slot-scope="{todo, index}">
            <span :style="{color: todo.isComplete ? 'blue' : 'green'}">{{ index }}、{{ todo.text }}</span>
        </template>
    </List1>
  </div>
</template>
<script>
import List from "./List";
import List1 from "./List1";
export default {
  components: {
    List,
    List1,
  },
  data() {
    return {
      todos: [
        { id: 1, text: "AAA", isComplete: false },
        { id: 2, text: "BBB", isComplete: true },
        { id: 3, text: "CCC", isComplete: false },
        { id: 4, text: "DDD", isComplete: false },
      ],
    };
  },
};
</script>
<style lang="">
</style>