var matrix = [];
let sizeMatrix = 10;
let ship = [];
let count = 0;
let score = 100;
let shipCount = 0;
initgame();
function createMatrix() {
  for (let i = 0; i < sizeMatrix; i++) {
    matrix[i] = [];
    for (let j = 0; j < sizeMatrix; j++) {
      count += 1;
      matrix[i][j] = count;
    }
  }
}
function createShip() {
  let countShip = 1;
  for (let i = 0; countShip <= 5; i++) {
    let num = Math.round(Math.random() * (100 - 1) + 1);
    if (ship.indexOf(num) == -1) {
      ship.push(num);
      countShip += 1;
    }
  }
}

function initgame() {
  createMatrix();
  createShip();
  let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  let table = "";
  for (let i = 0; i < sizeMatrix; i++) {
    table += "<tr>";
    table += `<td>${alphabet[i]}</td>`;
    for (let j = 0; j < sizeMatrix; j++) {
      table += `<td class="border" id="${matrix[i][j]}" onclick="checkShip(${matrix[i][j]})"></td>`;
    }
    table += "</tr>";
  }
  table += `<tr><td></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td></tr>`;
  document.getElementById("initgame").innerHTML = table;
}

function checkShip(number) {
  
  score -= 1;
  document.getElementById("score").innerText = `Score: ${score}`;
  if (ship.indexOf(number) != -1) {
    document.getElementById('bomno').play();
    shipCount += 1;
    document.getElementById(
      "countship"
    ).innerText = `BattleShip destroyed: ${shipCount}/5`;
    document.getElementById(
      `${number}`
    ).innerHTML = `<img src="img/battleship_resize.png">`;
  } else {
    document.getElementById('miss').play();
    document.getElementById(`${number}`).innerText = "Miss";
  }
  if (shipCount == 5) {
    document.getElementById("content").style.display = "none";
    document.getElementById("winner").style.display = "block";
    document.getElementById("finalscore").innerText = `Your score: ${score}`;
  }
}

function playAgain() {
  document.getElementById("content").style.display = "block";
  document.getElementById("winner").style.display = "none";
  ship.splice(0,5);
  initgame();
}
