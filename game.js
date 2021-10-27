var matrix = [];
let sizeMatrix = 10;
let ship = [];
let count = 0;
let score = 100;
let shipCount = 0;
let text = "Xin chào Đô đốc, ngài đã sẵn sàng chiến đấu hay chưa ?";
let speedText = 50;
let countText = -1;
let txtName = "Trước khi bắt đầu, Đô đốc vui lòng cho biết tên của mình: ";
let countTextName = -1;
let name = "";
let firstName = ["Nguyễn", "Trần", "Phan", "Lê", "Dương"];
let lastName = ["Quá", "Quân", "Nguyên", "Hoàng", "Khang", "Tiêu"];
const localStorageKey = "battleship";
let allScore = [];
intro();
createMatrix();
class topScore {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}
//Tạo ma trận
function createMatrix() {
  for (let i = 0; i < sizeMatrix; i++) {
    matrix[i] = [];
    for (let j = 0; j < sizeMatrix; j++) {
      count += 1;
      matrix[i][j] = count;
    }
  }
  i = 0;
  j = 0;
}
//Tạo tàu trên ma trận
function createShip() {
  let countShip = 1;
  for (let i = 0; countShip <= 10; i++) {
    let num = Math.round(Math.random() * (100 - 1) + 1);
    if (ship.indexOf(num) == -1) {
      ship.push(num);
      countShip += 1;
    }
  }
  console.log(ship);
}
//Khởi tạo game
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
  ).innerText = `BattleShip destroyed: ${shipCount}/10`;
  document.getElementById("score").innerText = `Score: ${score}`;
  if (getLocalStorage(localStorageKey) == null) {
    setLocalStorage(localStorageKey, "");
  } else {
    allScore = getLocalStorage(localStorageKey);
  }
}
//Kiểm tra tàu có tồn tại trên vùng đã click
function checkShip(number) {
  score -= 1;
  document.getElementById("score").innerText = `Score: ${score}`;
  if (ship.indexOf(number) != -1) {
    //Kiểm tra có bắn trúng tàu hay không -- Nếu trúng
    document.getElementById("bomno").play();
    shipCount += 1;
    document.getElementById(
      "countship"
    ).innerText = `BattleShip destroyed: ${shipCount}/10`;
    document.getElementById(
      `${number}`
    ).innerHTML = `<img src="img/battleship_resize.png">`;
  } else {
    //Kiểm tra có bắn trúng tàu hay không -- Nếu không trúng
    document.getElementById("miss").play();
    document.getElementById(`${number}`).innerText = "Miss";
  }
  if (shipCount == 10) {
    //Kiểm tra đã bắn hết tất cả các tàu hay chưa
    document.getElementById("content").style.display = "none";
    document.getElementById("winner").style.display = "block";
    document.getElementById(
      "finalscore"
    ).innerText = `Xin chúc mừng ${name} Đô đốc, điểm số của ngài là: ${score}`;

    allScore.push(new topScore(name, score));
    setLocalStorage(localStorageKey, allScore);
    showTopScore();
  }
  document.getElementById(`${number}`).removeAttribute("onclick");
}

//Chơi lại
function playAgain() {
  document.getElementById("content").style.display = "block";
  document.getElementById("winner").style.display = "none";
  ship.splice(0, 10);
  shipCount = 0;
  score = 100;
  initgame();
}
//Intro mở đầu game
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
// Form đặt tên bao gồm chạy chữ trong intro
function createName() {
  if (countTextName < txtName.length) {
    document.getElementById("txtCreateName").innerHTML +=
      txtName.charAt(countTextName);
    countTextName++;
    setTimeout(createName, speedText);
  }
  if (countTextName == txtName.length) {
    document.getElementById("formName").style.display = "block";
  }
}
//Khởi tạo phần intro
function introReady() {
  document.getElementById("showText").style.display = "none";
  document.getElementById("createName").style.display = "block";
  createName();
}
//Đặt tên
function acceptName() {
  name = document.getElementById("inputName").value;
  if (name == "") {
    alert("Xin vui lòng nhập tên");
  } else {
    document.getElementById("intro").style.display = "none";
    document.getElementById("content").style.display = "block";
    initgame();
  }
}
//Tạo tên ngẫu nhiên
function getRandomName() {
  let i = Math.round(Math.random() * (firstName.length - 1));
  let j = Math.round(Math.random() * (lastName.length - 1));
  let a = document.getElementById("inputName").value;
  document.getElementById("inputName").value = `${firstName[i]} ${lastName[j]}`;
}

function getLocalStorage(key) {
  return JSON.parse(window.localStorage.getItem(key));
}
function setLocalStorage(key, data) {
  window.localStorage.setItem(key, JSON.stringify(data));
}
function showTopScore() {
  allScore.sort(function (score1, score2) {
    return score2.score - score1.score;
  });
  let tbscore = "";
  allScore.forEach(function (data, index) {
    if (index <= 2) {
      tbscore += `<tr>
            <td class="td-stt"><img src="img/rank_${index + 1}.jpg"></td>
            <td class="td-name">${data.name}</td>
            <td class="td-score">${data.score}</td>
            </tr>`;
    }
  });
  document.getElementById("tbTop").innerHTML += tbscore;
}
