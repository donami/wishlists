<template>
  <div v-for="(item, index) in items" :key="index">
    <div>
      <slot :item="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const List = defineComponent({
  name: 'list',
  props: {
    items: Array,
  },

  // setup(props) {
  //   const { items } = toRefs(props);

  //   watch(
  //     items,
  //     (newValue) => {
  //       console.log(newValue);
  //     },
  //     { deep: true }
  //   );
  // },
});

export default List;
</script>

<style></style>
