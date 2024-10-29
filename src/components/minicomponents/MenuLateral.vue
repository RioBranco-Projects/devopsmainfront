<template>
    <div class="menu-lateral">

      <RouterLink to="/home">
        <div class="label">
            <img src="../../assets/svg/home.png" alt="">
            <p>Home</p>
        </div>
      </RouterLink>

      <RouterLink to="/produtos">
        <div class="label">
          <img src="../../assets/svg/produtos.png" alt=""> 
          <p>Produtos</p>
        </div>
      </RouterLink>

      <RouterLink to="/comparar">
        <div class="label">
          <img src="../../assets/svg/comparar.png" alt="">
          <p>Comparar</p>
        </div>
      </RouterLink>

      <RouterLink to="/graficos">
        <div class="label">
          <img src="../../assets/svg/graphics.png" alt="">
          <p>Gráficos</p>
        </div>
      </RouterLink>

      <RouterLink to="/relatorios">
        <div class="label">
          <img src="../../assets/svg/related.png" alt="">
          <p>Relatórios</p>
        </div>
      </RouterLink>

      <RouterLink to="/configuracoes">
        <div class="label">
          <img src="../../assets/svg/engrenagem.png" alt="">
          <p>Configurações</p>
        </div>
      </RouterLink>

    </div>
</template>
<script setup>
import { RouterLink } from 'vue-router';

</script>
<style scoped>
.menu-lateral {
  height: 100%;
  display: flex;
  z-index: 1;
  gap: 10px;
  flex-direction: column;
  width: 220px;
  background: linear-gradient(to right,#3389CE, #3389CE);
  transition: calc(.3s)
}

a {
  text-decoration: none;
  color: #000;
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
  color: white;
}
</style>