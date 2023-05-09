
var highscoreButton = document.querySelector(".highscore-button");
var timerElement = document.querySelector(".timer");
var questionText = document.querySelector(".question");
var quizBox = document.querySelector(".quiz-box");
var instructionText = document.querySelector(".start-instructions");
var answerButtons = document.querySelector(".answer-buttons");
var startButton = document.querySelector(".start-button");
var resultSpan = document.querySelector(".result-declaration");
var scoreElement = document.querySelector(".submit-score");


var scoreCount = 0;
var isWin = false
var timer;
var timerCount;
var chosenQuestion;

var initialsField = document.createElement("input");

var submitScore = document.createElement("button");
submitScore.type = "submit";
submitScore.textContent = "Submit"

var questions = [
    {
        question: "1",
        answers: ["a", "b", "c", "d",],
        rightAnswer: "a",
    },
    {
        question: "2",
        answers: ["e", "f", "g", "h",],
        rightAnswer: "e",
    },
    {
        question: "3",
        answers: ["i", "j", "k", "l",],
        rightAnswer: "i",
    },
    {
        question: "4",
        answers: ["m", "n", "o", "p",],
        rightAnswer: "m",
    },
    {
        question: "5",
        answers: ["q", "r", "s", "t",],
        rightAnswer: "q",
    }
]

function startGame() {
    timerCount = 75;
    startButton.disabled = true;
    startButton.style.display = "none";
    scoreElement.innerHTML = "",
    scoreElement.innerHTML = "",
    renderQuestion();
    startTimer();
}

function endGame() {
    questionText.textContent = "All done!";
    instructionText.innerHTML = "Your final score is " + scoreCount;
    startButton.disabled = false;
    startButton.style.display = "initial";
    startButton.textContent = "Play Again";
    answerButtons.innerHTML = "";
    var initialsField = document.createElement("input");
    var submitScore = document.createElement("button");
    initialsField.type = "text";
    initialsField.placeholder = "Enter your initials";
    submitScore.type = "submit";
    submitScore.textContent = "Submit"
    scoreElement.appendChild(initialsField);
    scoreElement.appendChild(submitScore);
    stopTimer();
}

function startTimer() {
    timer = setInterval(function () {
        if (timerCount <= 0) {
            endGame();
        } else {
            timerCount--;
            timerElement.textContent = "time left = " + timerCount;
        }
    }, 1000)
}

function stopTimer() {
    clearInterval(timer);
    timerElement.textContent = "time left = ";
}

function renderQuestion() {
    chosenQuestion = questions[Math.floor(Math.random() * questions.length)];
    questionText.textContent = chosenQuestion.question;
    instructionText.innerHTML = "";
    chosenQuestion.answers.forEach(function (answer) {
        var answerButton = document.createElement("button");
        answerButton.textContent = answer;
        answerButtons.appendChild(answerButton);
    });
}

function correctAnswer() {
    scoreCount++
    localStorage.setItem("score", scoreCount);
    console.log(scoreCount)
}

function incorrectAnswer() {
    timerCount -= 15;
    timerElement.textContent = "time left = " + timerCount;
}

function checkAnswer(event) {
    console.log(event.target);
    var selectedAnswer = event.target.textContent;
    if (selectedAnswer === chosenQuestion.rightAnswer) {
        correctAnswer();
    }
    else {
        incorrectAnswer()
    }
}

startButton.addEventListener("click", startGame);
answerButtons.addEventListener("click", checkAnswer);

//When I click the start button the the user is presented a random coding question
    //I am also presented with a series of random answers for that question, one of which is correct.
//When I answer the question, I am presented with another question, five times
//When I answer a question incorrectly, time is subtracted from the clock
//Then when all questions have been answered or the timer reached zero
    //The game ends
//When the game ends, I can save my initials and my score

