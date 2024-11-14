<script setup>
import { RouterView } from 'vue-router';
import MenuLateral from '../components/MenuLateral.vue';
</script>

<template>
  <section class="home">
    <MenuLateral/>
      <div class="dashboard">
        <RouterView />
      </div>
  </section>
</template>

<style scoped>
.home {
  height: auto;
  display: flex;
  justify-content: center;
}

.dashboard {
  width: 100%;
  background-color: #fff;
}
</style>
