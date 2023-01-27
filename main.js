
var xhttp = new XMLHttpRequest();
var dataFromJson;

xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    dataFromJson = JSON.parse(this.responseText);
    getQuestions();
  }
};

xhttp.open("get", "data.json", true);
xhttp.send();

const container = document.querySelector("#container");
const questions = document.querySelector("#questions");
const versionA = document.querySelector(".versionA");
const versionB = document.querySelector(".versionB");
const versionC = document.querySelector(".versionC");
const versionD = document.querySelector(".versionD");
const versions = document.getElementsByName("versions");
var body = document.querySelector("body");
var numberOfQuestions = 0;
var pointTrue = 0;
var pointFalse = 0;

function getQuestions() {
  questions.innerHTML = dataFromJson.questionsArray[numberOfQuestions].question;
  versionA.innerHTML = dataFromJson.questionsArray[numberOfQuestions].answerA;
  versionB.innerHTML = dataFromJson.questionsArray[numberOfQuestions].answerB;
  versionC.innerHTML = dataFromJson.questionsArray[numberOfQuestions].answerC;
  versionD.innerHTML = dataFromJson.questionsArray[numberOfQuestions].answerD;
}

function qebulEt() {
  versions.forEach(function (item) {
    questions.innerHTML = dataFromJson.questionsArray[numberOfQuestions].question;
    versionA.innerHTML = dataFromJson.questionsArray[numberOfQuestions].answerA;
    versionB.innerHTML = dataFromJson.questionsArray[numberOfQuestions].answerB;
    versionC.innerHTML = dataFromJson.questionsArray[numberOfQuestions].answerC;
    versionD.innerHTML = dataFromJson.questionsArray[numberOfQuestions].answerD;

    if (item.checked == true) {
      if (item.nextElementSibling.innerHTML == dataFromJson.questionsArray[numberOfQuestions].answer) {
        numberOfQuestions++;
        pointTrue++;
        item.checked = false;

        container.style.filter = "blur(10px)";
        var body = document.querySelector("body");
        var infoTotal = document.createElement("div");
        infoTotal.classList.add("infoTotal");
        body.appendChild(infoTotal);
        var textInfo = document.createElement("div");
        var closeInfo = document.createElement("button");
        closeInfo.classList.add("closeInfo");
        infoTotal.appendChild(textInfo);
        infoTotal.appendChild(closeInfo);
        var infoTotalWarning = document.createElement("h2");
        var infoTotalText = document.createElement("p");
        textInfo.appendChild(infoTotalWarning);
        textInfo.appendChild(infoTotalText);

        infoTotalWarning.innerHTML = `Təbriklər!`;
        infoTotalText.innerHTML = `Doğru cavabların sayı ${pointTrue}`;

        closeInfo.innerHTML = "Close";
        closeInfo.addEventListener("click", function () {
          infoTotal.style.display = "none";
          container.style.filter = "blur(0)";
        });
      } else {
        numberOfQuestions++;
        pointFalse++;
        item.checked = false;
        container.style.filter = "blur(10px)";
        var body = document.querySelector("body");
        var infoTotal = document.createElement("div");
        infoTotal.classList.add("infoTotal");
        body.appendChild(infoTotal);
        var textInfo = document.createElement("div");
        var closeInfo = document.createElement("button");
        closeInfo.classList.add("closeInfo");
        infoTotal.appendChild(textInfo);
        infoTotal.appendChild(closeInfo);
        var infoTotalWarning = document.createElement("h2");
        var infoTotalText = document.createElement("p");
        textInfo.appendChild(infoTotalWarning);
        textInfo.appendChild(infoTotalText);

        infoTotalWarning.innerHTML = `Təəssüf!`;
        infoTotalText.innerHTML = `Yanlış cavabların sayı ${pointFalse}`;

        closeInfo.innerHTML = "Close";
        closeInfo.addEventListener("click", function () {
          infoTotal.style.display = "none";
          container.style.filter = "blur(0)";
        });
      }

      if (numberOfQuestions < dataFromJson.questionsArray.length) {
        questions.innerHTML = dataFromJson.questionsArray[numberOfQuestions].question;
        versionA.innerHTML = dataFromJson.questionsArray[numberOfQuestions].answerA;
        versionB.innerHTML = dataFromJson.questionsArray[numberOfQuestions].answerB;
        versionC.innerHTML = dataFromJson.questionsArray[numberOfQuestions].answerC;
        versionD.innerHTML = dataFromJson.questionsArray[numberOfQuestions].answerD;
      } else {
        var resultInfo = document.createElement("div");
        resultInfo.classList.add("resultInfo");
        body.appendChild(resultInfo);
        var restartGameWarning = document.createElement("h2");
        restartGameWarning.classList.add("restartGameWarning");
        var restartGameText = document.createElement("p");
        restartGameText.classList.add("restartGameText");
        var restartGameBtn = document.createElement("a");
        restartGameBtn.classList.add("restartGameBtn");
        resultInfo.appendChild(restartGameWarning);
        resultInfo.appendChild(restartGameText);
        resultInfo.appendChild(restartGameBtn);
        restartGameWarning.innerHTML = "Təşəkkürlər! Oyun Bitdi";
        restartGameText.innerHTML = `Doğru cavabların sayı ${pointTrue} / ${dataFromJson.questionsArray.length} `;
        restartGameBtn.innerHTML = "Yenidən Başla";

        restartGameBtn.setAttribute("href", "index.html");

        container.style.filter = "blur(50px)";
        infoTotal.style.filter = "blur(10px)";
      }
    }
  });
}
