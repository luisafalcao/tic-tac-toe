let allEmptySquares = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const squares = Array.from(document.querySelectorAll('.square'))
const message = document.querySelector('.message')
const startButton = document.querySelector('.start-button')
let completed

startButton.addEventListener('click', () => {
    getComputerSelection(0)
    startButton.classList.add('hidden')
})

const checkContent = () => {
    const leftColumn = [squares[0].textContent, squares[3].textContent, squares[6].textContent]
    const centerColumn = [squares[1].textContent, squares[4].textContent, squares[7].textContent]
    const rightColumn = [squares[2].textContent, squares[5].textContent, squares[8].textContent]
    
    const topRow = [squares[0].textContent, squares[1].textContent, squares[2].textContent]
    const centerRow = [squares[3].textContent, squares[4].textContent, squares[5].textContent]
    const bottomRow = [squares[6].textContent, squares[7].textContent, squares[8].textContent]
    
    const topRightDiagonal = [squares[0].textContent, squares[4].textContent, squares[8].textContent]
    const topLeftDiagonal = [squares[2].textContent, squares[4].textContent, squares[6].textContent]
    
    let allContent = [leftColumn, centerColumn, rightColumn, topRow, centerRow, bottomRow, topLeftDiagonal, topRightDiagonal]
   
    completed = allContent.some(item => {
        return item.every(element => {
            return element === item[0] && item[0] !== ""
        })
    })
    
    if (completed) {
        const completedLine = allContent.filter(item => {
            return item.every(element => {
                return element === item[0] && item[0] !== ""
            })
        })

        message.classList.add('active')
        startButton.classList.remove('hidden')

        if (completedLine[0].includes('X')) {
            message.textContent = "Wow, you won! Click here to restart"
        } else if (completedLine[0].includes('O')) {
            message.textContent = "Oops, looks live we've won... Click here to restart"
        }

        return
    }
}

const getRandomNumber = (array) => {
    const randomNumber = Math.floor(Math.random() * array.length)
    return array[randomNumber]
}

const getComputerSelection = (index) => {
    const smartPlays = {
        0: [0, 1, 2, 3, 4, 6, 8],
        1: [0, 1, 2, 4, 7],
        2: [0, 1, 2, 4, 5, 6, 8],
        3: [0, 3, 4, 5, 6],
        4: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        5: [2, 3, 4, 5, 8],
        6: [0, 2, 3, 4, 6, 7, 8],
        7: [1, 4, 6, 7, 8],
        8: [0, 2, 4, 5, 6, 7, 8]
    }

    const possiblePlays = allEmptySquares.filter(element => smartPlays[index].includes(element))

    const currentSelectionIndex = getRandomNumber(possiblePlays)
    
    // remove respective item from allEmptySquares
    allEmptySquares.splice(allEmptySquares.indexOf(currentSelectionIndex), 1)
    
    // loop through squares to find the square that corresponds to the random index
    const computerSelection = squares.filter((square, index) => {
        return index === currentSelectionIndex
    })

    // set square's content
    computerSelection[0].textContent = 'O'

    if (allEmptySquares.length <= 6) {
        checkContent()
    }
}

const getUserSelection = (userSelection, currentIndex) => {
    // set square's content
    userSelection.textContent = 'X'

    // remove respective item from allEmptySquares
    const currentUserSelection = allEmptySquares.indexOf(currentIndex)
    allEmptySquares.splice(currentUserSelection, 1)
    
    if (allEmptySquares.length <= 6) {
        checkContent()
    }
    
    if (!completed) {
        // get computer selection after 1 second
        setTimeout(() => {
            // get computer selection based on random number
            getComputerSelection(currentIndex)
        }, 1000)
    }

}

squares.map((square, index) => {
    square.addEventListener('click', () => {
        // get user selection based on user's click
        getUserSelection(square, index)
    })
})

message.addEventListener('click', () => {
    // reset
    message.classList.remove('active')
    allEmptySquares = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    squares.map(square => square.textContent = "")

    completed = !completed
})