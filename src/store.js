import { reactive } from 'vue';
import { shuffle } from './helpers';

export const store = reactive({
  score: 0,
  questionCount: 0,
  quizEnded: false,
  data: null,
  category: null,
  loading: false,
  currentQuestion: 0,
  showAnswer: false,
  incrementScore() {
    this.score++;
  },
  restartQuiz() {
    this.score = 0;
    this.questionCount = 0;
    this.quizEnded = false;
    this.data = null;
    this.getData();
  },
  setQuestionCount(count) {
    this.questionCount = count;
  },
  getData() {
    this.loading = true;
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
    }
    this.currentQuestion += 1;
    this.showAnswer = false;
  },
});
