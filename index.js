const myCards = document.querySelectorAll(".card");
const myScore = document.querySelector("#score");
const topScore = document.querySelector("#top-score");
const timer = document.querySelector("#timer");
const backGroundMusic = document.querySelector(".ost");

let firstCard = null;
let secondCard = null;
let currentScore = 0;
let currentTopScore = 0;
let currentTimer = 180;
let gameOver = false;

// setting default score and timer
myScore.innerText = `Score: ${currentScore}`;
timer.innerText = `Timer: ${currentTimer}`;
// topScore.innerText = `Top Score: ${currentScore}`;

// randomise all the cards
let newCardsOrder = Array.from(myCards);

let arrLength = myCards.length - 1;
for (let i = arrLength; i > 0; i--) {
    let randomNumber = Math.floor(Math.random() * (i + 1))
    
    // swap
    let temp = newCardsOrder[i];
    newCardsOrder[i] = newCardsOrder[randomNumber];
    newCardsOrder[randomNumber] = temp;
}

const container = document.querySelector(".container");
newCardsOrder.forEach(card => container.appendChild(card))

// show all card for the user 
myCards.forEach(card => {
    card.classList.add("flip")
    setTimeout(() => {
        card.classList.remove("flip");
    }, 6000)
})

// starting music & timer after the first click on the screen
let coundDown = setInterval(() => {
    backGroundMusic.play();
    if (currentTimer <= 30) timer.style.color = "red";
    if (currentTimer === 0) clearInterval(coundDown);
    timer.innerText = `Timer: ${currentTimer--}`;
}, 1000)

myCards.forEach(card => {
  card.addEventListener("click", function clickCard(e) {
    // select card
    let clickedCard = e.currentTarget;

    // check if the same card is clicked again
    if (clickedCard == firstCard) return;

    // flip the card
    clickedCard.classList.add("flip");

    // check if its the first click 
    if (firstCard == null) {
        firstCard = clickedCard;
        return;
    }

    // second click if there is a first click
    secondCard = clickedCard;

    // disabling card until the verification ends
    myCards.forEach((card) => {
        card.classList.add("disabled");
        setTimeout(() => {
            card.classList.remove("disabled");
        }, 1000)
    })

    // comparing numbers function
    if (firstCard.dataset.card == secondCard.dataset.card) {
        // add class disabled (stop events)
        firstCard.classList.add("disabled");
        secondCard.classList.add("disabled");

        setTimeout(() => {
            // add class matched (green background)
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
        
            // setting the values to null for the next round
            firstCard = null;
            secondCard = null;

            // Adding score
            myScore.innerText = `Score: ${currentScore + 2}`;
            currentScore += 2;

            // Checking if the game is over 
            let matchedCard = document.querySelectorAll(".card.matched");
            if (matchedCard.length === arrLength.length) {
                gameOver = true;
                clearInterval(countDown);
                alert("Congrats, Your score is" + currentScore);
                const restartGame = confirm("Do you wanna play again ?");
                if (restartGame) location.reload();
            }
        }, 1000)
        } else {
        setTimeout(() => {
                // refliping the cards again
                firstCard.classList.remove("flip");
                secondCard.classList.remove("flip");
            
                // setting the values to null for the next round
                firstCard = null;
                secondCard = null;
            },1000);
        }    
  });
});