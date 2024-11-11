<template>
  <section class="dashboard">
    <div class="title">
    <h1>Resumo de atividade da conta</h1>
    <h1 class="current-month">{{ currentMonth }}</h1>
  </div>

  <div class="dashboard-cards">

    <RouterLink to="/home">
      <Card title="Vendas" img="/src/assets/svg/dashboard.png" :totalSales="totalSales" description="+5% este mês"/>
    </RouterLink>
    <RouterLink to="/users">
      <Card title="Usuários" img="/src/assets/svg/sales.png" :totalSales="totalUsers" description="+5% este mês"/>
    </RouterLink>
    <RouterLink to="/produtos">
      <Card title="Produtos" img="/src/assets/svg/produtoicon.png" :totalSales="totalUsers" description="+5% este mês"/>
    </RouterLink>
    <RouterLink to="/comparar">
      <Card title="Comparações" img="/src/assets/svg/changes.png" :totalSales="totalComparate" description="+12% este mês" />
    </RouterLink>

  </div> <!-- dashboard-cards -->
  
  <div class="dashboard-cards"> 
    <div>
      <h1>Gráfico de produtos cadastrados</h1>
      <CustomChart/>
    </div>
    <div>
      <h1>Gráfico de comparações feitas</h1>
      <CustomChart/>
    </div>
  </div>
  </section>

</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import Card from '@/components/minicomponents/Card.vue';
import CustomChart from '@/components/minicomponents/CustomChart.vue';

const totalUsers = ref(100);
const totalSales = ref(120000);
const totalComparate = ref(450);
const currentMonth = ref(new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }));

</script>

<style scoped>
.dashboard {
  background-color: #f1f1f1;
  width: auto;
  height: 92vh;
}
a {
  text-decoration: none;
}
.title {
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: start;
  margin: 0 20px 0;
  color: #000000;
  h1 {
    font-weight: bolder;
    font-size: 30px;
  }
}

.dashboard-cards {
  display: flex;
  flex-wrap: wrap;
  gap: auto;
  padding: 20px;
  justify-content: space-between;
}


</style>
