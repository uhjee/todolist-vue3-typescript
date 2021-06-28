<template>
  <div class="frame box">
    <div class="box__header">header</div>
    <div class="box__body">body</div>
    <div class="box__footer">
      <input
        class="input-todo"
        v-model="inputTodo"
        @input="changeInputTodo($event.target.value)"
        type="text"
      />
      <my-button color="red">Add</my-button>
      <!-- <my-button>Add</my-button> -->
      <!-- <my-button color="yellow">Add</my-button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyButton from './MyButton.vue';

export default defineComponent({
  name: 'Frame',
  components: { MyButton },
  data() {
    return {
      inputTodo: '' as string,
    };
  },
  methods: {
    changeInputTodo(value: string): void {
      this.inputTodo = value.trim();
    },
  },
});
</script>

<style scoped lang="scss">
$white: #eaeff0;
$green: #d2dbd7;

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
    padding: 6px 10px;

    display: flex;
  }

  .box__header {
    border-radius: 10px 10px 0 0;
    flex: none;
    background-color: #d2dbd7;

    height: 66px;
  }
  .box__body {
    border-top: 1px solid rgb(180, 180, 180);
    flex: 1;
    padding: 20px 15px;
  }
  .box__footer {
    flex: none;
    align-items: center;
    background-color: #d8e0dd;
    border-top: 1px solid rgb(180, 180, 180);
    border-radius: 0 0 10px 10px;
    height: 80px;

    input.input-todo {
      margin: 0 4px;
      flex: 1;
      height: 40px;
      outline: none;
      border: none;
    }
  }
}
</style>
