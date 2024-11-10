<script setup>
import { RouterView } from 'vue-router';
import MenuLateral from '../components/MenuLateral.vue';
import { computed } from 'vue';

// Verifica se o usuário está autenticado com base no token no localStorage
const isAuthenticated = computed(() => !!localStorage.getItem("token"));
</script>

<template>
  <section class="home">
    <!-- Mostra o menu lateral apenas se o usuário estiver autenticado -->
    <MenuLateral v-if="isAuthenticated" />
    
    <Transition name="router" mode="fade">
      <!-- Exibe o conteúdo do RouterView quando autenticado -->
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
