const userMarkChoiceX = document.querySelector(".icon-x-active");
const userMarkChoiceO = document.querySelector(".icon-o-active");
const userMarkChoiceiconX = document.querySelector(".select__icon__x");
const userMarkChoiceiconO = document.querySelector(".select__icon__o");
const gameTiles = document.querySelectorAll(".game-tile");
const playerCpu = document.querySelector(".cpu-btn");
const playerP = document.querySelector(".player-btn");
const overlay = document.getElementById('overlay');
const easyLevel = document.getElementById('easy-btn');
const hardLevel = document.getElementById('hard-btn');
const homePage = document.querySelector('.home-page');
const gamePage = document.querySelector('.game-page');
let vsPlayer;
let backgroundImgUrl;
let currentPlayerMark;
let cpuMark;
let gameLevel;

userMarkChoiceX.addEventListener("click", function(event){
  event.preventDefault();
  userMarkChoiceX.classList.add('selected')
  userMarkChoiceO.classList.remove('selected')
  backgroundImgUrl = "url('./assets/icon-o.svg')";
  currentPlayerMark = "X";
  cpuMark = "O"
  hover2()
})

userMarkChoiceO.addEventListener("click", function(event){
  event.preventDefault();
  userMarkChoiceO.classList.add('selected')
  userMarkChoiceX.classList.remove('selected')  
  backgroundImgUrl = "url('./assets/icon-x.svg')";
  currentPlayerMark = "O";
  cpuMark = "X"
  hover2() 
})

easyLevel.addEventListener('click', () => {
  alert('You selected EASY level.');
  overlay.style.display = 'none';
  gameLevel = "Easy";
  homePage.style.display = 'none';
  gamePage.style.display = 'inline';
  console.log(gameLevel)
});

hardLevel.addEventListener('click', () => {
  alert('You selected HARD level.');
  overlay.style.display = 'none';
  gameLevel = "Hard";
  homePage.style.display = 'none';
  gamePage.style.display = 'inline';
  console.log(gameLevel)
});

playerCpu.addEventListener("click", function(e){
  // console.log("User vs CPU")
  vsPlayer = "CPU"

  overlay.style.display = 'flex';

  if(currentPlayerMark == 'X'){
    gameTiles.forEach(tile=>{
      tile.addEventListener("click", playVsCpu)
    })
  }else{
    const i = Math.floor(Math.random()*3);
    const j = Math.floor(Math.random()*3);
    grid[i][j] = cpuMark;
    backgroundImgUrl = "url('./assets/icon-x.svg')";
    const targetElement = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
    targetElement.style.setProperty('--chosen-mark-filled', backgroundImgUrl);
    targetElement.style.setProperty('--chosen-mark-hover', backgroundImgUrl);
    gameTiles.forEach(tile=>{
      tile.addEventListener("click", playVsCpu)
    })
  }
})

playerP.addEventListener("click", function(e){
  vsPlayer = "human"
  homePage.style.display = 'none';
  gamePage.style.display = 'inline';
  gameTiles.forEach(tile=>{
    tile.addEventListener("click", playVsplayer)
  })
  
})


function playVsplayer(e){
  hover2()
  backgroundImgUrl = backgroundImgUrl === "url('./assets/icon-x.svg')" ? "url('./assets/icon-o.svg')": "url('./assets/icon-x.svg')"
  e.target.style.setProperty('--chosen-mark-filled', backgroundImgUrl);
  e.target.style.setProperty('--chosen-mark-hover', backgroundImgUrl);
  e.target.removeEventListener("click", playVsplayer)
  e.target.style.setProperty('cursor', 'no-drop')
  currentPlayerMark = currentPlayerMark === "X" ? "O" : "X";
  hover2();
  checkWinner();
}

function hover2(){
  const hoverImgUrl = currentPlayerMark === "X" ? "url('./assets/icon-x-outline.svg')" : "url('./assets/icon-o-outline.svg')";
  gameTiles.forEach((tile) => {
    if (!tile.style.getPropertyValue("--chosen-mark-filled")) {
      tile.style.setProperty('--chosen-mark-hover', hoverImgUrl);
    }
  });
}



function checkWinner(){
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winningCombinations.forEach(array => {
    const crossWins = array.every(cell => 
      gameTiles[cell].style.getPropertyValue("--chosen-mark-filled") === "url('./assets/icon-x.svg')")

    if(crossWins){
      console.log("Cross Wins")
      removeHover()
      gameTiles.forEach(tile => tile.style.setProperty('cursor', 'no-drop'))
      gameTiles.forEach(tile => tile.replaceWith(tile.cloneNode(true)))
      if(cpuMark == 'X'){
        return -10;
      }else{
        return +10;
      }   
    }
  })

  winningCombinations.forEach(array => {
    const circleWins = array.every(cell => 
      gameTiles[cell].style.getPropertyValue("--chosen-mark-filled") === "url('./assets/icon-o.svg')")    
    if(circleWins){
      console.log("Circle Wins")
      removeHover()
      gameTiles.forEach(tile => tile.style.setProperty('cursor', 'no-drop'))
      gameTiles.forEach(tile => tile.replaceWith(tile.cloneNode(true))) 
      return  
    }
  })

  
}

function removeHover(){
  const hoverImgUrl = "none"
  gameTiles.forEach((tile) => {
    if (!tile.style.getPropertyValue("--chosen-mark-filled")) {
      tile.style.setProperty('--chosen-mark-hover', hoverImgUrl);
    }
  });
}


///////////////////////////////////


let grid = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

function isGameOver(){

  for(var i = 0; i < 3; i++){
  if(grid[i][0] !== '' && grid[i][0] === grid[i][1] && grid[i][0] === grid[i][2]){
      return grid[i][0];
    }
  }

    
  for(var j = 0; j < 3; j++){
    if(grid[0][j] !== '' && grid[0][j] === grid[1][j] && grid[0][j] === grid[2][j]){
      return grid[0][j];
    }
  }

  if(grid[0][0] !== '' && grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]){
    return grid[0][0];
  }
  
  if(grid[2][0] !== '' && grid[2][0] === grid[1][1] && grid[2][0] === grid[0][2]){
  return grid[2][0];
  }


  for(var i = 0; i < 3; i++){
    for(var j = 0; j < 3; j++){
      if(grid[i][j] == ''){
        return false;
      }
    }
  }

  return null

}


function moveAI(){

  if(gameLevel == "Easy"){

    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        if(grid[i][j] == ''){
          console.log("AI move:", i, j);
          return {
            i: i,
            j: j
          }
        }
      }
    }
    
  }else{
    //using minimax
    let bestScore = -Infinity;
    let move;
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        if(grid[i][j] == ''){
          
          grid[i][j] = cpuMark;
          let score = minimax(grid, 0 , false);
          grid[i][j] = '';
          if(score > bestScore){
            bestScore = score;
            move = {i, j}
          }
        }
      }
    }
  
    return move;
  }
}


function minimax(grid, depth, isMaximize){
  let result = isGameOver();
  if(currentPlayerMark === 'X'){
    if(result === 'X'){
      return -10;
    }else if(result === 'O'){
      return 10;
    }else if(result === null){
      return 0;
    }
  }else{
    if(result === 'O'){
      return -10;
    }else if(result === 'X'){
      return 10;
    }else if(result === null){
      return 0;
    }
  }


  if(isMaximize){
    let bestScore = -Infinity
    for(var i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if(grid[i][j] == ''){
          grid[i][j] = cpuMark;
          let score = minimax(grid, depth+1, false);
          grid[i][j] = '';
          bestScore = Math.max(score, bestScore)
        }
      }
    }
    return bestScore;
  }else{
    let bestScore = Infinity
    for(var i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if(grid[i][j] == ''){
          grid[i][j] = currentPlayerMark;
          let score = minimax(grid, depth+1, true); 
          grid[i][j] = '';
          bestScore = Math.min(score, bestScore)
        }
      }
    }
    return bestScore;
  }

}

function playVsCpu(e) {
  // if (currentPlayerMark === "X") {
    const $this = $(e.target);
    const i = $this.data('i');
    const j = $this.data('j');

    if (i !== undefined && j !== undefined && i >= 0 && i < grid.length && j >= 0 && j < grid[i].length) {
      if(currentPlayerMark === "X"){
        backgroundImgUrl = "url('./assets/icon-x.svg')";
      }else{
        backgroundImgUrl = "url('./assets/icon-o.svg')";
      }      
      e.target.style.setProperty('--chosen-mark-filled', backgroundImgUrl);
      e.target.style.setProperty('--chosen-mark-hover', backgroundImgUrl);
      e.target.removeEventListener("click", playVsCpu);
      e.target.style.setProperty('cursor', 'no-drop');
      grid[i][j] = currentPlayerMark;

      let gameState = isGameOver();

      if (gameState) {
        alert("WINNER IS" + gameState) 
        removeHover()  
        gameTiles.forEach(tile => tile.style.setProperty('cursor', 'no-drop'))
        gameTiles.forEach(tile => tile.replaceWith(tile.cloneNode(true))) 
        return       
      } else {
        const move = moveAI();       
        grid[move.i][move.j] = cpuMark;
        if(cpuMark === 'O'){
          backgroundImgUrl = "url('./assets/icon-o.svg')";
        }else{
          backgroundImgUrl = "url('./assets/icon-x.svg')";
        }
        
        const targetElement = document.querySelector(`[data-i="${move.i}"][data-j="${move.j}"]`)
        targetElement.style.setProperty('--chosen-mark-filled', backgroundImgUrl);
        targetElement.style.setProperty('--chosen-mark-hover', backgroundImgUrl);
      }

      gameState = isGameOver();

      if (gameState) {
        alert("WINNER IS   " + gameState)
        removeHover()  
        gameTiles.forEach(tile => tile.style.setProperty('cursor', 'no-drop'))
        gameTiles.forEach(tile => tile.replaceWith(tile.cloneNode(true))) 
        return        
      } 
    }
  // }
}


