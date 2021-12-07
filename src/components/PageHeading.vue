<script lang="ts" setup>
import { defineProps, withDefaults, toRefs } from 'vue';

interface Props {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  divider?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'h1',
  divider: false,
});

const { variant } = toRefs(props);

// const componentTag = 'h1';
</script>

<template>
  <component :is="variant" :class="['page-heading', { divider: divider }]">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
h1,
h2,
h3,
h4,
h5 {
  &.divider {
    border-bottom: 1px solid #ccc;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
