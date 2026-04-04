
let userStarts;


document.addEventListener("DOMContentLoaded",loadScore);


function chooseLevel(card){
    let allbox = document.querySelectorAll('.smallBox');
    allbox.forEach( el => {
        card.querySelector('.level').checked = false;
        el.classList.remove('choosen')
    })
    let box = card;
    let level = box.querySelector('.level')
    box.classList.add('choosen')
    level.checked = true;
    
}


function chooseName(self){

    let name = document.getElementById('userName').value;
    let nameSheet = document.getElementById('player-name')
    let nameCoin = document.getElementById('tcName')
    
    nameSheet.textContent = name;
    nameCoin.textContent = name;
    self.textContent = "Submited!"
    self.classList.add('disabled')
    document.getElementById('userName').classList.add('disabled')

    saveScore()
}




function tossCoin(){
    let userPick = document.getElementById('coin').value
    let text = document.getElementById('result')
    let num = Math.floor(Math.random() * 2) + 1;
    let result = "" ;

    text.textContent = "Tossing...."
    setTimeout(() => {
    if(num === 1){
        text.textContent = "It's a Head";
        result = "Head"
    }
    else{
        text.textContent = "It's a Tail";
        result = "Tail"
    }
    if(result === userPick){
        userStarts = true;
    }
    else{
        userStarts = false;
    }

    }, 1000)



}


function startGame(self){
    if(!userStarts){
    computerMove()
    }

    self.classList.add('disabled')
}

//console.log(tossCoin())
























function computerMove(){
let boards = document.querySelectorAll('.box');
let num ;

if(checkSpace()){
    return -1;
}
else {
    do{
    num = Math.floor(Math.random() * boards.length );
    }while(boards[num].textContent != "")

    boards[num].textContent = "O"
    boards[num].classList.add('disabled');

}

}


function checkSpace(){
    let boards = document.querySelectorAll('.box');
    let bArray = [...boards]
    if(bArray.every(el => el.textContent.trim() !== "")){
    return true;
    }
    else{
        return false;
    }
}







function playGame(box){
    let boards = document.querySelectorAll('.box');





    if(playerMove(box)){
        computerMove();
 
    }

    if(mapMarks()){
       boards.forEach(el => {
        el.classList.remove('disabled')
        el.classList.add('disabled')
       })

       saveScore()
    }
    //winning logics 


}


function mapMarks(){
    let boards = document.querySelectorAll('.box');
    let winner = false ;
    let comScore = document.getElementById('comScore');
    let userScore = document.getElementById('userScore');
    let x = Number(comScore.textContent);
    let y = Number(userScore.textContent);
    let resultText =  document.querySelector('.final_result')


    if((boards[0].textContent.trim() !== "") && (boards[0].textContent === boards[1].textContent) && (boards[1].textContent === boards[2].textContent)){
            if(boards[0].textContent === "O"){
                boards[0].classList.add('loss')
                boards[1].classList.add('loss')
                boards[2].classList.add('loss')
                comScore.textContent = x + 1;
                resultText.textContent = "You lost"
                resultText.style.color = "red"
                resultText.classList.add('show')
            }
            else{
                boards[0].classList.add('win')
                boards[1].classList.add('win')
                boards[2].classList.add('win')
                userScore.textContent = y + 1;
                resultText.textContent = "You Won!!!"
                resultText.style.color = "green"
                resultText.classList.add('show')
            }
            gameover = true;
            winner = true;
            console.log(x)
    }
    else if((boards[3].textContent.trim() !== "") && (boards[3].textContent === boards[4].textContent) && (boards[4].textContent === boards[5].textContent)){
            if(boards[3].textContent === "O"){
                boards[3].classList.add('loss')
                boards[4].classList.add('loss')
                boards[5].classList.add('loss')
                comScore.textContent = x + 1;
                resultText.textContent = "You lost"
                resultText.style.color = "red"
                resultText.classList.add('show')
            }
            else{
                boards[3].classList.add('win')
                boards[4].classList.add('win')
                boards[5].classList.add('win')
                userScore.textContent = y + 1;
                resultText.textContent = "You Won!!!"
                resultText.classList.add('show')
                resultText.style.color = "green"

            }
            gameover = true;
            winner = true;
    }
    else if((boards[6].textContent.trim() !== "") && (boards[6].textContent === boards[7].textContent) && (boards[7].textContent === boards[8].textContent)){
            if(boards[6].textContent === "O"){
                boards[6].classList.add('loss')
                boards[7].classList.add('loss')
                boards[8].classList.add('loss')
                comScore.textContent = x + 1;
                resultText.textContent = "You lost"
                resultText.style.color = "red"
                resultText.classList.add('show')
            }
            else{
                boards[6].classList.add('win')
                boards[7].classList.add('win')
                boards[8].classList.add('win')
                userScore.textContent = y + 1;
                resultText.textContent = "You Won!!!"
                resultText.classList.add('show')
                resultText.style.color = "green"
            }
            gameover = true;
            winner = true;
    }
    else if((boards[0].textContent.trim() !== "") && (boards[0].textContent === boards[4].textContent) && (boards[4].textContent === boards[8].textContent)){
            if(boards[0].textContent === "O"){
                boards[0].classList.add('loss')
                boards[4].classList.add('loss')
                boards[8].classList.add('loss')
                comScore.textContent = x + 1;
                resultText.textContent = "You lost"
                resultText.style.color = "red"
                resultText.classList.add('show')
            }
            else{
                boards[0].classList.add('win')
                boards[4].classList.add('win')
                boards[8].classList.add('win')
                userScore.textContent = y + 1;
                resultText.textContent = "You Won!!!"
                resultText.classList.add('show')
                resultText.style.color = "green"
            }
            gameover = true;
            winner = true;
    }
    else if((boards[2].textContent.trim() !== "") && (boards[2].textContent === boards[4].textContent) && (boards[4].textContent === boards[6].textContent)){
            if(boards[2].textContent === "O"){
                boards[2].classList.add('loss')
                boards[4].classList.add('loss')
                boards[6].classList.add('loss')
                comScore.textContent = x + 1;
                resultText.textContent = "You lost"
                resultText.style.color = "red"
                resultText.classList.add('show')
            }
            else{
                boards[2].classList.add('win')
                boards[4].classList.add('win')
                boards[6].classList.add('win')
                userScore.textContent = y + 1;
                resultText.textContent = "You Won!!!"
                resultText.classList.add('show')
                resultText.style.color = "green"

            }
            gameover = true;
            winner = true;
    }
    else if((boards[0].textContent.trim() !== "") && (boards[0].textContent === boards[3].textContent) && (boards[3].textContent === boards[6].textContent)){
            if(boards[0].textContent === "O"){
                boards[0].classList.add('loss')
                boards[3].classList.add('loss')
                boards[6].classList.add('loss')
                comScore.textContent = x + 1;
                resultText.textContent = "You lost"
                resultText.style.color = "red"
                resultText.classList.add('show')
            }
            else{
                boards[0].classList.add('win')
                boards[3].classList.add('win')
                boards[6].classList.add('win')
                userScore.textContent = y + 1;
                resultText.textContent = "You Won!!!"
                resultText.classList.add('show')
                resultText.style.color = "green"

            }
            gameover = true;
            winner = true;
    }
    else if((boards[1].textContent.trim() !== "") && (boards[1].textContent === boards[4].textContent) && (boards[4].textContent === boards[7].textContent)){
            if(boards[1].textContent === "O"){
                boards[1].classList.add('loss')
                boards[4].classList.add('loss')
                boards[7].classList.add('loss')
                comScore.textContent = x + 1;
                resultText.textContent = "You lost"
                resultText.style.color = "red"
                resultText.classList.add('show')
            }
            else{
                boards[1].classList.add('win')
                boards[4].classList.add('win')
                boards[7].classList.add('win')
                userScore.textContent = y + 1;
                resultText.textContent = "You Won!!!"
                resultText.style.color = "green"

                resultText.classList.add('show')
            }
            gameover = true;
            winner = true;
    }
    else if((boards[2].textContent.trim() !== "") && (boards[2].textContent === boards[5].textContent) && (boards[5].textContent === boards[8].textContent)){
            if(boards[2].textContent === "O"){
                boards[2].classList.add('loss')
                boards[5].classList.add('loss')
                boards[8].classList.add('loss')
                comScore.textContent = x + 1;
                resultText.textContent = "You lost"
                resultText.style.color = "red"
                resultText.classList.add('show')
            }
            else{
                boards[2].classList.add('win')
                boards[5].classList.add('win')
                boards[8].classList.add('win')
                userScore.textContent = y + 1;
                resultText.textContent = "You Won!!!"
                resultText.style.color = "green"
                resultText.classList.add('show')
            }
            gameover = true;
            winner = true;
            
    }

    
    else if(checkSpace() && !winner){
                resultText.textContent = "It's a Tie"
                resultText.style.color = "black"
                resultText.classList.add('show')
    }



 return winner;
}


function resetGame(){
    let boxes = document.querySelectorAll('.box')
    let resultText = document.querySelector('.final_result')
    resultText.classList.remove('show');
    resultText.textContent = "";
    document.getElementById('startGamee').classList.remove('disabled')
    boxes.forEach(el => {
        el.classList.remove('win');
        el.classList.remove('loss');
        el.classList.remove('disabled');
        el.textContent = "";
    })

}

function playerMove(self){
    if(self.textContent.trim() !== ""){
        return false
    }
    else{
        self.textContent = "X";
        self.classList.add('disabled')
        return true
    }
    
}

function saveScore(){
    let nameSheet = document.getElementById('player-name').textContent;
    let nameCoin = document.getElementById('tcName').textContent;
    let AI_score = document.getElementById('comScore').textContent
    let USER_score = document.getElementById('userScore').textContent
    localStorage.setItem("scores",JSON.stringify([AI_score,USER_score,nameSheet,nameCoin]))
}

function loadScore(){
    let nameSheet = document.getElementById('player-name');
    let nameCoin = document.getElementById('tcName');
    let AI_score = document.getElementById('comScore')
    let USER_score = document.getElementById('userScore')
    let data = JSON.parse(localStorage.getItem("scores"))

    AI_score.textContent = data[0]
    USER_score.textContent = data[1]
    nameSheet.textContent = data[2]
    nameCoin.textContent = data[3]
}

function resetScores(){
    document.getElementById('comScore').textContent  = "0"
    document.getElementById('userScore').textContent = "0"
    document.getElementById('startGamee').classList.remove('disabled')
    saveScore()
}

function activeLink(current){
    let links = document.querySelectorAll('.link')
    links.forEach(el => {
        el.classList.remove('activee')
    })
    current.classList.add('activee')
}

function getMode(btn,id, cont){
    let btns = document.querySelectorAll('.mode');
    let computer =document.querySelector('.vsCOm')
    let partner =  document.querySelector('.partner')

    computer.style.display = "none";
    partner.style.display = "none";
    btns.forEach(el => {
        el.classList.remove('selected')
    })
    window.location.href = `#${id}`;
    btn.classList.add('selected');

    let box = document.querySelector(`.${cont}`);
    box.style.display = "block";
    
}