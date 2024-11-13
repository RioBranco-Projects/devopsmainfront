<template>
  <div class="produto-cadastro">
    <div class="abas">
      <button :class="{ active: abaAtiva === 'cadastrar' }" @click="abaAtiva = 'cadastrar'">Cadastrar Produto</button>
      <button :class="{ active: abaAtiva === 'listar' }" @click="abaAtiva = 'listar'">Listar Produtos</button>
    </div>

    <!-- Contêiner fixo para as transições -->
    <div class="transicao-container">
      <Transition name="fade-horizontal">
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
      </Transition>

      <Transition name="fade-horizontal">
        <div v-if="abaAtiva === 'listar'" class="list-container">
          <h1>Produtos Cadastrados</h1>
          <div v-if="produtos.length" class="produtos-list">
            <div v-for="(prod, index) in produtos" :key="index" class="produto-card">
              <div class="produto-detalhes">
                <h2>{{ capitalizeFirstLetter(prod.nome) }}</h2>
                <p>{{ prod.descricao }}</p>
                <p><strong>Nota:</strong> {{ getNotaMedia(prod.nome) }}</p>
                <button @click="confirmarRemocao(index)" class="btn-remover">Remover</button>
              </div>
            </div>
          </div>
          <div v-else>
            <p>Nenhum produto cadastrado.</p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const abaAtiva = ref('cadastrar');
const produto = ref({ nome: '', descricao: '' });
const produtos = ref([]);

// Carregar produtos do localStorage ao montar o componente
onMounted(() => {
  const produtosSalvos = localStorage.getItem('produtos');
  if (produtosSalvos) {
    produtos.value = JSON.parse(produtosSalvos);
  }
});

const cadastrarProduto = () => {
  if (produto.value.nome && produto.value.descricao) {
    // Verifica se o produto já existe na lista
    const produtoExiste = produtos.value.some((p) => p.nome.toLowerCase() === produto.value.nome.toLowerCase());
    
    if (produtoExiste) {
      alert('Produto já cadastrado!');
      return;
    }

    produtos.value.push({ ...produto.value });
    localStorage.setItem('produtos', JSON.stringify(produtos.value));
    
    alert('Produto cadastrado com sucesso!');
    produto.value = { nome: '', descricao: '' };
  } else {
    alert('Por favor, preencha todos os campos obrigatórios.');
  } 
};

const getNotaMedia = (nomeProduto) => {
  const nota = localStorage.getItem(`nota_${nomeProduto}`);
  return nota ? JSON.parse(nota) : 'Sem avaliação';
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Função para confirmar a remoção do produto
const confirmarRemocao = (index) => {
  if (confirm("Tem certeza que deseja remover este produto?")) {
    removerProduto(index);
  }
};

// Função para remover um produto da lista e do localStorage
const removerProduto = (index) => {
  produtos.value.splice(index, 1);
  localStorage.setItem('produtos', JSON.stringify(produtos.value));
};
</script>

<style scoped>
.produto-cadastro {
  height: 500px;
  border-radius: 10px;
  height: 640px;
  max-width: 800px;
  margin: 120px auto;
}

.abas {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.abas button {
  padding: 15px 30px;
  border: none;
  cursor: pointer;
  background-color: #ddd;
  margin: 0 10px;
  font-weight: bold;
  font-size: 18px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.abas button.active, .abas button:hover {
  background-color: #348ACF;
  color: white;
}

/* Contêiner fixo para manter o tamanho */
.transicao-container {
  position: relative;
  height: 100%;
}

.form-container, .list-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.485);
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.btn-cadastrar {
  padding: 12px;
  background-color: #348ACF;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
  border-radius: 8px;
  font-weight: bold;
  width: 100%;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.btn-cadastrar:hover {
  background-color: #276ba1;
}

.produtos-list {
  display: flex;
  padding: 20px 0;
  flex-direction: column;
}

.produto-card {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.produto-detalhes h2 {
  margin: 0 0 15px;
  color: #333;
  font-size: 22px;
}

.produto-detalhes p {
  margin: 0;
  color: #666;
  font-size: 16px;
}

.btn-remover {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.btn-remover:hover {
  background-color: #d42f2f;
}

/* Estilos para a transição fade-horizontal */
.fade-horizontal-enter-active, .fade-horizontal-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-horizontal-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-horizontal-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.fade-horizontal-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.fade-horizontal-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>