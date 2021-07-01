<template>
  <div :class="getClass" :style="getStyle" @mouseover="changeColor">
    <div class="flex center-h">
      <slot> </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SquareBtn',
  props: {
    height: {
      type: String,
      default: 'auto',
    },
    text: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'grey',
    },
  },
  computed: {
    getColor() {
      switch (this.color) {
        case 'grey':
          return '#6a7385';
        case 'red':
          return '#d94537';
        case 'yellow':
          return '#e8c030';
        case 'green':
          return '#86b561';
        case 'blue':
          return '#508cbf';
        default:
          throw new Error('색상을 선택해야합니다.');
      }
    },
    getClass(): {btn: boolean} {
      return {
        btn: true,
      };
    },
    getStyle() : {backgroundColor: string, height: string} {
      return {
        backgroundColor: this.getColor,
        height: this.height === 'auto' ? 'auto' : `${this.height}px`,
      };
    },
  },
  data() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.btn {
  display: inline-block;
  box-sizing: border-box;
  // height: 40px;

  margin: 3px 4px;
  padding: 6px 15px;
  border-radius: 4px;

  font-size: 12px;
  color: #fff;
  cursor: pointer;
  transition: 0.08s;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
