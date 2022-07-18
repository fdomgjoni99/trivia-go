<template>
  <Loader v-if="store.loading"></Loader>
  <div v-else class="w-11/12 mx-auto grid grid-cols-1 gap-y-8 lg:w-5/12">
    <h1 class="text-center text-3xl my-12 font-bold">
      Trivia<span class="text-purple-500">GO</span>
    </h1>
    <Listbox as="div" v-model="selectedCategory">
      <ListboxLabel class="block text-sm font-medium text-gray-700">
        Choose a category
      </ListboxLabel>
      <div class="mt-1 relative">
        <ListboxButton
          class="relative w-full bg-white border border-gray-300 rounded-md shadow-md pl-3 pr-10 py-4 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        >
          <span class="flex items-center">
            <span class="ml-3 block truncate">{{
              selectedCategory || 'Loading...'
            }}</span>
          </span>
          <span
            class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            <ListboxOption
              as="template"
              v-for="category in categories"
              :key="category.id"
              :value="category.name"
              v-slot="{ active, selectedCategory }"
            >
              <li
                :class="[
                  active ? 'text-white bg-purple-600' : 'text-gray-900',
                  'cursor-default select-none relative py-2 pl-3 pr-9',
                ]"
              >
                <div class="flex items-center">
                  <span
                    :class="[
                      selectedCategory ? 'font-semibold' : 'font-normal',
                      'ml-3 block truncate',
                    ]"
                  >
                    {{ category.name }}
                  </span>
                </div>

                <span
                  v-if="selectedCategory"
                  :class="[
                    active ? 'text-white' : 'text-purple-600',
                    'absolute inset-y-0 right-0 flex items-center pr-4',
                  ]"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>

    <Listbox as="div" v-model="selectedDifficulty">
      <ListboxLabel class="block text-sm font-medium text-gray-700">
        Choose a difficulty
      </ListboxLabel>
      <div class="mt-1 relative">
        <ListboxButton
          class="relative w-full bg-white border border-gray-300 rounded-md shadow-md pl-3 pr-10 py-4 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        >
          <span class="flex items-center">
            <span class="ml-3 block truncate">{{ selectedDifficulty }}</span>
          </span>
          <span
            class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            <ListboxOption
              as="template"
              v-for="difficulty in difficulties"
              :key="difficulty"
              :value="difficulty"
              v-slot="{ active, selectedDifficulty }"
            >
              <li
                :class="[
                  active ? 'text-white bg-purple-600' : 'text-gray-900',
                  'cursor-default select-none relative py-2 pl-3 pr-9',
                ]"
              >
                <div class="flex items-center">
                  <span
                    :class="[
                      selectedDifficulty ? 'font-semibold' : 'font-normal',
                      'ml-3 block truncate',
                    ]"
                  >
                    {{ difficulty }}
                  </span>
                </div>

                <span
                  v-if="selectedDifficulty"
                  :class="[
                    active ? 'text-white' : 'text-purple-600',
                    'absolute inset-y-0 right-0 flex items-center pr-4',
                  ]"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <button
      class="px-12 py-4 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700 transition w-full"
      @click="startQuiz()"
    >
      Start quiz
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid';
import Loader from './Loader.vue';
import { store } from '.././store';

const categories = ref(null);
const selectedCategory = ref(null);
const difficulties = ref(['easy', 'medium', 'hard']);
const selectedDifficulty = ref('easy');

onMounted(() => {
  fetch('https://opentdb.com/api_category.php')
    .then((res) => res.json())
    .then((res) => {
      categories.value = res.trivia_categories;
      selectedCategory.value = res.trivia_categories[0].name;
      store.loading = false;
    });
});

const startQuiz = () => {
  const selectedCategoryId = categories.value.find(
    (item) => item.name == selectedCategory.value
  ).id;
  store.startQuiz({
    category: selectedCategoryId,
    difficulty: selectedDifficulty,
  });
};
</script>
