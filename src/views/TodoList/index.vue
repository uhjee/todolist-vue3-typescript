<template>
  <div class="todo-container">
    <todo-item></todo-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { TodoType } from '@/types/TodoType';
import { makeTodoList } from '@/utils/TodoList';
import TodoItem from './TodoItem.vue';

export default defineComponent({
  name: 'TodoList',
  components: { TodoItem },
  // data() {
  //   return {
  //     todoArr: [] as TodoType[],
  //   };
  // },
  // created() {
  //   this.todoArr = makeTodoList(10);
  // },
  setup() {
    let todoArr: TodoType[] = [];

    const loadData = (): void => {
      todoArr = makeTodoList(10);
    };

    const appendData = ():void => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight > scrollHeight - 5) {
        const copiedTodoArr = [...todoArr];
        const newTodoArr = makeTodoList(10);
        todoArr = copiedTodoArr.concat(newTodoArr);
      }
    };

    // onMounted(){
    //   loadData();

    // };
  },
});
</script>

<style>
.todo-container {
  width: 100%;
  height: 100%;
  padding: 15px 15px;
}
</style>
