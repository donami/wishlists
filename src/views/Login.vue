<script lang="ts" setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'vue-router';
import Button from '../components/Button.vue';
import PageHeading from '../components/PageHeading.vue';

const email = ref('');
const password = ref('');
const errorMessage = ref();
const router = useRouter();

const handleSubmit = (event: Event) => {
  event.preventDefault();
  // console.log('submit', event);
  handleLogin();
};
const handleLogin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Signed in!');
      router.push('/my-wishlists');
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-email':
          errorMessage.value = 'Invalid email or password';
          break;
        default:
          errorMessage.value = 'Something went wrong!';
          break;
      }
    });
};
</script>

<template>
  <div class="login">
    <form class="login-form" @submit="(event) => handleSubmit(event)">
      <PageHeading variant="h1" divider> Login </PageHeading>

      <el-alert v-if="errorMessage" :title="errorMessage" type="error" />

      <div class="form-field">
        <el-input type="text" placeholder="Email" v-model="email" />
      </div>
      <div class="form-field">
        <el-input type="password" placeholder="Password" v-model="password" />
      </div>
      <div class="actions">
        <Button type="submit" variant="primary">Login</Button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 768px) {
    form {
      max-width: 40%;
    }
  }
  .form-field {
    margin: 1rem 0;
  }

  .actions {
    text-align: right;
  }
}
</style>
