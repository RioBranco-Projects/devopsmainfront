<template>
  <header v-if="!isLogin && !isRegister" class="header">
    <div class="container">
        <div class="dropdown" @mouseover="toggleDropdown" @mouseleave="toggleDropdown">
          <button class="dropdown-btn">
            <img src="/src/assets/svg/user.png" alt="">
            <span> Olá {{ captalizeFistLetter(userName)}}, seja bem vindo!</span>
          </button>
          <div class="dropdown-content" v-if="dropdownVisible">
            <a href="#">My Account</a>
            <a class="logout" @click="logout">Logout</a>
          </div>
        </div>
        <div class="logo">
          <img src="/src/assets/logo/qualiot.png" alt="">
        </div>
      <form class="search-form">
        <input type="search" placeholder="Search" class="search-input" />
        <button type="submit" class="search-button">Search</button>
      </form>
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
const userName = ref(localStorage.getItem('userName') || 'Visitante');

function captalizeFistLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

watch(route, (newRoute) => {
  isLogin.value = newRoute.path === '/';
  isRegister.value = newRoute.path === '/register';

  console.log(`isLogin: ${isLogin.value}, isRegister: ${isRegister.value}`);
});

function logout() {
    window.location.href = '/';
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
  background-color: #eaeaea;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 1920px;
}
.logo {
  margin-left: 1000px;
  display: flex;
  align-items: center;
  height: 20px;
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
  text-decoration: none;
  color: #000;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

/* Estilos do Formulário de Busca */
.search-form {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 5px 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  outline: none;
}

.search-button {
  padding: 5px 10px;
  border: 1px solid #3389CE;
  background-color: #fff;
  color: #3389CE;
  border-radius: 4px;
  margin-left: 5px;
  cursor: pointer;
  transition: 300ms;
}

.search-button:hover {
  background-color: #3389CE;
  color: #fff;
}
</style>
