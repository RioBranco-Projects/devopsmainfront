<template>
  <Transition name="fade-horizontal">

  <div class="register-page">
    <div class="register-container">
      <h2>Registre-se</h2>
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
    <img src="/src/assets/logo/qualiot.png" alt="">
  </div>
</Transition>
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
    const response = await fetch('http://localhost:8081/user/', {
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
      const errorData = await response.json();
      console.error('Erro ao registrar:', errorData);
      alert(`Erro: ${errorData.msg || 'Erro ao registrar'}`);
      return;
    }
    else {
      router.push('/home'); 
      const data = await response.json();
      console.log('Registro bem-sucedido:', data);
      alert('Registro realizado com sucesso!');
      localStorage.setItem('userEmail', email.value);
      localStorage.setItem('userName', name.value);
      console.log(localStorage.getItem('userEmail'));
      console.log(localStorage.getItem('userName'));
    }

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
  max-width: 600px;
  padding: 20px;
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
  margin-bottom: 20px;
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

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.register-button {
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: calc(.3s);
}

.register-button:hover {
  background-color: #0056b3;
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
