<template>
  <section class="produtos">
    <div class="title">
      <h1>Perguntas Norteadoras</h1>
    </div>
    
    <div class="abas">
      <button 
        class="button" 
        v-for="(tab, index) in tabs" 
        :key="index" 
        v-bind:class="{ activeTab: activeIndex === index + 1, inactiveTab: tab.inactive }" 
        @click="setActiveTab(index + 1)"
      >
        {{ tab.title }}
        <span 
          v-if="tabs.length > 7 && index >= 7" 
          @click.stop="remover(index)" 
          class="remove-tab">{{ tab.title + tabs >7 ? "" : "X" }}
        </span>
      </button>
      <div class="inativar-tab">
        <button @click="inativarPrimeiraAbaAtiva">Inativar Primeira Aba Ativa</button>
      </div>
    </div>
    
    <div class="box">
      <div class="formulario">
        <Transition name="slide">
          <div v-show="activeIndex === 1" class="form-content">
            <FormVue 
              style="background-color: #98C6E8;"
              q1="Identificação única"
              q2="Capacidade de atualização"
              q3="Consumo de energia"
              :mediaPonderada="mediaPorAba[1]"
              @atualizar-media="(media) => setMediaPonderada(1, media)"
            />
          </div>
        </Transition>
        <Transition name="slide" appear>
          <div v-show="activeIndex === 2" class="form-content">
            <FormVue 
              style="background-color: darkturquoise;"
              q1="Tipos de sensores"
              q2="Precisão e calibração"
              q3="Resiliência Ambiental"
              :mediaPonderada="mediaPorAba[2]"
              @atualizar-media="(media) => setMediaPonderada(2, media)"
            />
          </div>
        </Transition>
        <Transition name="slide" appear>
          <div v-show="activeIndex === 3" class="form-content">
            <FormVue 
              style="background-color: cadetblue;"
              q1="Protocólos de comunicação"
              q2="Gerenciamento de banda"
              q3="Estratégias de retransmissão"
              :mediaPonderada="mediaPorAba[3]"
              @atualizar-media="(media) => setMediaPonderada(3, media)"
            />
          </div>
        </Transition>
        <Transition name="slide" appear>
          <div v-show="activeIndex === 4" class="form-content">
            <FormVue 
              style="background-color: darkcyan;"
              q1="Escalabilidade"
              q2="Recuperação de desastres"
              q3="Qualidade dos dados"
              :mediaPonderada="mediaPorAba[4]"
              @atualizar-media="(media) => setMediaPonderada(4, media)"
            />
          </div>
        </Transition>
        <Transition name="slide" appear>
          <div v-show="activeIndex === 5" class="form-content">
            <FormVue 
              style="background-color: deepskyblue;"
              q1="Privacidade e proteção de dados"
              q2="Segurança da informação"
              q3="Gerenciamento de acesso e auditoria"
              :mediaPonderada="mediaPorAba[5]"
              @atualizar-media="(media) => setMediaPonderada(5, media)"
            />
          </div>
        </Transition>
        <Transition name="slide" appear>
          <div v-show="activeIndex === 6" class="form-content">
            <FormVue 
              style="background-color: dodgerblue;"
              q1="Processamento de dados"
              q2="Insights acionáveis"
              q3="Visualização de dados"
              :mediaPonderada="mediaPorAba[6]"
              @atualizar-media="(media) => setMediaPonderada(6, media)"
            />
          </div>
        </Transition>
        <Transition name="slide" appear>
          <div v-show="activeIndex === 7" class="form-content">
            <FormVue 
              style="background-color: lightskyblue;"
              q1="Experiência do usuário"
              q2="Acessibilidade"
              q3="Usabilidade"
              :mediaPonderada="mediaPorAba[7]"
              @atualizar-media="(media) => setMediaPonderada(7, media)"
            />
          </div>
        </Transition>
        <!-- Repetir para outras abas -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import FormVue from '@/components/FormVue.vue';

const activeIndex = ref(1);
const mediaPorAba = ref(Array(7).fill(''));

function setMediaPonderada(index, media) {
  mediaPorAba.value[index] = media;
}

const initialTabs = [
  { title: 'Objeto', inactive: false },
  { title: 'Sensores', inactive: false },
  { title: 'Transmissão', inactive: false },
  { title: 'Cloud', inactive: false },
  { title: 'Segurança', inactive: false },
  { title: 'Análise', inactive: false },
  { title: 'Uso', inactive: false },
];

const tabs = ref(initialTabs); 

function inativarPrimeiraAbaAtiva() {
  if (tabs.value[activeIndex.value - 1]) {
    tabs.value[activeIndex.value - 1].inactive = true;
  }
  let nextActiveIndex = tabs.value.findIndex(
    (tab, idx) => !tab.inactive && idx >= activeIndex.value
  );
  if (nextActiveIndex !== -1) {
    activeIndex.value = nextActiveIndex + 1;
  }
}

function remover(index) {
  if (tabs.value.length > 7) { 
    tabs.value.splice(index, 1);
    if (activeIndex.value === index + 1) {
      activeIndex.value = 0;
    } else if (activeIndex.value > index + 1) {
      activeIndex.value--;
    }
  }
}

function setActiveTab(index) {
  if (!tabs.value[index - 1].inactive) {
    activeIndex.value = index; 
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 81vh;
  position: relative;
  overflow: hidden;
}

.form-content {
  position: absolute;
  width: 100%;
  height: 100%;
}

.abas {
  padding: 5px;
  gap: 5px;
  display: flex;
  justify-content: flex-start;
  width: auto;
}

.button {
  background-color: #ececec;
  border: none;
  width: 120px;
  height: auto;
  border-radius: 10px;
  font-weight: bold;
  cursor: default;
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
