<script lang="ts" setup>
import { useStore, WishlistData } from '../store';
import { computed, onBeforeMount, onBeforeUnmount, watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { auth } from '../firebase';

const route = useRoute();
const router = useRouter();
const store = useStore();

const selectedList = computed<WishlistData>(
  () => store.getters.getSelectedList
);

const selectedItem = computed(() => {
  if (!selectedList.value) {
    return null;
  }

  return selectedList.value.items.find(
    (item) => item.id === route.params.itemId
  );
});

const title = ref(selectedItem.value?.title || '');

watch(selectedItem, (newValue) => {
  if (!newValue) {
    return;
  }
  title.value = newValue.title;
});

const authListener = auth.onAuthStateChanged((user) => {
  if (!user) {
    router.push('/login');
    return;
  }

  store.dispatch('fetchWishlists', { userId: user.uid });
});

const handleSave = () => {
  if (!selectedItem.value) {
    return;
  }
  const item = {
    id: selectedItem.value.id,
    title: title.value,
  };
  store.dispatch('updateItemInList', {
    listId: route.params.id,
    item,
  });
  router.push(`/wishlist/${route.params.id}`);
};

const handleCancel = () => {
  router.push(`/wishlist/${route.params.id}`);
};

onBeforeMount(() => {
  store.dispatch('selectWishlist', { id: route.params.id });
});

onBeforeUnmount(() => {
  authListener();
});
</script>

<template>
  <template v-if="selectedItem">
    <h1>Edit item</h1>
    <div>
      <el-input placeholder="Title" v-model="title" />
    </div>
    <el-button type="primary" @click="handleSave">Save</el-button>
    <el-button @click="handleCancel">Cancel</el-button>
  </template>
  <template v-else> Item not found </template>
</template>
