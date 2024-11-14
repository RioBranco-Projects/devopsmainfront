<template>
    <div class="menu-lateral" >
      <RouterLink to="/produtos">
        <div class="label">
          <img src="../assets/svg/produtos.png" alt=""> 
          <p>Produtos</p>
        </div>
      </RouterLink>
      
      <RouterLink to="/comparar">
        <div class="label">
          <img src="../assets/svg/icons/Aviso.png" alt="">
          <p>Avaliar produtos</p>
        </div>
      </RouterLink>

    </div>
</template>
<script setup>
import { RouterLink } from 'vue-router';

</script>
<style scoped>
.menu-lateral {
  z-index: 1;
  height: auto;
  gap: 10px;
  flex-direction: column;
  width: auto;
  background: linear-gradient(to right,#3389CE, #3389CE);
  transition: calc(.3s)
}

a {
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
  transition: calc(.3s);
}

.label {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  transition: calc(.3s);
}

.label img {
  width: 30px; /* Ajuste o tamanho para alinhar melhor com o texto */
  height: 30px; /* Mantém proporção para evitar distorção */
}

.label p {
  font-size: 16px;
  margin: 0; /* Remove espaçamento padrão para centralizar */
}

.label:hover {
  background: #0468ba;
}

.label:hover p {
  color: rgb(0, 0, 0);
}
</style>