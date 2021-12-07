<script lang="ts" setup>
import { onBeforeUnmount, computed, watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { auth } from '../firebase';
import { useStore, WishlistData } from '../store';

const route = useRoute();
const router = useRouter();
const store = useStore();

const emails = ref<string[]>([]);
const emailOptions = ref<{ value: string; label: string }[]>([]);

const authListener = auth.onAuthStateChanged((user) => {
  if (!user) {
    router.push('/login');
    return;
  }

  store.dispatch('fetchWishlists', { userId: user.uid });
});

watch(route.params, (newValue, oldValue) => {
  if (newValue.id !== store.state.selectedId) {
    store.dispatch('selectWishlist', { id: newValue.id });
  }
});

const selectedList = computed<WishlistData>(
  () => store.getters.getSelectedList
);

onBeforeUnmount(() => {
  authListener();
});
</script>

<template>
  Share list {{ selectedList }}

  <div>
    <p>Enter all email addresses you want to send your wishlist to</p>
    <el-select
      v-model="emails"
      multiple
      filterable
      allow-create
      default-first-option
      placeholder="Emails to receive your list"
    >
      <el-option
        v-for="item in emailOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
  <el-button type="success">Share</el-button>
</template>
