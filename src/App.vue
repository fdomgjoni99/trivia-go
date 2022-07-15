<script>
import Quiz from './components/Quiz.vue';
import Restart from './components/Restart.vue';
import { store } from './store';

export default {
  components: {
    Quiz,
    Restart,
  },
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <div v-if="store.quizEnded">
    <Restart></Restart>
  </div>
  <div v-else>
    <Quiz></Quiz>
  </div>
</template>

<style>
body {
  font-family: 'Epilogue';
  background-color: #f9f9f9;
}
input,
textarea,
button,
select,
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
