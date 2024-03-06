const startButton = document.querySelector(".start-button")
const categoryBtn = document.querySelectorAll(".cat")
const gameContainer = document.querySelector(".game-container")


startButton.addEventListener("click", ()=>{
    console.log(gameContainer.offsetWidth)
    gameContainer.scrollBy(gameContainer.offsetWidth,0)
})

categoryBtn.forEach(category => {

    category.addEventListener("click", e =>{

        let cat = e.target.innerText;
        
        let emptyLi = []
        for(let i =0; i<cat.length; i++){
            emptyLi.push("_")
        }
        // console.log(emptyLi)

        gameContainer.scrollBy(gameContainer.offsetWidth, 0)

    })

})