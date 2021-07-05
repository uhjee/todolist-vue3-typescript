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

}
</style>
