//Class Variables
var highscoreButton = document.querySelector(".highscore-button");
var timerElement = document.querySelector(".timer");
var questionText = document.querySelector(".question");
var quizBox = document.querySelector(".quiz-box");
var instructionText = document.querySelector(".start-instructions");
var answerButtons = document.querySelector(".answer-buttons");
var startButton = document.querySelector(".start-button");
var resultSpan = document.querySelector(".result-declaration");
var scoreElement = document.querySelector(".submit-score");

//Variables
var scoreCount = 0;
var isWin = false
var timer;
var timerCount;
var chosenQuestion;
var questionsAsked = 0;
var initialsField = document.createElement("input");
var submitScore = document.createElement("button");

//Questions Array
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
];
var selectedQuestion;

//Game Functions
function startGame() {
    timerCount = 75;
    startButton.disabled = true;
    startButton.style.display = "none";
    scoreElement.innerHTML = "",
    selectedQuestion = [];
    renderQuestion();
    startTimer();
};

function endGame() {
    questionText.textContent = "All done!";
    instructionText.innerHTML = "Your final score is " + scoreCount;
    startButton.disabled = false;
    startButton.style.display = "initial";
    startButton.textContent = "Play Again";
    answerButtons.innerHTML = "";
    resultSpan.innerHTML = "";
    initialsField.type = "text";
    initialsField.placeholder = "Enter your initials";
    submitScore.type = "submit";
    submitScore.textContent = "Submit"
    scoreElement.appendChild(initialsField);
    scoreElement.appendChild(submitScore);
    stopTimer();
};

function startTimer() {
    timer = setInterval(function () {
        if (timerCount <= 0) {
            endGame();
        } else {
            timerCount--;
            timerElement.textContent = "time left = " + timerCount;
        }
    }, 1000)
};

function stopTimer() {
    clearInterval(timer);
    timerElement.textContent = "time left = ";
};

//Question/Answers Functions
function renderQuestion() {
    var availableQuestions = questions.filter(function(question) {
        return !selectedQuestion.includes(question);
    })
    chosenQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    questionText.textContent = chosenQuestion.question;
    answerButtons.innerHTML = "";
    instructionText.innerHTML = "";
    questionsAsked++;
    chosenQuestion.answers.forEach(function (answer) {
        var answerButton = document.createElement("button");
        answerButton.textContent = answer;
        answerButtons.appendChild(answerButton);
    });
};

function correctAnswer() {
    scoreCount++;
    declareCorrect();
    console.log(scoreCount);
    if (questionsAsked === 5) {
        endGame();
    } 
    else {
        renderQuestion();
    };
};

function incorrectAnswer() {
    timerCount -= 15;
    timerElement.textContent = "time left = " + timerCount;
    declareWrong();
    if (questionsAsked === 5) {
        endGame();
    }
    else {
        renderQuestion();
    };
};

function checkAnswer(event) {
    console.log(event.target);
    var selectedAnswer = event.target.textContent;
    if (selectedAnswer === chosenQuestion.rightAnswer) {
        correctAnswer();
    }
    else {
        incorrectAnswer();
    };
};

function declareCorrect() {
    resultSpan.innerHTML = "Correct!";
};

function declareWrong() {
    resultSpan.innerHTML = "Wrong!";
};

//Score Functions
function saveScore() {
    if (initialsField !== null) {
        var inputValue = initialsField.value.toUpperCase();
        var scores = JSON.parse(localStorage.getItem("scores")) || [];
        scores.push({initial: inputValue, score: scoreCount});
        localStorage.setItem("scores", JSON.stringify(scores));
        initialsField.value = "";
    };
};

function checkScores() {
    var storedScore = alert("Highscores:" + localStorage.getItem("scores"));
};

//Event Listeners
startButton.addEventListener("click", startGame);
answerButtons.addEventListener("click", checkAnswer);
submitScore.addEventListener("click", saveScore);
highscoreButton.addEventListener("click", checkScores);


//When I click the start button the the user is presented a random coding question
//I am also presented with a series of random answers for that question, one of which is correct.
//When I answer the question, I am presented with another question, five times
//When I answer a question incorrectly, time is subtracted from the clock
//Then when all questions have been answered or the timer reached zero
//The game ends
//When the game ends, I can save my initials and my score

