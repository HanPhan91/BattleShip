var matrix = [];
let sizeMatrix = 10;
let ship = [];
let count = 0;
let score = 100;
let shipCount = 0;
let text = "Xin chào Đại tướng, ngài đã sẵn sàng chiến đấu hay chưa ?";
let speedText = 50;
let countText = -1;
let txtName = "Trước khi bắt đầu, Đại tướng vui lòng cho biết tên của mình: ";
let countTextName = -1;
let name = "";
intro();
createMatrix();
// initgame();
function createMatrix() {
  for (let i = 0; i < sizeMatrix; i++) {
    matrix[i] = [];
    for (let j = 0; j < sizeMatrix; j++) {
      count += 1;
      matrix[i][j] = count;
    }
  }
  i=0;j=0;
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
  console.log(ship);
}

function initgame() {
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
  document.getElementById(
    "countship"
  ).innerText = `BattleShip destroyed: ${shipCount}/5`;
  document.getElementById("score").innerText = `Score: ${score}`;
}

function checkShip(number) {
  score -= 1;
  document.getElementById("score").innerText = `Score: ${score}`;
  if (ship.indexOf(number) != -1) {
    document.getElementById("bomno").play();
    shipCount += 1;
    document.getElementById(
      "countship"
    ).innerText = `BattleShip destroyed: ${shipCount}/5`;
    document.getElementById(
      `${number}`
    ).innerHTML = `<img src="img/battleship_resize.png">`;
  } else {
    document.getElementById("miss").play();
    document.getElementById(`${number}`).innerText = "Miss";
  }
  if (shipCount == 5) {
    document.getElementById("content").style.display = "none";
    document.getElementById("winner").style.display = "block";
    document.getElementById("finalscore").innerText = `Xin chúc mừng ${name} Đại tướng, điểm số của ngài là: ${score}`;
  }
  document.getElementById(`${number}`).removeAttribute("onclick");
}

function playAgain() {
  document.getElementById("content").style.display = "block";
  document.getElementById("winner").style.display = "none";
  ship.splice(0, 5);
  shipCount=0;
  score=100;
  initgame();
}

function intro() {
  if (countText < text.length) {
    document.getElementById("textIntro").innerHTML += text.charAt(countText);
    countText++;
    setTimeout(intro, speedText);
  }
  if (countText == text.length) {
    document.getElementById("ready").style.display = "block";
  }
}

function createName() {
  if (countTextName < txtName.length) {
    document.getElementById("txtCreateName").innerHTML += txtName.charAt(countTextName);
    countTextName++;
    setTimeout(createName, speedText);
  }
  if (countTextName == txtName.length) {
    document.getElementById("formName").style.display = "block";
  }
}
function introReady() {
  document.getElementById("showText").style.display = "none";
  document.getElementById("createName").style.display = "block";
  createName();
}

function acceptName() {
  name = document.getElementById("inputName").value;
  document.getElementById('intro').style.display='none';
  document.getElementById('content').style.display='block';
  initgame();
}

function getRandomName(){
  let i = Math.round(Math.random() * 3);
  let j = Math.round(Math.random() * 3);
  let a=document.getElementById('inputName').value;
  document.getElementById('inputName').value= `${firstName[i]} ${lastName[j]}`;
}
let firstName=['Nguyễn', 'Trần', 'Phan', 'Lê'];
let lastName= ['Quá', 'Quân', 'Nguyên', 'Hoàng'];