<script>
import Answer from './Answer.vue';
import { store } from '.././store';
import { shuffle } from '.././helpers';

export default {
  components: {
    Answer,
  },
  data() {
    return {
      data: null,
      currentQuestion: 0,
      showAnswer: false,
      store,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      fetch('https://opentdb.com/api.php?amount=10&type=multiple')
        .then((res) => res.json())
        .then((res) => {
          res.results.map((item) => {
            item.shuffled_answers = shuffle([
              item.correct_answer,
              ...item.incorrect_answers,
            ]);
            delete item.incorrect_answers;
          });
          this.data = res;
          this.currentQuestion = 0;
          this.showAnswer = false;
          store.setQuestionCount(res.results.length);
        });
    },
    checkAnswer(answer) {
      if (this.data.results[this.currentQuestion].correct_answer == answer) {
        this.store.incrementScore();
        this.showAnswer = true;
        this.data.results[this.currentQuestion].guessedRight = true;
        return;
      }
      this.data.results[this.currentQuestion].guessedRight = false;
      this.showAnswer = true;
    },
    getNextQuestion() {
      if (this.currentQuestion >= this.data.results.length - 1) {
        return store.endQuiz();
      }
      this.currentQuestion += 1;
      this.showAnswer = false;
    },
  },
};
</script>

<template>
  <div
    v-if="data"
    class="grid grid-rows-6 grid-cols-1 gap-4 text-gray-600 mx-auto w-11/12 md:w-4/6 h-screen"
  >
    <div class="row-span-2">
      <div
        class="min-h-full items-center justify-between py-4 rounded-lg flex flex-col items-center"
      >
        <div class="flex my-4">
          <div
            v-for="(item, index) in data.results"
            class="w-3 h-3 rounded text-white mx-1 text-center text-xs flex items-center justify-center"
            :class="{
              'bg-green-300': item.guessedRight,
              'bg-red-300': item.guessedRight == false,
              'bg-gray-200': !item.guessedRight,
            }"
          ></div>
        </div>
        <div
          class="border-4 border-gray-400 p-3 w-full rounded-lg shadow-xl flex items-center justify-center md:p-5 mb-3"
        >
          <h1
            class="text-center font-medium md:text-lg"
            v-html="data.results[currentQuestion].question"
          ></h1>
        </div>
      </div>
    </div>
    <div class="row-span-3">
      <div class="min-h-full flex flex-col justify-center">
        <div class="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
          <Answer
            v-for="answer in data.results[currentQuestion].shuffled_answers"
            :key="answer"
            :text="answer"
            :is-valid-answer="
              answer == data.results[currentQuestion].correct_answer
            "
            :is-invalid-answer="
              answer != data.results[currentQuestion].correct_answer
            "
            :show-answer="showAnswer"
            @check-answer="checkAnswer"
          ></Answer>
        </div>
      </div>
    </div>
    <div class="">
      <div class="min-h-full min-w-full flex items-center justify-center">
        <Transition name="grow-fade">
          <button
            @click="getNextQuestion"
            class="px-12 py-4 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700 transition w-full md:w-1/3"
            v-show="showAnswer"
          >
            Next
          </button>
        </Transition>
      </div>
    </div>
  </div>
  <div v-else>
    <h1 class="text-center mt-12 text-gray-500">Loading questions...</h1>
  </div>
</template>

<style scoped>
.grow-fade-enter-active {
  transition: all 0.2s ease-out;
}

.grow-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.grow-fade-enter-from,
.grow-fade-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(60px);
}
</style>
