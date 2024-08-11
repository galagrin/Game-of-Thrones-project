// Массив (в формате JSON)
const questions = [
    {
        question: 'Как зовут главную героиню сериала, самую юную представительницу дома Старков?',
        options: ['Кейтлин Старк', 'Арья Старк','Санса Старк'],
        correctAnswer: 1,
        image: '../public/images/quiz/1.png',
    },

    {
        question: ' Как называется огромная ледяная стена на севере Вестероса?',
        options: ['Забор', 'Стена', 'Частокол'],
        correctAnswer: 1,
        image: '../public/images/quiz/2.jpg',
    },

    {
        question: 'Какой дом Вестероса известен своим девизом "Услышь мой рев"?',
        options: ['Дом Ланнистеров', 'Дом Тиррелов', 'Дом Карстарков'],
        correctAnswer: 0,
        image: '../public/images/quiz/3.jpg',
    },

    {
        question: 'Какой дом правит Железными островами?',
        options: ['Дом Мартеллов', 'Баратеоны', 'Грейджои'],
        correctAnswer: 2,
        image: '../public/images/quiz/4.jpg',
    },

    {
        question: 'Как зовут матерых драконов Дейенерис Таргариен?',
        options: ['Визерис, Дрого, Кхал', 'Дрогон, Визерион, Рейгаль', 'Эйгон, Рейгар, Варис'],
        correctAnswer: 1,
        image: '../public/images/quiz/5.png',
    },

    {
        question: 'Кем был Джон Сноу по происхождению?',
        options: ['Бастард Неда Старка', 'Тайный Таргариен', 'Сын Тириона'],
        correctAnswer: 1,
        image: '../public/images/quiz/false3.jpg',
    },

    {
        question: 'Как называется столица Семи королевств?',
        options: ['Королевская Гавань', 'Простор', 'Солнечное копье'],
        correctAnswer: 0,
        image: '../public/images/quiz/7.jpg',
    },

    {
        question: 'Кто из героев сериала является предводителем белых ходоков"?',
        options: ['Тормунд', 'Великан', 'Король ночи'],
        correctAnswer: 2,
        image: '../public/images/quiz/8.jpg',
    },

    {
        question: ' Как называется оружие, которым пользуется Арья Старк?',
        options: ['Игла', 'Кочерга', 'Кинжал'],
        correctAnswer: 0,
        image: '../public/images/quiz/9.jpg',
    },

    {
        question: 'Какой дом Вестероса известен своим девизом "Зима близко"?',
        options: ['Дом Болтонов', 'Дом Старков', 'Дом Ланнистеров'],
        correctAnswer: 1,
        image: '../public/images/quiz/10.jpg',
    },

    {
        question: 'Какой суперспособностью обладают "Безликие"?',
        options: ['Меняют внешность', 'Продают устрицы', 'Превращать мертвых в ходоков'],
        correctAnswer: 0,
        image: '../public/images/quiz/11.jpg',
    },

    {
        question: 'Какая семья правила Дорном на протяжении нескольких веков?',
        options: ['Мартеллы', 'Аррены', 'Талли'],
        correctAnswer: 0,
        image: '../public/images/quiz/12.jpg',
    },

    {
        question: 'Кто сжег Столицу драконьим огнем в финальном сезоне?',
        options: ['Джон Сноу', 'Серсея Ланнистер', 'Дейенерис Таргариен'],
        correctAnswer: 2,
        image: '../public/images/quiz/13.jpg',
    },

    {
        question:  'Кто в финале сел на Железный трон?',
        options: ['Тирион Ланистер', 'Джон Сноу', 'Бран Старк'],
        correctAnswer: 2,
        image: '../public/images/quiz/14.jpg',
    },

    {
        question: 'В какой битве был убит Робб Старк, Король Севера?',
        options: ['Битва Бастардов', 'Красная свадьба', 'Закололи Дотракийцы'],
        correctAnswer: 1,
        image: '../public/images/quiz/15.jpg',
    },
];

let currentQuestion = 0;
let currentImage = 0;
let score = 0;


const questionText = document.getElementById('question');
const optionButtons = document.querySelectorAll('.options button');
const nextButton = document.getElementById('next-button');
const answerButton = document.getElementById('answer-button');
const resultText = document.getElementById('result-text');
const resultImage = document.getElementById('result-image');
const questionImage = document.getElementById('question-image');

function startQuiz() {
  displayQuestion();
  nextButton.addEventListener('click', handleNextQuestion);
}

function displayQuestion() {
  resultText.innerText = '';
  resultImage.style.display = 'none';
  optionButtons.forEach(button => button.style.display = 'block');
  answerButton.style.display = 'none';
  questionImage.style.display = 'block';

  // Проверяем, есть ли еще вопросы
  if (currentQuestion < questions.length) {
    const currentQuestionData = questions[currentQuestion];
    questionText.innerText = currentQuestionData.question;

    const currentImageData = questions[currentImage];
    questionImage.src = currentImageData.image;

    optionButtons.forEach((button, index) => {

      button.innerText = currentQuestionData.options[index];
      // button.addEventListener('click', () => checkAnswer(index));
    });
  } else {
    finishQuiz();
  }
}
optionButtons.forEach((button, index) => {
  button.addEventListener('click', () => checkAnswer(index));
});

function checkAnswer(selectedIndex) {
  optionButtons.forEach(button => button.style.display = 'none');
  answerButton.style.display = 'none';
  const currentQuestionData = questions[currentQuestion];
  if (selectedIndex === currentQuestionData.correctAnswer) {
    displayResult(true);
    score++;
  } else {
    displayResult(false);
  }
}

function handleNextQuestion() {
  currentQuestion++;
  currentImage++;
  displayQuestion();
  console.log(` вопрос ${currentQuestion+1}`);
  console.log(`счет ${score}`);
}

function displayResult(isCorrect) {
  questionImage.style.display = 'none';
  resultImage.style.display = 'block';
  if (isCorrect) {
    resultText.innerText = 'Правильно!';
    resultImage.src = '../public/images/quiz/true-pic.png';
  } else {
    resultText.innerText = 'Неправильно!';
    resultImage.src = '../public/images/quiz/false-pic.jpg';
  }
}

function finishQuiz() {
  questionText.innerText = `Вы ответили правильно на ${score} из ${questions.length} вопросов.`;
  optionButtons.forEach(button => button.style.display = 'none');
  nextButton.style.display = 'none';
  answerButton.style.display = 'block';
  questionImage.style.display = 'none';

  const resultScore = score / questions.length;
  let resultMessage, resultImageSrc;
  if (resultScore >= 0.9) {
    resultMessage = 'Превосходно! Усидеть на троне в тысячу раз труднее, чем завоевать его.';
    resultImageSrc = '../public/images/quiz/exellent-score.jpg';
  } else if (resultScore >= 0.5) {
    resultMessage = 'Ты достаточно хорошо разбираешься, но те, кто играют в престолы, либо побеждают, либо умирают, середины не бывает.';
    resultImageSrc = '../public/images/quiz/middle-scor.jpg';
  } else {
    resultMessage = 'Зима близко. Пришло время пересмотреть сериал!';
    resultImageSrc = '../public/images/quiz/false3.jpg';
  }

  resultText.innerText = resultMessage;
  resultImage.src = resultImageSrc;
  resultImage.style.display = 'block';
  // answerButton.addEventListener('click', location.reload());
}

startQuiz();
function refreshPage(){
  window.location.reload();
}