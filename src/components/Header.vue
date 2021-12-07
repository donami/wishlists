<script lang="ts" setup>
import { computed } from 'vue';
import Button from '../components/Button.vue';

const props = defineProps({
  isAuthed: Boolean,
});

const emits = defineEmits(['handleSignout']);

const handleSignout = () => {
  emits('handleSignout');
};

const isAuthed = computed(() => props.isAuthed);
</script>

<template>
  <header class="header">
    <div>
      <router-link to="/">
        <img src="../assets/logo.jpg" alt="Logo" width="80" />
      </router-link>
    </div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link v-if="isAuthed" to="/my-wishlists">My Wishlists</router-link>
    </nav>
    <div class="user">
      <Button variant="primary" v-if="!isAuthed" tag="router-link" to="/login">
        Sign in
      </Button>
      <Button v-if="!isAuthed" tag="router-link" to="/register">
        Register
      </Button>
      <Button v-if="isAuthed" @click="handleSignout">Sign out</Button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #9b28ff;
  }
}

nav {
  margin-left: 40px;
  flex: 1;
  text-align: left;

  a {
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 300;

    margin-right: 1rem;
  }
}

.user {
  > button,
  > a {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
