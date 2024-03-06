import words from "./words.js"

const startButton = document.querySelector(".start-button")
const categoryBtn = document.querySelectorAll(".cat")
const gameContainer = document.querySelector(".game-container")
const wordGuess = document.querySelector(".guess-word")
const alphas = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
let selectedWords = []

const gameSetup = category => {

    let cat = category. toLowerCase()

    let randomWord = words[cat][Math.floor(Math.random() * words[cat].length)].toLowerCase()
    console.log(randomWord)

    for(let i of randomWord){
        console.log(i)
        if(!alphas.includes(i)){
            
            selectedWords.push("-")
        }
        selectedWords.push("_")
    }

    wordGuess.innerText = `${selectedWords.join(" ")}`
    gameContainer.scrollBy(gameContainer.offsetWidth, 0)
    console.log(randomWord)

}



startButton.addEventListener("click", ()=>{
    console.log(gameContainer.offsetWidth)
    gameContainer.scrollBy(gameContainer.offsetWidth,0)
})


categoryBtn.forEach(catBtn => {

    catBtn.addEventListener("click", e =>{

        let category = e.target.innerText;
        gameSetup(category)

    })

})