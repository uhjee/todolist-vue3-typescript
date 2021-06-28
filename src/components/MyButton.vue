<template>
  <div :class="getClass" :style="{ backgroundColor: getColor }">
    <slot>
      lele
    </slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyButton',
  props: {
    mini: {
      type: Boolean,
      default: false,
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
          return '#dbae31';

        default:
          throw new Error('색상을 선택해야합니다.');
      }
    },
    getClass() {
      return {
        btn: true,
        mini: this.mini,
      };
    },
  },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style scoped lang="scss">
.btn {
  display: flex;
  height: 40px;

  margin: 4px;
  padding: 4px 15px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
}
</style>
