const images = ["🍎", "🍌", "🍇", "🍉", "🍓", "🥝", "🥭", "🍑"]

// shallow copy with Crad 
const gameCard = [...images, ...images]
gameCard.sort(() => 0.5 - Math.random())

const gameBox = document.querySelector('.gamebox')
let firstCard, secondCard;
let lockBoard = false
let matchPair = 0

function Createcard(item) {
    const cards = document.createElement('div')
    cards.classList.add('card')
    cards.dataset.name = item

    cards.innerHTML = `
         <div class="front">${item}</div>
         <div class="back"></div>
        `
    cards.addEventListener('click', flipCard)
    return cards
}

function setUpGame() {
    gameCard.forEach(element => {
        const Card = Createcard(element)
        gameBox.appendChild(Card)
    }
    )

}

function flipCard() {
    if (lockBoard) return
    if (this === firstCard) {
        return
    }

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this
        return
    }
    secondCard = this
    lockBoard = true;

    checkMatch()
}
function checkMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCard()
    } else {
        CardUnFlip()
    }
}

function disableCard() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    matchPair++

    if (matchPair === gameCard.length / 2) {
        setTimeout(() => {
            alert("You Win Game");
             location.reload()
        }, 400)
    }
    resetGame()

}

function CardUnFlip() {
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        resetGame()
    }, 500);

}
function resetGame() {
    [firstCard, secondCard] = [null, null]
    lockBoard = false
}

setUpGame()






