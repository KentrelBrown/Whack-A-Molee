document.addEventListener("DOMContentLoaded", () => {
    
  // START SCREEN
  const startScreen = document.querySelector(".startScreen");
  const startBtn = document.getElementById("start");

  const startMole = document.getElementById("startMole");
  const startHammer = document.getElementById("startHammer");

  // GAME
  const gameUI = document.querySelector(".gameUI");

  const gameHammer = document.getElementById("gameHammer");
  const gameMole = document.getElementById("gameMole");

  const holes = document.querySelectorAll(".hole");
  const holeArray = Array.from(holes);

  const timer = document.getElementById("timer");
  const score = document.getElementById("score");

  const win = document.getElementById("winUpdate");
  const lose = document.getElementById("loseUpdate");

  let count = 30;
  let myScore = 100;
  let difficulty = 1;

  let moleMove;
  let countdown;

  timer.textContent = count;
  score.textContent = myScore;

  // -----------------------
  // START SCREEN ANIMATION
  // -----------------------

  document.addEventListener("mousemove", (e) => {

    startHammer.style.left = e.clientX + "px";
    startHammer.style.top = e.clientY + "px";

    gameHammer.style.left = e.clientX + "px";
    gameHammer.style.top = e.clientY + "px";
  });

  function moveStartMole(){

    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);

    startMole.style.left = x + "px";
    startMole.style.top = y + "px";
  }

  const startAnim = setInterval(moveStartMole, 800);

  // -----------------------
  // START GAME
  // -----------------------

  startBtn.addEventListener("click", () => {

    startScreen.style.display = "none";

    gameUI.style.display = "block";

    clearInterval(startAnim);

    startGame();
  });

  // -----------------------
  // GAME START
  // -----------------------

  function startGame(){

    startTimer();

    startMoleMovement();

    setInterval(() => {

      difficulty += 0.2;

      if(count > 0){
        startMoleMovement();
      }
      else{
        endGame();
      }

    }, 5000);
  }

  // -----------------------
  // When the game ends
  // -----------------------
  function endGame(){
    const body = document.body;

    gameUI.style.display = "none";

    body.style.display = "white";

    const finalScore = document.createElement("h1");
    finalScore.textConent = "Final Score: " + myScore;
    finalScore.style.textAlign = "center";
    finalScore.style.marginTop = "100px";

    document.body.appendChild(finalScore);
  }

  // -----------------------
  // TIMER
  // -----------------------

  function startTimer(){

    countdown = setInterval(() => {

      count--;

      timer.textContent = count;

      if(count <= 0){

        clearInterval(countdown);

        clearInterval(moleMove);

        gameMole.style.display = "none";
      }

    }, 1000);
  }

  // -----------------------
  // MOLE MOVEMENT
  // -----------------------

  function startMoleMovement(){

    clearInterval(moleMove);

    moleMove = setInterval(() => {

      const random =
      Math.floor(Math.random() * holeArray.length);

      const rect =
      holeArray[random].getBoundingClientRect();

      gameMole.style.left = rect.left + "px";

      gameMole.style.top = rect.top + "px";

      gameMole.style.display = "block";

    }, 1200 / difficulty);
  }

  // -----------------------
  // HIT MOLE
  // -----------------------

  gameMole.addEventListener("click", (e) => {

    e.stopPropagation();

    myScore += 100;

    score.textContent = myScore;

    win.style.display = "block";

    setTimeout(() => {
      win.style.display = "none";
    }, 300);
  });

  // -----------------------
  // MISS CLICK
  // -----------------------

  document.addEventListener("click", () => {

    if(gameUI.style.display === "block"){

      myScore -= 100;

      score.textContent = myScore;

      lose.style.display = "block";

      setTimeout(() => {
        lose.style.display = "none";
      }, 300);
    }
  });

});
