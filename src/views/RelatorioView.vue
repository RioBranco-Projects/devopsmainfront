<script setup>
import { ref, onMounted } from 'vue';
const MediaPorAba = localStorage.getItem('mediaPorAba');
console.log(MediaPorAba)

const produtos = ref([]);

function calcularMediaFinal(medias) {
  const notasValidas = medias.filter((nota) => nota !== null && nota !== '');
  const soma = notasValidas.reduce((acc, nota) => acc + parseFloat(nota), 0);
  return notasValidas.length > 0 ? (soma / notasValidas.length).toFixed(2) : '0.00';
}

onMounted(() => {
  const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];

  produtos.value = produtosSalvos.map((produto) => {
    const medias = [];
    for (let i = 1; i <= 7; i++) {
      const media = localStorage.getItem(`media_${produto.nome}_aba${i}`);
      medias.push(media ? parseFloat(media) : null);
    }
    const mediaFinal = calcularMediaFinal(medias);

    return { ...produto, medias, mediaFinal };
  });
});
</script>

<template>
  <div class="relatorio-container">
    <h1>Relatório de Avaliação dos Produtos</h1>
    <div v-if="produtos.length">
      <div v-for="(produto, index) in produtos" :key="index" class="produto-relatorio">
        <h2>{{ produto.nome }}</h2>
        <p><strong>Descrição:</strong> {{ produto.descricao }}</p>
        <h3>Médias das Categorias:</h3>
        <ul>
          <li v-for="(media, idx) in produto.medias" :key="idx">
            Categoria {{ idx + 1 }}: {{ media !== null ? media : 'Sem avaliação' }}
          </li>
        </ul>
        <p><strong>Média Final:</strong> {{ produto.mediaFinal }}</p>
      </div>
    </div>
    <p v-else>Nenhum produto cadastrado.</p>
  </div>
</template>

<style scoped>
.relatorio-container {
  padding: 20px;
  height: 92vh;
  max-width: 800px;
  margin: 0 auto;
}

.produto-relatorio {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.avaliacao-item {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}
</style>
