<template>
  <div class="welcome-step-item">
    <div class="welcome-step-item-icon">
      <el-icon size="60">
        <slot name="icon" />
      </el-icon>
    </div>
    <h3 class="welcome-step-item-title">{{ title }}</h3>
    <div class="welcome-step-item-text">{{ text }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// interface WelcomeStepItemProps {
//   title: string;
// }

const WelcomeStepItem = defineComponent({
  name: 'WelcomeStepItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    text: String,
  },
});

export default WelcomeStepItem;
</script>

<style lang="scss" scoped>
.welcome-step-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;

  &-title {
    margin: 1rem 0;
  }
}
</style>
