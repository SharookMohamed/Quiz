// Updated quizData with description
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Madrid", "Rome", "Berlin"],
    answer: "Paris",
    description:
      "France is known for its rich history, culture, and landmarks like the Eiffel Tower.",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Jupiter", "Saturn", "Mars", "Earth"],
    answer: "Jupiter",
    description:
      "Jupiter is the largest planet, known for its Great Red Spot, a giant storm.",
  },
  {
    question: "What is the capital of India?",
    options: ["Chennai", "Mumbai", "Delhi", "Kerala"],
    answer: "Delhi",
    description:
      "Delhi is the seat of the Indian government and home to historical landmarks.",
  },
];

const questionElement = document.querySelector(".question__quiz");
const descriptionElement = document.querySelector(".description__quiz");
const optionsElement = document.querySelector(".options__quiz");
const buttonsElement = document.getElementsByClassName("buttons__quiz");
const submitButton = document.getElementById("submit-bttn__quiz");

let currentQuestion = 0;
let score = 0;
let optionSelected = false; // Track if an option is selected

function showQuestion() {
  const question = quizData[currentQuestion];
  questionElement.innerText = question.question;
  descriptionElement.innerText = question.description; // Display the description

  optionsElement.innerHTML = "";
  optionSelected = false; // Reset option selection for new question

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    optionsElement.appendChild(button);
    button.addEventListener("click", (e) => {
      selectAnswer(e);
      optionSelected = true;
      enableNextOrSubmitButton();
    });
  });

  renderNextOrSubmitButton();
}

function renderNextOrSubmitButton() {
  buttonsElement[0].innerHTML = ""; // Clear existing buttons
  const nextButton = document.createElement("button");
  if (currentQuestion < quizData.length - 1) {
    nextButton.innerText = "Next Question";
    nextButton.id = "next-bttn__quiz";
    nextButton.disabled = true; // Initially disabled
    nextButton.addEventListener("click", goToNextQuestion);
    buttonsElement[0].appendChild(nextButton);
  } else {
    submitButton.disabled = true; // Initially disable the "Finished" button
    submitButton.removeEventListener("click", showResult);
    submitButton.addEventListener("click", showResult);
    buttonsElement[0].appendChild(submitButton);
  }
}

function goToNextQuestion() {
  currentQuestion++;
  showQuestion();
}
let userAnswers = []; // Store user-selected answers

function selectAnswer(e) {
  const selectedButton = e.target;
  const answer = quizData[currentQuestion].answer;

  userAnswers[currentQuestion] = selectedButton.innerText; // Store user's answer

  if (selectedButton.innerText === answer) {
    score++;
    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("incorrect");
  }

  const buttons = optionsElement.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = true;
    if (button.innerText === answer) {
      button.classList.add("correct");
    }
  });
}

function enableNextOrSubmitButton() {
  const nextButton = document.getElementById("next-bttn__quiz");
  if (nextButton) {
    nextButton.disabled = false; // Enable next button after option is selected
  } else {
    submitButton.disabled = false; // Enable "Finished" button after option is selected on the last question
  }
}

function showResult() {
  document.getElementById("quiz__div").innerHTML = `
<div class="quiz__result_div">
<div class="result__round_div">
<span class="large__num">${score}</span>
<span class="small__num">/ ${quizData.length}</span>
</div>
<h1 class="result-heading">Congratulations!</h1>
<p class="result-score">You have scored ${score} out of ${quizData.length}.</p>
<p class="result-comparison">You scored better than 70% of all other quiz takers.</p>
<div class="crct__wrong__div">
<span>${score} Correct Answers</span>
<span>${quizData.length - score} Wrong Answers</span>

</div
</div>`; // Close the div here

  const seeAnswersButton = document.createElement("button");
  seeAnswersButton.innerText = "See Answers";
  seeAnswersButton.id = "seeAnswers";
  document
    .querySelector("#quiz__div .quiz__result_div")
    .appendChild(seeAnswersButton); // Append the button inside the div

  seeAnswersButton.addEventListener("click", displayAllQuestionsWithAnswers);
}
function displayAllQuestionsWithAnswers() {
  // Clear the quiz div
  document.querySelector("#quiz__div").innerHTML = "";

  quizData.forEach((questionData, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("quiz--answers__div");

    // Add the question text
    questionDiv.innerHTML = `<div class="question__quiz">${questionData.question}</div>`;

    // Create the description container
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description__quiz");
    descriptionDiv.innerHTML = `${questionData.description}`;

    // Create the options container
    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("options__quiz");

    // Loop through each option and display
    questionData.options.forEach((option) => {
      const optionButton = document.createElement("button");
      optionButton.innerText = option;

      // Check if this option is the correct answer
      if (option === questionData.answer) {
        optionButton.classList.add("correct");
      }

      // Check if this option was the user's selected answer
      if (option === userAnswers[index]) {
        if (option === questionData.answer) {
          optionButton.classList.add("correct"); // User selected the right answer
        } else {
          optionButton.classList.add("incorrect"); // User selected the wrong answer
        }
      }

      optionButton.disabled = true; // Disable the options
      optionsDiv.appendChild(optionButton);
    });

    // Append description, options, and question div to the quiz div
    questionDiv.appendChild(descriptionDiv);
    questionDiv.appendChild(optionsDiv);
    document.getElementById("quiz__div").appendChild(questionDiv);
  });
}

showQuestion();

// Initialize status bar
function createStatusBar() {
  const statusBar = document.querySelector(".quiz-status-bar");
  statusBar.innerHTML = ""; // Clear existing bars

  quizData.forEach((_, index) => {
    const statusDiv = document.createElement("div");
    if (index === currentQuestion) {
      statusDiv.classList.add("active");
    } else if (index < currentQuestion) {
      statusDiv.classList.add("completed");
    }
    statusBar.appendChild(statusDiv);
  });
}

// Call createStatusBar when showing a question
function showQuestion() {
  const question = quizData[currentQuestion];
  questionElement.innerText = question.question;
  descriptionElement.innerText = question.description;

  optionsElement.innerHTML = "";
  optionSelected = false;

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    optionsElement.appendChild(button);
    button.addEventListener("click", (e) => {
      selectAnswer(e);
      optionSelected = true;
      enableNextOrSubmitButton();
    });
  });

  renderNextOrSubmitButton();
  createStatusBar(); // Update status bar when a new question is shown
}

function goToNextQuestion() {
  currentQuestion++;
  showQuestion();
}
