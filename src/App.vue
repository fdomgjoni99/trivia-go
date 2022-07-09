<script>
export default {
  data() {
    return {
      data: null,
      currentQuestion: 0,
      showAnswer: false,
      score: 0,
    };
  },
  created() {
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((res) => res.json())
      .then((res) => {
        res.results.map((item) => {
          item.shuffled_answers = this.shuffle([
            item.correct_answer,
            ...item.incorrect_answers,
          ]);
          delete item.incorrect_answers;
        });
        console.log(res.results);
        this.data = res;
      });
  },
  methods: {
    shuffle(array) {
      let currentIndex = array.length,
        randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    },
    checkAnswer(answer) {
      if (this.data.results[this.currentQuestion].correct_answer == answer) {
        this.score += 1;
      }
      this.showAnswer = true;
    },
  },
};
</script>

<template>
  <div
    v-if="data"
    class="text-gray-600 mx-auto w-11/12 md:w-3/4 flex flex-col h-screen"
  >
    <div class="basis-1/4 flex flex-col items-center justify-center">
      <div class="px-4 py-2 bg-gray-100 text-gray-500 mb-2 rounded-md">
        Score: {{ score }}/{{ data.results.length }}
      </div>
      <span class="text-gray-400 mb-4 text-xs"
        >Category: {{ data.results[currentQuestion].category }}</span
      >
      <h1
        class="text-center text-lg font-medium md:text-xl"
        v-html="data.results[currentQuestion].question"
      ></h1>
    </div>
    <div class="basis-2/4 flex flex-col justify-center">
      <div class="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
        <div
          v-for="answer in data.results[currentQuestion].shuffled_answers"
          :key="answer"
          class="rounded-xl p-1 ring-gray-400 transition"
          :class="{ 'hover:ring-4': !showAnswer }"
        >
          <button
            class="w-full bg-gray-200 rounded-lg p-4 transition md:text-lg md:p-6"
            @click="checkAnswer(answer)"
            v-html="answer"
            :disabled="showAnswer"
            :class="{
              'bg-red-200':
                showAnswer &&
                answer != data.results[currentQuestion].correct_answer,
              'bg-green-200':
                showAnswer &&
                answer == data.results[currentQuestion].correct_answer,
            }"
          ></button>
        </div>
      </div>
    </div>
    <div class="basis-1/4 flex items-center justify-center">
      <Transition name="slide-fade">
        <button
          @click="
            currentQuestion += 1;
            showAnswer = false;
          "
          class="px-12 py-4 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700 transition w-full md:w-1/3"
          v-if="showAnswer"
        >
          Next
        </button>
      </Transition>
    </div>
  </div>
</template>

<style>
body {
  font-family: 'Poppins';
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
