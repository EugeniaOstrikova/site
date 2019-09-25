let requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame;

function init() {
    data.canvasFight.width = document.querySelector("body").clientWidth - 10;
    data.canvasFight.height = document.querySelector("body").clientHeight - 10;
    data.ctx = data.canvasFight.getContext("2d");

    data.isMassage = true;
    createSpellSprite();

    data.lifeLine.character.posDestinationX = data.canvasFight.width * 0.01 + data.lifeLine.character.marginBack;
    data.lifeLine.character.posDestinationY = data.canvasFight.height * 0.01 + data.lifeLine.character.marginTop;
    data.lifeLine.monster.posDestinationX = data.canvasFight.width - (data.canvasFight.width * 0.01) - data.lifeLine.monster.marginBack - data.lifeLine.monster.border*2;
    data.lifeLine.monster.posDestinationY = data.canvasFight.height * 0.01 + data.lifeLine.monster.marginTop;

    data.taskList= [createTask1, createTask2, createTask3, createTask4];
    data.timeCharacter = Date.now();

    data.characterPart = [];
    let characterArray = JSON.parse(localStorage.getItem("person")).character;
    characterArray.forEach(item =>
    {   item[4] = item[4] + (data.canvasFight.width * 0.1);
        item[5] = item[5] + (data.canvasFight.height * 0.55);
        let part = new CharacterSprite(item[0], item[1], item[2], item[3], item[4], item[5], item[6]);
        data.characterPart.push(part)
    });
    data.monsterPart = [];
    data.monster.forEach(item =>
    {   let count = Math.floor(Math.random() * 3);
        if(item[3] === 'head'){
            data.monsterHeadName = count;
        }
        item[0] = count * item[2][0];
        item[4] = item[4] + (data.canvasFight.width - (data.canvasFight.width * 0.1) - 305/2) ;
        item[5] = item[5] + (data.canvasFight.height * 0.55);
        let part = new CharacterSprite(item[0], item[1], item[2], item[3], item[4], item[5], item[6]);
        data.monsterPart.push(part);
        part.draw(data.ctx) });

    data.monsterAdjName = data.monsterName[0][Math.floor(Math.random() * 5)];
    main();
}

function main() {
    if(data.isGamePlay){
        data.ctx.clearRect(0, 0, data.canvasFight.width, data.canvasFight.height);
        data.ctx.drawImage(resources.get("sources/images/game-bg.png"),0, 0, 4096, 1780, 0, 0,data.canvasFight.width, data.canvasFight.height);

        renderCharacter();
        renderFon();

        if(data.isMassage){
            showMessage(data.massage, data.ctx)
        }
        if(data.isAnimate){
            animateSpell(data.spellNumber, data.ctx, castSpell, data.nowStep);
        }

        data.firstRender = false;
        requestAnimFrame(main)
    }
    else {
        stopGame()
    }
}

function stopGame() {
    if(!data.isGamePlay){
        data.ctx.clearRect(0, 0, data.canvasFight.width, data.canvasFight.height);
        data.ctx.drawImage(resources.get("sources/images/game-bg.png"),0, 0, 4096, 1780, 0, 0,data.canvasFight.width, data.canvasFight.height);

        renderCharacter();
        renderFon();

        data.ctx.fillStyle = "rgba(242, 245, 250, 0.7)";
        data.ctx.fillRect(0, data.canvasFight.height * 0.3, data.canvasFight.width, data.canvasFight.height * 0.4);
        data.ctx.font = "54px serif";
        data.ctx.fillStyle = "#232E36";
        if(data.youWin){
            data.ctx.fillText("You win!", data.canvasFight.width * 0.5 - 100, data.canvasFight.height * 0.5);
        }
        else {
            data.ctx.fillText("You Loss!", data.canvasFight.width * 0.5 - 100, data.canvasFight.height * 0.5);
        }
        let buttonNewGame = document.querySelector("#new-game-button");
        buttonNewGame.classList.remove("hidden");
        buttonNewGame.addEventListener("click", createNewGame);
        requestAnimFrame(stopGame)
    }
}

function renderCharacter() {
    if(14*(Date.now()- data.timeCharacter)/1000 >1){
        if(data.posInPersonAnimList < data.personAnimList.length){
            render(data.characterPart, data.personAnimList[data.posInPersonAnimList]);
            render(data.monsterPart, data.personAnimList[data.posInPersonAnimList]);
            data.posInPersonAnimList++;
        }
        else{
            render(data.characterPart, data.personAnimList[data.posInPersonAnimList]);
            render(data.monsterPart, data.personAnimList[data.posInPersonAnimList]);
            data.posInPersonAnimList = 0;
        }
        data.timeCharacter = Date.now();
    }
    else {
        render(data.characterPart, data.personAnimList[data.posInPersonAnimList]);
        render(data.monsterPart, data.personAnimList[data.posInPersonAnimList]);
    }
}

function render(arr, path) {
    arr.forEach(item => item.typeOfPart !== "leg1" && item.typeOfPart !== "leg2" ? item.draw(data.ctx, item.positionInDestinationY + path) : item.draw(data.ctx))
}

function renderFon() {
    let dataSave = JSON.parse(localStorage.getItem("person"));

    renderLifeLine(data.lifeLine.character, 0, 0);
    renderLifeLine(data.lifeLine.monster,data.lifeLine.monster.width * data.lifeLine.monster.life , data.lifeLine.monster.width);

    data.ctx.drawImage(resources.get("sources/images/pentagon.png"), 0, 0, 447, 425, data.canvasFight.width * 0.01, data.canvasFight.height * 0.01, 440/3, 419/3);
    data.ctx.drawImage(resources.get("sources/images/pentagon.png"), 470, 0, 447, 425, data.canvasFight.width - (data.canvasFight.width * 0.01) - 440/3, data.canvasFight.height * 0.01, 440/3, 419/3);
    data.ctx.drawImage(resources.get("sources/images/heroes-sprite.png"), dataSave.character[5][0], 0, 227, 224, data.canvasFight.width * 0.01 + 440/6 - 227/6, data.canvasFight.height * 0.01 + 419/6 - 224/6, 227/3, 224/3);
    data.ctx.drawImage(resources.get("sources/images/monster-sprite.png"), data.monster[5][0], 0, 291, 242, (data.canvasFight.width - (data.canvasFight.width * 0.01) - 440/3) + 440/6 - 291/6, data.canvasFight.height * 0.01 + 419/6 - 242/6, 291/3, 242/3);
    data.ctx.font = "bold 32px serif";
    data.ctx.fillStyle = "#0e1a23";
    data.ctx.fillText(data.characterHealth + "/1000", data.canvasFight.width * 0.01  + 440/3, data.canvasFight.height * 0.01 + 70);
    data.ctx.fillText(dataSave.name, data.canvasFight.width * 0.01  + 440/3, data.canvasFight.height * 0.01 + 40);
    data.ctx.textAlign = "right";
    data.ctx.fillText(data.monsterHealth + "/1000", data.canvasFight.width - data.canvasFight.width * 0.01  - 440/3, data.canvasFight.height * 0.01 + 70);
    data.ctx.fillText(data.monsterAdjName + " " + data.monsterName[1][data.monsterHeadName], data.canvasFight.width - data.canvasFight.width * 0.01  - 440/3 , data.canvasFight.height * 0.01 + 40);
    data.ctx.textAlign = "left";
    data.ctx.fillStyle = "#f2f5fa";
    data.ctx.fillText(data.characterHealth + "/1000", data.canvasFight.width * 0.01  + 440/3 +2, data.canvasFight.height * 0.01 + 70 +2);
    data.ctx.fillText(dataSave.name, data.canvasFight.width * 0.01  + 440/3 +2, data.canvasFight.height * 0.01 + 40 +2);
    data.ctx.textAlign = "right";
    data.ctx.fillText(data.monsterHealth + "/1000", data.canvasFight.width - data.canvasFight.width * 0.01  - 440/3 +2, data.canvasFight.height * 0.01 + 70 +2);
    data.ctx.fillText(data.monsterAdjName + " " + data.monsterName[1][data.monsterHeadName], data.canvasFight.width - data.canvasFight.width * 0.01  - 440/3 +2, data.canvasFight.height * 0.01 + 40 +2);
    data.ctx.textAlign = "left";
}

function renderLifeLine(line, marginLine, margin){
    data.ctx.fillStyle = line.borderColor;
    data.ctx.fillRect(line.posDestinationX - margin, line.posDestinationY, line.width + line.border *2, line.height + line.border *2);
    data.ctx.fillStyle = line.backgroundColor;
    data.ctx.fillRect(line.posDestinationX + line.border -margin, line.posDestinationY + line.border, line.width, line.height);
    data.ctx.fillStyle = line.lineColor;
    data.ctx.fillRect(line.posDestinationX + line.border - marginLine, line.posDestinationY + line.border, line.width * line.life, line.height);
}

function showMessage(message, ctx) {
    ctx.font = "bold 32px serif";
    ctx.fillStyle = "#f2f5fa";
    ctx.fillText(message, data.canvasFight.width * 0.5 - 100, data.canvasFight.height * 0.3, 200);
}

function createNewGame() {
    data.nowStep = "character";
    data.characterHealth = 1000;
    data.monsterHealth = 1000;
    data.isGamePlay = true;
    data.lifeLine.monster.life = 1;
    data.lifeLine.character.life = 1;
    let buttonNewGame = document.querySelector("#new-game-button");
    buttonNewGame.classList.add("hidden");
    main();
    startStep()
}

resources.load(data.imageList);
resources.onReady(init);
