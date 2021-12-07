<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { auth } from '../firebase';
import WishlistCard from '../components/WishlistCard.vue';
import Button from '../components/Button.vue';
import { useStore } from '../store';
import { LocalWishlistItem, WishlistItem } from '../types';
import { ElNotification } from 'element-plus';

const name = ref('');
const deleteModalVisible = ref(false);
const isAdding = ref(false);
const router = useRouter();
const route = useRoute();
const store = useStore();

onMounted(() => {
  if (route.params.id) {
    store.dispatch('selectWishlist', { id: route.params.id });
  }
});

watch(route.params, (newValue, oldValue) => {
  if (newValue.id !== store.state.selectedId) {
    store.dispatch('selectWishlist', { id: newValue.id });
  }
});

const isLoading = computed(() => store.getters.isLoading);

const selectedList = computed(() => store.getters.getSelectedList);

// const lists = computed(() => store.state.wishlists);

const authListener = auth.onAuthStateChanged((user) => {
  if (!user) {
    router.push('/login');
    return;
  }

  store.dispatch('fetchWishlists', { userId: user.uid });
});

const handleClick = () => {
  if (!auth.currentUser?.uid) {
    return;
  }
  const item: LocalWishlistItem = {
    title: name.value,
  };
  store.dispatch('addItemToList', { listId: route.params.id, item });
  name.value = '';
  isAdding.value = false;

  ElNotification({
    title: 'Added!',
    type: 'success',
    message: 'Your wish was added to your list!',
  });
};

const handleToggleIsAdding = () => {
  isAdding.value = !isAdding.value;
};

const handleShareClick = () => {
  router.push(`/share/${selectedList.value.id}`);
};

const handleDeleteWishlist = () => {
  deleteModalVisible.value = false;
  store.dispatch('deleteWishlist', { listId: route.params.id });
  ElNotification({
    title: 'Removed!',
    type: 'success',
    message: 'Your wish was removed!',
  });
  router.push('/my-wishlists');
};

const onUpdateWishlistName = (name: string) => {
  store.dispatch('updateWishlistName', { listId: route.params.id, name });
};

const onRemoveItem = (payload: { itemId: string }) => {
  store.dispatch('deleteItemFromList', {
    listId: route.params.id,
    itemId: payload.itemId,
  });
};

onBeforeUnmount(() => {
  authListener();
});
</script>

<template>
  <Container>
    <el-dialog v-model="deleteModalVisible" title="Confirm delete" width="40%">
      <span>Are you sure you want to delete this wishlist?</span>
      <template #footer>
        <span class="dialog-footer">
          <Button variant="white" @click="deleteModalVisible = false"
            >Cancel</Button
          >
          <Button variant="primary" @click="handleDeleteWishlist">
            Confirm
          </Button>
        </span>
      </template>
    </el-dialog>

    <el-row justify="space-between">
      <div>
        <Button @click="handleToggleIsAdding" variant="white"
          >Add new item</Button
        >
        <Button @click="handleShareClick" variant="white">Send wishlist</Button>
      </div>
      <div>
        <Button @click="deleteModalVisible = true" variant="white">
          Delete wishlist
        </Button>

        <!-- <el-dropdown size="mini" split-button type="primary">
          Settings
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Delete list</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item>Action 4</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown> -->
        <!-- </Button> -->
      </div>
    </el-row>

    <el-card v-if="isAdding">
      <el-row :style="{ flexWrap: 'nowrap', alignItems: 'center' }">
        <el-input v-model="name" placeholder="What do you wish for?" />

        <Button
          variant="primary"
          @click="handleClick"
          :style="{ marginLeft: '1rem' }"
        >
          Add to Wishlist
        </Button>
        <!-- <el-button
          type="primary"
          @click="handleClick()"
          :style="{ marginLeft: '1rem' }"
        >
          Add to Wishlist
        </el-button> -->
      </el-row>
    </el-card>

    <WishlistCard
      :list="selectedList"
      @onUpdateWishlistName="onUpdateWishlistName"
      @onRemoveItem="onRemoveItem"
    />
  </Container>
</template>

<style lang="scss" scoped>
.el-card {
  margin: 1rem 0;
}
.wishlist-name {
  margin-right: 1rem;
}
</style>
