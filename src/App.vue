<!-- <script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
html,
body {
  height: 100%;
}
body {
  font-family: 'Poppins', sans-serif;
  /* background-image: url('/bg.svg'); */
  /* background-size: cover; */
  font-size: 14px;
}

#background {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: -1; /* Ensure div tag stays behind content; -999 might work, too. */
}
.stretch {
  width: 100%;
  height: 100%;
}
</style> -->
<template>
  <Container :style="{ padding: '50px 0' }">
    <div
      :style="{
        background: '#fff',
        padding: '4rem',
        borderRadius: '20px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 12px 0px',
      }"
    >
      <Header :isAuthed="isAuthed" @handleSignout="handleSignout" />

      <router-view />
    </div>
  </Container>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from './firebase';
import Header from './components/Header.vue';

const router = useRouter();
const isAuthed = ref(true);

auth.onAuthStateChanged((user) => {
  if (user) {
    isAuthed.value = true;
  } else {
    isAuthed.value = false;
  }
});

const handleSignout = () => {
  auth.signOut();
  router.push('/');
};
</script>

<style lang="scss">
* {
  font-family: 'Poppins', Helvetica, Arial, sans-serif;
}

html,
body {
  height: 100%;
}
body {
  font-family: 'Poppins', sans-serif;
  /* background-image: url('/bg.svg'); */
  /* background-size: cover; */
  font-size: 14px;
}

#background {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: -1; /* Ensure div tag stays behind content; -999 might work, too. */
}
.stretch {
  width: 100%;
  height: 100%;
}

#app {
  font-family: 'Poppins', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
