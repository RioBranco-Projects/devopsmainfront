<template>
  <section class="produtos">
    <div class="abas">
      <button 
        class="button" 
        v-for="(tab, index) in tabs" 
        :key="index" 
        v-bind:class="{ activeTab: activeIndex === index + 1, inactiveTab: tab.inactive }" 
        @click="setActiveTab(index + 1)">
        {{ tab.title }}
      </button>
      <div class="inativar-tab">
        <button @click="inativarAbaAtual">Inativar aba atual</button>
      </div>
    </div>

    <div class="box">
      <div class="formulario">
        <Transition name="slide">
          <div v-show="activeIndex === 1" class="form-content">
            <FormVue 
              q1="Identificação única"
              q2="Capacidade de atualização"
              q3="Consumo de energia"
              :mediaPonderada="mediaPorAba[0]"
              @atualizar-media="(media) => setMediaPonderada(0, media)"
            />
          </div>
        </Transition>
        <Transition name="slide" appear>
          <div v-show="activeIndex === 2" class="form-content">
            <FormVue 
              q1="Tipos de sensores"
              q2="Precisão e calibração"
              q3="Resiliência Ambiental"
              :mediaPonderada="mediaPorAba[1]"
              @atualizar-media="(media) => setMediaPonderada(1, media)"
            />
          </div>
        </Transition>
        <Transition name="slide" appear>
          <div v-show="activeIndex === 3" class="form-content">
            <FormVue 
              q1="Protocolos de comunicação"
              q2="Gerenciamento de banda"
              q3="Estratégias de retransmissão"
              :mediaPonderada="mediaPorAba[2]"
              @atualizar-media="(media) => setMediaPonderada(2, media)"
            />
          </div>
        </Transition>
        <Transition name="slide" appear>
          <div v-show="activeIndex === 4" class="form-content">
            <FormVue 
              q1="Escalabilidade"
              q2="Recuperação de desastres"
              q3="Qualidade dos dados"
              :mediaPonderada="mediaPorAba[3]"
              @atualizar-media="(media) => setMediaPonderada(3, media)"
            />
          </div>
        </Transition>
        <Transition name="slide" appear>
          <div v-show="activeIndex === 5" class="form-content">
            <FormVue 
              q1="Privacidade e proteção de dados"
              q2="Segurança da informação"
              q3="Gerenciamento de acesso e auditoria"
              :mediaPonderada="mediaPorAba[4]"
              @atualizar-media="(media) => setMediaPonderada(4, media)"
            />
          </div>
        </Transition>
        <Transition name="slide" appear>
          <div v-show="activeIndex === 6" class="form-content">
            <FormVue 
              q1="Processamento de dados"
              q2="Insights acionáveis"
              q3="Visualização de dados"
              :mediaPonderada="mediaPorAba[5]"
              @atualizar-media="(media) => setMediaPonderada(5, media)"
            />
          </div>
        </Transition>
        <Transition name="slide" appear>
          <div v-show="activeIndex === 7" class="form-content">
            <FormVue 
              q1="Experiência do usuário"
              q2="Acessibilidade"
              q3="Usabilidade"
              :mediaPonderada="mediaPorAba[6]"
              @atualizar-media="(media) => setMediaPonderada(6, media)"
            />
          </div>
        </Transition>
      </div>
      <div v-if="produtos.length" class="produto-box">
        <h2>Produto Cadastrado pelo usuário {{ userName }} </h2>
        <div v-for="(produto, index) in produtos" :key="index" class="produto-detalhes">
          <h3>{{ produto.nome }}</h3>
          <p>{{ produto.descricao }}</p>
          <p> A média final do produto foi: {{ mediaFinal }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import FormVue from '@/components/FormVue.vue';
const userName = ref(localStorage.getItem('userName') || 'Visitante');
const activeIndex = ref(1);
const produtos = ref([]); 
const mediaPorAba = ref(Array(7).fill('')); 
const mediaFinal = computed(() => {
  const notasValidas = mediaPorAba.value.filter((nota) => nota !== '');
  const soma = notasValidas.reduce((acc, nota) => acc + parseFloat(nota), 0);
  return notasValidas.length > 0 ? (soma / notasValidas.length).toFixed(2) : '0.00';
});
function calcularMediaPonderada(notas) {
  const pesos = [4, 3, 3]; 
  const somaPesos = pesos.reduce((acc, peso) => acc + peso, 0);
  const somaPonderada = notas.reduce((acc, nota, index) => acc + nota * pesos[index], 0);
  return (somaPonderada / somaPesos).toFixed(2);
}
function setMediaPonderada(index, media) {
  mediaPorAba.value[index] = media;
  localStorage.setItem('mediaPorAba', JSON.stringify(mediaPorAba.value));
}
const initialTabs = [
  {
    title: 'Objeto',
    inactive: false
  },
  {
    title: 'Sensores',
    inactive: false
  },
  {
    title: 'Transmissão',
    nactive: false
  },
  {
    title: 'Cloud',
    inactive: false
  },
  {
    title: 'Segurança',
    inactive: false
  },
  {
    title: 'Análise',
    inactive: false
  },
  {
    title: 'Uso',
    inactive: false
  },
];
const tabs = ref(initialTabs); 

function inativarAbaAtual() {
  const currentTab = activeIndex.value - 1;

  if (tabs.value[currentTab]) {
    tabs.value[currentTab].inactive = true;
    mediaPorAba.value[currentTab] = ''; // Limpa a média da aba inativada
    localStorage.setItem('mediaPorAba', JSON.stringify(mediaPorAba.value)); // Atualiza localStorage

    // Definir a próxima aba ativa
    let nextActiveIndex = tabs.value.findIndex(
      (tab, idx) => !tab.inactive && idx >= currentTab
    );
    if (nextActiveIndex === -1) {
      nextActiveIndex = tabs.value.findIndex(tab => !tab.inactive);
    }
    if (nextActiveIndex !== -1) {
      activeIndex.value = nextActiveIndex + 1;
    }
  }
}
function setActiveTab(index) {
  if (!tabs.value[index - 1].inactive) {
    activeIndex.value = index; 
  }
}

onMounted(() => {
  const produtosSalvos = localStorage.getItem('produtos');
  if (produtosSalvos) {
    produtos.value = JSON.parse(produtosSalvos);
  }
  
  const mediasSalvas = localStorage.getItem('mediaPorAba');
  if (mediasSalvas) {
    mediaPorAba.value = JSON.parse(mediasSalvas);
  }
});
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.formulario {
  display: flex;
  width: 100%;
  height: 87vh;
  position: relative;
  overflow: hidden;
}

.form-content {
  position: absolute;
  width: auto;
  padding: 10px;
  height: 100%;
}

.abas {
  padding: 5px;
  gap: 5px;
  height: auto;
  display: flex;
  justify-content: flex-start;
  width: auto;
}

.button {
  background-color: #ececec;
  border: none;
  width: 160px;
  height: 50px;
  border-radius: 10px;
  font-weight: bold;
  cursor: default;
  font-size: 18px;
}

.inativar-tab button {
  border: none;
  background-color: #ff8080;
  padding: 10px;
  font-size: 18px;
  height: 50px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: calc(.3s);
}
.inativar-tab button:hover {
  background-color: #ff4d4d;
}

.box {
  display: flex;
  height: auto;
}

.activeTab {
  background-color: #93ff97;
}

.inactiveTab {
  background-color: #ccc;
  color: #777;
  cursor: not-allowed;
}

.produto-box {
  position: relative;
  z-index: 1;
  padding: 20px;
  width: 900px;
  height: auto;
}

.produto-detalhes {
  background-color: #ccc;
  margin-bottom: 10px;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  font-size: 30px;
}

.produto-detalhes h3 {
  margin: 0;
  color: #333;
}

.produto-detalhes p {
  margin: 5px 0 0;
  color: #666;
}
</style>
