// Declaring Score
let userScore = 0;
let compScore = 0;

// Declaring Title
let title = document.querySelector("#title");
// Declaring the Choices
let choices = document.querySelectorAll(".choices img");
// Declaring the Reset Button
let resetBtn = document.querySelector("#reset-btn button");
// Declaring both the scores
let user_score = document.querySelector("#user-score");
let comp_score = document.querySelector("#comp-score");
// Declaring the Message
let msg = document.querySelector("#msg");

function updateMargin() {
  const isFullscreen =
    window.innerWidth >= screen.width && window.innerHeight >= screen.height;

  title.style.height = isFullscreen ? "100px" : "70px";
  title.style.lineHeight = isFullscreen ? "6rem" : "4rem";
  resetBtn.style.marginTop = isFullscreen ? "40px" : "2px";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "F11") {
    setTimeout(updateMargin, 100);
  }
});

window.addEventListener("resize", updateMargin);
updateMargin();

// Generate Computer choice
let genCompChoice = () => {
  let genChoice = Math.floor(Math.random() * 3);
  return genChoice;
};

// Declaring the choices
let allChoices = (userValue, compValue, options) => {
  // Declaring User choice
  let userOption = options[userValue];
  // Declaring Computer choice
  let compOption = options[compValue];

  return {
    userChoice: options[userValue],
    compChoice: options[compValue],
  };
};

// Comparing the choices
let playGame = (choiceId) => {
  let options = ["rock", "paper", "scissors"];
  let userValue = Number(choiceId);
  let compValue = genCompChoice();

  let { userChoice, compChoice } = allChoices(userValue, compValue, options);

  // Check Draw
  if (userChoice === compChoice) {
    msg.innerHTML = "It was a Draw";
    msg.style.backgroundColor = "#0F1817";
  } else {
    if (compChoice === "rock") {
      if (userChoice === "paper") {
        user_score.innerHTML = ++userScore;
        msg.innerHTML = `You Wins! your ${userChoice} beats ${compChoice}.`;
        msg.style.backgroundColor = "#3B8132";
      } else {
        comp_score.innerHTML = ++compScore;
        msg.innerHTML = `You Lose, ${compChoice} beats your ${userChoice}.`;
        msg.style.backgroundColor = "#990F02";
      }
    } else if (compChoice === "paper") {
      if (userChoice === "scissors") {
        user_score.innerHTML = ++userScore;
        msg.innerHTML = `You Wins! your ${userChoice} beats ${compChoice}.`;
        msg.style.backgroundColor = "#3B8132";
      } else {
        comp_score.innerHTML = ++compScore;
        msg.innerHTML = `You Lose, ${compChoice} beats your ${userChoice}.`;
        msg.style.backgroundColor = "#990F02";
      }
    } else if (compChoice === "scissors") {
      if (userChoice === "rock") {
        user_score.innerHTML = ++userScore;
        msg.innerHTML = `You Wins! your ${userChoice} beats ${compChoice}.`;
        msg.style.backgroundColor = "#3B8132";
      } else {
        comp_score.innerHTML = ++compScore;
        msg.innerHTML = `You Lose, ${compChoice} beats your ${userChoice}.`;
        msg.style.backgroundColor = "#990F02";
      }
    }
  }
};

// Performing Event
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    let choiceId = choice.getAttribute("id");
    playGame(choiceId);
  });
});

resetBtn.addEventListener("click", () => {
  msg.innerHTML = "Play Your Move";
  userScore = 0;
  user_score.innerHTML = 0;
  compScore = 0;
  comp_score.innerHTML = 0;
  msg.style.backgroundColor = "#0F1817";
});
