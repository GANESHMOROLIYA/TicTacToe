let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newbtn");
let msgContainer = document.querySelector("#msg-Container");
let msg = document.querySelector("#msg");

let turnO = true; // Player O starts

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Add click event to each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.classList.add("O");
      turnO = false;
    } else {
      box.innerText = "X";
      box.classList.add("X"); 
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

//  Disable all boxes
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

//  Enable all boxes and clear text
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
};

// Show winner message
const showWinner = (winner) => {
  msg.innerText = `Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

//Check for winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText; // fixed typo
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return;
      }
    }
  }

  // Check for draw
  let isDraw = Array.from(boxes).every((box) => box.innerText !== "");
  if (isDraw) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
  }
};

//  Reset game
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
