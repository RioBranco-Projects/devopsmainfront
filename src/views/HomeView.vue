<script setup>
import { RouterView } from 'vue-router';
import MenuLateral from '../components/MenuLateral.vue';
</script>

<template>
  <section class="home">
    <MenuLateral/>
    <Transition name="router" mode="fade">
      <div class="dashboard">
        <RouterView />
      </div>
    </Transition>
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
