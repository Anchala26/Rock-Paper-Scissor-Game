const closeRules = document.getElementById("rules");

const main = document.querySelector(".main");
const played = document.querySelector(".played");
const uchoice = document.getElementById("uchoice");
const cchoice = document.getElementById("cchoice");
const userImg = document.getElementById("user_img");
const compImg = document.getElementById("comp_img");
const trianglebox = document.getElementById("triangle");
const mText = document.getElementById("m-text");
const printResult = document.getElementById("print-result");
const nextButton = document.getElementById("next-button");

// to open nd close rules using rules button
function buttonFunction() {
  if (closeRules.style.display == "none") {
    closeRules.style.display = "block";
  } else {
    closeRules.style.display = "none";
  }
}
//for cross button on rule box
function closed() {
  if (closeRules.style.display == "block") {
    closeRules.style.display = "none";
  }
}

//for play again button
function play_again_btn() {
  main.style.display = "flex";
  trianglebox.style.display = "block";
  played.style.display = "none";
}

//after getting choice to display it on screen and remove seletion screen
function hide_main_show_played() {
  // removing the triangle
  trianglebox.style.display = "none";

  main.style.display = "none";
  played.style.display = "flex";
}

// for showing celebration for winner
let a1User = document.querySelector(".a1-user");
let a2User = document.querySelector(".a2-user");
let a3User = document.querySelector(".a3-user");
function show_user_rings() {
  a1User.style.visibility = "visible";
  a2User.style.visibility = "visible";
  a3User.style.visibility = "visible";
  a1User.style.animation = "circle 3s ease-in-out infinite";
  a2User.style.animation = "circle 3s ease infinite";
}
function hide_user_rings() {
  a1User.style.visibility = "hidden";
  a2User.style.visibility = "hidden";
  a3User.style.visibility = "hidden";
  uchoice.style.visibility = "visible";
  a1User.style.animation = "none";
  a2User.style.animation = "none";
}

let a1Comp = document.querySelector(".a1-comp");
let a2Comp = document.querySelector(".a2-comp");
let a3Comp = document.querySelector(".a3-comp");
function show_comp_rings() {
  a1Comp.style.visibility = "visible";
  a2Comp.style.visibility = "visible";
  a3Comp.style.visibility = "visible";
  a1Comp.style.animation = "circle 3s ease-in-out infinite";
  a2Comp.style.animation = "circle 3s ease-in-out infinite";
}
function hide_comp_rings() {
  a1Comp.style.visibility = "hidden";
  a2Comp.style.visibility = "hidden";
  a3Comp.style.visibility = "hidden";
  cchoice.style.visibility = "visible";
  a1Comp.style.animation = "none";
  a2Comp.style.animation = "none";
}

// choice selection by computer
function random_choice() {
  let option = ["stone", "paper", "scissors"];
  let randomChoice = Math.floor(Math.random() * 3);
  return option[randomChoice];
}

//when it is tie
function show_tie(u_b_color, user_Img, c_b_color, comp_Img) {
  console.log("tie");
  uchoice.style.border = `10px solid ${u_b_color}`;
  userImg.src = `image/${user_Img}.png`;

  mText.style.display = "none";
  printResult.innerHTML = "TIE UP";
  let change = document.querySelector(".play-again");
  change.textContent = "REPLAY";

  cchoice.style.border = `10px solid ${c_b_color}`;
  compImg.src = `image/${comp_Img}.png`;

  nextButton.style.display = "none";
  hide_user_rings();
  hide_comp_rings();
}

//when user lose
function user_lose(u_b_color, user_Img, c_b_color, comp_Img) {
  console.log("lose");
  uchoice.style.border = `10px solid ${u_b_color}`;
  userImg.src = `image/${user_Img}.png`;

  printResult.innerHTML = "YOU LOST";
  mText.style.display = "block";

  cchoice.style.border = `10px solid ${c_b_color}`;
  compImg.src = `image/${comp_Img}.png`;

  nextButton.style.display = "none";

  show_comp_rings();
  hide_user_rings();

  showCompScore();
}

//when user wins
function user_win(u_b_color, user_Img, c_b_color, comp_Img) {
  console.log("win");
  uchoice.style.border = `10px solid ${u_b_color}`;
  userImg.src = `image/${user_Img}.png`;

  printResult.innerHTML = "YOU WIN";
  mText.style.display = "block";

  cchoice.style.border = `10px solid ${c_b_color}`;
  compImg.src = `image/${comp_Img}.png`;

  nextButton.style.display = "inline-flex";

  show_user_rings();
  hide_comp_rings();

  showUserScore();
}

// user selecting stone
function stone() {
  hide_main_show_played();
  let compChoice = random_choice();
  if (compChoice == "scissor") {
    user_win("#0074b6", "stone", "#bd00ff", "scissor");
  } else if (compChoice == "paper") {
    user_lose("#0074b6", "stone", "#ffa943", "paper");
  } else {
    // console.log(compChoice);
    show_tie("#0074b6", "stone", "#0074b6", "stone");
  }
}

// user selecting paper
function paper() {
  hide_main_show_played();
  let compChoice = random_choice();
  if (compChoice == "scissor") {
    user_lose("#ffa943", "paper", "#bd00ff", "scissor");
  } else if (compChoice == "stone") {
    user_win("#ffa943", "paper", "#0074b6", "stone");
  } else {
    show_tie("#ffa943", "paper", "#ffa943", "paper");
  }
}

// user selecting scissor
function scissor() {
  hide_main_show_played();
  let compChoice = random_choice();
  if (compChoice == "paper") {
    user_win("#bd00ff", "scissor", "#ffa943", "paper");
  } else if (compChoice == "stone") {
    user_lose("#bd00ff", "scissor", "#0074b6", "stone");
  } else {
    show_tie("#bd00ff", "scissor", "#bd00ff", "scissor");
  }
}

// for scores

// Initialize the user's score from localStorage or set to 0 if not found
let userScore = parseInt(localStorage.getItem("userScore")) || 0;
let displayUserScore = document.getElementById("displayUserScore");

// Initialize the computer's score from localStorage or set to 0 if not found
let compScore = parseInt(localStorage.getItem("compScore")) || 0;
let displayCompScore = document.getElementById("displayCompScore");

function showCompScore() {
  compScore++;
  displayCompScore.textContent = compScore;
  localStorage.setItem("compScore", compScore);
}

function showUserScore() {
  userScore++;
  displayUserScore.textContent = userScore;
  localStorage.setItem("userScore", userScore);
}

displayUserScore.textContent = userScore;
displayCompScore.textContent = compScore;
