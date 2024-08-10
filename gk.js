const questions = [
    {
        question: "What is the largest planet in our solar system?",
        answers: ["Earth", "Jupiter", "Saturn", "Mars"],
        correct: 1
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        answers: ["Oxygen", "Gold", "Osmium", "Oganesson"],
        correct: 0
    },
    {
        question: "Who was the first President of the United States?",
        answers: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
        correct: 1
    },
    {
        question: "What is the capital city of Japan?",
        answers: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        correct: 2
    },
    {
        question: "Which continent is known as the 'Dark Continent'?",
        answers: ["Asia", "Africa", "South America", "Australia"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
const TIMER_DURATION = 10; // Timer duration in seconds

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const submitBtn = document.getElementById('submit-btn');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer'); // Add this in HTML for showing timer

function loadQuestion() {
    questionEl.textContent = questions[currentQuestion].question;
    answersEl.innerHTML = '';
    questions[currentQuestion].answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-btn');
        button.addEventListener('click', () => selectAnswer(index));
        answersEl.appendChild(button);
    });
    startTimer();
}

function startTimer() {
    let timeLeft = TIMER_DURATION;
    timerEl.textContent = `Time left: ${timeLeft}s`; // Update timer display
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer); // Stop the timer
            selectAnswer(-1); // Automatically move to the next question
        }
    }, 1000);
}

function selectAnswer(index) {
    clearInterval(timer); // Stop the timer when an answer is selected
    if (index === questions[currentQuestion].correct) score++;
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    questionEl.textContent = 'Quiz Finished!';
    answersEl.innerHTML = '';
    submitBtn.style.display = 'none';
    timerEl.style.display = 'none'; // Hide the timer when the quiz ends
    scoreEl.textContent = `Your score is: ${score}/${questions.length}`;
}

submitBtn.addEventListener('click', loadQuestion);

// Start the quiz
loadQuestion();
