const myCards = document.querySelectorAll(".card");
const myScore = document.querySelector("#score");
const timer = document.querySelector("#timer");

let firstCard = null;
let secondCard = null;

// 
let currentScore = 0;
let currentTimer = 60;
myScore.innerText = `Score: ${currentScore}`;

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
            currentScore += 2;
            myScore.innerText = `Score: ${currentScore + 2}`;
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

setInterval(() => {
    timer.innerText = `Timer: ${--currentTimer}`;
}, 1000)
