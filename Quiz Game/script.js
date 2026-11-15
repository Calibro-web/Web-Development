// Quiz Game

// Select HTML elements
const main = document.querySelector(".main");
const question = document.querySelector(".question p");
const options = document.querySelectorAll(".options button");
const next = document.querySelector("#next");
const slider = document.querySelector(".slider");
const level = document.querySelector("#level");
const result = document.querySelector("#result");
const navbar = document.querySelector(".navbar");
const board = document.querySelector(".board");
const startGame = document.querySelector(".board button");
const bg = document.querySelector(".background img");

// Quiz state
let currentQuestion = 0;
let questionCount = 0;
let questions = [];
let hidden = false;
let groupResults = [];
let loading = false;

// APIs
const easyAPI =
  "https://opentdb.com/api.php?amount=50&category=17&difficulty=easy&type=multiple";

const mediumAPI =
  "https://opentdb.com/api.php?amount=50&category=17&difficulty=medium&type=multiple";

// Basic Layout of the Window
function Layout() {
  bg.classList.remove("hide");
  main.classList.add("hide");
  navbar.classList.remove("hide");
  board.classList.remove("hide");
}

// Update layout for Fullscreen
function updateMargin() {
  const isFullscreen =
    window.innerWidth >= screen.width && window.innerHeight >= screen.height;

  main.style.margin = isFullscreen ? "12vh auto 0" : "10vh auto 0";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "F11") {
    setTimeout(updateMargin, 100);
  }
});

window.addEventListener("resize", updateMargin);
updateMargin();

// Decode HTML entities
function decodeHTML(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

// Shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

Layout();

// Fetch quiz questions
async function quizGame() {
  if (loading) return;

  loading = true;

  try {
    question.textContent = "Loading Questions...";
    question.style.display = "block";

    result.textContent = "";
    result.classList.add("none");

    options.forEach((option) => {
      option.style.display = "none";
      option.disabled = true;
    });

    level.style.display = "none";
    next.classList.add("hide");

    // Select API according to current question
    let API;

    if (currentQuestion === 0) {
      API = easyAPI;
    } else if (currentQuestion === 1) {
      API = mediumAPI;
    }

    const response = await fetch(API, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();

    if (
      data.response_code !== 0 ||
      !data.results ||
      data.results.length === 0
    ) {
      throw new Error("No questions received");
    }

    questions = shuffleArray(data.results);

    questionCount = 0;
    groupResults = [];
    hidden = false;

    loading = false;

    showQuestion();
  } catch (error) {
    console.error("Open Trivia DB Error:", error);

    loading = false;

    question.textContent = "Loading Questions...";
    question.style.display = "block";

    result.textContent = "";
    result.classList.add("none");

    options.forEach((option) => {
      option.style.display = "none";
    });

    level.style.display = "none";
    next.classList.add("hide");

    setTimeout(() => {
      quizGame();
    }, 2000);
  }
}

// Display current question
function showQuestion() {
  if (questionCount >= questions.length) {
    quizGame();
    return;
  }

  level.textContent = `Level ${currentQuestion + 1}`;

  const current = questions[questionCount];

  if (!current) {
    quizGame();
    return;
  }

  question.textContent = decodeHTML(current.question);

  const correctAnswer = decodeHTML(current.correct_answer);

  const incorrectAnswers = current.incorrect_answers.map((answer) =>
    decodeHTML(answer),
  );

  const answers = [correctAnswer, ...incorrectAnswers];

  shuffleArray(answers);

  options.forEach((option, i) => {
    option.textContent = answers[i];
    option.disabled = false;
    option.style.border = "none";
    option.style.display = "block";
  });

  question.style.display = "block";
  level.style.display = "block";

  result.textContent = "";
  result.classList.add("none");

  next.classList.add("hide");
  next.style.marginTop = "15px";
}

// Handle answer selection
options.forEach((option) => {
  option.addEventListener("click", () => {
    options.forEach((optn) => {
      optn.disabled = true;
    });

    const correctAnswer = decodeHTML(questions[questionCount].correct_answer);

    const isCorrect = option.textContent === correctAnswer;

    groupResults.push(isCorrect);

    if (isCorrect) {
      option.style.border = "2px solid #50C878";
    } else {
      option.style.border = "2px solid #F72F35";

      options.forEach((o) => {
        if (o.textContent === correctAnswer) {
          o.style.border = "2px solid #50C878";
        }
      });
    }

    next.classList.remove("hide");
  });
});

// Handle Next button
next.addEventListener("click", () => {
  if (hidden) {
    currentQuestion = 0;
    questionCount = 0;
    groupResults = [];
    hidden = false;

    quizGame();

    return;
  }

  currentQuestion++;
  questionCount++;

  if (currentQuestion <= 2) {
    const lastAnswer = groupResults[currentQuestion - 1];

    if (lastAnswer === false) {
      result.textContent = "You LOSE.";
      result.style.color = "#F72F35";

      result.classList.remove("none");

      next.style.marginTop = "10vh";

      question.style.display = "none";
      level.style.display = "none";

      options.forEach((option) => {
        option.style.display = "none";
      });

      hidden = true;

      return;
    }
  }

  if (currentQuestion === 3) {
    result.classList.remove("none");
    next.classList.remove("hide");

    const won =
      groupResults.length === 3 &&
      groupResults.every((answer) => answer === true);

    if (won) {
      result.textContent = "You WIN!";
      result.style.color = "#50C878";
    } else {
      result.textContent = "You LOSE.";
      result.style.color = "#F72F35";
    }

    next.style.marginTop = "10vh";

    question.style.display = "none";
    level.style.display = "none";

    options.forEach((option) => {
      option.style.display = "none";
    });

    hidden = true;

    return;
  }

  showQuestion();
});

// Start game
startGame.addEventListener("click", () => {
  bg.classList.add("hide");
  navbar.classList.add("hide");
  board.classList.add("hide");
  main.classList.remove("hide");
});

// Start quiz
quizGame();
