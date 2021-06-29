<template>
  <div class="todo__item--box" flex></div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TodoItem',
});
</script>

<style scoped lang="scss">
.todo__item--box {
  height: 70px;
  width: 100%;

  margin-bottom: 20px;

  border: 1px solid #888;
}
</style>
