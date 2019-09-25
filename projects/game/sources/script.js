const nameOfElement = {
    boxForm: document.querySelector("#boxForm"),
    boxGame: document.querySelector("#boxGame"),
    gameContainer: document.querySelector("#gameContainer"),
    topContainer: document.querySelector("#topContainer"),
    multiselectWrapper: document.querySelector("#multiselect-wrapper"),
    personFirstName: document.querySelector("#personFirstName"),
    personLastName: document.querySelector("#personLastName"),
    personEmail: document.querySelector("#personEmail"),
    buttonGoToPlay: document.querySelector("#goToPlay"),
    buttonGameMenu: document.querySelector("#buttonGameMenu"),
    buttonContinueGame: document.querySelector("#buttonContinueGame"),
    buttonRestartGame: document.querySelector("#buttonRestartGame"),
    buttonNewGame: document.querySelector("#buttonNewGame"),
    topButton: document.querySelector("#topButton"),
    topEasySelector: document.querySelector("#top-easy-selector"),
    topMediumSelector: document.querySelector("#top-medium-selector"),
    topHardSelector: document.querySelector("#top-hard-selector"),
    closeTopContainer: document.querySelector("#closeTopContainer"),
    difficultList: document.querySelector("#difficultList"),
    timerMinute: document.querySelector("#timerMinute"),
    timerSecond: document.querySelector("#timerSecond"),
    skirtWrapper: document.querySelector("#skirt-wrapper"),
    gameMenuContainer: document.querySelector("#gameMenuContainer"),
    topEasyContainer: document.querySelector("#topEasyContainer"),
    topMediumContainer: document.querySelector("#topMediumContainer"),
    topHardContainer: document.querySelector("#topHardContainer"),
    difficultText: document.querySelector("#difficult-text"),
    difficultArrowLeft: document.querySelector("#difficult-arrow-left"),
    difficultArrowRight: document.querySelector("#difficult-arrow-right"),
    howToPlayBox: document.querySelector("#howToPlayBox"),
    closeRulesButton: document.querySelector("#closeRulesButton"),
    openRulesButton: document.querySelector("#openRulesButton"),
    gameInformation: document.querySelector("#game-information"),
    arrPicture: ["picture-1", "picture-2", "picture-3", "picture-4", "picture-5", "picture-6", "picture-7", "picture-8", "picture-9", "picture-10", "picture-11", "picture-12"],
    arrShirts: ["skirt-1", "skirt-2", "skirt-3"],
    arrDifficult: ["boxGame-easy", "boxGame-medium", "boxGame-hard"],
    difficultListArray: ["Easy", "Medium", "Hard"],
    difficultCurrentGame: 0,
    countOfCard: 0,
    prevCard: "",
    difficult: [12, 18, 24],
    numberOfCards: 12,
    numberOfSkirt: 0,
    remainingCards: 12,
    timeMin: 0,
    timSec: 0,
    timeMiliSec: 0,
    stopTimer: false
};

function timerGame() {
    let timer = setInterval(function() {
        if(nameOfElement.stopTimer){
            clearInterval(timer);
        }
        else if(nameOfElement.timeMiliSec < 9){
            nameOfElement.timeMiliSec ++
        }
        else if(nameOfElement.timSec < 59){
            nameOfElement.timSec ++;
            nameOfElement.timeMiliSec = 0;
            if(nameOfElement.timSec < 10){
                nameOfElement.timerSecond.innerHTML = "0" + nameOfElement.timSec;
            }
            else{
                nameOfElement.timerSecond.innerHTML = nameOfElement.timSec;
            }
        }
        else{
            nameOfElement.timeMin ++;
            nameOfElement.timSec = 0;
            nameOfElement.timeMiliSec = 0;
            nameOfElement.timerMinute.innerHTML = nameOfElement.timeMin;
            nameOfElement.timerSecond.innerHTML = "0" + nameOfElement.timSec;
        }

    }, 100);
}

function goToGame() {
    if(nameOfElement.personFirstName.validity.valid && nameOfElement.personLastName.validity.valid){
        const person = {
            personFirstName:  nameOfElement.personFirstName.value,
            personLastName:  nameOfElement.personLastName.value,
            personEmail:  nameOfElement.personEmail.value
        };
        let st = JSON.stringify(person);
        localStorage.setItem(nameOfElement.personFirstName.value + nameOfElement.personLastName.value, st);

        nameOfElement.boxForm.classList.add("hide");
        nameOfElement.gameContainer.classList.remove("hide");

        for(let i=0; i< nameOfElement.difficultListArray.length; i++){
            if(nameOfElement.difficultText.innerHTML === nameOfElement.difficultListArray[i]){
                nameOfElement.difficultCurrentGame = i;
            }
        }
        nameOfElement.numberOfCards = nameOfElement.difficult[nameOfElement.difficultCurrentGame];
        nameOfElement.numberOfSkirt = 0;
        for(let i=0; i<Array.from(nameOfElement.skirtWrapper.children).length; i++){
            if(Array.from(nameOfElement.skirtWrapper.children)[i].classList.contains("skirt-selected")){
                nameOfElement.numberOfSkirt = i;
            }
        }
        nameOfElement.remainingCards = nameOfElement.numberOfCards;
        createGame()
    }

}

function createGame() {
    nameOfElement.gameInformation.classList.remove("hide");
    nameOfElement.gameMenuContainer.classList.add("hide");
    nameOfElement.timeMin = 0;
    nameOfElement.timSec = 0;
    nameOfElement.stopTimer = false;
    nameOfElement.timerMinute.innerHTML = "0";
    nameOfElement.timerSecond.innerHTML = "00";

    nameOfElement.boxGame.innerHTML = "";
    const numCard = nameOfElement.numberOfCards;
    const numShit = nameOfElement.numberOfSkirt;
    for(let i=0; i<nameOfElement.arrDifficult.length; i++ ){
        let value = nameOfElement.arrDifficult[i];
        nameOfElement.boxGame.classList.remove(value);
    }
    const difficult = nameOfElement.arrDifficult[nameOfElement.difficultCurrentGame];
    nameOfElement.boxGame.classList.add(difficult);

    let numberPicObj = {};
    for(let i=0; i<numCard; i++){
            let card = document.createElement("div");
            card.classList.add("card");

            let back = document.createElement("div");
            back.classList.add("back", "side", "skirt", "flip");
            back.classList.add(nameOfElement.arrShirts[numShit]);
            card.appendChild(back);

            let front = document.createElement("div");
            front.classList.add("front", "side");

            function setClass(){
                let cardClassIndex = Math.floor(Math.random() * 12);
                if(cardClassIndex < (numCard / 2)){
                    if(!(numberPicObj[nameOfElement.arrPicture[cardClassIndex]])){
                        numberPicObj[nameOfElement.arrPicture[cardClassIndex]] = [1, nameOfElement.arrPicture[cardClassIndex]];
                        return numberPicObj[nameOfElement.arrPicture[cardClassIndex]][1];
                    }
                    else if(numberPicObj[nameOfElement.arrPicture[cardClassIndex]][0] === 1){
                        numberPicObj[nameOfElement.arrPicture[cardClassIndex]][0] = 2;
                        return numberPicObj[nameOfElement.arrPicture[cardClassIndex]][1];
                    }
                    else if(numberPicObj[nameOfElement.arrPicture[cardClassIndex]][0] === 2){
                        return setClass()
                    }
                }
                return setClass()
            }
            let cardPictureClass = setClass();
            front.classList.add(cardPictureClass);
            card.appendChild(front);
            nameOfElement.boxGame.appendChild(card)
    }
    setTimeout(startGame, 1000)
}

function startGame(){
    Array.from(nameOfElement.boxGame.children).forEach(function (element) {
        Array.from(element.children).forEach(function (e) {
            if(e.classList.contains("flip")){
                e.classList.remove("flip")
            }
            else {
                e.classList.add("flip")
            }
        })
    });
    for(let i=0; i< Array.from(nameOfElement.boxGame.children).length; i++){
        Array.from(nameOfElement.boxGame.children)[i].addEventListener("click", upendCard);
    }
    timerGame();
}

function upendCard(e) {
    const cardArr =  Array.from(e.currentTarget.children);
    if(nameOfElement.countOfCard === 0){
        cardArr[0].classList.add("flip");
        cardArr[1].classList.remove("flip");
        nameOfElement.prevCard = cardArr;
        nameOfElement.countOfCard = 1;
    }
    else if(nameOfElement.countOfCard === 1){
        cardArr[0].classList.add("flip");
        cardArr[1].classList.remove("flip");
        if(cardArr[1].classList[2] === nameOfElement.prevCard[1].classList[2]){
            const card1 = cardArr;
            const card2 = nameOfElement.prevCard;
            nameOfElement.countOfCard = 0;
            nameOfElement.prevCard = "";
            nameOfElement.remainingCards = nameOfElement.remainingCards - 2;
            setTimeout(function () {
                card1[1].classList.add("flip");
                card2[1].classList.add("flip");
                if(nameOfElement.remainingCards === 0) {
                    nameOfElement.stopTimer = true;
                    console.log(nameOfElement.timeMiliSec);
                    nameOfElement.remainingCards = nameOfElement.numberOfCards;
                    let time = nameOfElement.timeMin * 60 + nameOfElement.timSec + nameOfElement.timeMiliSec * 0.1;
                    const arrPersonTime = [nameOfElement.personFirstName.value, nameOfElement.personLastName.value, time];
                    let difficultThisGame = nameOfElement.difficultListArray[nameOfElement.difficultCurrentGame];
                    let stor = localStorage.getItem(difficultThisGame);
                    if(!stor){
                        let arr = [];
                        arr.push(arrPersonTime);
                        let string = JSON.stringify(arr);
                        localStorage.setItem(difficultThisGame, string)
                    }
                    else{
                        let arrStor = JSON.parse(stor);
                        if(arrStor.length === 10){
                            sort(arrStor);
                            if(arrStor[9][2] < arrPersonTime[2]){
                                arrStor.pop();
                                arrStor.push(arrPersonTime);
                                let string = JSON.stringify(arrStor);
                                localStorage.setItem(difficultThisGame, string)
                            }
                        }
                        else{
                            arrStor.push(arrPersonTime);
                            let string = JSON.stringify(arrStor);
                            localStorage.setItem(difficultThisGame, string)
                        }
                    }
                    setTimeout(function () {
                        nameOfElement.gameInformation.classList.add("hide");
                        nameOfElement.boxGame.classList.remove(nameOfElement.arrDifficult[nameOfElement.difficultCurrentGame]);
                        nameOfElement.boxGame.innerHTML = "<div class='win-text white-text'>You are win!</div>";
                        const winButtonWrapper = document.createElement("div");
                        winButtonWrapper.classList.add("win-button-wrapper");
                        const buttonRestart =  document.createElement("button");
                        buttonRestart.innerText = "Restart";
                        buttonRestart.classList.add("win-button", "white-text");
                        buttonRestart.addEventListener("click", createGame);
                        winButtonWrapper.appendChild(buttonRestart);
                        const buttonNewGame =  document.createElement("button");
                        buttonNewGame.innerText = "New Game";
                        buttonNewGame.classList.add("win-button", "white-text");
                        buttonNewGame.addEventListener("click", newGame);
                        winButtonWrapper.appendChild(buttonNewGame);
                        const buttonTop10 =  document.createElement("button");
                        buttonTop10.innerText = "Top 10";
                        buttonTop10.classList.add("win-button", "white-text");
                        buttonTop10.addEventListener("click", openTop10);
                        winButtonWrapper.appendChild(buttonTop10);
                        nameOfElement.boxGame.appendChild(winButtonWrapper);
                        nameOfElement.endOfGame = true;
                    },700)
                }
            }, 700);
        }
        else {
            const card1 = cardArr;
            const card2 = nameOfElement.prevCard;
            nameOfElement.countOfCard = 0;
            nameOfElement.prevCard = "";
            setTimeout(function () {
                card1[0].classList.remove("flip");
                card1[1].classList.add("flip");
                card2[0].classList.remove("flip");
                card2[1].classList.add("flip");
            }, 700);
        }
    }
}

function openGameMenu (e) {
    e.preventDefault();
    nameOfElement.gameMenuContainer.classList.remove("hide");
    nameOfElement.stopTimer = true;
    for(let i=0; i< Array.from(nameOfElement.boxGame.children).length; i++){
        Array.from(nameOfElement.boxGame.children)[i].removeEventListener("click", upendCard);
    }
}

function continueGame(e){
    e.preventDefault();
    nameOfElement.gameMenuContainer.classList.add("hide");
    nameOfElement.stopTimer = false;
    for(let i=0; i< Array.from(nameOfElement.boxGame.children).length; i++){
        Array.from(nameOfElement.boxGame.children)[i].addEventListener("click", upendCard);
    }
    timerGame();
}

function newGame(e) {
    e.preventDefault();
    nameOfElement.boxForm.classList.remove("hide");
    nameOfElement.gameContainer.classList.add("hide");
    nameOfElement.gameMenuContainer.classList.add("hide");
}

function sort(arr) {
        let change = 0;
        do {
            change = 0;
            for (let i = 0; i < arr.length - 1; i++) {
                let changeValue = [];
                if (arr[i][2] > arr[i + 1][2]) {
                    changeValue = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = changeValue;
                    change++
                }
            }
        } while (change);
}

function createTopList() {
    let list =  Array.from(nameOfElement.multiselectWrapper.children);
    list = list.filter(child => child.classList.contains("top-list-difficult-selector"));
    let num = 0;
    for(let i=0; i<list.length; i++){
        list[i].addEventListener("click", changeTopListSelector);
        if(list[i].classList.contains("selected-top-list")){
            num = i;
        }
    }
    let top = localStorage.getItem(nameOfElement.difficultListArray[num]);
    if(top){
        top = JSON.parse(top);
        sort(top);
        console.log(top);
        nameOfElement.topEasyContainer.innerHTML = "";
        for(let i=0; i<top.length; i++){
            let topRow = document.createElement("div");
            topRow.innerText = i+1 + ". " + top[i][0] + " " + top[i][1] + ": " + top[i][2];
            nameOfElement.topEasyContainer.appendChild(topRow);
        }
    }
    else {
        nameOfElement.topEasyContainer.innerHTML = "No results!";
    }
}

function openTop10(e) {
    e.preventDefault();
    nameOfElement.topContainer.classList.remove("hide");
    createTopList();
}

function closeTop10(e) {
    e.preventDefault();
    nameOfElement.topContainer.classList.add("hide");
}

function changeTopListSelector(e) {
    e.preventDefault();
    let list =  Array.from(nameOfElement.multiselectWrapper.children);
    list = list.filter(child => child.classList.contains("top-list-difficult-selector"));
    for(let i=0; i<list.length; i++){
        list[i].classList.remove("selected-top-list")
    }
    e.target.classList.add("selected-top-list");
    createTopList()
}

function selectSkirt(e){
    let list =  Array.from(nameOfElement.skirtWrapper.children);
    for(let i=0; i<list.length; i++){
        list[i].classList.remove("skirt-selected")
    }
    e.target.classList.add("skirt-selected");
}

function pressRightArrow() {
    if(nameOfElement.difficultCurrentGame === 2){
        nameOfElement.difficultCurrentGame = 0;
        nameOfElement.difficultText.innerHTML = nameOfElement.difficultListArray[nameOfElement.difficultCurrentGame]
    }
    else{
        nameOfElement.difficultCurrentGame++;
        nameOfElement.difficultText.innerHTML = nameOfElement.difficultListArray[nameOfElement.difficultCurrentGame]
    }
}

function pressLeftArrow() {
    if(nameOfElement.difficultCurrentGame === 0){
        nameOfElement.difficultCurrentGame = 2;
        nameOfElement.difficultText.innerHTML = nameOfElement.difficultListArray[nameOfElement.difficultCurrentGame]
    }
    else{
        nameOfElement.difficultCurrentGame--;
        nameOfElement.difficultText.innerHTML = nameOfElement.difficultListArray[nameOfElement.difficultCurrentGame]
    }
}

function openRules(e) {
    e.preventDefault();
    nameOfElement.howToPlayBox.classList.remove("hide");
}

function closeRules(e) {
    e.preventDefault();
    nameOfElement.howToPlayBox.classList.add("hide");
}

for(let i=0; i< Array.from(nameOfElement.skirtWrapper.children).length; i++){
    Array.from(nameOfElement.skirtWrapper.children)[i].addEventListener("click", selectSkirt)
}

nameOfElement.buttonGoToPlay.addEventListener("click", goToGame);
nameOfElement.buttonGameMenu.addEventListener("click", openGameMenu);
nameOfElement.buttonContinueGame.addEventListener("click", continueGame);
nameOfElement.buttonRestartGame.addEventListener("click", createGame);
nameOfElement.buttonNewGame.addEventListener("click", newGame);
nameOfElement.topButton.addEventListener("click", openTop10);
nameOfElement.closeTopContainer.addEventListener("click", closeTop10);
nameOfElement.difficultArrowRight.addEventListener("click", pressRightArrow);
nameOfElement.difficultArrowLeft.addEventListener("click", pressLeftArrow);
nameOfElement.openRulesButton.addEventListener("click", openRules);
nameOfElement.closeRulesButton.addEventListener("click", closeRules);
