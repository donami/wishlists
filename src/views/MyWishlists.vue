<script lang="ts" setup>
import { computed, onBeforeUnmount, ref, watch, reactive } from 'vue';
import { useStore } from '../store';
import { auth } from '../firebase';
import { useRouter } from 'vue-router';
import { Plus } from '@element-plus/icons';
import { ElNotification } from 'element-plus';
import Button from '../components/Button.vue';

const store = useStore();
const router = useRouter();

const createModalVisible = ref(false);

const form = reactive({
  title: '',
});

const resetForm = () => {
  form.title = '';
};

const lists = computed(() => store.state.wishlists);

const authListener = auth.onAuthStateChanged((user) => {
  if (!user) {
    router.push('/login');
    return;
  }
  store.dispatch('fetchWishlists', {
    userId: user?.uid,
  });
});

const handleCreateList = () => {
  const payload = {
    title: form.title,
  };
  store.dispatch('createWishlist', payload);
  createModalVisible.value = false;
  resetForm();

  ElNotification({
    title: 'Added!',
    type: 'success',
    message: 'Your wishlist was created!',
  });
};

const handleCancelCreateList = () => {
  createModalVisible.value = false;
  resetForm();
};

const isLoading = computed(() => store.getters.getIsLoading);

onBeforeUnmount(() => {
  authListener();
});
</script>

<template>
  <div v-if="isLoading">Loading</div>

  <el-dialog
    v-model="createModalVisible"
    title="Create new Wishlist"
    width="40%"
  >
    <el-form :model="form">
      <el-form-item label="Title" label-width="120px">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <Button type="white" @click="handleCancelCreateList">Cancel</Button>
        <Button type="primary" @click="handleCreateList">Confirm</Button>
      </span>
    </template>
  </el-dialog>

  <div class="list">
    <div v-for="(list, index) in lists" :key="index" class="list-item">
      <router-link :to="`/wishlist/${list.id}`">{{ list.title }}</router-link>
    </div>
    <div class="list-item">
      <button @click="createModalVisible = !createModalVisible">
        <el-icon :size="30" color="white">
          <Plus />
        </el-icon>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}
.list-item {
  &:hover {
    opacity: 0.6;
  }

  button,
  a {
    color: #fff;
    text-decoration: none;
    width: 100%;
    height: 120px;
    border-radius: 15px;
    background: #3a2a46;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    border: 0;
  }
}
</style>
