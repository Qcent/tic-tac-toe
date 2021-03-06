function player(name, sym) { // define a function for use as utility for storing a players name and symbol / 'X' or 'O'
    return {
        name,
        sym,

    }
}

let player1 = player('Player 1', 'X'); // prompt("Please enter name player 1:");
let player2 = player('Player 2', 'O'); // prompt("Please enter name player 2:");
let players = { // an object 'players' which is a key : value pair relating symbol used to the player name
    'X': player1,
    'O': player2
}

const board = (() => { // an object named board that will hold all data and methods related to the game board
    const spacesArr = Array.from(document.getElementsByClassName('space'));
    let playboardArray = ['', '', '', '', '', '', '', '', '']; //array of nine blank spaces
    let isPlaying = player1; // player 1 moves first / isPlaying first
    let moves = 0; // number of moves played counter

    for (let i = 0; i < spacesArr.length; i++) { // for every space on the board
        spacesArr[i].addEventListener('click', function(e) { // add a click listener that when triggered will run the following function
            const idx = parseInt(e.target.getAttribute('data-index')) // register the spaces index ie. which square/space it is
            if (spaceIsEmpty(playboardArray[idx])) { //if the space is empty 
                recordMove(idx); //record the click as a legal move
                renderBoard(); //redraw the board with move added
                moves++; //increment move counter
                if (moves == 9) { //if 9 moves are reaches
                    alert("It's a tie!"); // tie game baby. also know as a Cat's Game
                    board.reset(); //reset the board... do i even need to write this one
                }
            }

            /************************* */
            /*  WINNING CONDITION      */
            if (game.playerWon(playboardArray)) { // if receive a non falsy value from playerWon() method of game object after sending it playboardArray 
                // then the game is won and game.playerWon will return the row, colum or diagonal that make up the win

                renderWin(game.playerWon(playboardArray)); // adjusts the style of the winning row, colum or diagonal

                //set a little delay before announcing the win so the style change can be observed
                setTimeout(function() { alert(((isPlaying == player1) ? player2.name : player1.name) + " Has Won "); }, 300);


                // board.reset(); //reset board  /* let user admire the win and they can click reset button
            }
            /************************* */
        })
    }
    const renderWin = (boxes) => { //method to style the spaces of the winning game board
        var classesNodeList = document.querySelectorAll("." + boxes); // get list of all element boxes that make up the win
        var classes = Array.prototype.map.call(classesNodeList, function(element) { //use map method to go though each element
            element.classList.add("winCombo") // add class winCombo to the wining spaces
        });
    }
    const clearWin = (boxes) => { //method to unstyle the spaces of the winning game board
        var classesNodeList = document.querySelectorAll(".space"); // get list of all boxes that make up the board
        var classes = Array.prototype.map.call(classesNodeList, function(element) { //use map method to go though each element
            element.classList.remove("winCombo"); // remove class winCombo to the wining spaces
        });
    }
    const renderBoard = () => { //method to draw the state of the game board
        for (let i = 0; i < spacesArr.length; i++) { //loop to iterate through every space on the board
            spacesArr[i].textContent = playboardArray[i]; //the space at index i is set equal to the playerboardArray at the same index number
        }
    }
    const reset = () => { // method to reset the game board
        clearWin(); // removes styling of winning boxes
        playboardArray = playboardArray.map(function() { //map() method creates a new array populated with the results of a provided function on every element in the calling array
            return ''; // (a fancy foreach type loop) sets all elements to '' / blank but defined.
        });
        renderBoard(); //redraws the board 
        isPlaying = player1; // player one will move next ie. start the game
        moves = 0; //we should reset the moves counter too

        /* hack in this brute force page reload to refresh JS CSS changes  for now */
        //location.reload()
    }
    const spaceIsEmpty = (item) => { // method to determine if the provided game board space 'item' is empty  / a fancy if statement called as function
        return item === ''; // returns true if the space is exatcly a string of value '' / blank but defined
    };
    const recordMove = (idx) => { // method to register a move made by a player 'idx' to playboardArray
        if (spaceIsEmpty(playboardArray[idx])) { // if the space at the provided index in playboardArray is empty
            playboardArray[idx] = isPlaying.sym; //change the blank value at that index to be the symbol of the player who isPlaying
        }
        isPlaying = (isPlaying == player1) ? player2 : player1; //using a ternary operatior (an inline if statement) toggle which player isPlaying
    } /*           (eval this statement) if true=this : if false=this          */
    const getArray = function() { //method to return the playboardArray
        return playboardArray // see above
    }

    return { // when the board object is called it will run and return the values of the following methods as an array of values
        getArray, //run this method
        renderBoard, //run this method
        reset, //run this method /*  but should we reset the board here? */
    }
})();

const resetBtn = document.getElementById('reset-btn') // set a var to identify teh DOM object #reset-btn
resetBtn.addEventListener('click', board.reset); // add a click listener to resetBtn

const game = (() => { // an object 'game' that will contain all variables and methods relating to the game logic

    const playerWon = (boardArray) => { // the only method we need / will analyise the whole game board (boardArray) and detrmines if a winning state has been reached

        //check every box in every row
        if (boardArray[0] !== '' && // if one of the spaces isnt blank and they all equal eachother they must all be either X's or O's
            boardArray[0] === boardArray[1] &&
            boardArray[0] === boardArray[2]) {
            return "fr"; //first row
        }
        if (boardArray[3] !== '' &&
            boardArray[3] === boardArray[4] &&
            boardArray[3] === boardArray[5]) {
            return "sr"; //second row
        }
        if (boardArray[6] !== '' &&
            boardArray[6] === boardArray[7] &&
            boardArray[6] === boardArray[8]) {
            return "tr"; //third row
        }
        //check every column
        if (boardArray[0] !== '' &&
            boardArray[0] === boardArray[3] &&
            boardArray[0] === boardArray[6]) {
            return "fc"; //first column
        }
        if (boardArray[1] !== '' &&
            boardArray[1] === boardArray[4] &&
            boardArray[1] === boardArray[7]) {
            return "sc"; //second column
        }
        if (boardArray[2] !== '' &&
            boardArray[2] === boardArray[5] &&
            boardArray[2] === boardArray[8]) {
            return "tc"; //third column
        }

        //check both diagonals
        if (boardArray[0] !== '' &&
            boardArray[0] === boardArray[4] &&
            boardArray[0] === boardArray[8]) {
            return "bs"; // the backslash diagonal
        }
        if (boardArray[2] !== '' &&
            boardArray[2] === boardArray[4] &&
            boardArray[2] === boardArray[6]) {
            return "fs"; // the front slash diagonal
        }

        return false;


        /*  this switch logic is not working corectly because when all the spaces are blank they are also equal to eachother
                switch (true) {

                    case (boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2]):
                        winningPlayer = [true, boardArray[0]];
                        console.log("we be checking");
                        //checks for row
                        break;
                    case (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5]):
                        winningPlayer = [true, 'blah'];
                        break;
                    case (boardArray[5] == boardArray[6] && boardArray[6] == boardArray[7]):
                        winningPlayer = [true, boardArray[5]];
                        break;
                        //checks for column
                    case (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6]):
                        winningPlayer = [true, boardArray[0]];
                        break;
                    case (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7]):
                        winningPlayer = [true, boardArray[1]];
                        break;
                    case (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8]):
                        winningPlayer = [true, boardArray[2]];
                        break;
                        //checks for diagonal 
                    case (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8]):
                        winningPlayer = [true, boardArray[4]];
                        break;
                    case (boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6]):
                        winningPlayer = [true, boardArray[4]];
                        break;
                    default:
                        winningPlayer = false;
                }
                return winningPlayer;
                */
    }

    return { // the default return value of the game object is to invoke playerWon ?  not sure here
        playerWon,
    }
})()