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
      <div class="form-group" v-for="(nota, index) in notas" :key="index">
        <label :for="'text' + (index + 1)">
          {{ index === 0 ? q1 : index === 1 ? q2 : q3 }}:
          <p>{{ index === 0 ? p1 : index === 1 ? p2 : p3 }}</p> (peso: {{ pesos[index] }})
        </label>
        <input type="number" :placeholder="placeholders[index]" :id="'text' + (index + 1)" v-model.number="notas[index]" required>
      </div>
      
      <!-- Campo de justificativa fora do form-group -->
      <div v-for="(justificativa, index) in justificativas" :key="'justificativa-' + index" class="justification-box">
        <textarea v-model="justificativas[index]" :placeholder="'Justificativa para ' + (index + 1)"></textarea>
      </div>

      <!-- Critérios adicionais com opção de exclusão -->
      <div v-for="(criterio, index) in criteriosAdicionais" :key="index" class="form-group">
        <label :for="'text' + (index + 4)">{{ criterio.pergunta }}: (peso: {{ pesos[index + 3] }}):</label>
        <div class="input-remove-wrapper">
          <input type="number" :placeholder="criterio.placeholder" :id="'text' + (index + 4)" v-model.number="criterio.nota" required>
          <button type="button" @click="removerCriterio(index)" class="remove-button">Remover critério</button>
        </div>
      </div>

      <!-- Campo de justificativa para critérios adicionais fora do form-group -->
      <div v-for="(criterio, index) in criteriosAdicionais" :key="'justificacao-adicional-' + index" class="justification-box">
        <textarea v-model="criterio.justification" :placeholder="'Justificativa para ' + criterio.pergunta"></textarea>
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
const justificativas = ref(['', '', '']); // Justificativas para os critérios iniciais

const props = defineProps({
  mediaPonderada: Number,
  q1: String,
  q2: String,
  q3: String,
  d1: String,
  d2: String,
  d3: String,
  p1: String,
  p2: String,
  p3: String
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
  recalcularPesos(); 
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
    const media = calcularMediaPonderada(notasCompletas.value);
    AvaliacaoSalva.value = "Avaliação feita com sucesso!";
    setTimeout(() => { AvaliacaoSalva.value = ""; }, 2000);
    emit('atualizar-media', media);

    // Armazenar as avaliações no localStorage, incluindo justificativas
    const avaliacoes = [
      { pergunta: q1, nota: notas.value[0], peso: pesos.value[0], justificativa: justificativas.value[0] },
      { pergunta: q2, nota: notas.value[1], peso: pesos.value[1], justificativa: justificativas.value[1] },
      { pergunta: q3, nota: notas.value[2], peso: pesos.value[2], justificativa: justificativas.value[2] },
      ...criteriosAdicionais.value.map((criterio, index) => ({
        pergunta: criterio.pergunta,
        nota: criterio.nota,
        peso: pesos.value[index + 3],
        justificativa: criterio.justification
      }))
    ];

    localStorage.setItem(`avaliacoes_${props.nomeProduto}_${props.abaIndex}`, JSON.stringify(avaliacoes));
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
  padding: 10px;
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
  width: 60px;
  height: 60px;
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
  p {
    margin: 0;
    width: 640px;
    font-weight: bolder;
    color: black;
  }
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
  padding: 10px;
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
.form-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.justification-box {
  margin-bottom: 20px;
}

.justification-box textarea {
  width: 100%;
  max-width: 760px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
  background-color: #f9f9f9;
}

.justification-box textarea:focus {
  background-color: #fff;
  border-color: #348ACF;
  outline: none;
}
</style>