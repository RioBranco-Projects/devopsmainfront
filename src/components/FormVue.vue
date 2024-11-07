<template>
  <form class="form">
    <div class="box">
      <div class="title">
        <div class="foto">
          <img src="/src/assets/svg/user.png" alt="">
        </div>
        <div class="sla">
          <h1>Projetista:</h1> 
          <p>{{ myUser }}</p>
        </div>
      </div>
    </div>
    <div class="box2" :style="box2">
      <div class="form-group">
        <label for="email">{{ Q1 }}:</label>
        <input type="text" :placeholder="d1" id="text" name="text1" required>
      </div>
      <div class="form-group">
        <label for="password">{{ Q2 }}:</label>
        <input type="text" :placeholder="d2" id="text" name="text2" required>
      </div>
      <div class="form-group">
        <label for="name">{{ Q3 }}:</label> 
        <input type="text" :placeholder="d3" id="text" name="text3" required>
      </div>
      <div class="botao" v-if="togleVisible">
        <button @click.prevent="changeVisible">Adicionar mais um critério</button>
        <button @click.prevent="salvarInput">Salvar regra</button>
      </div>
      <div class="form-group" v-if="boxVisible">
        <label for="name">{{ Q4 }}:</label> 
        <input type="text" :placeholder="d4" id="text" name="text4">
      </div>
      <div class="botao" v-if="togleVisible2">
        <button @click.prevent="changeVisible2">Adicionar mais outro critério</button>
      </div>
      <div class="form-group" v-if="boxVisible2">
        <label for="name">{{ Q5 }}:</label> 
        <input type="text" :placeholder="d5" id="text" name="text5">
      </div>
      <div class="botao" v-if="togleVisible3">
        <button @click.prevent="changeVisible3">Retirar o critério</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { defineProps } from 'vue';
import { ref } from 'vue';

const getUser = () => {
  const storedUser = localStorage.getItem('user');
  const parsedUser = JSON.parse(storedUser);
  return parsedUser.name || parsedUser;
};

const myUser = ref(getUser());
const togleVisible = ref(true);
const togleVisible2 = ref(false);
const boxVisible = ref(false);
const boxVisible2 = ref(false);
const togleVisible3 = ref(false);

function changeVisible2() {
  boxVisible2.value = !boxVisible2.value;
  togleVisible2.value = !togleVisible2.value;
  togleVisible3.value = !togleVisible3.value;
}

function changeVisible() {
  togleVisible.value = !togleVisible.value;
  boxVisible.value = !boxVisible.value;
  togleVisible2.value = !togleVisible2.value;
}

function salvarInput() {
  const input1 = document.getElementsByName('text1');
  const input2 = document.getElementsByName('text2');
  const input3 = document.getElementsByName('text3');
  if (input1 && input2 && input3) {
    localStorage.getItem('input1', input1);
    localStorage.getItem('input2', input2);
    localStorage.getItem('input3', input3);
    console.log('Dados do registro:', input1, input2, input3);
  }
}

function changeVisible3() {
  if (boxVisible2.value) {
    boxVisible2.value = false;
    togleVisible2.value = false;
  } else if (boxVisible.value) {
    boxVisible.value = false;
    togleVisible.value = true;
    togleVisible3.value = false;
  }
}

const props = defineProps({
  Q1: String,
  d1: String,
  Q2: String,
  d2: String,
  Q3: String,
  d3: String,
  Q4: String,
  d4: String,
  Q5: String,
  d5: String
});
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
  flex-direction: column;
  padding: 50px;
  width: 100%;
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
  justify-content: center;
  display: flex;
  gap: 8px;
  width: 100%;
  max-width: 800px;
}

.form-group label {
  font-size: 25px;
  font-weight: 600;
  color: #555;
}

.form-group input {
  padding: 8px;
  font-size: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100px;
  background-color: #f9f9f9;
  transition: all 0.3s ease-in-out;
}

.form-group input:focus {
  background-color: #fff;
  outline: none;
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
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  transition: calc(.3s);
}

.botao button:hover {
  background-color: #0e66af;
  transform: scale(1.025);
  color: white
}

.box, .box2 {
  width: 100%;
  background-color: #ededed;
  padding: 15px;
  border-radius: 10px;
  max-width: 820px;
  margin: 10px 0;
}

.box {
  display: flex;
  padding: 10px;
  background-color: #ededed;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
