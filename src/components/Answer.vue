<script>
import { store } from '.././store';

export default {
  props: {
    text: String,
    isValidAnswer: Boolean,
    isInvalidAnswer: Boolean,
  },
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <button
    class="w-full bg-gray-200 rounded-lg p-4 transition md:text-lg md:p-6"
    @click="store.checkAnswer(text)"
    v-html="text"
    :disabled="store.showAnswer"
    :class="{
      'bg-red-200': store.showAnswer && isInvalidAnswer,
      'bg-green-200': store.showAnswer && isValidAnswer,
      'hover:bg-gray-300': !store.showAnswer,
    }"
  ></button>
</template>
