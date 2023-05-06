
var highscoreButton = document.querySelector(".highscore-button");
var timerElement = document.querySelector(".timer");
var questionText = document.querySelector(".question");
var quizBox = document.querySelector(".quiz-box");
var instructionText = document.querySelector(".start-instructions");
var questionButtons = document.querySelector(".question-buttons");
var startButton = document.querySelector(".start-button");
var resultSpan = document.querySelector(".result-declaration");


var winCounter = 0;
var lossCounter = 0;
var isWin = false
var timer;
var timerCount;

var questions = ["1", "2", "3", "4", "5"];


function startGame() {
    timerCount = 75;
    startButton.disabled = true;
    renderQuestion();
    startTimer();
}

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = "time left = " +  timerCount;
    }, 1000)
}

function renderQuestion() {
    chosenQuestions = questions[Math.floor(Math.random() * questions.length)];
    questionText.textContent = chosenQuestions;
    instructionText.innerHTML = "";
}

startButton.addEventListener("click", startGame);

//When I click the start button the the user is presented a random coding question
//When I answer the question, I am presented with another question, five times
//When I answer a question incorrectly, time is subtracted from the clock
//Then when all questions have been answered or the timer reached zero
    //The game ends
//When the game ends, I can save my initials and my score.
