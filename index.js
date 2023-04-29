const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPositions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
];

// Function to Initialise the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","","",];
    boxes.forEach((box, index) => {
        box.innerText ="";
        boxes[index].style.pointerEvents = "all";
        // initialize css property again after wwin
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player  - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else
    {
        currentPlayer = "X";
    }
    // Update UI
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}; 
function checkGameOver(){
    let ans = "";
    winningPositions.forEach((position) => {
        // All 3 boxes will be non empty and exactly same 
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !=="")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]]=== gameGrid[position[2]]))
            {

                if(gameGrid[position[0]] === "X")
                    ans = "X";
                else
                    ans ="O";
                //stop the pointer
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none"; 
                })
                //now we know that who is winner 
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    if(ans !==""){
        gameInfo.innerText = `Winner Player - ${ans}`;
        newGameBtn.classList.add("active"); 
        return;
    }

    // If there is  no winner or game tied then we will comw to this code
    let fillCount =  0;
    gameGrid.forEach((box) =>{
        if(box !== ""){
            fillCount++;
        }
    });

    // if Boxe is Full Filled, That means game is tied
    if(fillCount === 9){
        gameInfo.innerText = " Game Tied !";
        newGameBtn.classList.add("active");
    }
}
function handleClick(index){
    if(gameGrid[index] === "")
    {
        // Boxes denotes the UI
        boxes[index].innerHTML = currentPlayer;
        // gameGrid shows the inner logic 
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // Swapping Turn
        swapTurn();
        checkGameOver();
    }
    
}



boxes.forEach((box, index) => {
    box.addEventListener("click", () =>{
        handleClick(index);
        // Pass index because i want know that which box is clicked
    })
});
newGameBtn.addEventListener("click", initGame);

