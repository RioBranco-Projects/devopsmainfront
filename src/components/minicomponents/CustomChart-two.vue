<template>
  <div class="chart-container">
    <Bar :data="data" :options="options" class="chart" />
    <Bar :data="data" :options="options" class="chart" />
  </div>
</template>

<script >
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    Bar
  },
  data() {
    return {
      data: {
        labels: ['August', 'September', 'October'],
        datasets: [
          {
            label: 'Vitor',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          },
          {
            label: 'Gustavo',
            backgroundColor: '#7ad1dd',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          },
          {
            label: 'Douglas',
            backgroundColor: '#557979',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Gráfico de vendas dos ultimos 3 meses'
          }
        },
      }
    }
  }
}
</script>
<style scoped>

.chart-container {
  display: flex;
  gap: 50px;
  position: relative;
  width: 670px; /* 80% da largura do contêiner pai */
  height: auto; /* 60% da altura da tela */
}


</style>