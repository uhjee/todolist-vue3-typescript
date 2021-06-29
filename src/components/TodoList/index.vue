<template>
  <div class="todo--container">
    <todo-item></todo-item>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { TodoType } from '@/types/TodoType';
import { makeTodoList } from '@/utils/TodoList';
import TodoItem from './TodoItem.vue';

export default defineComponent({
  name: 'TodoList',
  components: { TodoItem },
  data() {
    return {
      todoArr: [],
    };
  },
  created() {
    this.todoArr = makeTodoList(10);
  },
});
</script>

<style>
.todo--container {
  width: 100%;
  height: 100%;
  padding: 15px 15px;
}
</style>
