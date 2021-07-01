<template>
  <div class="todo-container">
    <todo-item
      @changeIsDone="changeIsDone"
      v-for="todo in todoArr"
      :key="todo.id"
      :todoData="todo"
    ></todo-item>
  </div>
</template>

<script lang="ts">
import { TodoType } from '@/types/TodoType';
import { Events } from '@/types/MittTypes';

import {
  defineComponent, onMounted, ref, Ref,
} from 'vue';
import { makeTodoList } from '@/utils/TodoList';
import { find, sortBy } from 'lodash';
import mitt from 'mitt';
import TodoItem from './TodoItem.vue';

export default defineComponent({
  name: 'TodoList',
  components: { TodoItem },
  setup() {
    const emitter = mitt<Events>();

    const todoArr: Ref<TodoType[]> = ref([]);

    const loadData = (): void => {
      todoArr.value = makeTodoList(5);
    };

    const appendData = (): void => {
      const {
        scrollHeight,
        scrollTop,
        clientHeight,
      } = document.documentElement;
      if (scrollTop + clientHeight > scrollHeight - 5) {
        const copiedTodoArr = [...todoArr.value];
        const newTodoArr = makeTodoList(10);
        todoArr.value = copiedTodoArr.concat(newTodoArr);
      }
    };

    const sortTodoArr = (): void => {
      todoArr.value = sortBy(todoArr.value, ['isDone', 'id']);
    };

    const changeIsDone = (todoData: TodoType) => {
      const foundTodo = find(todoArr.value, { id: todoData.id }) as TodoType;
      foundTodo.isDone = !foundTodo.isDone;
      sortTodoArr();
    };

    const addTodo = (todoData: TodoType): void => {
      todoArr.value.push(todoData);
      sortTodoArr();
    };

    onMounted(() => {
      loadData();
      sortTodoArr();

      emitter.on('addTodo', (newTodo) => {
        console.log(newTodo);

      // addTodo(newTodo);
      });
    });

    return {
      todoArr,
      changeIsDone,
      addTodo,
    };
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
