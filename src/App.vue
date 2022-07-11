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
      score: 0,
      store,
    };
  },
  created() {},
  methods: {},
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
</style>
