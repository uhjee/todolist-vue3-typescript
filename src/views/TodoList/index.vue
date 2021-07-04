<template>
  <div class="todo-container">
    <todo-item
      @changeIsDone="changeIsDone"
      @deleteTodo="deleteTodo"
      v-for="item in listData"
      :key="item.id"
      :todoData="item"
    ></todo-item>
  </div>
</template>

<script lang="ts">
import { TodoType } from '@/types/TodoType';

import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  Ref,
  toRefs,
  watch,
} from 'vue';
import { makeTodoList } from '@/utils/TodoList';
import { remove } from 'lodash';
import TodoItem from './TodoItem.vue';

export default defineComponent({
  name: 'List',
  components: { TodoItem },
  props: {
    tab: {
      type: String,
    },
  },
  setup(props) {
    const instance = getCurrentInstance();
    const emitter = instance?.appContext.app.config.globalProperties.emitter;

    const { tab } = toRefs(props);

    const todoArr: Ref<TodoType[]> = ref([]);
    const doneArr: Ref<TodoType[]> = ref([]);

    const listData: Ref<TodoType[]> = ref([]);

    // UI 리스트의 데이터로 사용될 배열
    const loadData = (): void => {
      todoArr.value = makeTodoList(5, 'TODO');
      doneArr.value = makeTodoList(8, 'DONE');
    };

    loadData();

    watch(
      () => tab.value,
      (newTab) => {
        listData.value = newTab === 'TODOLIST' ? todoArr.value : doneArr.value;
      },
      { immediate: true },
    );

    // todo done list에 넣기
    // const appendData = (): void => {
    //   const {
    //     scrollHeight,
    //     scrollTop,
    //     clientHeight,
    //   } = document.documentElement;
    //   if (scrollTop + clientHeight > scrollHeight - 5) {
    //     const copiedTodoArr = [...todoArr.value];
    //     const newTodoArr = makeTodoList(10);
    //     todoArr.value = copiedTodoArr.concat(newTodoArr);
    //   }
    // };

    // const sortTodoArr = (): void => {
    //   todoArr.value = sortBy(todoArr.value, ['isDone', 'id']);
    // };

    const changeIsDone = (todoData: TodoType) => {
      const foundTodo = remove(listData.value, {
        id: todoData.id,
      })[0] as TodoType;
      foundTodo.isDone = !foundTodo.isDone;
      if (tab.value === 'TODOLIST') {
        doneArr.value.push(foundTodo);
      } else {
        todoArr.value.push(foundTodo);
      }
    };

    const addTodo = (todoData: TodoType): void => {
      console.log(todoData);

      todoArr.value.push(todoData);
    };

    const deleteTodo = (todoId: string) => {
      remove(listData.value, { id: todoId });
    };

    onMounted(() => {
      emitter.on('addTodo', (newTodo: TodoType) => {
        addTodo(newTodo);
      });
    });

    return {
      listData,
      todoArr,
      doneArr,
      changeIsDone,
      addTodo,
      deleteTodo,
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
