
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

let player = {
    name: "Ivan",
    chips: 145
}

playerEl.textContent = player.name + ": $" + player.chips

function startGame() {

    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}


function renderGame() {

    if (sum <= 20) {
        message = "do you want to draw new card"

    } else if (sum === 21) {
        message = "you got black jack"

        hasBlackJack = true

    } else {
        message = "u are out of the game"

        isAlive = false
    }
    messageEl.textContent = message
    sumEl.textContent = "Sum: " + sum
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
}

function newCard() {

    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()

        sum += card
        cards.push(card)

        renderGame()
    }

}

function getRandomCard() {
    let rng = Math.floor(Math.random() * 13) + 1
    console.log(rng)
    if (rng === 1) {
        return 11
    }
    else if (rng === 11 || rng === 12 || rng === 13) {
        return 10
    }
    else
        return rng
}

