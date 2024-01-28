const questions = [
    {
      question: "Which is the Largest Animal in the world?",
      answers: [
        { text: "Lion", correct: false },
        { text: "Elephant", correct: true },
        { text: "Zebra", correct: false },
        { text: "Tiger", correct: false },
      ]
    },
    {
      question: "What is the name of the biggest technology company in South Korea?",
      answers: [
        { text: "Samsung", correct: true },
        { text: "Redmi", correct: false },
        { text: "Oppo", correct: false },
        { text: "Vivo", correct: false },
      ]
    },
    {
      question: "Who is the best Cricketer?",
      answers: [
        { text: "Virat Kohli", correct: false },
        { text: "AB De Villiers", correct: false },
        { text: "M.S.Dhoni", correct: false },
        { text: "Sachin Tendulkar", correct: true },
      ]
    },
    {
      question: "__ is the end of the First World War",
      answers: [
        { text: "1919", correct: false },
        { text: "1920", correct: false },
        { text: "1918", correct: true },
        { text: "1917", correct: false },
      ]
    },
    {
      question: "How many colors are there in a rainbow?",
      answers: [
        { text: "Six", correct: false },
        { text: "Seven", correct: true },
        { text: "Eight", correct: false },
        { text: "Five", correct: false },
      ]
    }
  ];

  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");

  let currentQuestionIndex = 0;
  let score = 0;

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
  }

  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = "true";
      }
      button.addEventListener("click", selectAnswer);
    });
  }

  function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }

  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }

  function showScore() {
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  }

  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }

  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });

  startQuiz();