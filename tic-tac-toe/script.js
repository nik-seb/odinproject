

const gameboard = (function(){
    const cells = document.querySelectorAll('td')
    const rows = ['a', 'b', 'c']
    const cols = [1, 2, 3]
    const boardArray = []
    function populateArray (rows, cols) {
        for (let row in rows) {
            for (let col in cols) {
                let newSquare = `${rows[row]}${cols[col]}`
                // {'row': rows[row], 'col': cols[col], 'val': ''}
                boardArray.push(newSquare)
            }
        }
        console.log(boardArray)
    }

    function setupCells () {
        // name cells
        for (let i = 0; i < cells.length; i++) {
            cells[i].id = boardArray[i]
        }
    }

    function setNames () {
        const submitBtns = document.querySelectorAll('input[type="submit"]')
        const xTitle = document.getElementById('x-title')
        const oTitle = document.getElementById('o-title')
        const xWinMark = document.getElementById('x-win-mark')
        const oWinMark = document.getElementById('o-win-mark')
        submitBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
            e.preventDefault()
            let xName = document.getElementById('play1').value
            if (xName === '' || !xName) {
                xName = playerX.name
            }
            playerX.name = xName
            xTitle.innerText = xName
            xWinMark.innerText = xName
            let oName = document.getElementById('play2').value
            if (oName === '' || !oName) {
                oName = playerO.name
            }
            playerO.name = oName
            oTitle.innerText = oName
            oWinMark.innerText = oName
            const turnMarker = document.querySelector('.turn-marker')
            if (turnMarker.id === 'x-mark') {
                turnMarker.innerText = xName
            } else {
                turnMarker.innerText = oName
            }
        })
        })
    }

    return (populateArray(rows, cols), boardArray, setupCells(), setNames()) //do need to run populateArray before returning boardArray or is not filled
})()

// console.log(gameboard.boardArray) // this doesn't work and I don't understand why

const gamePlay = (function(){
    const board = document.getElementById('board')
    const cells = document.querySelectorAll('td')
    const playerMarker = document.querySelector('.turn-marker')

        let tally = 0
        let xMoves = []
        let oMoves = []
    
    const placeMark = function () {
        console.log('placemark has begun', tally, xMoves)
        cells.forEach((cell) => {
            cell.addEventListener('click', cellClicker)
        })
    }

    const cellClicker = function (e){
        const cell = e.target
        console.log('event triggered', tally, xMoves)
        if (cell.innerText) {
            return // prevents any action from occurring if cell is already filled
        }
        const thisCell = cell.id
        let thisPlayer = ''
        console.log('placemark is running', tally, xMoves)
        if (playerMarker.id === 'x-mark') {
            thisPlayer = 'X'
            xMoves.push(thisCell)
            console.log('placemark is running', tally, xMoves)
            if (checkForWin(xMoves)) {
                announceWin(playerX.name) // link into player names
                removeClicker()
                playerX.score++
                document.getElementById('x-wins').innerText = playerX.score
            }
            playerMarker.id = 'o-mark'
            playerMarker.innerText = playerO.name
        } else if (playerMarker.id === 'o-mark') {
            thisPlayer = 'O'
            oMoves.push(thisCell)
            console.log('placemark is running', tally, xMoves)
            if (checkForWin(oMoves)) {
                announceWin(playerO.name)
                removeClicker()
                playerO.score++
                console.log(playerO.score)
                document.getElementById('o-wins').innerText = playerO.score
            }
            playerMarker.id = 'x-mark'
            playerMarker.innerText = playerX.name
        }
        cell.innerText = thisPlayer
        tally++
        console.log('end of placemark event', tally, xMoves)
        console.log('placing from player: ' + thisPlayer + ' in ' + thisCell)
        if (tally === 9) {
            announceWin('Tie')
            removeClicker()
        }
        function removeClicker() {
            cells.forEach((cell) => {
                cell.removeEventListener('click', cellClicker)
                console.log('removed! ', cell)
            })
        }
    }

    const announceWin = function (winner) {
        let announce = ''
        if (winner === 'Tie') {
            announce = "It's a tie!"
        } else {
            announce = `${winner} has won!`
        } // make these print out
        let display = document.createElement('div')
        display.id = 'winner'
        display.innerText = announce
        board.appendChild(display)
        
    }

    const checkForWin = function (moves) {
        console.log(moves)
        //can receive xMoves or oMoves
        //checks diagonals
        if (moves.indexOf('a1') != -1 && moves.indexOf('b2') != -1 && moves.indexOf('c3') != -1) {
            return true
        } else if (moves.indexOf('c1') != -1 && moves.indexOf('b2') != -1 && moves.indexOf('a3') != -1) {
            return true
        }
        let tallies = {a: 0, b: 0, c: 0, 1: 0, 2: 0, 3: 0}
        console.log(tallies)
        for (let i in moves) {
            let row = moves[i][0]
            let col = moves[i][1]
            tallies[row]++
            tallies[col]++
        }
        let talliesArr = Object.entries(tallies)
        for (let i = 0; i < talliesArr.length; i++) {
            if (talliesArr[i][1] === 3) {
                console.log('true!')
                return true
            }
        }
    }

    function clearBoard () {
        const clearBtn = document.getElementById('clear-btn')
        clearBtn.addEventListener('click', (e) => {
            cells.forEach((cell) => {
                cell.innerText = ''
            })
            tally = 0
            xMoves = []
            oMoves = []
            if (document.getElementById('winner')) {
                board.removeChild(document.getElementById('winner'))
            }
            placeMark()
        })
    }
    return (placeMark(), clearBoard())
})()

const Player = function (name, nom) {

    const score = 0

    return {name, nom, score}
}

const playerX = Player('X', 'play1')
const playerO = Player('O', 'play2')
