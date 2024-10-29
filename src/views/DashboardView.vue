<template>
  <div class="title">
    <h1>Resumo Mensal</h1>
    <h1 class="current-month">{{ currentMonth }}</h1>
  </div>

  <div class="dashboard-cards">
    <div class="card">
      <div class="card-icon">
        <img src="/src/assets/svg/dashboard.png" alt="Sales">
      </div>
      <div class="card-content">
        <h3>Total de Vendas</h3>
        <p class="value">R$ {{ totalSales }}</p>
        <p class="description">+12% este mês</p>
      </div>
    </div>

    <div class="card">
      <div class="card-icon">
        <img src="/src/assets/svg/sales.png" alt="Icone Card 2">
      </div>
      <div class="card-content">
        <h3>Usuários Ativos</h3>
        <p class="value">{{ totalUsers }}</p>
        <p class="description">+5% este mês</p>
      </div>
    </div>

    <div class="card">
      <div class="card-icon">
        <img src="/src//assets/svg/produtoicon.png" alt="Icone Card 3">
      </div>
      <div class="card-content">
        <h3>Produtos cadastrados</h3>
        <p class="value">{{ totalSales }}</p>
        <p class="description">-2% este mês</p>
      </div>
    </div>

    <div class="card">
      <div class="card-icon">
        <img src="/src/assets/svg/changes.png" alt="Icone Card 4">
      </div>
      <div class="card-content">
        <h3>Comparações realizadas</h3>
        <p class="value">{{ totalProducts }}</p>
        <p class="description">+3% em comparação</p>
      </div>
    </div><!-- card -->

  </div> <!-- dashboard-cards -->
  
  <div class="dashboard-cards"> 
    <div>
    <h1>Meu Gráfico</h1>
      <CustomChart  />
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import CustomChart from '@/components/minicomponents/CustomChart.vue';

const totalUsers = ref(100);
const totalSales = ref(120000);
const totalProducts = ref(450);
const currentMonth = ref(new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }));

</script>

<style scoped>
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
  gap: 40px;
  padding: 20px;
  justify-content: space-between;
}

.card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 20px;
  width: 380px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card-icon img {
  width: 150px;
  height: 150px;
}

.card-content {
  p {
    text-align: center;
  }
}

.card h3 {
  font-size: 1.5rem;
  font-weight: bolder;
  color: #333;
  margin: 0;
}

.card .value {
  font-size: 2rem;
  font-weight: bold;
  color: #1ca803;
  margin: 5px 0;
}

.card .description {
  font-size: 0.9rem;
  color: #666;
}
.card-two {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 20px;
  width: auto;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card-two:hover {
  transform: translateY(-5px);
  box-shadow: 8px 6px 12px rgba(0, 0, 0, 0.15);
}

.card-icon-two img {
  width: 250px;
  height: 250px;
}

.card-content-two {
  p {
    text-align: center;
  }
}

.card-two h3 {
  font-size: 1.5rem;
  font-weight: bolder;
  color: #333;
  margin: 0;
} 

.card-two .value-two {
  font-size: 2rem;
  font-weight: bold;
  color: #1ca803;
  margin: 5px 0;
}

.card-two .description-two {
  font-size: 0.9rem;
  color: #666;
}


</style>
