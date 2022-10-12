const contentText = document.querySelector("#content-text");
const inputField = document.querySelector("#invisible-text");
const timerText = document.querySelector("#timer");
const wpmText = document.querySelector("#wpm");
const accText = document.querySelector("#acc");
const tryAgainButton = document.querySelector("#try-again");
const newTextButton = document.querySelector("#new-text");

const random_quote = "http://api.quotable.io/random?minLength=200&maxLength=500";

let nbtype;
let lengthPhrase;
let charIndex;
let timerInterval;
let inGame;
let maxTime;
let timeLeft;
let mistake;

function getRandomQuote() {
	return fetch('https://random-word-api.herokuapp.com/word?number=50')
		.then(response => response.json())
		.then(response => response)
		.catch(err => console.error(err));
}

async function getNextQuote() {
	const quote = await getRandomQuote();
	quote.forEach((arg) => {
		var characterSpan;
		for(var i = 0; i <= arg.length; i++) {
			characterSpan = document.createElement("span");
			characterSpan.innerText = arg[i];
			contentText.appendChild(characterSpan);
		}
		characterSpan.innerText = " ";
	});
	console.log(quote);
}

function initarg() {
	nbtype = 0;
	charIndex = 0;
	inGame = false;
	maxTime = document.querySelector('input[name="timer"]:checked').value;
	timeLeft = maxTime;
	mistake = 0;

	timerText.innerHTML = maxTime;
	wpmText.innerHTML = 0;
	accText.innerHTML = 0;
}

function game(event) {
	const characters = contentText.querySelectorAll("span");
	lengthPhrase = characters.length;
	const typedChar = inputField.value.split("")[charIndex];
	if (!inGame) {
		inGame = true;
		timerInterval = setInterval(myTimer, 1000);
	}
	if (event.inputType === "insertText") {
		if (characters[charIndex].firstChild.nodeValue == typedChar) {
			characters[charIndex].className = "correct";
			console.log("correct");
		} else {
			mistake++;
			characters[charIndex].className = "fail";
			console.log("failure");
		}
		nbtype++;
		if (charIndex != lengthPhrase - 1) 
			charIndex++;
		else {
			inGame = false;
		alert("youwin");
		}
	}
	const nbCorrect = contentText.querySelectorAll(".correct").length;
	if (nbCorrect % 15 == 0)
		demonAttackAnmation();
	wpmText.innerText = Math.round((nbCorrect / 5) * (60 / maxTime));
	accText.innerText = Math.round(100 - (mistake / nbtype) * 100);
}

function myTimer() {
	var timer;

	if (timeLeft > 0 && inGame) {
		timeLeft--;
		timerText.innerText = timeLeft;
	} else {
		demonDeathAnimation();
		clearInterval(timerInterval);
	} 
}

function resetGame() {
    contentText.querySelectorAll("span").forEach((arg) => {
        arg.className = "";
    });
    clearInterval(timerInterval);
    initarg();
}

function newText() {
  resetGame();
  contentText.innerHTML = "";
  getNextQuote();
}

newText();
document.addEventListener("keydown", () => inputField.focus());
contentText.addEventListener("click", () => inputField.focus());

inputField.addEventListener("input", game);
tryAgainButton.addEventListener("click", resetGame);
newTextButton.addEventListener("click", newText);

inputField.addEventListener("keydown", (event) => {
	if (charIndex > 0 && (event.key === "Backspace" || event.key === "Delete")) {
		charIndex--;
		contentText.querySelectorAll("span")[charIndex].className = "";
	}
	if (charIndex > 0 && event.key === "ArrowLeft") charIndex--;
	if (charIndex < lengthPhrase - 1 && event.key === "RightArrow") charIndex++;
});

document.querySelectorAll('input[name="timer"]').forEach((arg) => {
	arg.addEventListener("click", (args) => {
		if (inGame == false) {
			maxTime = document.querySelector('input[name="timer"]:checked').value;
			timeLeft = maxTime;
			timerText.innerText = maxTime;
		}
	});
});
