<template>
  <div :class="['frame', { done: isDonelist }]">
    <div class="box__header">
      <div class="title-bar flex center-h">
        <div class="btn-group">
          <circle-btn />
          <circle-btn color="red" />
          <circle-btn color="yellow" />
        </div>
        <div class="title">
          {{ currentTabName }}
        </div>
        <div
          class="change-tap-btn flex center-h"
          @click="changeTap(currentTab)"
        >
          {{ otherTabName }}
          <span class="material-icons-outlined">
            chevron_right
          </span>
        </div>
      </div>
    </div>
    <div :class="['box__body']">
      <todo-list :tab="currentTab" />
    </div>

    <div class="box__footer">
      <input
        class="input-todo"
        v-model="inputTodo"
        @input="changeInputTodo($event.target.value)"
        @keyup.enter="addTodo"
        type="text"
      />
      <square-btn @click="addTodo" color="red" height="40">Add</square-btn>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, getCurrentInstance, computed,
} from 'vue';
import SquareBtn from '@/components/SquareBtn.vue';
import CircleBtn from '@/components/CircleBtn.vue';
import { TodoType } from '@/types/TodoType';

import chance from 'chance';

import TodoList from '@/views/TodoList/index.vue';

export default defineComponent({
  name: 'Frame',
  components: { SquareBtn, CircleBtn, TodoList },
  setup() {
    const instance = getCurrentInstance();
    const emitter = instance?.appContext.app.config.globalProperties.emitter;
    const c = chance();

    // currentTab 관련
    const currentTab = ref('TODOLIST');

    const changeTap = (tap: string): void => {
      currentTab.value = tap === 'TODOLIST' ? 'DONELIST' : 'TODOLIST';
    };

    const currentTabName = computed(() =>
      (currentTab.value === 'TODOLIST' ? 'Todolist' : 'Donelist'));

    const otherTabName = computed(() =>
      (currentTab.value === 'TODOLIST' ? 'DONE' : 'TODO'));

    const isDonelist = computed(() => currentTab.value === 'DONELIST');

    // inputTodo
    const inputTodo = ref('');

    const changeInputTodo = (value: string): void => {
      inputTodo.value = value;
    };

    const addTodo = (): void => {
      if (inputTodo.value.trim() === '') {
        return;
      }
      if (currentTab.value === 'TODOLIST') {
        const newTodo: TodoType = {
          id: c.fbid(),
          color: 'red',
          isDone: false,
          content: inputTodo.value,
          atWritten: ((d: Date) =>
            `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)(
            new Date(),
          ),
        };
        emitter.emit('addTodo', newTodo);

        inputTodo.value = '';
      }
    };

    return {
      currentTab,
      changeTap,
      isDonelist,
      currentTabName,
      otherTabName,
      inputTodo,
      changeInputTodo,
      addTodo,
    };
  },
});
</script>

<style scoped lang="scss">
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

  transition: background-color 0.5s;

  &.done {
    background-color: rgba($color: $yellow, $alpha: 0.05);
    .box__header {
      background-color: $red;
      color: #fff;
    }
  }
  & > * {
    padding: 6px 12px;
    display: flex;
  }

  .box__header {
    border-radius: 10px 10px 0 0;
    flex: none;
    background-color: $green;

    height: 66px;

    .title-bar {
      width: 100%;

      & > * {
        flex: none;
        // flex: 0 0 auto
      }
      .title {
        font-size: 1.2rem;
        letter-spacing: 0.08rem;

        margin: 0 auto;
      }
      // & :last-child {
      //   margin-left: auto;
      // }
      .change-tap-btn {
        font-size: 0.8rem;
        cursor: pointer;

        &:hover {
          transform: scale(1.1);
        }
      }
    }
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
      background-color: #fff;
    }
  }
}
</style>
