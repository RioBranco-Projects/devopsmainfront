<template>
    <transition name="fade-in">
    <section class="comparate">
        <div class="title">
            <h1>Fazer Comparação</h1>
        </div>
        <!-- Menu de opções de produtos -->
        <div class="selector" v-if="eneable">
            <div class="box">
                <div class="option-menu">
                    <p>Selecione o produto a ser comparado:</p>
                    <div class="options" :class="{ opened: isOpen }" @click="toggleOptions('left')">
                        <div class="option" :class="{ 'hide-option': !selectedOptions.left }">
                            {{ selectedOptions.left || 'Selecione aqui...' }}
                        </div>
                        <div v-show="isOpen === 'left'" v-for="(produto, index) in filteredOptions('left')" :key="index" class="option" @click.stop="selectOption(produto, 'left')">
                            {{ produto }}
                        </div>
                    </div><!-- options -->
                </div><!-- option-menu -->

                <div class="option-menu">
                    <p>Selecione o segundo produto:</p>
                    <div class="options" :class="{ opened: isOpen }" @click="toggleOptions('right')">
                        <div class="option" :class="{ 'hide-option': !selectedOptions.right }">
                            {{ selectedOptions.right || 'Selecione aqui...' }}
                        </div>
                        <div v-show="isOpen === 'right'" v-for="(produto, index) in filteredOptions('right')" :key="index" class="option" @click.stop="selectOption(produto, 'right')">
                            {{ produto }}
                        </div>
                    </div><!-- options -->
                </div><!-- option-menu -->
            </div><!-- box2 -->
        </div><!-- option -->

        <!-- Exibição dos cartões de comparação com transição -->
        
            <div class="box-compared" v-if="showComparison">
                <div class="card">
                    <img src="/src/assets/svg/produtoicon.png" alt="Ícone do Produto">
                    <div class="card-content">
                        <h3>{{ selectedOptions.left }}</h3>
                        <p class="value">{{ totalUsers }}</p>
                        <p class="description">+5% este mês</p>
                    </div>
                </div>
                <div class="makecompared">
                    <button class="back" @click="voltarEscolha"> <img src="/src/assets/svg/icons/arrow-left-circle.svg" alt=""> Voltar à escolha</button>
                        <img src="/src/assets/svg/comparar.png" alt="Ícone do Produto">
                    <button class="make" >Fazer comparação <img src="/src/assets/svg/icons/arrow-right-circle.svg" alt=""> </button>
                </div>
                <div class="card">
                    <img src="/src/assets/svg/produtoicon.png" alt="Ícone do Produto">
                    <div class="card-content">
                        <h3>{{ selectedOptions.right }}</h3>
                        <p class="value">{{ totalUsers }}</p>
                        <p class="description">+5% este mês</p>
                    </div>
                </div>
            </div>
        </section>
    </transition>
</template>

<script setup>
import { ref } from 'vue';
import { Transition } from 'vue';

// Lista de opções de produtos
const optionList = ["Produto 1", "Produto 2", "Produto 3", "Produto 4", "Produto 5"];

// Variáveis de controle
const eneable = ref(true);
const selectedOptions = ref({ left: null, right: null });
const showComparison = ref(false);
const isOpen = ref(null);
const totalUsers = ref("5% de crescimento");

function voltarEscolha () {
    showComparison.value = false;
    eneable.value = true;
}

// Função para exibir/ocultar opções
function toggleOptions(side) {
    isOpen.value = isOpen.value === side ? null : side;
}

// Filtro para exibir as opções que ainda não foram selecionadas
function filteredOptions(side) {
    return optionList.filter(produto => produto !== selectedOptions.value[side === 'left' ? 'right' : 'left']);
}

// Função de seleção
function selectOption(produto, side) {
    selectedOptions.value[side] = produto;
    isOpen.value = null;
    if (selectedOptions.value.left && selectedOptions.value.right) {
        showComparison.value = true;
        eneable.value = false;
    }
}
</script>

<style scoped>
.comparate {
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    width: auto;
    height: 900px;
}
.title {
    padding: 20px 0;
    text-align: center;
    color: #000;
    h1 {
        font-weight: bold;
        font-size: 50px;
    }
}

.box {
    display: flex;
    gap: 50px;
    justify-content: space-around;
    margin-top: 30px;
    padding: 20px;
}
.box-compared {
    display: flex;
    justify-content: space-around;
    gap: 50px;
    align-content: center;
    align-items: center;
    margin-top: 50px;
    padding: 20px;
}

.option-menu {
    gap: 10px;
    width: auto;
    margin: 0 auto;
    p {
        text-align: center;
        margin: 0;
        font-weight: bold;
    }
}

.options {
    cursor: pointer;
    width: 340px;
    min-height: 60px;
    max-height: 300px;
    border-radius: 15px;
    background-color: #fafafa;
    box-shadow: 4px 4px 4px #c5c5c5;
    transition: all 300ms;
    position: relative;
}
.options.opened {
    overflow-y: auto;
}

.option {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    transition: all 300ms;
    font-size: 20px;
}
.option.hide-option {
    font-style: italic;
    color: #888;
}
.option:hover {
    color: rgb(0, 132, 255);
}

/* Estilos dos cards */
.card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    padding: 20px;
    width: 580px;
    transition: transform 0.3s, box-shadow 0.3s;
}
.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
.card img {
    width: 150px;
    height: 150px;
}
.card-content {
    margin-left: 20px;
    text-align: center;
}
.card h3 {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin: 0;
}
.card .value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1ca803;
    margin: 5px 0;
}
.card .description {
    font-size: 1rem;
    color: #666;
}

/* Animações */
.fade-in-enter-active, .fade-in-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-in-enter, .fade-in-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.makecompared {
    display: flex;
    align-items: center;
    flex-direction: column;
    img {
        width: 120px;
    }
    .botoes {
        display: flex;
        flex-direction: column;
    }
    .make {
        background-color: #4a9adc;
        font-size: 20px;
        border: none;
        padding: 10px;
        border-radius: 10px;
        width: 300px;
        justify-content: center;
        img {
            width: 30px;
        }
    }
    .back {
        background-color: #ff0000;
        font-size: 20px;
        border-radius: 10px;
        border: none;
        padding: 10px;
        width: 300px;
        justify-content: center;
        img {
            width: 30px;
        }
    }
}
</style>
