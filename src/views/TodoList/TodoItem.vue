<template>
  <div class="todo-item">
    <div class="done-btn">
      <circle-switch></circle-switch>
    </div>
    <div class="content"></div>
    <div class="etc">
      <div class="close-btn">close</div>
      <div class="date"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CircleSwitch from '@/components/CircleSwitch.vue';
import { TodoType } from '@/types/TodoType';

export default defineComponent({
  name: 'TodoItem',
  components: {
    CircleSwitch,
  },
  props: {
    todoData: {
      type: Object,
    },
  },
  setup(props, context) {
    const changeIsDone = (): void => {
      context.emit('changeIsDone', {
        ...props.todoData,
        isDone: !props?.todoData?.isDone,
      });
    };

    return {
      changeIsDone,
    };
  },
});
</script>

<style scoped lang="scss">
.todo-item {
  height: 70px;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  border: 1px solid #999;
  border-radius: 3px;

  & > * {
    padding: {
      left: 10px;
      right: 10px;
    }
  }

  .done-btn {
    flex: 0 0 40px;
    display: flex;
    justify-content: center;
  }

  .content {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &-done {
      text-decoration-line: line-through;
    }
  }
  .etc {
    flex: 0 0 100px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;

    & > * {
      flex: 1;
      display: flex;
      align-items: center;
    }
    .close-btn {
      font-size: 0.8rem;
    }
    .date {
    }
  }
}
</style>
