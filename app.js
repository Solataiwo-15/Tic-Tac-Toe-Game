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

//Player 'X' plays first
let xTurn = true
let count = 0

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
}

//this funtion is executed when a player wins
const winFunction = (letter, winningCells) => {
    disableButtons()
       //popup message for win
    if (letter == 'X') {
        msgRef.innerHTML = `&#x1F389 <br> 'X' Wins`
    } else {
        msgRef.innerHTML = `&#x1F389 <br> 'O' Win`
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
        if (element1 != '' && (element2 != '') && (element3 != '')) {
            if (element1 === element2 && element2 === element3) {
                //if all 3 buttons have same value to win, then pass the value to winFunction
                winFunction(element1, i)
            }
        }
    }
}

//display X/O on click
btnRef.forEach((element) => {
    element.addEventListener('click', () => {
        if (xTurn) {
            xTurn = false
            //display X
            element.innerText = 'X'
            element.disabled = true
        } else {
            xTurn = true
            //display O
            element.innerText = 'O'
            element.disabled = true
        }
        //increment count on each click
        count += 1
        if(count === 9) {
            drawFunction()
        }
        //checker for win on every click
        winChecker()
    })   
})

//enable buttons and disable popup on load page
window.onload = enableButtons