let buttons = document.querySelectorAll(".container button");
let winner_msg = document.querySelector(".winner");
let msg = document.querySelector(".winner h1");
let new_btn = document.querySelector(".winner button");
let reset_btn = document.querySelector("#reset-btn button");
let turn = true;

function updateMargin() {
  const isFullscreen =
    window.innerWidth >= screen.width && window.innerHeight >= screen.height;

  reset_btn.style.height = isFullscreen ? "55px" : "45px";
  reset_btn.style.width = isFullscreen ? "150px" : "120px";
  reset_btn.style.fontSize = isFullscreen ? "18px" : "14px";
  winner_msg.style.margin = isFullscreen ? "330px" : "270px";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "F11") {
    setTimeout(updateMargin, 100);
  }
});

window.addEventListener("resize", updateMargin);
updateMargin();

let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (turn) {
      btn.innerHTML = "X";
      turn = false;
    } else {
      btn.innerHTML = "O";
      turn = true;
    }
    btn.disabled = true;
    checkWinner();
  });
});

let checkWinner = () => {
  for (pattern of winPatterns) {
    gameOver = true;
    let pos1 = buttons[pattern[0]].innerHTML;
    let pos2 = buttons[pattern[1]].innerHTML;
    let pos3 = buttons[pattern[2]].innerHTML;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        buttons.forEach((button) => {
          button.disabled = true;
        });
        return;
      }
    }
  }
};

let showWinner = (pos1) => {
  msg.innerHTML = `Congratulations, Winner is ${pos1}`;
  winner_msg.style.margin = "270px";
  winner_msg.classList.remove("hide");
  reset_btn.classList.add("hide");
};

new_btn.addEventListener("click", () => {
  buttons.forEach((bt) => {
    bt.disabled = false;
    bt.innerHTML = "";
  });
  msg.innerHTML = "";
  winner_msg.classList.add("hide");
  reset_btn.classList.remove("hide");
});

reset_btn.addEventListener("click", () => {
  buttons.forEach((bt) => {
    bt.disabled = false;
    bt.innerHTML = "";
  });
  msg.innerHTML = "";
  winner_msg.classList.add("hide");
});
