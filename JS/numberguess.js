/* Number Guessing Game JavaScript */

var secretNumber = 0,
	numberOfGuesses = 0;
var chance = 0;
let boo = new Audio('./SFX/boo.wav');
let yay = new Audio('./SFX/crowd-yay.wav');

function writeMessage(elementId, message, appendMessage) {
	var elemToUpdate = document.getElementById(elementId);
	if (appendMessage) {
		elemToUpdate.innerHTML = elemToUpdate.innerHTML + message;
	} else {
		elemToUpdate.innerHTML = message;
	}
};

function newGame() {
	secretNumber = Math.floor(Math.random() * 100) + 1;
	numberOfGuesses = 0;
	chance = 10;
	writeMessage('historyList', '');
	writeMessage('statusArea', '<p>Please enter a number 1-100 and press the Guess button.</p>');
	writeMessage('Chance', '<p>You have ' + chance + ' chances left.</p>');
	document.getElementById('resetButton').style.visibility='hidden';
	document.getElementById('endgame').style.visibility='hidden';
	document.getElementById('endgame').setAttribute('src','')
}

function guessInRange(guess) {
	return (guess > 0 && guess < 101);
}

function userGuessed() {
	var userGuessed = document.getElementById('userGuess').value;
	var statusArea = document.getElementById('statusArea');
	var historyList = document.getElementById('historyList');
	if (userGuessed.length == 0 || ! guessInRange(userGuessed) && numberOfGuesses < 10) {
		writeMessage('statusArea', '<p>Please enter a number 1-100 and press the Guess button.</p>');
	} else if (userGuessed.indexOf('.') != -1 && numberOfGuesses < 10) {
		writeMessage('statusArea', '<p>Please enter a whole number 1-100 and press the Guess button.</p>');
	} else {
		numberOfGuesses++;
		chance--;
		if (userGuessed == secretNumber && numberOfGuesses < 10) {
			writeMessage('statusArea', '<p>You got me in ' + numberOfGuesses +' guesses, I was thinking ' + secretNumber + '. Let\'s go again...</p>');
			writeMessage('Chance', '<p>You have ' + chance + ' chances left.</p>');
			writeMessage('historyList', '<li>' + userGuessed +' (You guess is right.)</li>', true);
			document.getElementById('endgame').style.visibility='';
			document.getElementById('endgame').setAttribute('src','images/youwin.gif')
			document.getElementById('resetButton').style.visibility='';
			document.getElementById('resetButton').addEventListener('click', newGame);
			yay.play();
			// newGame();
		} else if (userGuessed < secretNumber && numberOfGuesses < 10) {
			writeMessage('statusArea', '<p>You need to guess higher than ' + userGuessed + ', try again...</p>');
			writeMessage('Chance', '<p>You have ' + chance + ' chances left.</p>');
			writeMessage('historyList', '<li>' + userGuessed +' (too low)</li>', true);
		} else if (userGuessed > secretNumber && numberOfGuesses < 10) {
			writeMessage('statusArea', '<p>You need to guess lower than ' + userGuessed + ', try again...</p>');
			writeMessage('Chance', '<p>You have ' + chance + ' chances left.</p>');
			writeMessage('historyList', '<li>' + userGuessed + ' (too high)</li>', true);
		} else if(numberOfGuesses === 10){
			writeMessage('statusArea', '<p>You run out of chance, try again...</p>');
			writeMessage('Chance', '<p>You have ' + chance + ' chances left.</p>');
			document.getElementById('resetButton').style.visibility='';
			document.getElementById('resetButton').addEventListener('click', newGame);
			document.getElementById('endgame').style.visibility='';
			document.getElementById('endgame').setAttribute('src','images/gameover.gif')
			boo.play();
		}
	}

	document.getElementById('userGuess').value = '';	
}

window.onload = function() {
	newGame();
	document.getElementById('buttonArea').addEventListener('click', userGuessed);
};