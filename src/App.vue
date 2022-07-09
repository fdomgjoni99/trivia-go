<script>
import Quiz from './components/Quiz.vue';
import Options from './components/Options.vue';
export default {
  components: {
    Quiz,
    Options,
  },
  data() {},
  created() {},
  methods: {
    categoryChanged(id) {
      console.log(id);
    },
  },
};
</script>

<template>
  <div v-if="1 == 0">
    <Options @category-changed="categoryChanged"></Options>
  </div>
  <div v-else>
    <Quiz></Quiz>
  </div>
</template>

<style></style>
