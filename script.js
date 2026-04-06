
let userStarts;
let currentPlayer = ""
let is_player1 = false;
let is_player2 = false;







let is_aiVshuman = false;
let is_gameRuning = false;

document.addEventListener("DOMContentLoaded",loadScore);





function checkWhostarts(){
    let num = Math.floor(Math.random() * 10) + 1;

    if(num <= 5 ){
         currentPlayer = "player1"
    }
    else{
         currentPlayer = "player2"

    }

}






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

let userActive = false;


function chooseName(self){

    let name = document.getElementById('userName').value;
    let nameSheet = document.getElementById('player-name')
    
    if(name.trim() != ""){
    nameSheet.textContent = name;
    self.textContent = "Submited!"
    self.classList.add('disabled')
    document.getElementById('userName').classList.add('disabled')
    userActive = true;
    document.getElementById('inputErro').textContent = ""
    document.getElementById('gameErro').textContent = "";
    localStorage.setItem("gameStarted","true");

    saveScore()
    }
    else{
        document.getElementById('inputErro').textContent = "You can't submit an empty text!"
    }

}



let coinToss = false;

function flipCoin() {
    const coin = document.getElementById('coinF')
    coin.classList.remove('flip');
    void coin.offsetWidth;
    coin.classList.add('flip');
    document.getElementById('coinRes').textContent = "T"

    setTimeout(()=>{
       // coin.style.transform = isHeads
       // ? "rotateY(0deg)"
       // : "rotateY(180deg)"

    }, 1000);


}







function tossCoin(){
    const coin = document.getElementById('coinF')
    coin.classList.remove('flip');
    void coin.offsetWidth;
    coin.classList.add('flip');
    let CoinResult = document.getElementById('coinRes');
    CoinResult.textContent = "H";




    let userPick = document.getElementById('coin').value
    let text = document.getElementById('result')
    let starter = document.getElementById('Starter')
    let num = Math.floor(Math.random() * 2) + 1;
    let result = "" ;

    setTimeout(() => {
    if(num === 1){
        CoinResult.textContent = "H"
        result = "Heads"
    }
    else{
        CoinResult.textContent = "T"
        result = "Tails"
    }
    if(result === userPick){
        userStarts = true;
        text.textContent = "You Start!!"
    }
    else{
        userStarts = false;
        text.textContent = "AI Starts!!"
    }
    
    setTimeout(() => {
            text.textContent = "";
    },2000);
    coinToss = true;
    document.getElementById('gameErro').textContent = "";

    }, 1000)



}

let gameStarted = false;

function startGame(self){
if(coinToss && userActive){
    is_aiVshuman = true;
    localStorage.setItem("comGameRunning", "true");
    localStorage.setItem("gameRunning", "false");

    if(!userStarts){
    computerMove()
    }

    self.classList.add('disabled')
    if(self.classList.contains('disabled')){
        self.textContent = "Activated"
    }
    document.getElementById('gameErro').textContent = "";
    gameStarted =  true;
    localStorage.setItem("reset","false")

}
else if(!userActive){
    document.getElementById('gameErro').textContent = "You must enter a name";

}
else if(!coinToss){
    document.getElementById('gameErro').textContent = "You must Toss coin!";
}

}

























function computerMove(){
let boards = document.querySelectorAll('.box');
let num ;

if(checkSpace() || mapMarks()){
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

function checkLSpace(){
    let boards = document.querySelectorAll('.pBox');
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


if(userActive && gameStarted && coinToss){
    if(playerMove(box)){
        computerMove();
 
    }

    if(mapMarks()){
       boards.forEach(el => {
        el.classList.remove('disabled')
        el.classList.add('disabled')
       })
    document.getElementById('gameErro').textContent = "";
    }

           saveScore()

}

else if(!userActive){
    document.getElementById('gameErro').textContent = "You must enter a name";
}
else if(!coinToss){
    document.getElementById('gameErro').textContent = "You must Toss coin!";
}
else if(!gameStarted){
    document.getElementById('gameErro').textContent = "You must activate game!";
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
                let tieNum = document.querySelector('.drawScore');
                let z = Number(tieNum.textContent);
                tieNum.textContent = z + 1;
    }



 return winner;
}


function resetGame(){
    let boxes = document.querySelectorAll('.box')
    let resultText = document.querySelector('.final_result')
    resultText.classList.remove('show');
    resultText.textContent = "";
    document.getElementById('startGamee').classList.remove('disabled')
        document.getElementById('startGamee').textContent = "Activate Game"

    boxes.forEach(el => {
        el.classList.remove('win');
        el.classList.remove('loss');
        el.classList.remove('disabled');
        el.textContent = "";
    })

    coinToss = false;
    gameStarted = false;

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
    let AI_score = document.getElementById('comScore').textContent
    let USER_score = document.getElementById('userScore').textContent
    let playNam = document.getElementById('player1Name').textContent;
    let player2Nam = document.getElementById('player2Name').textContent;
    let player1Score = document.getElementById('player1Score').textContent
    let Player2Score = document.getElementById('player2Score').textContent
    let drawScore = document.getElementById('drawScore').textContent;
    let ties = document.getElementById('numOfties').textContent;
    localStorage.setItem("scores",JSON.stringify([AI_score,USER_score,nameSheet,playNam,player2Nam,player1Score,Player2Score,ties,drawScore]))
}

function loadScore(){
    let nameSheet = document.getElementById('player-name');
    let AI_score = document.getElementById('comScore')
    let USER_score = document.getElementById('userScore')
    let data = JSON.parse(localStorage.getItem("scores"));
    let ties = document.getElementById('numOfties');
    let drawScore = document.getElementById('drawScore');

    let playNam = document.getElementById('player1Name');
    let player2Nam = document.getElementById('player2Name');
    let player1Score = document.getElementById('player1Score')
    let Player2Score = document.getElementById('player2Score')
    AI_score.textContent = data[0]
    USER_score.textContent = data[1]
    nameSheet.textContent = data[2]
    playNam.textContent = data[3]
    player2Nam.textContent = data[4]
    player1Score.textContent = data[5]
    Player2Score.textContent = data[6]
    ties.textContent = data[7]
    drawScore.textContent = data[8]


    let reseT_is = localStorage.getItem("reset");
    let state = localStorage.getItem("gameRunning");
    let comState = localStorage.getItem("comGameRunning");




    if(comState === "true"){
        document.querySelector('.vsCOm').style.display = "block" 
        document.querySelector('.flexbox').style.display = "none"
        document.querySelector('.heeader').style.display = "none"
        document.querySelector('.fl1').style.display = "none"
        document.querySelector('.userInfo').style.display = "none"

    }
    let gameEross = localStorage.getItem("gameStarted");
    if(gameEross === "true"){
        userActive = true;
        document.querySelector('.whoStars').style.display = "flex"
    }



    if(state === "true"){
    document.querySelector('.buttonsTOacttion').style.display = "block";
   //document.querySelector('.userInfoo').style.display = "block";
    document.querySelector('.partner').style.display = "block";

    let boxess = document.querySelectorAll('.playerHideInfo');
    boxess.forEach(box =>{
        box.style.display = "none"
    })



    let userDetails = JSON.parse(localStorage.getItem("User-info"))
    let player1 = document.getElementById('selectedName1')
    let player2 = document.getElementById('selectedName2')
    let playSymb = document.getElementById('selectedSymbol1')
    let play2Symb = document.getElementById('selectedSymbol2')
    
    player1.textContent = userDetails[0];
    player2.textContent = userDetails[1];
    playSymb.textContent = userDetails[2];
    play2Symb.textContent = userDetails[3];

   let setButtons =   document.querySelectorAll('.setName');
   setButtons.forEach(el => {
    el.style.display = "none";
   })
    }
    if(reseT_is === "true"){
        document.querySelector('.userInfo').style.display = "block"
        document.querySelector('.fl1').style.display = "flex"
        document.querySelector('.flexbox').style.display = "flex"
    }
}

function resetScores(){
    document.getElementById('comScore').textContent  = "0"
    document.getElementById('userScore').textContent = "0"
    document.getElementById('drawScore').textContent = "0"
    document.getElementById('startGamee').classList.remove('disabled')
    saveScore()
    localStorage.setItem("comGameRunning", "false");

}

function activeLink(current){
    let links = document.querySelectorAll('.link')
    links.forEach(el => {
        el.classList.remove('activee')
    })
    current.classList.add('activee')
}

function getMode(btn,id, cont){
    let boxxx = btn.closest('.b-box')
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

    let allmodes = document.querySelectorAll('.b-box');
    allmodes.forEach(el => {
        el.classList.remove("selected")
    })
    boxxx.classList.add("selected")
}
function gotoLink(btn,id, cont){
    let computer =document.querySelector('.vsCOm')
    let partner =  document.querySelector('.partner')
    computer.style.display = "none";
    partner.style.display = "none";
    window.location.href = `#${id}`;

    let box = document.querySelector(`.${cont}`);
    box.style.display = "block";

    closeMenu()
}


function setPlayerDetails(box){
let card = box.closest('.parentDiv');
let playerName = card.querySelector('.Plname').value;
let SymbolName = card.querySelector('.plSymb').value;
let displayName = card.querySelector('.selectedName');
let displaySymbol = card.querySelector('.selectedSymbo');
let inputs = card.querySelector('.playerHideInfo');

if(playerName.trim() != ""){
    displayName.textContent = playerName;
    displaySymbol.textContent = SymbolName;

    inputs.style.display = "none";
    box.style.display = "none"
    box.classList.add('disabled')
    document.querySelector('.buttonsTOacttion').style.display = "block"
    card.querySelector('.userInfoo').style.display = 'block';
     document.getElementById('errorMessage').style.display = "none";

    is_gameRuning = true;
    let player1 = document.getElementById('selectedName1').textContent;
    let player2 = document.getElementById('selectedName2').textContent;
    let playSymb = document.getElementById('selectedSymbol1').textContent;
    let play2Symb = document.getElementById('selectedSymbol2').textContent;
    localStorage.setItem("gameRunning", "true");
    localStorage.setItem("comGameRunning", "false");
    localStorage.setItem("User-info",JSON.stringify([player1,player2,playSymb,play2Symb]))

}
else{
     document.getElementById('errorMessage').textContent = "You must choose a name";
     document.getElementById('textEror').style.display = "block";

}

    
}


function checkusers(){
    let player1 = document.getElementById('selectedName1')
    let player2 = document.getElementById('selectedName2')

    if(player1.textContent.trim() != "" && player2.textContent.trim() != ""){
        return true;
    }

    else{
        return false;
    }
}





function localGameStart(self){
    let displayName1 = document.getElementById('player1Name');
    let displayName2 = document.getElementById('player2Name');
    let userName1 = document.getElementById('selectedName1').textContent;
    let userName2 = document.getElementById('selectedName2').textContent;


    if(checkusers()){
    displayName1.textContent = userName1;
    displayName2.textContent = userName2;
    
    document.querySelector('.withStart').style.display = "block";
    self.classList.add('disabled')



    checkWhostarts();
    playerTurn();
    saveScore()
    window.location.href="#multiplyayer";

    document.getElementById('textEror').style.display = "none";
    ///random

    }  


    else{
         document.getElementById('textEror').style.display = "block";
        document.getElementById('errorMessage').textContent = "You must set Players";
    }



}

function LocalGamereset(){

    let names = document.querySelectorAll('.Plname');
    names.forEach(name => {
        name.value = ""
    });

    let buttons = document.querySelectorAll('.setName');
    buttons.forEach(btn =>{
        btn.classList.remove('disabled');
    })

    let details = document.querySelectorAll('.userInfoo');

    details.forEach(detail => {
        detail.style.display = "none";
    })

    let showForm = document.querySelectorAll('.playerHideInfo')
    showForm.forEach(form => {
        form.style.display = "flex";
    })

    let activeBtn = document.querySelectorAll('.startLocalGame');
    activeBtn.forEach(btn =>{
        btn.classList.remove('disabled');
    })
    let board = document.querySelectorAll('.pBox')
    board.forEach(bd =>{
        bd.textContent = "";
        bd.classList.remove('disabled')
    })
    
    let users = document.querySelectorAll('.player1Score');
    users.forEach(user =>{
        user.textContent = 0;
    })
    let tie = document.getElementById('numOfties');
    tie.textContent = 0;

    document.querySelector('.playerTurn').textContent = ""
    saveScore()

    localStorage.removeItem('User-info');
    localStorage.clear();
    is_gameRuning = false;

   let setButtons =   document.querySelectorAll('.setName');
   setButtons.forEach(el => {
    el.style.display = "block";
   })

   document.getElementById('selectedName1').textContent = ""
   document.getElementById('selectedName2').textContent = ""
    document.getElementById('selectedSymbol1').textContent = ""
    document.getElementById('selectedSymbol2').textContent = ""  

  removeboxClass()


}



function twoPlayerGame(box){
    let board = document.querySelectorAll('.pBox')

if(checkusers()){
    makeAmove(box);
    playerTurn();


        if(mapLocal()){
       board.forEach(el => {
        el.classList.remove('disabled')
        el.classList.add('disabled')
       })

    }

    saveScore()

}    

else{
    document.querySelector('.playerTurn').textContent = "You must set Players";
}
    

}


function playerTurn(){
    let name = document.querySelector('.playerTurn');
    let play1Name = document.getElementById('selectedName1').textContent;
    let play2Name = document.getElementById('selectedName2').textContent;
    if(currentPlayer === "player1"){
        name.textContent = `${play1Name}'s turn`
    }
    else{
        name.textContent = `${play2Name}'s turn`
    }
}


function makeAmove(box){
    let play1Sym = document.getElementById('selectedSymbol1').textContent;
    let play2Sym = document.getElementById('selectedSymbol2').textContent;
    if(box.textContent.trim() != ""){
        return;
    }

    else {
        if(currentPlayer === "player1"){
            box.textContent = play1Sym;
            currentPlayer = "player2"
        }
        else{
            box.textContent = play2Sym;
            currentPlayer = "player1"            
        }

        box.classList.add('disabled')
    }


}



function mapLocal(){
    let boards = document.querySelectorAll('.pBox');
    let winner = false ;
    let play1Sym = document.getElementById('selectedSymbol1').textContent;
    let play2Sym = document.getElementById('selectedSymbol2').textContent;
    let playerName1=  document.getElementById('selectedName1').textContent
    let playerName2=  document.getElementById('selectedName2').textContent
    let comScore = document.getElementById('player1Score');
    let userScore = document.getElementById('player2Score');
    let x = Number(comScore.textContent);
    let y = Number(userScore.textContent);
    let resultText =  document.querySelector('.playerTurn')


    if((boards[0].textContent.trim() !== "") && (boards[0].textContent === boards[1].textContent) && (boards[1].textContent === boards[2].textContent)){
            if(boards[0].textContent === play1Sym){
                boards[0].classList.add('winnF')
                boards[1].classList.add('winnF')
                boards[2].classList.add('winnF')
                comScore.textContent = x + 1;
                resultText.textContent = `${playerName1} Won!!!`
                resultText.classList.add('show')
            }
            else{
                boards[0].classList.add('winnF')
                boards[1].classList.add('winnF')
                boards[2].classList.add('winnF')
                userScore.textContent = y + 1;
                resultText.textContent = `${playerName2} Won!!!`
                resultText.classList.add('show')
            }
            gameover = true;
            winner = true;
            console.log(x)
    }
    else if((boards[3].textContent.trim() !== "") && (boards[3].textContent === boards[4].textContent) && (boards[4].textContent === boards[5].textContent)){
            if(boards[3].textContent === play1Sym){
                boards[3].classList.add('winnF')
                boards[4].classList.add('winnF')
                boards[5].classList.add('winnF')
                comScore.textContent = x + 1;
                resultText.textContent = `${playerName1} Won!!!`
                resultText.classList.add('show')
            }
            else{
                boards[3].classList.add('winnF')
                boards[4].classList.add('winnF')
                boards[5].classList.add('winnF')
                userScore.textContent = y + 1;
                resultText.textContent = `${playerName2} Won!!!`
                resultText.classList.add('show')

            }
            gameover = true;
            winner = true;
    }
    else if((boards[6].textContent.trim() !== "") && (boards[6].textContent === boards[7].textContent) && (boards[7].textContent === boards[8].textContent)){
            if(boards[6].textContent === play1Sym){
                boards[6].classList.add('winnF')
                boards[7].classList.add('winnF')
                boards[8].classList.add('winnF')
                comScore.textContent = x + 1;
                resultText.textContent = `${playerName1} Won!!!`
                resultText.classList.add('show')
            }
            else{
                boards[6].classList.add('winnF')
                boards[7].classList.add('winnF')
                boards[8].classList.add('winnF')
                userScore.textContent = y + 1;
                resultText.textContent = `${playerName2} Won!!!`
                resultText.classList.add('show')
            }
            gameover = true;
            winner = true;
    }
    else if((boards[0].textContent.trim() !== "") && (boards[0].textContent === boards[4].textContent) && (boards[4].textContent === boards[8].textContent)){
            if(boards[0].textContent === play1Sym){
                boards[0].classList.add('winnF')
                boards[4].classList.add('winnF')
                boards[8].classList.add('winnF')
                comScore.textContent = x + 1;
                resultText.textContent = `${playerName1} Won!!!`
                resultText.classList.add('show')
            }
            else{
                boards[0].classList.add('winnF')
                boards[4].classList.add('winnF')
                boards[8].classList.add('winnF')
                userScore.textContent = y + 1;
                resultText.textContent = `${playerName2} Won!!!`
                resultText.classList.add('show')
            }
            gameover = true;
            winner = true;
    }
    else if((boards[2].textContent.trim() !== "") && (boards[2].textContent === boards[4].textContent) && (boards[4].textContent === boards[6].textContent)){
            if(boards[2].textContent === play1Sym){
                boards[2].classList.add('winnF')
                boards[4].classList.add('winnF')
                boards[6].classList.add('winnF')
                comScore.textContent = x + 1;
                resultText.textContent = `${playerName1} Won!!!`
                resultText.classList.add('show')
            }
            else{
                boards[2].classList.add('winnF')
                boards[4].classList.add('winnF')
                boards[6].classList.add('winnF')
                userScore.textContent = y + 1;
                resultText.textContent = `${playerName2} Won!!!`
                resultText.classList.add('show')

            }
            gameover = true;
            winner = true;
    }
    else if((boards[0].textContent.trim() !== "") && (boards[0].textContent === boards[3].textContent) && (boards[3].textContent === boards[6].textContent)){
            if(boards[0].textContent === play1Sym){
                boards[0].classList.add('winnF')
                boards[3].classList.add('winnF')
                boards[6].classList.add('winnF')
                comScore.textContent = x + 1;
                resultText.textContent = `${playerName1} Won!!!`
                resultText.classList.add('show')
            }
            else{
                boards[0].classList.add('winnF')
                boards[3].classList.add('winnF')
                boards[6].classList.add('winnF')
                userScore.textContent = y + 1;
                resultText.textContent = `${playerName2} Won!!!`
                resultText.classList.add('show')

            }
            gameover = true;
            winner = true;
    }
    else if((boards[1].textContent.trim() !== "") && (boards[1].textContent === boards[4].textContent) && (boards[4].textContent === boards[7].textContent)){
            if(boards[1].textContent === play1Sym){
                boards[1].classList.add('winnF')
                boards[4].classList.add('winnF')
                boards[7].classList.add('winnF')
                comScore.textContent = x + 1;
                resultText.textContent = `${playerName1} Won!!!`
                resultText.classList.add('show')
            }
            else{
                boards[1].classList.add('winnF')
                boards[4].classList.add('winnF')
                boards[7].classList.add('winnF')
                userScore.textContent = y + 1;
                resultText.textContent = `${playerName2} Won!!!`

                resultText.classList.add('show')
            }
            gameover = true;
            winner = true;
    }
    else if((boards[2].textContent.trim() !== "") && (boards[2].textContent === boards[5].textContent) && (boards[5].textContent === boards[8].textContent)){
            if(boards[2].textContent === play1Sym){
                boards[2].classList.add('winnF')
                boards[5].classList.add('winnF')
                boards[8].classList.add('winnF')
                comScore.textContent = x + 1;
                resultText.textContent = `${playerName1} Won!!!`
                resultText.classList.add('show')
            }
            else{
                boards[2].classList.add('winnF')
                boards[5].classList.add('winnF')
                boards[8].classList.add('winnF')
                userScore.textContent = y + 1;
                resultText.textContent = `${playerName2} Won!!!`
                resultText.classList.add('show')
            }
            gameover = true;
            winner = true;
            
    }

    
    else if(checkLSpace() && !winner){
                resultText.textContent = "It's a Tie"
                resultText.style.color = "black"
                resultText.classList.add('show')
               let tieResult = document.getElementById('numOfties')
               let gg = Number(tieResult.textContent);
               tieResult.textContent = gg + 1;
               boards.forEach(el =>{
                    el.classList.remove('disabled')
                    el.classList.add('disabled')
               })
    }
    if(winner){
        resultText.style.color = "green"

    }

 return winner;
}


function localMatchagain(){
  //  let resultText = document.querySelector('.final_result')
   // resultText.classList.remove('show');
   // resultText.textContent = "";
   document.querySelector('.playerTurn').style.color = "black";
    document.getElementById('startGamee').classList.remove('disabled')
    if(checkusers()){
    removeboxClass()
    checkWhostarts();
    playerTurn();
    }

    else{
    document.querySelector('.playerTurn').textContent = "You must set Players";

    }
 
}



function removeboxClass(){
        let boxes = document.querySelectorAll('.pBox')
    boxes.forEach(el => {
        el.classList.remove('win');
        el.classList.remove('loss');
        el.classList.remove('disabled');
        el.classList.remove('winnF');
        el.textContent = "";
    })
}


function resetScoreL(){
    let scores = document.querySelectorAll('.player1Score');
    let tie  = document.getElementById('numOfties')

    scores.forEach(el =>{
        el.textContent = 0;
    })
    tie.textContent = 0;
    saveScore()
}

function toshowMenu(){
    let menu = document.getElementById('menu')
    menu.style.display = "flex"
}

function closeMenu(){
    let menu = document.getElementById('menu');
    let bar = document.querySelector('.menuBar')
    menu.style.display = "none"
    bar.style.display = "flex"

}


function newGame(){
    let box = document.querySelectorAll('.box');


    box.forEach(bx =>{
        bx.textContent = "";
        bx.classList.remove('win')
        bx.classList.remove('lose')
        bx.classList.remove('diasbled')
    })

    let scores = document.querySelectorAll('.score');
    scores.forEach(Score => {
        Score.textContent = 0;

    })

        document.querySelector('.final_result').textContent = "";





    document.getElementById('drawScore').textContent = 0;
    document.getElementById('userName').classList.remove('disabled')
    document.getElementById('subBtn').classList.remove('disabled')
    document.getElementById('subBtn').textContent = "Submit"
    document.getElementById('userName').value = ""
    document.querySelector('.userInfo').style.display = "block"
    document.querySelector('.fl1').style.display = "flex"
    document.querySelector('.flexbox').style.display = "flex"
    
    localStorage.setItem("reset","true")
    document.getElementById('player-name').textContent ="Guest";
    localStorage.setItem("gameStarted","false");

    userActive = false;
    coinToss = false;
    gameStarted = false;
    let comState = localStorage.setItem("comGameRunning", "false");

    resetGame()
    saveScore();
}