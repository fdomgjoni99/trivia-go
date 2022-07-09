<script>
export default {
  props: {
    text: String,
    isValidAnswer: Boolean,
    isInvalidAnswer: Boolean,
    showAnswer: Boolean,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<template>
  <div
    class="rounded-xl p-1 ring-gray-400 transition"
    :class="{ 'hover:ring-4': !showAnswer }"
  >
    <button
      class="w-full bg-gray-200 rounded-lg p-4 transition md:text-lg md:p-6"
      @click="$emit('checkAnswer', text)"
      v-html="text"
      :disabled="showAnswer"
      :class="{
        'bg-red-200': showAnswer && isInvalidAnswer,
        'bg-green-200': showAnswer && isValidAnswer,
      }"
    ></button>
  </div>
</template>
