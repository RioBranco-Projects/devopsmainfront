<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
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

        <button type="submit" class="login-button">Entrar</button>
      </form>

      <p class="register-link">
        Não tem uma conta? <router-link to="/register">Registre-se aqui</router-link>
      </p>

      <p class="error-message">{{ mensagemErro }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const mensagemErro = ref('');
const email = ref('')
const password = ref('');

const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      mensagemErro.value = errorData.msg || 'Erro ao fazer login';
      return;
    }

    // Sucesso
    const user = await response.json();
    localStorage.setItem('user', JSON.stringify(user));

    router.push('/home'); // Redireciona para a página principal após login bem-sucedido
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    mensagemErro.value = 'Erro de conexão. Verifique sua rede.';
  }
};

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

input[type="email"],
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
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}
.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
