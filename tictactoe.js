//variable set up for a new game
const boxes = document.querySelectorAll('.box');
const statusText = document.getElementById('statusText');
const spaces = [];
const Circle_Text = "O";
const Cross_Text = "X";

//draws a new board, draws border based on box index(location)
const drawBoard = () => {
    boxes.forEach((box, i) => {
        let styleString = '';
        if (i < 3) {
            styleString += 'border-bottom: 3px solid blue;';
        }
        if(i % 3 === 0) {
            styleString += 'border-right: 3px solid blue;';
        }
        if(i % 3 === 2) {
            styleString += 'border-left: 3px solid blue;';
        }
        if(i > 5) {
            styleString += 'border-top: 3px solid blue;';
        }
        box.style = styleString;
        box.addEventListener('click', boxClicked)
    });
};

//checks box if not clicked then adds the player's icon, then checks for a winner or a draw
const boxClicked = (e) => {
    const id = e.target.id;
    if(!spaces[id]){
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        if (playerHasWon()) {
            statusText.innerText = `${currentPlayer} has WON!!!`;
            return;
        }

        if (endInDraw()) {
            statusText.innerText = `It is a Draw !`;
            return;
        }

        currentPlayer = currentPlayer === Cross_Text ? Circle_Text : Cross_Text;
        statusText.innerText = `It's ${currentPlayer}'s Turn`;
    }
};

//checks if the current player has won
const playerHasWon = () => {
    if(spaces[0] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[2] === currentPlayer){
            return true;
        }
        if(spaces[4] === currentPlayer && spaces[8] === currentPlayer){
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[6] === currentPlayer){
            return true;
        }
    }
    if(spaces[8] === currentPlayer){
        if(spaces[6] === currentPlayer && spaces[7] === currentPlayer){
            return true;
        }
        if(spaces[2] === currentPlayer && spaces[5] === currentPlayer){
            return true;
        }
    }
    if(spaces[4] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[7] === currentPlayer){
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[5] === currentPlayer){
            return true;
        }
        if(spaces[2] === currentPlayer && spaces[6] === currentPlayer){
            return true;
        }
    }

};

const endInDraw = () => {
    let playerdraw = 0;
    spaces.forEach((space, i) => {
      if (spaces[i] !== null) playerdraw += 1;
    });
    if (playerdraw === 9) {
       return true;
    };
};

//prepares for a new game when the button is clicked
const newgame = () => {
    spaces.forEach((space, i) => {
        spaces[i] = null;
    });
    boxes.forEach((box) => {
        box.innerText = '';
    });
    currentPlayer = Cross_Text;
    statusText.innerText = `It's ${currentPlayer}'s Turn`;
}

newGameButton.addEventListener('click', newgame);

newgame();
drawBoard();

