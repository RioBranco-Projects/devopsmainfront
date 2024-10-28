<script>
import Header from './components/Header.vue';
import { RouterView } from 'vue-router'
import { Transition } from 'vue';

export default {
  name: 'App',
  components: {
    Header,
    RouterView,
    Transition
  },
}

</script>

<template>

    <Header/>
    <router-view v-slot="{Component}">
      <Transition name="router" mode="out-in">
      <component :is="Component" :key="$router.fullPath">
          {{Component}}
        </component>
      </Transition>
    </router-view>

</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.router-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
.router-enter-active {
  transition: all 0.3s ease-out;
}
.router-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
.router-leave-active {
  transition: all 0.3s ease-out;
}
</style>
