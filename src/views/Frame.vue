<template>
  <div class="frame box">
    <div class="box__header">
      <div class="title-bar flex center-h">
        <circle-btn />
        <circle-btn color="red" />
        <circle-btn color="yellow" />
      </div>
    </div>
    <div class="box__body">
      <component ref="boxBody" :is="currentTab" />
    </div>

    <div class="box__footer">
      <input
        class="input-todo"
        v-model="inputTodo"
        @input="changeInputTodo($event.target.value)"
        type="text"
      />
      <square-btn @click="addTodo" color="red" height="40">Add</square-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import SquareBtn from '@/components/SquareBtn.vue';
import CircleBtn from '@/components/CircleBtn.vue';
import { TodoType } from '@/types/TodoType';
import { Events } from '@/types/MittTypes';

import chance from 'chance';
import mitt from 'mitt';

import TodoList from '@/views/TodoList/index.vue';

export default defineComponent({
  name: 'Frame',
  components: { SquareBtn, CircleBtn, TodoList },
  setup() {
    const emitter = mitt<Events>();

    const c = chance();
    // currentTab
    const currentTab = ref('TodoList');

    // inputTodo
    const inputTodo = ref('');

    const changeInputTodo = (value: string): void => {
      inputTodo.value = value.trim();
    };

    const boxBody = ref(null);

    const addTodo = (): void => {
      if (currentTab.value === 'TodoList') {
        const newTodo:TodoType = {
          id: c.fbid(),
          color: 'red',
          isDone: false,
          content: inputTodo.value,
          atWritten: ((d: Date) =>
            `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)(new Date()),
        };
        emitter.emit('addTodo', newTodo);
      }
    };

    onMounted(() => {
      console.log(boxBody.value);
    });
    return {
      inputTodo,
      changeInputTodo,
      currentTab,
      addTodo,
      boxBody,
    };
  },
});
</script>

<style scoped lang="scss">
$white: #eaeff0;
$green: #d2dbd7;
$grey: #b4b4b4;

.frame {
  display: flex;
  flex-direction: column;

  // 부모 요소 가운데에 정렬
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: calc(560px / -2);
  margin-top: calc(920px / -2);

  width: 560px;
  height: 920px;
  background-color: $white;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba($color: #858585, $alpha: 0.2);

  & > * {
    padding: 6px 12px;
    display: flex;
  }

  .box__header {
    border-radius: 10px 10px 0 0;
    flex: none;
    background-color: $green;

    height: 66px;
  }
  .box__body {
    border-top: 1px solid $grey;
    flex: 1;
    padding: 10px 15px;
    margin: {
      bottom: 20px;
    }

    overflow-y: auto;
  }
  .box__footer {
    flex: none;
    align-items: center;
    background-color: $green;
    border-top: 1px solid $grey;
    border-radius: 0 0 10px 10px;
    height: 80px;

    input.input-todo {
      margin: 0 4px;
      padding: 0 15px;
      flex: 1;
      height: 40px;
      outline: none;
      border: none;
      border-radius: 3px;
    }
  }
}
</style>
