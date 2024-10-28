<template>
  <footer v-if="isHome" class="footer">
    <div class="container">
      <p>&copy; {{ currentYear }} Meu Site. Todos os direitos reservados.</p>
      <nav class="footer-nav">
        <a href="#">Sobre</a>
        <a href="#">Contato</a>
        <a href="#">Privacidade</a>
      </nav>
      <div class="social-icons">
        <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
        <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
const route = useRoute(); 
const isHome = ref(route.path === '/home');

watch(route, (newRoute) => {
  isHome.value = newRoute.path === '/home'
});

// Obtém o ano atual
const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
.footer {
    margin-top: auto;
  background-color: #383838;
  padding: 20px 0;
  text-align: center;
  border-top: 1px solid #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  p {
    color: white;
  }
}

.footer-nav {
  margin: 10px 0;
}

.footer-nav a {
  margin: 0 15px;
  text-decoration: none;
  color: #007bff;
}

.footer-nav a:hover {
  text-decoration: underline;
}

.social-icons {
  margin-top: 10px;
}

.social-icons a {
  margin: 0 10px;
  color: #ffffff;
  font-size: 20px;
}

.social-icons a:hover {
  color: #007bff;
}
</style>
