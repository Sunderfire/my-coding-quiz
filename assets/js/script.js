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
        question: "What does CSS stand for?",
        answers: ["Creative Style Sheets", "Computer Styling Structure", "Cascading Style Sheets", "Colorful Slick Styles",],
        rightAnswer: "Cascading Style Sheets",
    },
    {
        question: "Which of the following is NOT a valid CSS length unit?",
        answers: ["em", "px", "pt", "cm",],
        rightAnswer: "cm",
    },
    {
        question: "What does HTML stand for?",
        answers: ["High Traffic Multimedia Layout", "HyperText Markup Language", "Heavy Text Master Language", "HyperText Makeup Layout",],
        rightAnswer: "HyperText Markup Language",
    },
    {
        question: "In JavaScript, which keyword is used to declare a variable?",
        answers: ["const", "var", "let", "all of the above",],
        rightAnswer: "all of the above",
    },
    {
        question: "In JavaScript, what does DOM stand for?",
        answers: ["Document Object Model", "Dynamic Object Mode", "Data Objective Manuscript", "Data Object Manipulator",],
        rightAnswer: "Document Object Model",
    },
    {
        question: "Which HTML element is used to define a header?",
        answers: ["<span>", "<h1>", "<section>", "<a>",],
        rightAnswer: "<h1>",
    },
    {
        question: "Which HTML element is used to create a list item?",
        answers: ["<ul>", "<span>", "<li>", "<ol>",],
        rightAnswer: "<li>",
    },
    {
        question: "Which of the following is NOT a valid JavaScript data type?",
        answers: ["String", "Number", "Boolean", "Character",],
        rightAnswer: "Character",
    }
];

var selectedQuestion;

//Game Functions
function startGame() {
    timerCount = 75;
    startButton.disabled = true;
    startButton.style.display = "none";
    scoreCount = 0;
    scoreElement.innerHTML = "";
    selectedQuestion = [];
    questionsAsked = "";
    renderQuestion();
    startTimer();
};

function endGame() {
    timerCount = 75;
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
        if (timerCount <= 5) {
            timerElement.style.color = "red";
        }
    }, 1000)
};

function stopTimer() {
    clearInterval(timer);
    timerElement.textContent = "time left = ";
    timerElement.style.color = "black";
};

//Question/Answers Functions
function renderQuestion() {
    var availableQuestions = questions.filter(function (question) {
        return !selectedQuestion.includes(question);
    })
    chosenQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    selectedQuestion.push(chosenQuestion);
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
    if (initialsField.value) {
        var inputValue = initialsField.value.toUpperCase();
        var scores = JSON.parse(localStorage.getItem("scores")) || [];
        scores.push({ initials: inputValue, score: scoreCount });
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