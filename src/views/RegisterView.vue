<template>
  <div class="register-container">
    <h1>Registro</h1>
    <form @submit.prevent="handleSubmit" class="register-form">
      <div class="form-group">
        <label for="name">Nome</label>
        <input type="text" id="name" v-model="formData.name" required />
      </div>
      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model="formData.email" required />
      </div>
      <div class="form-group">
        <label for="password">Senha</label>
        <input type="password" id="password" v-model="formData.password" required />
      </div>
      <button type="submit" class="submit-button">Registrar</button>
    </form>
    <p class="login-link">
      Já tem uma conta? <RouterLink to="/">Faça login</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const formData = ref({
  name: '',
  email: '',
  password: ''
});

function handleSubmit() {
    localStorage.setItem('user', JSON.stringify(formData.value));
    localStorage.setItem('password', formData.value.password);
    console.log('Dados do registro:', formData.value);
  console.log('Registro concluído com sucesso!');
    window.location.href = '/home';
  // Aqui você pode integrar com sua API de registro, por exemplo.
}
// deixa salvo no navegador as informações desse login pra sempre
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 40px auto; /* Adiciona margem em cima e embaixo */
  padding: 20px;
  border: 1px solid #dee2e6; /* Cor semelhante ao cabeçalho */
  border-radius: 8px;
  background-color: #f8f9fa; /* Cor de fundo clara */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para destaque */
}

h1 {
  text-align: center;
  margin-bottom: 20px; /* Espaçamento inferior */
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold; /* Negrito para os rótulos */
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da; /* Bordas claras */
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s; /* Animação para transição de borda */
}

input:focus {
  border-color: #28a745; /* Cor da borda ao focar */
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #28a745; /* Verde do botão */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold; /* Negrito para o texto do botão */
  transition: background-color 0.2s; /* Animação para transição de cor */
}

.submit-button:hover {
  background-color: #218838; /* Cor do botão ao passar o mouse */
}

.login-link {
  text-align: center; /* Centraliza o texto do link */
  margin-top: 15px; /* Espaçamento superior */
}
</style>
