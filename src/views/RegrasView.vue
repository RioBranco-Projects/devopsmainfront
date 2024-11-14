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

    </div>

    <div class="box">
      <div class="formulario">
        <Transition name="slide">
          <div v-show="activeIndex === 1" class="form-content">
            <FormVue 
              q1="Identificação única"
              q2="Capacidade de atualização"
              q3="Consumo de energia"
              p1="Qual é o identificador único do objeto IoT (por exemplo, número de série ou ID de dispositivo) e como ele é gerado e gerenciado?"
              p2="O objeto IoT pode receber atualizações de firmware/software? Como o processo de atualização é gerenciado e seguro?"
              p3="Quais são as expectativas de consumo de energia e vida útil da bateria do objeto IoT? Existem modos de economia de energia?"
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
              p1="Quais tipos de sensores são utilizados e para quais finalidades específicas?"
              p2="Qual é a precisão necessária dos sensores e como a calibração é realizada e mantida?"
              p3="Como os sensores lidam com variações ambientais como temperatura, umidade e interferências?"
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
              p1="Quais protocolos de comunicação são suportados (por exemplo, MQTT, CoAP, HTTP, etc.) e por quê?"
              p2="Como será gerenciado o uso da banda de rede, especialmente em ambientes com recursos limitados? Existem mecanismos de adaptação à variação da banda?"
              p3="Existem mecanismos para garantir a entrega de dados em caso de falhas de transmissão?"
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
              p1="Como a solução em nuvem lida com o aumento do número de dispositivos e do volume de dados?"
              p2="Quais são os planos de recuperação de desastres e continuidade de negócios?"
              p3="Como será garantida a qualidade dos dados armazenados? Quais os mecanismos de validação e limpeza dos dados?"
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
              p1="Quais medidas são adotadas para garantir a coleta, o armazenamento e o uso seguros e transparentes dos dados pessoais dos usuários, incluindo o consentimento informado e o cumprimento dos direitos dos titulares dos dados?"
              p2="Como o sistema protege as informações dos usuários contra acessos não autorizados, ataques cibernéticos e perda de dados, garantindo a confidencialidade, integridade e disponibilidade das informações?"
              p3="Como o sistema controla o acesso às informações, atribui permissões aos usuários e garante a rastreabilidade das ações realizadas no sistema, visando a segurança e a conformidade?"
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
              p1="Como os dados são processados e analisados? Existem capacidades de processamento de borda (edge computing)?"
              p2="Como os insights são extraídos dos dados e como eles podem ser utilizados para a tomada de decisões?"
              p3="Quais ferramentas de visualização são utilizadas para representar os dados de forma compreensível para os usuários finais?"
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
              p1="O sistema oferece uma experiência intuitiva, consistente e personalizada, guiando o usuário de forma clara e eficiente desde o início da interação?"
              p2="O sistema é acessível a todos os usuários, independentemente de suas habilidades ou deficiências, garantindo igualdade de acesso e uso?"
              p3="O sistema é fácil de aprender, usar e eficiente para realizar as tarefas desejadas, minimizando erros e maximizando a satisfação do usuário?"
              :mediaPonderada="mediaPorAba[6]"
              @atualizar-media="(media) => setMediaPonderada(6, media)"
            />
          </div>
        </Transition>
      </div>
      <div v-if="produtos.length" class="produto-box">
        <h2>Produtos Cadastrados pelo {{ userName }}</h2>
        
        <!-- Option list for selecting a product -->
        <select v-model="selectedProdutoIndex">
          <option v-for="(produto, index) in produtos" :key="index" :value="index">
            {{ produto.nome }}
          </option>
        </select>

        <!-- Display selected product details -->
        <div v-if="selectedProdutoIndex !== null" class="produto-detalhes">
          <h3>{{ produtos[selectedProdutoIndex].nome }}</h3>
          <p>{{ produtos[selectedProdutoIndex].descricao }}</p>
          <p>A média final do produto foi: {{ mediaFinal }}</p>
          <p :class="proficiencyClass">Proficiência do produto: {{ nivelProeficiencia }}</p>
        </div>
      </div> <!-- produto-box -->
    </div>
    <div class="buttons">
      <div class="inativar-tab">
        <button @click="inativarAbaAtual">Inativar aba atual</button>
      </div>
      <div class="reativar-tab">
        <button @click="reativarAbaAnterior">Reativar aba anterior</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import FormVue from '@/components/FormVue.vue';

const userData = JSON.parse(localStorage.getItem('userName') || '{}');
const userName = ref(userData.name || 'Visitante');

const activeIndex = ref(1);
const selectedProdutoIndex = ref(null);

const produtos = ref([]);
const mediaPorAba = ref(Array(7).fill(''));

// Computed para calcular a média final a partir das médias das abas
const mediaFinal = computed(() => {
  const notasValidas = mediaPorAba.value.filter((nota) => nota !== '');
  const soma = notasValidas.reduce((acc, nota) => acc + parseFloat(nota), 0);
  return notasValidas.length > 0 ? (soma / notasValidas.length).toFixed(2) : '0.00';
});

// Computed para calcular o nível de proficiência
const nivelProeficiencia = computed(() => {
  const media = parseFloat(mediaFinal.value);
  if (media < 5) {
    return 'Básico';
  } else if (media <= 7) {
    return 'Médio';
  } else {
    return 'Alto';
  }
});

const proficiencyClass = computed(() => {
  if (nivelProeficiencia.value === 'Básico') {
    return 'proficiency-basic';
  } else if (nivelProeficiencia.value === 'Médio') {
    return 'proficiency-medium';
  } else {
    return 'proficiency-high';
  }
});


// Função para configurar a média ponderada e salvar no localStorage
function setMediaPonderada(index, media) {
  mediaPorAba.value[index] = media;
  localStorage.setItem('mediaPorAba', JSON.stringify(mediaPorAba.value));

  // Atualizar média final e nível de proficiência no localStorage
  localStorage.setItem('mediaFinal', JSON.stringify(mediaFinal.value));
  localStorage.setItem('nivelProeficiencia', JSON.stringify(nivelProeficiencia.value));
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

function reativarAbaAnterior (index) {
  const currentTab = activeIndex.value - 1;

  // Procura uma aba anterior que esteja inativa
  let previousInactiveIndex = currentTab - 1;
  while (previousInactiveIndex >= 0 && !tabs.value[previousInactiveIndex].inactive) {
    previousInactiveIndex--;
  }

  if (previousInactiveIndex >= 0) {
    // Reativa a aba anterior
    tabs.value[previousInactiveIndex].inactive = false;
    activeIndex.value = previousInactiveIndex + 1;

    // Atualiza o localStorage, se necessário
    localStorage.setItem('mediaPorAba', JSON.stringify(mediaPorAba.value));
  }
}
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
    selectedProdutoIndex.value = produtos.value.length > 0 ? 0 : null;
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
  height: 80vh;
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
.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.inativar-tab {
  display: flex;
}
.reativar-tab button {
  border: none;
  background-color: #85fc85;
  padding: 10px;
  color: white;
  font-size: 18px;
  height: 50px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: calc(.3s);
}
.reativar-tab button:hover {
  background-color: #54c110;
}
.inativar-tab button {
  border: none;
  background-color: #ff9f9f;
  padding: 10px;
  color: white;
  font-size: 18px;
  height: 50px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: calc(.3s);
}
.inativar-tab button:hover {
  background-color: #ff5050;
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
  text-align: center;
  padding: 20px;
  width: 1200px;
  margin: 0 auto;
  height: auto;
}

.produto-box h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 15px;
}
select {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  font-size: 16px;
  color: #333;
  background-color: #ececec;
  border: 2px solid #ddd;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

select:hover {
  border-color: #0088ff;
}

.produto-detalhes {
  background-color: #ccc;
  margin-bottom: 10px;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  font-size: 30px;
}

.produto-detalhes h3 {
  margin: 0;
  color: #333;
}

.produto-detalhes p {
  margin: 5px 0 0;
}
.proficiency-basic {
  color: red;
  font-weight: bold;
}

.proficiency-medium {
  color: orange;
  font-weight: bold;
}

.proficiency-high {
  color: green;
  font-weight: bold;
}
</style>
