
<template>
  <div class="produto-cadastro">
    <div class="abas">
      <button :class="{ active: abaAtiva === 'cadastrar' }" @click="abaAtiva = 'cadastrar'">Cadastrar Produto</button>
      <button :class="{ active: abaAtiva === 'listar' }" @click="abaAtiva = 'listar'">Listar Produtos</button>
    </div>

    <!-- Aba de Cadastro de Produto -->
    <div v-if="abaAtiva === 'cadastrar'" class="form-container">
      <h1>Cadastro de Produto</h1>
      <form @submit.prevent="cadastrarProduto">
        <div class="form-group">
          <label for="nome">Nome do Produto:</label>
          <input type="text" id="nome" v-model="produto.nome" required />
        </div>
        
        <div class="form-group">
          <label for="descricao">Descrição:</label>
          <textarea id="descricao" v-model="produto.descricao" required></textarea>
        </div>
        
        <button type="submit" class="btn-cadastrar">Cadastrar Produto</button>
      </form>
    </div>

    <!-- Aba de Listagem de Produtos -->
    <div v-if="abaAtiva === 'listar'" class="list-container">
      <h1>Produtos Cadastrados</h1>
      <div v-if="produtos.length" class="produtos-list">
        <div v-for="(prod, index) in produtos" :key="index" class="produto-card">
          <div class="produto-detalhes">
            <h2>{{ prod.nome }}</h2>
            <p>{{ prod.descricao }}</p>
            <p><strong>Nota:</strong> {{ getNotaMedia(prod.nome) }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Nenhum produto cadastrado.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const abaAtiva = ref('cadastrar');
const produto = ref({ nome: '', descricao: '' });
const produtos = ref(JSON.parse(localStorage.getItem('produtos')) || []);

// Função para cadastrar o produto e salvar no localStorage
const cadastrarProduto = () => {
  if (produto.value.nome && produto.value.descricao) {
    // Adiciona o produto à lista e armazena no localStorage
    produtos.value.push({ ...produto.value });
    localStorage.setItem('produtos', JSON.stringify(produtos.value));
    
    alert('Produto cadastrado com sucesso!');
    
    // Limpa os campos do formulário após o cadastro
    produto.value = { nome: '', descricao: '' };
  } else {
    alert('Por favor, preencha todos os campos obrigatórios.');
  }
};

// Função para recuperar a nota média do localStorage para um produto específico
const getNotaMedia = (nomeProduto) => {
  const nota = localStorage.getItem(`nota_${nomeProduto}`);
  return nota ? JSON.parse(nota) : 'Sem avaliação';
};
</script>

<style scoped>
.produto-cadastro {
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: auto;
}

.abas {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.abas button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background-color: #ddd;
  margin: 0 5px;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.abas button.active, .abas button:hover {
  background-color: #348ACF;
  color: white;
}

.form-container, .list-container {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-cadastrar {
  padding: 10px;
  background-color: #348ACF;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
}

.produtos-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.produto-card {
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.produto-detalhes h2 {
  margin: 0 0 10px;
  color: #333;
}

.produto-detalhes p {
  margin: 0;
  color: #666;
}
</style>
