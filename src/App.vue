<script>
import Quiz from './components/Quiz.vue';
import Restart from './components/Restart.vue';
export default {
  components: {
    Quiz,
    Restart,
  },
  data() {
    return {
      score: 0,
      quizEnded: false,
    };
  },
  created() {},
  methods: {},
};
</script>

<template>
  <div v-if="quizEnded">
    <Restart
      :score="score"
      @restart-quiz="
        quizEnded = false;
        score = 0;
      "
    ></Restart>
  </div>
  <div v-else>
    <Quiz @increment-score="score += 1" @quiz-ended="quizEnded = true"></Quiz>
  </div>
</template>

<style></style>
