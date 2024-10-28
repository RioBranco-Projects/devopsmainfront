<script setup>
import { RouterView } from 'vue-router';
import MenuLateral from '../components/minicomponents/MenuLateral.vue';
import { computed } from 'vue';

const isAuthenticated = computed(() => !!localStorage.getItem("user", "password"));
</script>
<template>
  <section class="home">
    <MenuLateral v-if="isAuthenticated" />
      <div :class="{ 'dashboard': isAuthenticated }">
        <Transition name="router" mode="out-in">
          <RouterView />
        </Transition>
      </div>
  </section>
</template>

<style scope>
.home {
  height: 94vh;
  display: flex;
}

.dashboard {
  background-color: #fff;
}
</style>