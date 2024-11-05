<script setup>
import { RouterView } from 'vue-router';
import MenuLateral from '../components/MenuLateral.vue';
import { computed } from 'vue';
const isAuthenticated = computed(() => !!localStorage.getItem("user", "password"));
</script>

<template>
  <section class="home">
    <MenuLateral v-if="isAuthenticated" />
      <Transition name="router" mode="fade">
        <div :class="{ 'dashboard': isAuthenticated }">
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