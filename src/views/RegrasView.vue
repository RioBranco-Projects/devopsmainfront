<template>
  <section class="produtos">
    <div class="title">
      <h1>Perguntas Norteadoras</h1>
    </div>
    
    <div class="abas">
      <button 
        class="button" 
        v-bind:class="{ activeTab: activeIndex === 0 }" 
        @click="setActiveTab(0)"
      >
        Objeto
      </button>
      
      <button 
        class="button" 
        v-for="(tab, index) in tabs" 
        :key="index" 
        v-bind:class="{ activeTab: activeIndex === index + 1, inactiveTab: tab.inactive }" 
        @click="setActiveTab(index + 1)"
      >
        {{ tab.title }}
        <span 
          v-if="tabs.length > 6 && index >= 6" 
          @click.stop="remover(index)" 
          class="remove-tab">{{ tab.title + tabs > 6 ? "" : "X" }}
        </span>
      </button>
      <button 
        class="button" 
        @click="adicionar" 
        :disabled="tabs.length >= 9"
      >
        +
      </button>
      <div class="inativar-tab">
        <button @click="inativarPrimeiraAbaAtiva">Inativar Primeira Aba Ativa</button>
      </div>
    </div>
    
    <div class="box">
      <div class="formulario">
        <Transition name="slide">
          <div v-show="activeIndex === 0" class="form-content">
            <FormVue 
              style="background-color: #98C6E8;"
              Q1="O1 - Identificação única"
              Q2="02 - Capacidade de atualização"
              Q3="O3 - Consumo de energia"
            />
          </div>
        </Transition>
        <Transition name="slide" appear>
          <div v-show="activeIndex === 1" class="form-content">
            <FormVue 
              style="background-color: darkturquoise;"
              Q1="S1 - Tipos de sensores"
              Q2="S2 - Precisão e calibração"
              Q3="S3 - Resiliência Ambiental"
            />
          </div>
        </Transition>
        <Transition name="slide" appear>
          <div v-show="activeIndex === 2" class="form-content">
            <FormVue 
              style="background-color: cadetblue;"
              Q1="T1 - Protocolos de comunicação"
              Q2="T2 - Gerenciamento de banda"
              Q3="T3 - Estratégias de retransmissão"
            />
          </div>
        </Transition>
        <Transition name="slide" appear>
          <div v-show="activeIndex === 3" class="form-content">
            <FormVue 
              style="background-color: deepskyblue"
              Q1="C1 - Escalabilidade"
              Q2="C2 - Recuperação de desastres"
              Q3="C3 - Qualidade de dados"
            />
          </div>
        </Transition>
        <Transition name="slide" appear>
          <div v-show="activeIndex === 4" class="form-content">
            <FormVue 
              style="background-color: lightskyblue"
              Q1="C1 - Escalabilidade"
              Q2="C2 - Recuperação de desastres"
              Q3="C3 - Qualidade de dados"
            />
          </div>
        </Transition>
        <Transition name="slide" appear>
          <div v-show="activeIndex === 5" class="form-content">
            <FormVue 
              style="background-color: darkcyan"
              Q1="A1 - Processamento de dados"
              Q2="A2 - Insights acionáveis"
              Q3="A3 - Visualização de dados"
            />
          </div>
        </Transition>
        <Transition name="slide" appear>
          <div v-show="activeIndex === 6" class="form-content">
            <FormVue 
              style="background-color: dodgerblue"
              Q1="U1 - Experiência do Usuário"
              Q2="U2 - Acessibilidade"
              Q3="U3 - Usabilidade"
            />
          </div>
        </Transition>
      </div><!-- box -->
    </div><!-- produtos -->
  </section>
</template>

<script setup>
import { ref } from 'vue';
import FormVue from '@/components/FormVue.vue';

const activeIndex = ref(0); // Índice da aba ativa

// Criação das abas com valores iniciais
const initialTabs = [
  { title: 'Sensores', inactive: false },
  { title: 'Transmissão de dados', inactive: false },
  { title: 'Cloud', inactive: false },
  { title: 'Privacidade e segurança', inactive: false },
  { title: 'Análise', inactive: false },
  { title: 'Uso', inactive: false },
];

const tabs = ref(initialTabs); // Array de abas, inicializa com 7 tabs

function adicionar() {
  if (tabs.value.length <= 9) {
    const nextIndex = tabs.value.length + 1; // Para o próximo título
    tabs.value.push({
      title: `Q${nextIndex}`,
      inactive: false,
    });
  }
}

function inativarPrimeiraAbaAtiva() {
  // Procura a primeira aba ativa (não inativa) e a marca como inativa
  const firstActiveIndex = tabs.value.findIndex(tab => !tab.inactive);
  if (firstActiveIndex !== -1) {
    tabs.value[firstActiveIndex].inactive = true;

    // Ajusta o índice ativo para a próxima aba ativa
    if (activeIndex.value === firstActiveIndex) {
      activeIndex.value = firstActiveIndex + 1;
    }
  }
}

function remover(index) {
  if (tabs.value.length > 6) { 
    tabs.value.splice(index, 1);
    if (activeIndex.value === index + 1) {
      activeIndex.value = 0;
    } else if (activeIndex.value > index + 1) {
      activeIndex.value--;
    }
  }
}

function setActiveTab(index) {
  if (!tabs.value[index].inactive) { // Impede que a aba inativa seja ativa
    activeIndex.value = index; // Define a aba ativa
  }
}
</script>

<style scoped>
.title {
  position: relative;
  padding: 5px 60px 0 ;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: #348ACF;
}
.title h1 {
  font-weight: bolder;
  font-size: 40px;
  color: #fff;
}

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
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  position: relative;
  overflow: hidden;
}

.form-content {
  position: absolute;
  width: 100%;
  height: 100%;
}

.abas {
  padding: 10px;
  gap: 10px;
  display: flex;
  justify-content: start;
  width: auto;
}

.button {
  border: none;
  width: 140px;
  height: auto;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}

.remove-tab {
  color: red;
  margin-left: 5px;
  cursor: pointer;
}

.inativar-tab {
  position: relative;
}
.inativar-tab button {
  border: none;
  padding: 10px;
  height: auto;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}

.box {
  width: auto;
  background-color: #47769C;
  display: flex;
  height: auto;
}

.activeTab {
  background-color: #93ff97; /* Cor para a aba ativa */
}

.inactiveTab {
  background-color: #ccc; /* Cor para a aba inativa */
  color: #777;
  cursor: not-allowed;
}
</style>
