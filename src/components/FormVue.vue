<template>
  <form class="form">
    <div class="box">
      <div class="title">
        <div class="foto">
          <img src="/src/assets/svg/user.png" alt="">
        </div>
        <div class="sla">
          <h1>Projetista:</h1> 
          <p>{{ userName }}</p>
        </div>
      </div>
    </div>
    <div class="box2">
      <p class="avaliacao">{{ AvaliacaoSalva }}</p>
      
      <!-- Critérios iniciais -->
      <div class="form-group">
        <label for="text1">{{ q1 }} (peso: {{ pesos[0] }}):</label>
        <input type="number" :placeholder="d1" id="text1" v-model.number="notas[0]" required>
      </div>
      <div class="form-group">
        <label for="text2">{{ q2 }} (peso: {{ pesos[1] }}):</label>
        <input type="number" :placeholder="placeholders[1]" id="text2" v-model.number="notas[1]" required>
      </div>
      <div class="form-group">
        <label for="text3">{{ q3 }} (peso: {{ pesos[2] }}):</label>
        <input type="number" :placeholder="placeholders[2]" id="text3" v-model.number="notas[2]" required>
      </div>

      <!-- Critérios adicionais com opção de exclusão -->
      <div v-for="(criterio, index) in criteriosAdicionais" :key="index" class="form-group">
        <label :for="'text' + (index + 4)">{{ criterio.pergunta }} (peso: {{ pesos[index + 3] }}):</label>
        <div class="input-remove-wrapper">
          <button type="button" @click="removerCriterio(index)" class="remove-button">Remover critério</button>
          <input type="number" :placeholder="criterio.placeholder" :id="'text' + (index + 4)" v-model.number="criterio.nota" required>
        </div>
      </div>

      <!-- Input para adicionar nova pergunta -->
      <div v-if="showNewQuestionInput && criteriosAdicionais.length < 2" class="form-group">
        <label for="newQuestion">Novo critério:</label>
        <input type="text" id="newQuestion" v-model="novaPergunta" @keyup.enter.prevent="salvarPergunta">
        <button type="button" @click="salvarPergunta">Salvar critério</button>
        <button type="button" @click="cancelarPergunta">Cancelar</button>
      </div>

      <!-- Botões de ação -->
      <div class="botao">
        <button v-if="!showNewQuestionInput && criteriosAdicionais.length < 2" @click.prevent="exibirInputPergunta">Adicionar mais um critério</button>
        <button @click.prevent="salvarInput">Salvar avaliação</button>
      </div>
    </div>
    <MediaCalculator v-if="todosCamposPreenchidos" :notas="notasCompletas" />
  </form>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import MediaCalculator from './minicomponents/MediaCalculator.vue';

const userData = JSON.parse(localStorage.getItem('userName') || '{}');
const userName = ref(userData.name || 'Visitante');

const props = defineProps({
  mediaPonderada: Number,
  q1: String,
  q2: String,
  q3: String,
  d1: String,
  d2: String,
  d3: String,
});

const emit = defineEmits(['atualizar-media']);

const AvaliacaoSalva = ref('');
const placeholders = ref(["d1", "d2", "d3"]);
const notas = ref([0, 0, 0]); // Inicia com três notas
const criteriosAdicionais = ref([]);
const pesos = ref([4, 3, 3]); // Pesos iniciais
const showNewQuestionInput = ref(false);
const novaPergunta = ref('');

const todosCamposPreenchidos = computed(() => {
  return notas.value.every(nota => nota !== null && nota >= 0 && nota <= 10) &&
         criteriosAdicionais.value.every(criterio => criterio.nota !== null && criterio.nota >= 0 && criterio.nota <= 10);
});

const notasCompletas = computed(() => {
  return [...notas.value, ...criteriosAdicionais.value.map(criterio => criterio.nota)];
});

function recalcularPesos() {
  const totalPesos = 10;
  const numeroDePesos = 3 + criteriosAdicionais.value.length;
  const pesoPadrao = Math.floor(totalPesos / numeroDePesos);
  const pesoExtra = totalPesos % numeroDePesos;

  pesos.value = Array(numeroDePesos).fill(pesoPadrao);
  pesos.value[0] += pesoExtra;
}

function exibirInputPergunta() {
  showNewQuestionInput.value = true;
}

function salvarPergunta() {
  if (novaPergunta.value.trim() !== '' && criteriosAdicionais.value.length < 2) {
    criteriosAdicionais.value.push({
      pergunta: novaPergunta.value,
      nota: null,
      placeholder: 'Digite a nota',
    });
    novaPergunta.value = '';
    showNewQuestionInput.value = false;
    recalcularPesos();
  }
}

function cancelarPergunta() {
  novaPergunta.value = '';
  showNewQuestionInput.value = false;
}

function removerCriterio(index) {
  criteriosAdicionais.value.splice(index, 1);
  recalcularPesos(); // Recalcula os pesos ao remover um critério
  if (criteriosAdicionais.value.length < 2) {
    showNewQuestionInput.value = false;
  }
}

function salvarInput() {
  const camposValidos = todosCamposPreenchidos.value;

  if (!camposValidos) {
    AvaliacaoSalva.value = "Cada nota deve ser entre 0 e 10.";
    setTimeout(() => { AvaliacaoSalva.value = ""; }, 1500);
  } else {
    const media = calcularMediaPonderada(notasCompletas.value); // Calcula a média ponderada
    AvaliacaoSalva.value = "Avaliação feita com sucesso!";
    setTimeout(() => { AvaliacaoSalva.value = ""; }, 2000);
    emit('atualizar-media', media); // Emite a média calculada ao componente pai
  }
}

// Função para calcular a média ponderada com pesos dinâmicos
function calcularMediaPonderada(notas) {
  const somaPesos = pesos.value.reduce((acc, peso) => acc + peso, 0);
  const somaPonderada = notas.reduce((acc, nota, index) => acc + nota * pesos.value[index], 0);

  return (somaPonderada / somaPesos).toFixed(2);
}
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.form {
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding: 20px;
  width: 800px;
  border-radius: 15px;
  height: 100%;
  box-sizing: border-box;
}

.title {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  align-items: center;
  margin-bottom: 10px;
}

.title img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.sla h1, .sla p {
  margin: 0;
}

.sla h1 {
  font-size: 40px;
  color: #333;
}

.sla p {
  font-size: 30px;
  color: #666;
}

.form-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.form-group label {
  font-size: 18px;
  font-weight: bold;
  color: #555;
  flex: 1;
}

/* Wrapper para alinhar o botão de remover e o input de nota */
.input-remove-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  justify-content: flex-end;
}

.form-group input {
  padding: 10px;
  text-align: center;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 60px;
  background-color: #f9f9f9;
  transition: all 0.3s ease-in-out;
}

.form-group input:focus {
  background-color: #fff;
  border-color: #348ACF;
  outline: none;
}
input[type=number]::-webkit-inner-spin-button { 
    -webkit-appearance: none;
    
}
input[type=number] { 
   -moz-appearance: textfield;
   appearance: textfield;

}

.remove-button {
  padding: 5px 12px;
  background-color: #ff4d4d;
  color: #fff;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
}

.remove-button:hover {
  background-color: #d42f2f;
}

/* Estilo para o botão de "Salvar critério" */
.form-group button[type="button"] {
  padding: 8px 12px;
  background-color: #4CAF50;
  color: #fff;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
}

.form-group button[type="button"]:hover {
  background-color: #45a049;
}

.botao button {
  padding: 8px 15px;
  border-radius: 5px;
  border: none;
  background-color: #348ACF;
  font-size: 18px;
  font-weight: bolder;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 10px;
}

.botao button:hover {
  background-color: #0e66af;
  transform: scale(1.05);
}

.box, .box2 {
  width: 100%;
  background-color: #ededed;
  padding: 15px;
  border-radius: 10px;
  max-width: 800px;
  margin: 10px 0;
}

.avaliacao {
  color: rgb(49, 164, 49);
  font-size: 20px;
  text-align: center;
  font-weight: bolder;
}
</style>