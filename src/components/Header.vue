<template>
  <header v-if="!isLogin && !isRegister" class="header">
    <div class="container">
        <div class="dropdown" @mouseover="toggleDropdown" @mouseleave="toggleDropdown">
          <button class="dropdown-btn">
            <img src="/src/assets/svg/user.png" alt="">
            <span>Olá, {{ myUser }}, tudo bom?</span>
          </button>
          <div class="dropdown-content" v-if="dropdownVisible">
            <a href="#">My Account</a>
            <a class="logout" @click="logout">Logout</a>
          </div>
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
const user = ref(null);

// Função para obter o usuário do localStorage e armazená-lo
const getUser = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      return parsedUser.name || parsedUser;
    } catch (error) {
      console.error('Erro ao converter string para objeto:', error);
      return null; // Retorna null se houver erro
    }
  }
  return null; // Retorna null se não houver usuário armazenado
};

// Inicializa myUser com o nome do usuário
const myUser = ref(getUser());

watch(route, (newRoute) => {
  isLogin.value = newRoute.path === '/';
  isRegister.value = newRoute.path === '/register';

  // Adicionando logs para verificar o que está acontecendo
  console.log(`isLogin: ${isLogin.value}, isRegister: ${isRegister.value}`);
});

function logout() {
    console.log('Logout');
    window.location.href = '/';
    console.log('Logout realizado com sucesso');
}

function toggleDropdown() {
  dropdownVisible.value = dropdownVisible.value; 
}
</script>

<style scoped>

.header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  padding: 10px 20px;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1920px;
  margin: 0 auto;
}

.brand {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #000;
}

/* Estilos de Navegação */
.nav {
  display: flex;
  align-items: center;
}

.nav-link {
  margin-right: 15px;
  color: #000000;
}

.nav-link:hover {
    text-decoration: none;
  color: #28a745;
}

.nav-link.disabled {
  color: #6c757d;
  cursor: not-allowed;
}

/* Dropdown */
.dropdown {
  position: relative;
}

.dropdown-btn {
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
    color: #28a745;
}

.dropdown-content {
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
  border: 1px solid #28a745;
  background-color: #fff;
  color: #28a745;
  border-radius: 4px;
  margin-left: 5px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #28a745;
  color: #fff;
}
</style>
