const aptitudeQuestions = [
    {
        question: "What is the next number in the sequence 2, 6, 12, 20, 30?",
        answers: ["36", "40", "42", "48"],
        correct: 2
    },
    {
        question: "If a train travels 60 miles in 1 hour and 30 minutes, what is its average speed in miles per hour?",
        answers: ["30 mph", "40 mph", "45 mph", "50 mph"],
        correct: 2
    },
    {
        question: "What is the value of 7 squared plus 3 squared?",
        answers: ["49", "58", "55", "70"],
        correct: 1
    },
    {
        question: "If 3x = 12, what is the value of x?",
        answers: ["2", "3", "4", "5"],
        correct: 2
    },
    {
        question: "A box contains 3 red balls, 2 green balls, and 5 blue balls. What is the probability of randomly selecting a green ball?",
        answers: ["1/10", "1/5", "1/4", "2/5"],
        correct: 3
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
    questionEl.textContent = aptitudeQuestions[currentQuestion].question;
    answersEl.innerHTML = '';
    aptitudeQuestions[currentQuestion].answers.forEach((answer, index) => {
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
    if (index === aptitudeQuestions[currentQuestion].correct) score++;
    currentQuestion++;
    if (currentQuestion < aptitudeQuestions.length) {
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
    scoreEl.textContent = `Your score is: ${score}/${aptitudeQuestions.length}`;
}

submitBtn.addEventListener('click', loadQuestion);

// Start the quiz
loadQuestion();
