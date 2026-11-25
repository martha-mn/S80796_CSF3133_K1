// 1. Questions Array
const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink Text Management", "Home Tool Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which CSS property changes text color?",
        options: ["font-color", "text-color", "color", "background-color"],
        answer: "color"
    },
    {
        question: "Which HTML tag links an external JavaScript file?",
        options: ["<js>", "<javascript>", "<script>", "<link>"],
        answer: "<script>"
    },
    {
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        answer: "Cascading Style Sheets"
    }
];

let index = 0;
let score = 0;
let selected = "";
let timer;
let timeLeft = 15;
let answered = false;

// Get HTML elements
const questionEl = document.getElementById("question-text");
const optionsEl = document.getElementById("options-container");
const feedbackEl = document.getElementById("feedback");
const actionBtn = document.getElementById("action-btn");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score-display");

// 2. Shuffle questions randomly
function shuffleQuestions() {
    questions.sort(() => Math.random() - 0.5);
}

// 3. Countdown timer for each question
function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerEl.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            if (!answered) checkAnswer(); // Auto-check when time runs out
        }
    }, 1000);
}

// 4. Display current question and options
function displayQuestion() {
    answered = false;
    selected = "";
    feedbackEl.classList.add("hidden");
    actionBtn.textContent = "Submit Answer";

    const q = questions[index];
    questionEl.textContent = `${index + 1}. ${q.question}`;
    optionsEl.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.className = "option-btn";

        btn.onclick = () => {
            if (answered) return;
            document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            selected = option;
        };

        optionsEl.appendChild(btn);
    });
}

// 5. Check answer and update score
function checkAnswer() {
    if (!selected && timeLeft > 0) {
        alert("Please select an answer!");
        return;
    }

    answered = true;
    clearInterval(timer);
    const correct = questions[index].answer;

    // Highlight right and wrong buttons
    document.querySelectorAll(".option-btn").forEach(btn => {
        if (btn.textContent === correct) btn.classList.add("correct");
        if (btn.textContent === selected && selected !== correct) btn.classList.add("incorrect");
    });

    // Show feedback
    feedbackEl.classList.remove("hidden");
    if (selected === correct) {
        score++;
        feedbackEl.textContent = "Correct!";
    } else {
        feedbackEl.textContent = `Incorrect! Correct answer: ${correct}`;
    }

    scoreEl.textContent = `Score: ${score} / ${questions.length}`;
    actionBtn.textContent = "Next Question";
}

// 6. Move to the next question or finish quiz
function nextQuestion() {
    index++;
    if (index < questions.length) {
        displayQuestion();
        startTimer();
    } else {
        questionEl.textContent = "Quiz Finished!";
        optionsEl.innerHTML = `<p>Your final score is ${score} out of ${questions.length}.</p>`;
        feedbackEl.classList.add("hidden");
        actionBtn.textContent = "Restart Quiz";
    }
}

// 7. Start the quiz
function startQuiz() {
    index = 0;
    score = 0;
    scoreEl.textContent = `Score: 0 / ${questions.length}`;
    shuffleQuestions();
    displayQuestion();
    startTimer();
}

// Handle main button click
actionBtn.onclick = () => {
    if (actionBtn.textContent === "Restart Quiz") startQuiz();
    else if (!answered) checkAnswer();
    else nextQuestion();
};

// Run quiz when page loads
startQuiz();