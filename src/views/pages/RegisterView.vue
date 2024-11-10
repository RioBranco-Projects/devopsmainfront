<template>
  <div class="register-page">
    <div class="register-container">
      <h2>Registro</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name">Nome</label>
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="Digite seu nome"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Digite seu email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Senha</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Digite sua senha"
            required
          />
        </div>

        <button type="submit" class="register-button">Registrar</button>
      </form>

      <p class="login-link">
        Já tem uma conta? <router-link to="/">Faça login aqui</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');

const handleRegister = async () => {
  try {
    const response = await fetch('http://localhost:8080/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        nome: name.value,
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      // Lidar com erro se o status não estiver OK (2xx)
      const errorData = await response.json();
      console.error('Erro ao registrar:', errorData);
      alert(`Erro: ${errorData.msg || 'Erro ao registrar'}`);
      return;
    }

    // Sucesso
    const data = await response.json();
    console.log('Registro bem-sucedido:', data);
    alert('Registro realizado com sucesso!');
    router.push('/');

  } catch (error) {
    console.error('Erro de rede:', error);
    alert('Erro de conexão. Verifique sua rede.');
  }
};
</script>

<style scoped>
/* Estilo básico para a página de registro */
.register-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f2f2;
}

.register-container {
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
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.register-button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.register-button:hover {
  background-color: #218838;
}
</style>
