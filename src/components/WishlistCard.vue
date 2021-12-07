<script lang="ts" setup>
import {
  ref,
  withDefaults,
  defineProps,
  defineEmits,
  computed,
  watch,
  toRefs,
} from 'vue';
import { Edit } from '@element-plus/icons';
import WishlistItem from './WishlistItem.vue';
import Button from './Button.vue';
import { useStore } from '../store';

interface Props {
  list?: {
    title: string;
    items: any[];
  };
}

const props = withDefaults(defineProps<Props>(), {});
const emits = defineEmits(['onUpdateWishlistName', 'onRemoveItem']);
const store = useStore();

const localName = ref(props.list?.title || '');
const isEditing = ref(false);
const loading = computed(() => store.getters.getIsLoading);
const items = computed(() => props.list?.items || []);

watch(
  () => props.list,
  (newValue, oldValue) => {
    if (newValue?.title !== oldValue?.title) {
      localName.value = newValue?.title || '';
    }
  }
);

const handleSaveName = () => {
  emits('onUpdateWishlistName', localName.value);
  isEditing.value = false;
};

const handleCancelEditName = () => {
  isEditing.value = false;
  localName.value = props.list?.title || '';
};

const onRemoveItem = (payload: { itemId: string }) => {
  emits('onRemoveItem', payload);
};
</script>

<template>
  <el-card>
    <template v-if="loading">
      <el-skeleton :rows="5" animated />
    </template>
    <template v-if="!loading && list">
      <el-row
        gutter="20"
        :style="{
          alignItems: 'center',
          marginBottom: '1rem',
          paddingLeft: '10px',
        }"
      >
        <h2 v-if="!isEditing" class="wishlist-name">
          {{ list.title }}
        </h2>
        <span v-if="isEditing">
          <el-input placeholder="Name your wishlist" v-model="localName" />
        </span>

        <template v-if="!isEditing">
          <el-button
            type="text"
            @click="isEditing = !isEditing"
            :style="{ marginLeft: '0.5rem' }"
          >
            <el-icon class="el-icon"><Edit /></el-icon>
          </el-button>
        </template>
        <template v-if="isEditing">
          <Button
            type="primary"
            size="mini"
            @click="handleSaveName"
            :style="{ marginLeft: '0.5rem' }"
          >
            Save
          </Button>
          <Button type="white" size="mini" @click="handleCancelEditName">
            Cancel
          </Button>
        </template>
      </el-row>

      <p v-if="!items.length" class="empty-list-text">
        Your wish list is empty! Add a wish by pressing the
        <em>"Add new item"</em>
        button above.
      </p>
      <el-row v-if="items.length" gutter="20">
        <el-col
          :span="6"
          v-for="(item, key) in items"
          :key="key"
          :style="{ marginBottom: '20px' }"
        >
          <WishlistItem
            :itemId="item.id"
            :name="item.title"
            @onRemoveItem="onRemoveItem"
          />
        </el-col>
      </el-row>
    </template>
  </el-card>
</template>

<style lang="scss" scoped>
.wishlist-name {
  margin: 0;

  input {
    margin-right: 1rem;
  }
}

.empty-list-text {
  text-align: left;
}
</style>
