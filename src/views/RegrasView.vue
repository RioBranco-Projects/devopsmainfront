<template>
  <section class="produtos">
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
        v-bind:class="{ activeTab: activeIndex === index + 1 }" 
        @click="setActiveTab(index + 1)"
      >
        {{ tab.title }}
        <span 
          v-if="tabs.length > 6 && index >= 6" 
          @click.stop="remover(index)" 
          class="remove-tab">{{ tabs > 6 ? "" : "X" }}</span>
      </button>
      <button 
        class="button" 
        @click="adicionar" 
        :disabled="tabs.length >= 9"
      >
        +
      </button>
    </div>
    <div class="box">
      <div class="formulario">
        <transition name="fade" mode="fade-in" appear>
          <FormVue 
           v-if="activeIndex === 0" 
          />
        </transition>
        <transition name="fade" mode="fade-in" appear>
          <FormVue style="background-color: beige;"
          v-if="activeIndex === 1" 
          />
        </transition>
        <transition name="fade" mode="fade-in" appear>
          <FormVue style="background-color: cadetblue;"
          v-if="activeIndex === 2" 
          />
        </transition>
        <!-- Continue com as outras abas da mesma forma -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import FormVue from '@/components/FormVue.vue';

const activeIndex = ref(0); // Índice da aba ativa

// Criação das abas com valores iniciais
const initialTabs = [
  { title: 'Sensores'},
  { title: 'Transmissão de dados'},
  { title: 'Cloud'},
  { title: 'Privacidade e segurança'},
  { title: 'Análise'},
  { title: 'Uso'},
];

const tabs = ref(initialTabs); // Array de abas, inicializa com 7 tabs

function adicionar() {
  if (tabs.value.length <= 9) {
    const nextIndex = tabs.value.length + 1; // Para o próximo título
    tabs.value.push({
      title: `Q${nextIndex}`,
      q1: "Identificação única",
      q2: "Capacidade de atualização",
      q3: "Consumo de energia",
      q4: "Q4",
      q5: "Q5",
      d1: "por exemplo, número de série ou ID de dispositivo",
      d2: "O objeto IoT pode receber atualizações de firmware/software?",
      d3: "Expectativas de consumo de energia e vida útil da bateria",
      d4: "Q4",
      d5: "Q5",
    });
  }
}

function remover(index) {
  if (tabs.value.length > 6) { // Permite remoção se houver mais de 7 tabs
    tabs.value.splice(index, 1); // Remove a aba no índice especificado
    // Se a aba removida for a aba ativa, atualiza o índice ativo
    if (activeIndex.value === index + 1) {
      activeIndex.value = 0; // Retorna para a aba "Objeto"
    } else if (activeIndex.value > index + 1) {
      activeIndex.value--; // Decrementa o índice ativo
    }
  }
}

function setActiveTab(index) {
  activeIndex.value = index; // Define a aba ativa
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateX(50px); /* Pequeno deslocamento */
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in;
}
.fade-leave-from, .fade-enter-to {
  opacity: 1;
  transform: translateX(-50px);
}
.title {
  display: flex;
  justify-content: center;
  width: auto;
  height: auto;
}
.produtos {
  justify-content: center;
  align-items: center;
  height: 90vh;
}
.formulario {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  width: auto;
  height: 600px;
}
.inativeTab {
  align-content: center;
}
.abas {
  padding: 10px;
  background-color: #47769c;
  display: flex;
  justify-content: space-around;
  width: auto;
}
.button {
  border: none;
  width: 130px;
  height: auto;
  border-radius: 5px;
  font-weight: bold;
  cursor: inherit;
}
.remove-tab {
  color: red;
  margin-left: 5px;
  cursor: pointer;
}
.box {
  width: auto;
  display: flex;
  align-content: center;
  justify-content: center;
  height: auto;
}
.activeTab {
  background-color: #4CAF50; /* Cor para a aba ativa */
}
</style>
