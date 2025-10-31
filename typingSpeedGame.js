const theTimer = document.querySelector("#timer");
const theWpm = document.querySelector("#wpm");
const toTypeInput = document.querySelector(".to-type");
const typingArea = document.querySelector("#text-input");
const backGroundMusic = document.querySelector("#gbm");
const popUp = document.querySelector(".pop-up");

let timer = 59;
let secPassed = 0;
let correctCharacters = 0;

theTimer.innerText = `timer ~ 00:59`;
theWpm.innerText = `WPM ~ 0`;


let sentencesArr = [
    "Learning to code is like learning a new language, but instead of speaking to people, you're communicating with machines. At first, the rules might seem strict and unforgiving, but with every project you build, your understanding deepens. Each bug you fix teaches you patience, and each success gives you confidence. Over time, you begin to realize that coding is not just about syntax it's about problem-solving, creativity, and persistence",
    "Speed doesn't come from rushing it comes from consistency. When you practice typing every day, even for just ten minutes, your fingers start to move on their own. You no longer need to look at the keyboard, and your mind can focus on the meaning of the words instead of the letters. The secret to improvement lies not in perfection, but in repetition. Keep typing, keep making mistakes, and keep learning from them",
    "Technology changes faster than most people can imagine. What's considered new today might be outdated tomorrow. Yet, behind every innovation, there are developers who dedicate their time and energy to make life easier for others. From apps that connect people across the world to machines that can learn and think, technology reflects the creativity and ambition of the human spirit. The more you understand it, the more powerful you become",
    "The smell of coffee fills the room as the programmer opens their laptop. The screen glows softly in the dim light, showing lines of code from the night before. Outside, the world is still quiet, but inside, ideas are already forming. Each line typed feels like a small step toward something bigger. The day will be filled with challenges, errors, and problem-solving but also with moments of pure satisfaction when everything finally works",
    "Curiosity is the engine of growth. Every question you ask, every new topic you explore, expands your mind and gives you a new perspective. Typing may seem like a simple skill, but it's a doorway to endless possibilities from writing stories to building applications. The faster and more accurately you type, the easier it becomes to turn your thoughts into reality. Never stop wondering, never stop exploring, and never stop improving"
]

let randomNumber = Math.floor(Math.random() * sentencesArr.length);
let toTypeInputSpan = sentencesArr[randomNumber];
toTypeInputSpan.split("").forEach(char => {
    let spanElement = document.createElement("span");
    spanElement.textContent = char;
    toTypeInput.appendChild(spanElement);
})

typingArea.addEventListener("input", function startCounter() {
    backGroundMusic.play();
    let counter = setInterval(() => {
        timer--;
        theTimer.innerText = `timer ~ 00:${String(timer).padStart(2, "00")}`;
        secPassed++;
        if (secPassed > 0) wpmCalc();
        if (timer === 0) {
            clearInterval(counter);
            backGroundMusic.pause();

            popUp.classList.remove("hidden");
            popUp.querySelector("#final-wpm").innerText = `Your final score is ~ ${wpmCalc()}`;
            document.querySelector("#choice-btn").addEventListener("click", () => {location.reload()});
        }
    }, 1000)
    typingArea.removeEventListener("input", startCounter);
})

typingArea.addEventListener("input", () => {
    typingArea.removeAttribute("placeholder");
    
    const typedLetter = typingArea.value.split("");
    const spanVal = document.querySelectorAll(".to-type span");

    spanVal.forEach((charSpan, index) => {
        const character = typedLetter[index];

        if (!character) {
            charSpan.classList.remove("incorrect");
            charSpan.classList.remove("correct");
        } else if (character === charSpan.textContent) {
            charSpan.classList.add("correct");
            charSpan.classList.remove("incorrect");
            correctCharacters = document.querySelectorAll(".correct").length;
        } else {
            charSpan.classList.add("incorrect");
            charSpan.classList.remove("correct");
        }
    })
})

function wpmCalc() {
    let wpm = (correctCharacters / 5) / (secPassed / 60);
    theWpm.innerText = `WPM ~ ${Math.floor(wpm)}`;
    return Math.floor(wpm);
}