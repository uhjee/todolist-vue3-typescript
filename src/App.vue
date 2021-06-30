<template>
  <Frame />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Frame from '@/views/Frame.vue';

export default defineComponent({
  name: 'App',
  components: {
    Frame,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .flex {
    display: flex;
    height: 100%;

    &.center-w {
      justify-content: center;
    }

    &.center-h {
      align-items: center;
    }
  }
}
</style>
