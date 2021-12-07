<template>
  <div class="register">
    <h1>Register</h1>

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
    <el-button type="primary" @click="handleSubmit">Sign up</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = defineComponent({
  name: 'Register',
  setup() {
    const email = ref('');
    const password = ref('');
    const password2 = ref('');
    const router = useRouter();
    const handleSubmit = () => {
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
          console.log('data', data);
          router.push('/wishlist');
        })
        .catch((error) => {
          console.log('Something went wrong', error);
        });
      console.log(email, password, password2);
    };

    return {
      email,
      password,
      password2,
      handleSubmit,
    };
  },
});

export default Register;
</script>

<style lang="scss" scoped>
.register {
  .form-field {
    margin: 1rem 0;
  }
}
</style>
