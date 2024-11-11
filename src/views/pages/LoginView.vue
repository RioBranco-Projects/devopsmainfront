<template>
  <Transition name="fade-horizontal">
  <div class="login-page">
    <img src="/src/assets/logo/qualiot.png" alt="">
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
    </Transition>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const mensagemErro = ref('');
const email = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:8081/user/login', {
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
    else {
      router.push('/home');
    }

    const user = await response.json();
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userName', user.name);
    console.log(localStorage.getItem('userEmail'));
    console.log(localStorage.getItem('userName'));

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
  max-width: 600px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 25px;
  color: #333;
  font-size: 40px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 20px;
  color: #333;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.login-button {
  margin-bottom: 30px ;
  display: flex;
  justify-content: center;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 18px;
  transition: calc(.3s);
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
.fade-horizontal-enter-active, .fade-horizontal-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-horizontal-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-horizontal-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.fade-horizontal-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.fade-horizontal-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
