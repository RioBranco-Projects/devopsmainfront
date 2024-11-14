<script setup>
import { ref, onMounted } from 'vue';
import * as XLSX from 'xlsx';

const produtos = ref([]);
const usuarioNome = ref('');
const usuarioEmail = ref('');

function calcularMediaFinal(medias) {
  const notasValidas = medias.filter((nota) => nota !== null && nota !== '');
  const soma = notasValidas.reduce((acc, nota) => acc + parseFloat(nota), 0);
  return notasValidas.length > 0 ? (soma / notasValidas.length).toFixed(2) : '0.00';
}

onMounted(() => {
  // Recupera as informações do usuário do localStorage
  const userData = JSON.parse(localStorage.getItem('userName') || '{}');
  usuarioNome.value = userData.name || 'Usuário';
  usuarioEmail.value = userData.email || 'sem_email@exemplo.com';

  // Recupera os produtos do localStorage e faz o parse do JSON
  const produtosSalvos = JSON.parse(localStorage.getItem('produtos') || '[]');

  produtos.value = produtosSalvos.map((produto) => {
    // Faz o parse do JSON da média por aba e calcula a média final
    const medias = JSON.parse(localStorage.getItem('mediaPorAba') || '[]').map((media) =>
      media ? parseFloat(media) : null
    );
    const mediaFinal = calcularMediaFinal(medias);

    // Retorna o produto com as médias e a média final
    return { ...produto, medias, mediaFinal };
  });
});

function exportarParaExcel() {
  // Adiciona o nome e o e-mail do usuário como uma linha separada no início
  const usuarioInfo = [
    { Usuário: usuarioNome.value, Email: usuarioEmail.value }
  ];

  // Prepara os dados para exportação dos produtos
  const data = produtos.value.map(produto => {
    const row = {
      Nome: produto.nome,
      Descrição: produto.descricao,
      'Média Final': produto.mediaFinal,
    };
    produto.medias.forEach((media, index) => {
      row[`Categoria ${index + 1}`] = media !== null ? media : 'Sem avaliação';
    });
    return row;
  });

  // Combina as informações do usuário com os dados dos produtos
  const dadosParaExportar = [...usuarioInfo, ...data];

  // Cria a planilha e adiciona os dados
  const worksheet = XLSX.utils.json_to_sheet(dadosParaExportar);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório de Avaliação');

  // Exporta o arquivo Excel
  XLSX.writeFile(workbook, 'Relatorio_Avaliacao_Produtos.xlsx');
}
</script>




<template>
  <div class="relatorio-container">
    <h1>Relatório de Avaliação dos Produtos</h1>
    <p><strong>Usuário:</strong> {{ usuarioNome }}</p>
    <p><strong>Email:</strong> {{ usuarioEmail }}</p>
    <button @click="exportarParaExcel" class="export-button">Exportar para Excel</button>
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
  max-width: 600px;
  margin: 0 auto;
}

li {
  list-style-type: none;
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
.export-button {
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.export-button:hover {
  background-color: #45a049;
}
</style>
