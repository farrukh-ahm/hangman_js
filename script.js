import {words, hangmanStage} from "./words.js"

const startButton = document.querySelector(".start-button")
const categoryBtn = document.querySelectorAll(".cat")
const gameContainer = document.querySelector(".game-container")
const wordGuess = document.querySelector(".guess-word")
const guessButtons = document.querySelectorAll(".selection-btn")
const hangmanFigure = document.querySelector(".hangman-figure")
const modal = document.querySelector(".dialog-box")
const replay = document.querySelector(".replay")

const alphas = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
let selectedWords = []
let randomWordList
let cat
let turns = 0
let score = 0


// ----------- INITIALISE THE GAME SCREEN --------------------------
const gameSetup = category => {

    cat = category.toLowerCase()

    let randomWord = words[cat][Math.floor(Math.random() * words[cat].length)].toLowerCase()
    console.log(randomWord)
    randomWordList = randomWord.split("")

    for(let i of randomWord){
        if(!alphas.includes(i)){
            
            selectedWords.push("-")
        }
        else{
            selectedWords.push("_")
        }
    }

    wordGuess.innerText = `${selectedWords.join(" ")}`
    hangmanFigure.src = `./assets/${hangmanStage[0]}`
    gameContainer.scrollBy(document.querySelector(".selection-screen").offsetWidth, 0)

}


// ----------- INITIATE NEXT QUESTION --------------------------

const nextQuestion = () => {

    guessButtons.forEach(guess => {
        guess.disabled = false;
        guess.style.backgroundColor = "transparent"
    })

    let randomWord = words[cat][Math.floor(Math.random() * words[cat].length)].toLowerCase()
    console.log(randomWord)

    randomWordList = randomWord.split("")

    selectedWords = []

    for(let i of randomWord){
        if(!alphas.includes(i)){
            
            selectedWords.push("-")
        }
        else{
            selectedWords.push("_")
        }
    }

    wordGuess.innerText = `${selectedWords.join(" ")}`
    hangmanFigure.src = `./assets/${hangmanStage[0]}`
    turns = 0

}


// ----------- FXN TO HANDLE PLAYER GUESS -------------------------- 
const playerGuess = e => {

    let guessedLetter = e.target.innerText.toLowerCase()
    e.target.disabled = true;
    if(randomWordList.includes(guessedLetter)){
        e.target.style.backgroundColor = "#77FC7F";

        for(let i=0; i<randomWordList.length; i++){
            if(randomWordList[i]===guessedLetter){
                selectedWords[i] = guessedLetter
                wordGuess.innerText = `${selectedWords.join(" ").toUpperCase()}`
            }
        }

        if(!selectedWords.includes("_")){
            score ++
            document.querySelector(".score-display").innerText = `Your Score: ${score}`;
            document.querySelector(".score-collector").innerText = parseInt(document.querySelector(".score-collector").innerText)+1
            document.querySelector(".c-answer").innerText = `${randomWordList.join("").toUpperCase()}`
            modal.showModal();
        }
    }
    else{
        e.target.style.backgroundColor = "#FF492B";
        turns++
        hangmanFigure.src = `./assets/${hangmanStage[turns]}`

        if(turns === 6){
            document.querySelector(".total-score").innerText = `Your Score: ${score}`
            document.querySelector(".correct-answer").insertAdjacentHTML("beforeend", `<span>${randomWordList.join("").toUpperCase()}</span>`)
            gameContainer.scrollBy(document.querySelector(".question-screen").offsetWidth, 0)
            hangmanFigure.src = `./assets/over.png`
            return
        }
    }

}




// ----------- START SCREEN BUTTON --------------------------
startButton.addEventListener("click", ()=>{
    console.log(gameContainer.offsetWidth)
    gameContainer.scrollBy(document.querySelector(".start-screen").offsetWidth,0)
})


// ----------- CATEGORY SELECTION --------------------------
categoryBtn.forEach(catBtn => {

    catBtn.addEventListener("click", e =>{

        let category = e.target.innerText;
        gameSetup(category)

    })

})


// ----------- LETTER BUTTONS - Taking User Guesses --------------------------
guessButtons.forEach(guess => {

    guess.addEventListener("click", (e)=>{

        playerGuess(e)
    })

})


// ----------- DIALOG BOX --------------------------
const modalClose = document.querySelector(".modal-close")
modalClose.addEventListener("click", ()=>{

    modal.close()
    nextQuestion()

})


// ----------- REPLAY --------------------------
replay.addEventListener("click", ()=>{
    location.reload(true)
})
