<script>
export default {
  data() {
    return {
      categories: [],
    };
  },
  created() {
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((res) => {
        this.categories = res.trivia_categories;
      });
  },
  methods: {},
};
</script>

<template>
  <div class="flex flex-row flex-wrap justify-center">
    <button
      v-for="category in categories"
      :key="category.id"
      class="px-3 py-2 bg-purple-200 m-2 rounded"
      @click="$emit('categoryChanged', category.id)"
    >
      {{ category.name }}
    </button>
  </div>
</template>

<style></style>
