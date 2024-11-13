<template>
  <header v-if="!isLogin && !isRegister" class="header">
    <div class="container">
        <div class="dropdown" @mouseover="toggleDropdown" @mouseleave="toggleDropdown">
          <button class="dropdown-btn">
            <img src="/src/assets/svg/user.png" alt="">
            <span> Olá {{ captalizeFistLetter(userName)}}</span>
          </button>
          <div class="dropdown-content" v-if="dropdownVisible">
            <a href="#">My Account</a>
            <a class="logout" @click="logout">Logout</a>
          </div>
        </div>
        <div class="logo">
          <img src="/src/assets/logo/qualiot.png" alt="">
        </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const dropdownVisible = ref(true);
const isLogin = ref(false);
const isRegister = ref(false);
const userName = ref(localStorage.getItem('currentUser') || 'Visitante');

function captalizeFistLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

watch(route, (newRoute) => {
  isLogin.value = newRoute.path === '/';
  isRegister.value = newRoute.path === '/register';
});
function logout() {
  // Remove as informações de autenticação e redireciona
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isAuthenticated'); // ou qualquer chave de autenticação que você usa
  window.location.replace('/');
}

function toggleDropdown() {
  dropdownVisible.value = dropdownVisible.value;
}
</script>

<style scoped>
span {
  margin-left: 20px;
}
.header {
  height: auto;
  box-sizing: inherit;
  background-color: #bae2fc;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1920px;
}
.logo {
  margin-left: 1000px;
  display: flex;
  align-items: center;
  height: 20px;
  transition: calc(.3s);
  img {
    height: 200px;
    width: 200px;
  }
}
.dropdown {
  position: relative;
}

.dropdown-btn {
  display: flex;
  align-items: center;
  padding: 10px;
  background: none;
  border: none;
  font-size: 25px;
  font-weight: bolder;
  color: #000;
  transition: calc(.2s);
  cursor: pointer;
  img {
    width: 60px;
  }
}
.dropdown-btn:hover {
    color: #3389CE;
}

.dropdown-content {
  transition: 400ms;
  display: none;
  width: 120px;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #dee2e6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
.logout {
  cursor: pointer;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  display: block;
  padding: 10px;
  font-weight: bolder;
  text-decoration: none;
  color: #000;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

</style>
