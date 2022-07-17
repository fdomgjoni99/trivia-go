import { reactive } from 'vue';
import { shuffle } from './helpers';

export const store = reactive({
  score: 0,
  questionCount: 0,
  quizEnded: false,
  data: null,
  options: null,
  loading: true,
  currentQuestion: 0,
  step: 0,
  showAnswer: false,
  incrementScore() {
    this.score++;
  },
  restartQuiz() {
    this.score = 0;
    this.step = 0;
    this.questionCount = 0;
    this.quizEnded = false;
    this.data = null;
    this.loading = true;
  },
  setQuestionCount(count) {
    this.questionCount = count;
  },
  getData() {
    this.loading = true;
    fetch(
      `https://opentdb.com/api.php?category=${this.options.category}&amount=10`
    )
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
        this.questionCount = res.results.length;
        this.loading = false;
      });
  },
  checkAnswer(answer) {
    if (this.data.results[this.currentQuestion].correct_answer == answer) {
      this.incrementScore();
      this.showAnswer = true;
      this.data.results[this.currentQuestion].guessedRight = true;
      return;
    }
    this.data.results[this.currentQuestion].guessedRight = false;
    this.showAnswer = true;
  },
  getNextQuestion() {
    if (this.currentQuestion >= this.data.results.length - 1) {
      this.quizEnded = true;
      this.step = 2;
    }
    this.currentQuestion += 1;
    this.showAnswer = false;
  },
  startQuiz(payload) {
    this.options = payload;
    this.step = 1;
  },
});
