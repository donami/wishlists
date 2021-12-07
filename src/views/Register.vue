<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import PageHeading from '../components/PageHeading.vue';
import Button from '../components/Button.vue';

const email = ref('');
const password = ref('');
const password2 = ref('');
const router = useRouter();
const handleSubmit = (event: Event) => {
  event.preventDefault();

  if (!email.value.length || !password.value.length) {
    return;
  }

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log('data', data);
      router.push('/wishlist');
    })
    .catch((error) => {
      console.log('Something went wrong', error);
    });
};
</script>

<template>
  <div class="register">
    <form @submit="(event) => handleSubmit(event)">
      <PageHeading variant="h1" divider>Register</PageHeading>

      <div class="form-field">
        <el-input type="text" placeholder="Email" v-model="email" />
      </div>
      <div class="form-field">
        <el-input type="password" placeholder="Password" v-model="password" />
      </div>
      <div class="form-field">
        <el-input
          type="password"
          placeholder="Confirm password"
          v-model="password2"
        />
      </div>
      <div class="actions">
        <Button type="submit" variant="primary">Sign up</Button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.register {
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
