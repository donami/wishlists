<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

const Container = defineComponent({
  name: 'Container',
});

export default Container;
</script>

<style lang="scss" scoped>
.container {
  max-width: 100%;
  margin: 0 auto;

  @media screen and (min-width: 577px) {
    max-width: 540px;
  }
  @media screen and (min-width: 768px) {
    max-width: 720px;
  }
  @media screen and (min-width: 992px) {
    max-width: 960px;
  }
  @media screen and (min-width: 1200px) {
    max-width: 1140px;
  }
}
</style>
