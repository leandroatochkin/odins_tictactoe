const renderBoard = () => {

    const container = document.querySelector('#container')
    const board = []
    const squares = []
    for(let i = 0; i < 3; i++){
        let row = document.createElement("div");
         row.setAttribute("class", "row");
         container.appendChild(row);
         let rowArray = []
         board.push(rowArray)
        for(let x = 0; x < 3; x++){
            const square = document.createElement( 'div' );
            square.classList.add('square')
            row.appendChild(square)
            rowArray.push(0)
            squares.push(square)
        }
    }
    return{board, squares}
}

const gameController = (squares, players, board) =>{
    let playerIndex = 0;
    let currentPlayer = players[playerIndex];
    squares.forEach((square, index)=>{
        const x = Math.floor(index / 3)///get the position in the row using remainder(ex: if the result of /3 is 0 its the first row and so on)
        const y = index % 3//get the position in the column after getting row using the remainder of index % 3 (ex: row[2/3==0.6 = floor = 0] => row[0] then use the remainder of index % 3 to get column, so row[0][index%3==0] => row[0][0])
        square.addEventListener('click', () => {
            if (board[x][y] === 0){
            square.textContent = currentPlayer.userSymbol
            board[x][y] = currentPlayer.userSymbol;
            playerIndex = (playerIndex + 1 ) % 2;
            currentPlayer = players[playerIndex]
            };
            let result = checkForWinner(squares, players)
            if (result) {
                if (result === 'tie') { 
                    console.log('tie')
                    reset(squares, board);
                } else if(result !== 'tie' &&(result==players[0]||result==players[1])){
                    result.addScore();
                    reset(squares, board);
                    playerOneScore.textContent = players[0].getScore().toString()
                    playerTwoScore.textContent = players[1].getScore().toString()
                }
            }
        });
    });  
}

const checkForWinner = (arr, players) => {
    let winner = null;
    if(
    (arr[0].textContent=='X'&&arr[1].textContent=='X'&&arr[2].textContent=='X')||//columns
    (arr[3].textContent=='X'&&arr[4].textContent=='X'&&arr[5].textContent=='X')||
    (arr[6].textContent=='X'&&arr[7].textContent=='X'&&arr[8].textContent=='X')||
    (arr[0].textContent=='X'&&arr[3].textContent=='X'&&arr[6].textContent=='X')||//rows
    (arr[1].textContent=='X'&&arr[4].textContent=='X'&&arr[7].textContent=='X')||
    (arr[2].textContent=='X'&&arr[5].textContent=='X'&&arr[8].textContent=='X')||
    (arr[0].textContent=='X'&&arr[4].textContent=='X'&&arr[8].textContent=='X')||//diagonals
    (arr[2].textContent=='X'&&arr[4].textContent=='X'&&arr[6].textContent=='X')
    ){  
        winner = players[0]
    } else if (
        (arr[0].textContent=='O'&&arr[1].textContent=='O'&&arr[2].textContent=='O')||
        (arr[3].textContent=='O'&&arr[4].textContent=='O'&&arr[5].textContent=='O')||
        (arr[6].textContent=='O'&&arr[7].textContent=='O'&&arr[8].textContent=='O')||
        (arr[0].textContent=='O'&&arr[3].textContent=='O'&&arr[6].textContent=='O')||
        (arr[1].textContent=='O'&&arr[4].textContent=='O'&&arr[7].textContent=='O')||
        (arr[2].textContent=='O'&&arr[5].textContent=='O'&&arr[8].textContent=='O')||
        (arr[0].textContent=='O'&&arr[4].textContent=='O'&&arr[8].textContent=='O')||
        (arr[2].textContent=='O'&&arr[4].textContent=='O'&&arr[6].textContent=='O'))
        {
        winner = players[1]
    }
    if (winner === null && !arr.some(cell => cell.textContent === '')) {
        winner = 'tie';
    }
    return winner
}

const reset = (squares, board) => {
    squares.forEach(square => {
        square.textContent = ''; // Clear the square content
    });
    board.forEach(row => {
        row.fill(0); // Reset each row of the board to contain zeros
    });
}

function createUser(name, symbol){
    const userName = name;
    const userSymbol = symbol;
    let score = 0;
    const addScore = () => score++;
    const getScore = () => score;
    return{userName, userSymbol, addScore, getScore}
}

const createPlayers = () => {
        const player1 = createUser(window.prompt("Please enter Player One's name:", ''), 'X')
        const player2 = createUser(window.prompt("Please enter Player Two's name:", ''), 'O')
        return[player1,player2]
}

const{squares, board} = renderBoard();
const players = createPlayers();

gameController(squares, players, board)

let playerOneName = document.querySelector('#player1name')
let playerOneScore = document.querySelector('#player1score')
let playerTwoName = document.querySelector('#player2name')
let playerTwoScore = document.querySelector('#player2score')
    
playerOneName.textContent = players[0].userName
   
playerTwoName.textContent = players[1].userName
    
    
    

