const allEmptySquares = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const squares = document.querySelectorAll('.square')
const arrayOfSquares = Array.from(squares)

const getSquareContent = () => {
    const leftColumn = [arrayOfSquares[0].textContent, arrayOfSquares[3].textContent, arrayOfSquares[6].textContent]
    const centerColumn = [arrayOfSquares[1].textContent, arrayOfSquares[4].textContent, arrayOfSquares[7].textContent]
    const rightColumn = [arrayOfSquares[2].textContent, arrayOfSquares[5].textContent, arrayOfSquares[8].textContent]

    const topRow = [arrayOfSquares[0].textContent, arrayOfSquares[1].textContent, arrayOfSquares[2].textContent]
    const centerRow = [arrayOfSquares[3].textContent, arrayOfSquares[4].textContent, arrayOfSquares[5].textContent]
    const bottomRow = [arrayOfSquares[6].textContent, arrayOfSquares[7].textContent, arrayOfSquares[8].textContent]

    const topRightDiagonal = [arrayOfSquares[0].textContent, arrayOfSquares[4].textContent, arrayOfSquares[8].textContent]
    const topLeftDiagonal = [arrayOfSquares[2].textContent, arrayOfSquares[4].textContent, arrayOfSquares[6].textContent]

    let allContent = [leftColumn, centerColumn, rightColumn, topRow, centerRow, bottomRow, topLeftDiagonal, topRightDiagonal]

    const completed = allContent.filter(item => {
        return item.every(element => {
            return element === item[0] && item[0] !== ""
        })
    })

    console.log(completed[0][0])

}

const getRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * allEmptySquares.length)
    return allEmptySquares[randomNumber]
}

const getComputerSelection = () => {
    const currentSelectionIndex = getRandomNumber()
    
    // remove respective item from allEmptySquares
    allEmptySquares.splice(allEmptySquares.indexOf(currentSelectionIndex), 1)
    
    // loop through squares to find the square that corresponds to the random index
    const computerSelection = Array.from(squares).filter((square, index) => {
        return index === currentSelectionIndex
    })

    // set square's content
    computerSelection[0].textContent = 'O'
}

const getUserSelection = (userSelection, currentIndex) => {
    // set square's content
    userSelection.textContent = 'X'

    // remove respective item from allEmptySquares
    const currentUserSelection = allEmptySquares.indexOf(currentIndex)
    allEmptySquares.splice(currentUserSelection, 1)

    // get computer selection after 1 second
    setTimeout(() => {
        // get computer selection based on random number
        getComputerSelection()
    }, 1000)

}

arrayOfSquares.map((square, index) => {
    square.addEventListener('click', () => {
        // get user selection based on user's click
        getUserSelection(square, index)

        getSquareContent()
    })
})