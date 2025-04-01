let btnRef = document.querySelectorAll('.button-option')
let popupRef = document.querySelector('.popup')
let newgameBtn = document.getElementById('new-game')
let restartBtn = document.getElementById('restart')
let msgRef = document.getElementById('message')

//Winning Pattern Array
let winningPattern = [
    [0, 1, 2], [6, 7, 8], [3, 4, 5], //Rows
    [0, 3, 6], [2, 5, 8], [1, 4, 7], //Columns
    [0, 4, 8], [2, 4, 6],            //Diagonals
]

let xTurn = true //Player 'X' plays first
let count = 0    //Move counter

//disbale all buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disable = true))
    //enable popup
    popupRef.classList.remove('hide')
}

//enable all buttons (for new game and restart)
const  enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = ''
        element.disabled = false
    })
    //disable popup
    popupRef.classList.add('hide')
    xTurn = true //reset turn to player
}

//this funtion is executed when a player wins
const winFunction = (letter) => {
    disableButtons()
       //popup message for win
    if (letter == 'X') {
        msgRef.innerHTML = `&#x1F389 <br> 'X' Wins`
    } else {
        msgRef.innerHTML = `&#x1F389 <br> 'O' Wins`
    } 
}

//Funtion for draw
const drawFunction = () => {
    disableButtons()
    msgRef.innerHTML = `&#x1F60E <br>  It's a Draw`
}

//new game
newgameBtn.addEventListener('click', () => {
    count = 0
    enableButtons()
})

restartBtn.addEventListener('click', () => {
    count = 0
    enableButtons()
})

//win Checker logic 
const winChecker = () => {
    //Look through all win patterns
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ]
        //check if elements are filled
        //if 3 empty elements are same and would give win as would
        if (element1 != '' && element2 != '' && (element3 != '')) {
            if (element1 === element2 && element2 === element3) {
                //if all 3 buttons have same value to win, then pass the value to winFunction
                winFunction(element1, i)
                return
            }
        }
    }
}

//AI Move (Easy Mode)
// const aiMove = () => {
//     let emptyCells = []
//     //get all empty buttons
//     btnRef.forEach((btn, index) => {
//         if (btn.innerText == '') emptyCells.push(index)
//     })
//     //get random number from empty cells
//     if (emptyCells.length > 0) {
//         let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)]
//         //display O on random cell
//         btnRef[randomIndex].innerHTML = 'O'
//         btnRef[randomIndex].disabled = true
//         //increment count on each click
//         count++

//         if (winChecker()) return //Check for win after AI move
//         if (count === 9) {drawFunction()} //Check for draw after AI move
//     }
// }

// AI Move - Intermediate Level
const aiMove = () => {
    let bestMove = null;

    // 1. Check if AI can win this turn
    for (let pattern of winningPattern) {
        let [a, b, c] = pattern;
        if (btnRef[a].innerText === "O" && btnRef[b].innerText === "O" && btnRef[c].innerText === "") {
            bestMove = c;
            break;
        }
        if (btnRef[a].innerText === "O" && btnRef[c].innerText === "O" && btnRef[b].innerText === "") {
            bestMove = b;
            break;
        }
        if (btnRef[b].innerText === "O" && btnRef[c].innerText === "O" && btnRef[a].innerText === "") {
            bestMove = a;
            break;
        }
    }

    // 2. Block opponent from winning
    if (bestMove === null) {
        for (let pattern of winningPattern) {
            let [a, b, c] = pattern;
            if (btnRef[a].innerText === "X" && btnRef[b].innerText === "X" && btnRef[c].innerText === "") {
                bestMove = c;
                break;
            }
            if (btnRef[a].innerText === "X" && btnRef[c].innerText === "X" && btnRef[b].innerText === "") {
                bestMove = b;
                break;
            }
            if (btnRef[b].innerText === "X" && btnRef[c].innerText === "X" && btnRef[a].innerText === "") {
                bestMove = a;
                break;
            }
        }
    }

    // 3. Pick the best available move (Center > Corners > Sides)
    if (bestMove === null) {
        if (btnRef[4].innerText === "") {
            bestMove = 4; // Center
        } else {
            const corners = [0, 2, 6, 8];
            const sides = [1, 3, 5, 7];

            for (let i of corners) {
                if (btnRef[i].innerText === "") {
                    bestMove = i;
                    break;
                }
            }

            if (bestMove === null) {
                for (let i of sides) {
                    if (btnRef[i].innerText === "") {
                        bestMove = i;
                        break;
                    }
                }
            }
        }
    }

    // Play AI move
    if (bestMove !== null) {
        btnRef[bestMove].innerText = "O";
        btnRef[bestMove].disabled = true;
        count++;

        // Check for a win
        winChecker();
    }
};


//display X/O on click
btnRef.forEach((element) => {
    element.addEventListener('click', () => {
        if (xTurn) {
            xTurn = false
            //display X
            element.innerText = 'X'
            element.disabled = true
            count++
        }
        // } else {
        //     xTurn = true
        //     //display O
        //     element.innerText = 'O'
        //     element.disabled = true
        // }

        //increment count on each click
        // count += 1
        // if(count === 9) {
        //     drawFunction()
        // }
        // //checker for win on every click
        // winChecker()
        if (winChecker()) return; // Check if player won
        if (count === 9) drawFunction(); // Check for draw

        setTimeout(aiMove, 200); // Delay AI move for realism
        xTurn = true; // Switch turn back to player
    })   
})

//enable buttons and disable popup on load page
window.onload = enableButtons