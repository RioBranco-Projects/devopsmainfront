<template>
    <form class="form">
    <div class="box" style="style">
        <div class="title">
                <div class="foto">
                    <img src="/src/assets/svg/user.png" alt="">
                </div>
                <div class="sla">
                    <h1>Projetista:</h1> 
                    <p>{{myUser}}</p>
                </div>
            </div>
        </div>
    <div class="box2">
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
            <button @click="changeVisible">Adicionar mais um critério</button>
            <button>Salvar regra</button>
        </div>
        <div class="form-group" v-if="boxVisible">
            <label for="name">{{ Q4 }}:</label> 
            <input type="text" :placeholder="d4" id="text" name="text4">
        </div>
        <div class="botao" v-if="togleVisible2">
            <button @click="changeVisible2">Adicionar mais outro crítério</button>
        </div>
        <div class="form-group" v-if="boxVisible2">
            <label for="name">{{ Q5 }}:</label> 
            <input type="text" :placeholder="d5" id="text" name="text5">
        </div>
        <div class="botao" v-if="togleVisible3">
            <button @click="changeVisible3">Retirar o crítério</button>
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
    togleVisible2.value = togleVisible2.value = !togleVisible2.value;
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
})

</script>
<style scoped>
.botao {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    justify-content: center;
    button {
    border-radius: 10px;
    background-color: green;
    width: 250px;
    padding: 10px;
    height: auto;
    border: none;
}
}
.form {
    gap: 40px;
  flex-direction: column;
  display: flex;
  border-radius: 15px;
  justify-content: start;
  width: auto;
  background-color: #3489cf76;
  padding: 20px;
  box-shadow: 2px 5px 8px rgba(0, 0, 0, 0.2);
  height: auto;
}
.title {
  display: flex;
  justify-content: start;
  gap: 20px;
  img {
    width: 80px;
  }
}
.sla {
  display: flex;
  flex-direction: column;
  color: #000000;
  h1 {
    font-weight: bolder;
    font-size: 30px;
  }
  p {
    font-weight: bold;
    font-size: 30px;
  }
}
.form .form-group {
  display: flex;
  align-items: start;
  width: auto;
  flex-direction: column;
  height: auto;
}

.form .form-group label {
  font-weight: bold;
}
.form .form-group input {
  padding: 5px;
  border-radius: 5px;
  border: none;
  background-color: #fff;
  width: 600px;
  height: 40px;
}

</style>