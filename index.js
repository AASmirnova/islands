let islands = [
    [1, 0, 0, 1, 0],
    [1, 0, 1, 1, 0],
    [0, 0, 0, 1, 1],
    [0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0]
];

let currentIslandCoordinates = [];
let currentIslandNumber = 0;
let currenIsland = 0;

start();

function start() {
    searchIslands();
    inspectorIslands();
    createWindow();
}

function searchIslands() {
    for (let i = 0; i < islands.length ; i++) {
        for (let ii = 0; ii < islands[i].length ; ii++) {
            setIsland(i, ii);
        }
    }
}

function setIsland(i, ii) {
    if (islands[i][ii] !== 0) {
        currentIslandCoordinates[currenIsland] = [];
        currentIslandCoordinates[currenIsland][0] = i;
        currentIslandCoordinates[currenIsland][1] = ii;
        currentIslandCoordinates[currenIsland][2] = false;
        currenIsland++;
    }
}

function inspectorIslands() {
    for (let i = 0; i < currentIslandCoordinates.length; i++) {
        if (currentIslandCoordinates[i][2] === false) {
            if (currentIslandNumber.toString().length) {
                currentIslandNumber = "0" + currentIslandNumber;
            }

            currentIslandCoordinates[i][2] = currentIslandNumber;
            currentIslandNumber++;
        }

        inspectorBigIslands();
    }
}

function inspectorBigIslands() {
    for (let i = 0; i < currentIslandCoordinates.length; i++) {
        if (currentIslandCoordinates[i][2] !== false) {
            for (let ii = 0; ii < currentIslandCoordinates.length; ii++) {
                if ((currentIslandCoordinates[ii][2] === false) && (i !== ii)){
                    if ((currentIslandCoordinates[i][0] === currentIslandCoordinates[ii][0] + 1 && currentIslandCoordinates[i][1] === currentIslandCoordinates[ii][1]) ||
                        (currentIslandCoordinates[i][0] === currentIslandCoordinates[ii][0] - 1 && currentIslandCoordinates[i][1] === currentIslandCoordinates[ii][1]) ||
                        (currentIslandCoordinates[i][1] === currentIslandCoordinates[ii][1] + 1 && currentIslandCoordinates[i][0] === currentIslandCoordinates[ii][0]) ||
                        (currentIslandCoordinates[i][1] === currentIslandCoordinates[ii][1] - 1 && currentIslandCoordinates[i][0] === currentIslandCoordinates[ii][0]))
                    {
                        currentIslandCoordinates[ii][2] = currentIslandCoordinates[i][2];
                    }
                }
            }
        }
    }
}

function createWindow() {
    let wrapper = document.getElementsByClassName("js-wrapper")[0];
    let line = document.createElement("div");
    let box = document.createElement("div");
    
    box.classList.add("box");
    line.classList.add("line");

    document.getElementsByClassName("js-result")[0].innerHTML = "Найдено островов: " + currentIslandNumber; 

    for (let i = 0; i < islands.length; i++) {   
        let currentLine = line.cloneNode();

        wrapper.append(currentLine);

        for (let ii = 0; ii < islands[i].length; ii++) {   
            let currentBox = box.cloneNode();
            
            if (islands[i][ii] !== 0) {
                currentBox.style = "background-color: #808a80;";
                currentBox.innerHTML = setColorBox(i, ii);
            }

            currentLine.append(currentBox);
        }
    }
}

function setColorBox(i, ii) {
    for (let counter = 0; counter < currentIslandCoordinates.length; counter++) {
        if (currentIslandCoordinates[counter][0] === i && currentIslandCoordinates[counter][1] === ii) {
            return currentIslandCoordinates[counter][2];
        }
    }
}