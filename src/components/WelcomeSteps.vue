<script lang="ts" setup>
import WelcomeStepItem from './WelcomeStepItem.vue';
import { Present, Promotion, Select } from '@element-plus/icons';
import { useRouter } from 'vue-router';
import Button from './Button.vue';

const router = useRouter();

const handleGetStartedClick = () => {
  router.push('/my-wishlists');
};
</script>

<template>
  <div class="welcome-steps">
    <Container>
      <el-row class="steps">
        <el-col :xs="24" :md="8">
          <welcome-step-item
            title="1. Create"
            text="Creating your wishlist is easy! Add items from any store."
          >
            <template v-slot:icon><Present /></template>
          </welcome-step-item>
        </el-col>
        <el-col :xs="24" :md="8">
          <welcome-step-item
            title="2. Send"
            image="img"
            text="Send your wishlist to anyone. By email, chat or social media."
          >
            <template v-slot:icon><Promotion /></template>
          </welcome-step-item>
        </el-col>
        <el-col :xs="24" :md="8">
          <welcome-step-item
            title="3. Reserve"
            image="img"
            text="Family and friends can reserve their gifts on your wishlist. Useful!"
          >
            <template v-slot:icon><Select /></template>
          </welcome-step-item>
        </el-col>
      </el-row>
      <el-row class="get-started" justify="center">
        <Button variant="primary" @click="handleGetStartedClick">
          Get started
        </Button>
      </el-row>
    </Container>
  </div>
</template>

<style lang="scss" scoped>
.welcome-steps {
  background: #f5f5f5;
  border-radius: 15px;
  padding: 40px 0;
  margin: 1rem 0;
}

.get-started {
  margin: 1rem 0;
}

.steps {
  margin: 1rem 0;
}
</style>
