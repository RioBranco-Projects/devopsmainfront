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
      <div class="form-group">
        <label for="text1">{{ q1 }} (peso: 4):</label>
        <input type="number" :placeholder="d1" id="text1" v-model.number="notas[0]" required>
      </div>
      <div class="form-group">
        <label for="text2">{{ q2 }} (peso: 3):</label>
        <input type="number" :placeholder="placeholders[1]" id="text2" v-model.number="notas[1]" required>
      </div>
      <div class="form-group">
        <label for="text3">{{ q3 }} (peso: 3):</label>
        <input type="number" :placeholder="placeholders[2]" id="text3" v-model.number="notas[2]" required>
      </div>
      <div v-if="boxVisible" class="form-group">
        <label for="text4">{{ q4 }}:</label>
        <input type="number" :placeholder="placeholders[3]" id="text4" v-model.number="notas[3]">
      </div>
      <div v-if="boxVisible2" class="form-group">
        <label for="text5">{{ q5 }}:</label>
        <input type="number" :placeholder="placeholders[4]" id="text5" v-model.number="notas[4]">
      </div>
      <div class="botao">
        <button v-if="!boxVisible" @click.prevent="adicionarNota">Adicionar mais um critério</button>
        <button v-if="boxVisible && !boxVisible2" @click.prevent="adicionarNota2">Adicionar mais outro critério</button>
        <button @click.prevent="salvarInput">Salvar avaliação</button>
      </div>
    </div>
    <!-- Exibe o MediaCalculator se todos os campos obrigatórios estiverem preenchidos -->
    <MediaCalculator v-if="todosCamposPreenchidos" :notas="notas.filter(n => n !== null)" />
  </form>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import MediaCalculator from './minicomponents/MediaCalculator.vue';

const userName = ref(localStorage.getItem('userName') || 'Visitante');

const props = defineProps({
  mediaPonderada: Number,
  q1: String,
  q2: String,
  q3: String,
  q4: String,
  q5: String,
  d1: String,
  d2: String,
  d3: String,
  d4: String,
  d5: String
});

const emit = defineEmits(['atualizar-media']);

const AvaliacaoSalva = ref('');
const placeholders = ref(["d1", "d2", "d3", "d4", "d5"]);
const notas = ref([0, 0, 0, null, null]); // Inicia com três notas e duas como null
const boxVisible = ref(false);
const boxVisible2 = ref(false);

const todosCamposPreenchidos = computed(() => {
  return notas.value.slice(0, 3).every(nota => nota !== null && nota >= 0 && nota <= 10) &&
         (!boxVisible.value || notas.value[3] !== null) &&
         (!boxVisible2.value || notas.value[4] !== null);
});

// Função para calcular a média ponderada com pesos dinâmicos
function calcularMediaPonderada(notas) {
  const pesos = [4, 3, 3, 0, 0]; // Pesos iniciais
  if (boxVisible.value) pesos[3] = 2;
  if (boxVisible2.value) pesos[4] = 1;

  const notasValidas = notas.filter((nota) => nota !== null);
  const pesosValidos = pesos.slice(0, notasValidas.length);
  const somaPesos = pesosValidos.reduce((acc, peso) => acc + peso, 0);
  const somaPonderada = notasValidas.reduce((acc, nota, index) => acc + nota * pesosValidos[index], 0);

  return (somaPonderada / somaPesos).toFixed(2);
}

function adicionarNota() {
  boxVisible.value = true;
}

function adicionarNota2() {
  boxVisible2.value = true;
}

// Salva a avaliação e emite a média ponderada
function salvarInput() {
  const camposValidos = notas.value.slice(0, 3).every(nota => nota >= 0 && nota <= 10) &&
                        (!boxVisible.value || (notas.value[3] !== null && notas.value[3] >= 0 && notas.value[3] <= 10)) &&
                        (!boxVisible2.value || (notas.value[4] !== null && notas.value[4] >= 0 && notas.value[4] <= 10));

  if (!camposValidos) {
    AvaliacaoSalva.value = "Cada nota deve ser entre 0 e 10.";
    setTimeout(() => { AvaliacaoSalva.value = ""; }, 1500);
  } else {
    const media = calcularMediaPonderada(notas.value); // Calcula a média ponderada
    AvaliacaoSalva.value = "Avaliação feita com sucesso!";
    setTimeout(() => { AvaliacaoSalva.value = ""; }, 2000);
    emit('atualizar-media', media); // Emite a média calculada ao componente pai
  }
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
  align-items: center;
  justify-content: space-between;
  display: flex;
  gap: 10px;
  margin: 0 0 20px 0;
  width: auto;
}

.form-group label {
  font-size: 30px;
  font-weight: bolder;
  color: #555;
}

.form-group input {
  padding: 5px;
  text-align: center;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  width: 50px;
  background-color: #f9f9f9;
  transition: all 0.3s ease-in-out;
}

.form-group input:focus {
  background-color: #fff;
  outline: none;
}
input[type=number]::-webkit-inner-spin-button { 
    -webkit-appearance: none;
    
}
input[type=number] { 
   -moz-appearance: textfield;
   appearance: textfield;

}

.botao {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.botao button {
  padding: 8px;
  border-radius: 5px;
  border: none;
  background-color: #348ACF;
  font-size: 18px;
  font-weight: bolder;
  color: white;
  cursor: pointer;
  transition: calc(.3s);
}

.botao button:hover {
  background-color: #0e66af;
  transform: scale(1.025);
}

.box, .box2 {
  width: 100%;
  background-color: #ededed;
  padding: 15px;
  border-radius: 10px;
  max-width: 800px;
  margin: 10px 0;
}

.box {
  display: flex;
  padding: 10px;
  background-color: #ededed;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.avaliacao {
  color: rgb(49, 164, 49);
  font-size: 20px;
  text-align: center;
  font-weight: bolder;
}
</style>
