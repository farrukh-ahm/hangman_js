import {words, hangmanStage} from "./words.js"

const startButton = document.querySelector(".start-button")
const categoryBtn = document.querySelectorAll(".cat")
const gameContainer = document.querySelector(".game-container")
const wordGuess = document.querySelector(".guess-word")
const guessButtons = document.querySelectorAll(".selection-btn")
const hangmanFigure = document.querySelector(".hangman-figure")

const alphas = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
let selectedWords = []
let randomWordList
let turns = 0


// ----------- INITIALISE THE GAME SCREEN --------------------------
const gameSetup = category => {

    let cat = category. toLowerCase()

    let randomWord = words[cat][Math.floor(Math.random() * words[cat].length)].toLowerCase()
    console.log(randomWord)

    randomWordList = randomWord.split("")
    console.log(randomWordList)

    for(let i of randomWord){
        if(!alphas.includes(i)){
            
            selectedWords.push("-")
        }
        selectedWords.push("_")
    }

    wordGuess.innerText = `${selectedWords.join(" ")}`
    hangmanFigure.src = `./assets/${hangmanStage[turns]}`
    gameContainer.scrollBy(gameContainer.offsetWidth, 0)
    // console.log(randomWord)

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
    }
    else{
        e.target.style.backgroundColor = "#FF492B";
        turns++
        hangmanFigure.src = `./assets/${hangmanStage[turns]}`
    }

}




// ----------- START SCREEN BUTTON --------------------------
startButton.addEventListener("click", ()=>{
    console.log(gameContainer.offsetWidth)
    gameContainer.scrollBy(gameContainer.offsetWidth,0)
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
        // let guessedLetter = e.target.innerText
        // console.log(guessedLetter)
    })

})