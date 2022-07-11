import { reactive } from 'vue';

export const store = reactive({
  score: 0,
  questionCount: 0,
  quizEnded: false,
  incrementScore() {
    this.score++;
  },
  endQuiz() {
    this.quizEnded = true;
  },
  restartQuiz() {
    this.score = 0;
    this.questionCount = 0;
    this.quizEnded = false;
  },
  setQuestionCount(count) {
    this.questionCount = count;
  },
});
