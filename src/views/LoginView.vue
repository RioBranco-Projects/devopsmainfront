<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            placeholder="Enter your username" 
            required
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="Enter your password" 
            required
          />
        </div>

        <button type="submit" class="login-button">Login</button>
      </form>

      <p class="register-link">
        Não tem uma conta? <router-link to="/register">Registre-se aqui</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const apiUrl = 'http://localhost:3000/api/login';

function ishandleLogin() {
  axios
    .post(apiUrl, {
      username: username.value,
      password: password.value
    })
    .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          // Redireciona para a pagina de login
          window.location.href = '/home';
        }
    })
    .catch((error) => {
      console.error(error);
    });
}

const username = ref('');
const password = ref('');

function handleLogin() {
  // Verifica se o campo de username e password foram preenchidos
  if (username.value && password.value) {
    console.log('Logging in with', username.value, password.value);
    ishandleLogin()
  }
    if (username.value === 'vitor' && password.value === '123') {
        localStorage.setItem("user", JSON.stringify({ username: username.value }));
        localStorage.setItem("password", JSON.stringify({ password: password.value }));
        window.location.href = '/home';
    }
  else {
    alert('Please fill in both username and password');
  }
}
</script>

<style scoped>
/* Estilo básico para a página de login */
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f2f2;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #218838;
}
</style>
