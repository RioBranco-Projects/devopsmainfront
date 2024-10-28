<template>
    <div class="menu-lateral">
      <div class="label">
        <img src="../../assets/svg/home.png" alt="">
        <RouterLink to="/home">Home</RouterLink>
      </div>
      <div class="label">
        <img src="../../assets/svg/produtos.png" alt=""> 
        <RouterLink to="/home/produtos">Meus Podutos</RouterLink>
      </div>
      <div class="label">
        <img src="../../assets/svg/comparar.png" alt="">
        <RouterLink to="/comparar">Comparar</RouterLink>
      </div>
      <div class="label">
        <img src="../../assets/svg/interrogation.png" alt="">
        <RouterLink>Minhas comparações</RouterLink>
      </div>
      <div class="label">
        <img src="../../assets/svg/engrenagem.png" alt="">
        <RouterLink>Configurações</RouterLink>
      </div>
    </div>
</template>
<script setup>
import { RouterLink } from 'vue-router';

</script>
<style scoped>
.menu-lateral {
  display: flex;
  border-right: 2px solid rgba(0, 0, 0, 0.183);
  padding: 20px;
  gap: 20px;
  flex-direction: column;
  width: 250px;
  background-color: #f2f2f2;
  a {
    text-decoration: none;
    color: #000;
    gap: 10px;
    font-weight: bold;
    transition: calc(.3s)
  }
  a:hover {
    color: #007bff;
  }
}
.label {
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    width: 40px;
  }
}
</style>