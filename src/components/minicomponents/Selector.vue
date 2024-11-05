<template>
    <div class="option-menu">
        <p>{{ selecionar }}</p>
            <div class="options" :class="{ opened: isOpen }" @click="toggleOptions('left')">
                <div class="option" :class="{ 'hide-option': !selectedOptions.left }">
                    {{ selectedOptions.left || 'Selecione...' }}
                </div>
            <div 
            v-show="isOpen === 'left'"
            v-for="(produto, index) in filteredOptions('left')" 
            :key="index" class="option" 
            @click.stop="selectOption(produto, 'left')"
            >
                {{ produto }}
            </div>
        </div><!-- options -->
    </div><!-- option-menu -->
</template>
<script setup>
const props = defineProps({
    selecionar: String,
})

import { ref } from 'vue';
import { Transition } from 'vue';

// Lista de opções de produtos
const optionList = ["Regra 1", "Regra 2", "Regra 3", "Regra 4", "Regra 5"];

// Variáveis de controle
const selectedOptions = ref({ left: null, right: null });
const showComparison = ref(false);
const isOpen = ref(null);

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
</style>