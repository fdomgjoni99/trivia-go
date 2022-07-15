<script>
export default {
  props: {
    text: String,
    isValidAnswer: Boolean,
    isInvalidAnswer: Boolean,
    showAnswer: Boolean,
  },
};
</script>

<template>
  <button
    class="w-full bg-gray-200 rounded-lg p-4 transition md:text-lg md:p-6"
    @click="$emit('checkAnswer', text)"
    v-html="text"
    :disabled="showAnswer"
    :class="{
      'bg-red-200': showAnswer && isInvalidAnswer,
      'bg-green-200': showAnswer && isValidAnswer,
      'hover:bg-gray-300': !showAnswer,
    }"
  ></button>
</template>
