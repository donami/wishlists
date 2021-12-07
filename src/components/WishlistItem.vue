<script lang="ts" setup>
import { ref, defineProps, defineEmits, computed } from 'vue';
import { Edit, Delete } from '@element-plus/icons';
import stc from 'string-to-color';
import pick from 'pick-a-good-color';
import { useRouter, useRoute } from 'vue-router';
// import {
//   genWebColor,
//   genMaterialColor,
//   default as genRGBColor,
// } from 'generate-color';

const props = defineProps({ itemId: String, name: String });
const emits = defineEmits(['onRemoveItem']);
const router = useRouter();
const route = useRoute();

const bgColor = stc(props.name);
const isHovering = ref(false);

// const bgColor = genMaterialColor();
const textColor = pick(['#333', '#fff'], { background: bgColor });

const handleDelete = () => {
  emits('onRemoveItem', { itemId: props.itemId });
};

const handleEditClick = () => {
  router.push(`/wishlist/${route.params.id}/${props.itemId}`);
};
</script>

<template>
  <div
    class="wishlist-item"
    :style="{ background: bgColor, color: textColor }"
    @mouseover="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div class="wishlist-item-options" v-if="isHovering">
      <el-row justify="end" class="wishlist-item-options-list">
        <el-button-group size="mini">
          <el-tooltip placement="top">
            <template #content>Edit</template>
            <el-button :icon="Edit" @click="handleEditClick"></el-button>
          </el-tooltip>
          <el-tooltip placement="top">
            <template #content>Delete</template>
            <el-button
              type="danger"
              :icon="Delete"
              @click="handleDelete"
            ></el-button>
          </el-tooltip>
        </el-button-group>
      </el-row>
    </div>
    {{ name }}
  </div>
</template>

<style lang="scss" scoped>
.wishlist-item {
  background: aquamarine;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  width: 100%;
  border-radius: 10px;
  position: relative;

  &-options {
    position: absolute;
    top: 1rem;
    left: 0;
    right: 0;
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.1);

    // &-list {
    //   > div {
    //     margin-right: 0.5rem;
    //   }
    // }
  }
}
</style>
