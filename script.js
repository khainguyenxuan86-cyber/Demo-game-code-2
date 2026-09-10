let currentQuestionIndex = 0;
let score = 0;

let selectedAnswer = null;
let selectedWords = [];

/*
DOM ELEMENTS

*/

const questionText =
document.getElementById(
"question-text"
);

const questionType =
document.getElementById(
"question-type"
);

/*
QUESTION IMAGE
*/

const questionImageContainer =
document.getElementById(
"question-image-container"
);

const questionImage =
document.getElementById(
"question-image"
);

/*
MULTIPLE CHOICE
*/

const choicesContainer =
document.getElementById(
"choices-container"
);

/*
UNSCRAMBLE
*/

const unscrambleContainer =
document.getElementById(
"unscramble-container"
);

const wordBank =
document.getElementById(
"word-bank"
);

const sentenceArea =
document.getElementById(
"sentence-area"
);

const clearUnscramble =
document.getElementById(
"clear-unscramble"
);

/*
WRITING
*/

const writingContainer =
document.getElementById(
"writing-container"
);

const writingAnswer =
document.getElementById(
"writing-answer"
);

/*
BUTTONS
*/

const feedback =
document.getElementById(
"feedback"
);

const checkBtn =
document.getElementById(
"check-btn"
);

const nextBtn =
document.getElementById(
"next-btn"
);

/*
SCORE
*/

const scoreDisplay =
document.getElementById(
"score"
);

const questionNumber =
document.getElementById(
"question-number"
);

const totalQuestions =
document.getElementById(
"total-questions"
);

const progress =
document.getElementById(
"progress"
);

/*
RESULT
*/

const resultScreen =
document.getElementById(
"result-screen"
);

const finalScore =
document.getElementById(
"final-score"
);

const finalTotal =
document.getElementById(
"final-total"
);

const restartBtn =
document.getElementById(
"restart-btn"
);

/*
INITIALIZE GAME

*/

totalQuestions.textContent =
questions.length;

loadQuestion();

/*
LOAD QUESTION

*/

function loadQuestion() {

resetQuestion();

const currentQuestion =
questions[
currentQuestionIndex
];

/*
QUESTION TEXT
*/

questionText.textContent =
currentQuestion.question;

/*
QUESTION NUMBER
*/

questionNumber.textContent =
currentQuestionIndex + 1;

/*
PROGRESS
*/

updateProgress();

/*
QUESTION IMAGE

*/

if (
currentQuestion.image
) {

questionImage.src =
  currentQuestion.image;


questionImage.alt =
  currentQuestion.question;


questionImageContainer.classList.remove(
  "hidden"
);

}

else {

questionImage.src =
  "";


questionImageContainer.classList.add(
  "hidden"
);

}

/*
MULTIPLE CHOICE

*/

if (
currentQuestion.type ===
"multipleChoice"
) {

questionType.textContent =
  "MULTIPLE CHOICE";


choicesContainer.classList.remove(
  "hidden"
);


currentQuestion.choices.forEach(
  choice => {


    const button =
      document.createElement(
        "button"
      );


    button.classList.add(
      "choice-btn"
    );


    button.textContent =
      choice;


    button.addEventListener(
      "click",
      () => {


        selectChoice(
          button,
          choice
        );


      }
    );


    choicesContainer.appendChild(
      button
    );


  }
);

}

/*
UNSCRAMBLE

*/

else if (
currentQuestion.type ===
"unscramble"
) {

questionType.textContent =
  "UNSCRAMBLE";


unscrambleContainer.classList.remove(
  "hidden"
);


const shuffledWords =
  shuffleArray(
    [...currentQuestion.words]
  );


shuffledWords.forEach(
  word => {


    const button =
      document.createElement(
        "button"
      );


    button.classList.add(
      "word-btn"
    );


    button.textContent =
      word;


    button.addEventListener(
      "click",
      () => {


        addWord(
          word,
          button
        );


      }
    );


    wordBank.appendChild(
      button
    );


  }
);

}

/*
WRITING

*/

else if (
currentQuestion.type ===
"writing"
) {

questionType.textContent =
  "WRITING";


writingContainer.classList.remove(
  "hidden"
);

}

}

/*
RESET QUESTION

*/

function resetQuestion() {

selectedAnswer =
null;

selectedWords =
[];

choicesContainer.innerHTML =
"";

wordBank.innerHTML =
"";

sentenceArea.innerHTML =
"";

writingAnswer.value =
"";

feedback.textContent =
"";

feedback.className =
"";

checkBtn.classList.remove(
"hidden"
);

nextBtn.classList.add(
"hidden"
);

choicesContainer.classList.add(
"hidden"
);

unscrambleContainer.classList.add(
"hidden"
);

writingContainer.classList.add(
"hidden"
);

}

/*
MULTIPLE CHOICE

*/

function selectChoice(
button,
choice
) {

selectedAnswer =
choice;

const allChoices =
document.querySelectorAll(
".choice-btn"
);

allChoices.forEach(
choiceButton => {

  choiceButton.classList.remove(
    "selected"
  );


}

);

button.classList.add(
"selected"
);

}

/*
UNSCRAMBLE

*/

function addWord(
word,
button
) {

if (
button.classList.contains(
"used"
)
) {

return;

}

selectedWords.push(
word
);

button.classList.add(
"used"
);

renderSentence();

}

/*
RENDER SENTENCE
*/

function renderSentence() {

sentenceArea.innerHTML =
"";

selectedWords.forEach(
(
word,
index
) => {

  const wordButton =
    document.createElement(
      "button"
    );


  wordButton.textContent =
    word;


  wordButton.classList.add(
    "selected-word"
  );


  wordButton.addEventListener(
    "click",
    () => {


      removeWord(
        index
      );


    }
  );


  sentenceArea.appendChild(
    wordButton
  );


}

);

}

/*
REMOVE WORD
*/

function removeWord(
index
) {

const removedWord =
selectedWords[
index
];

selectedWords.splice(
index,
1
);

const wordButtons =
document.querySelectorAll(
".word-btn"
);

wordButtons.forEach(
button => {

  if (
    button.textContent ===
    removedWord
  ) {


    button.classList.remove(
      "used"
    );


  }


}

);

renderSentence();

}

/*
CLEAR UNSCRAMBLE
*/

clearUnscramble.addEventListener(
"click",
() => {

selectedWords =
  [];


const wordButtons =
  document.querySelectorAll(
    ".word-btn"
  );


wordButtons.forEach(
  button => {


    button.classList.remove(
      "used"
    );


  }
);


renderSentence();

}
);

/*
CHECK ANSWER

*/

checkBtn.addEventListener(
"click",
checkAnswer
);

function checkAnswer() {

const currentQuestion =
questions[
currentQuestionIndex
];

/*
MULTIPLE CHOICE
*/

if (
currentQuestion.type ===
"multipleChoice"
) {

if (
  selectedAnswer ===
  null
) {


  showFeedback(
    "Please choose an answer!",
    false
  );


  return;


}


if (
  selectedAnswer ===
  currentQuestion.answer
) {


  correctAnswer();


}


else {


  wrongAnswer(
    currentQuestion.answer
  );


}

}

/*
UNSCRAMBLE
*/

else if (
currentQuestion.type ===
"unscramble"
) {

const userAnswer =
  selectedWords.join(
    " "
  );


if (
  userAnswer.length ===
  0
) {


  showFeedback(
    "Please arrange the words first!",
    false
  );


  return;


}


if (
  normalizeText(
    userAnswer
  ) ===
  normalizeText(
    currentQuestion.answer
  )
) {


  correctAnswer();


}


else {


  wrongAnswer(
    currentQuestion.answer
  );


}

}

/*
WRITING
*/

else if (
currentQuestion.type ===
"writing"
) {

const userAnswer =
  writingAnswer.value.trim();


if (
  userAnswer.length <
  5
) {


  showFeedback(
    "Please write a longer answer!",
    false
  );


  return;


}


/*
Current version:

Writing answers are accepted
when the student writes a
meaningful-length response.

You can later add:

- keyword checking
- word count
- grammar checking
- AI evaluation

*/


correctAnswer(
  "🎉 Good job! Your writing has been submitted."
);

}

}

/*
CORRECT ANSWER

*/

function correctAnswer(
message =
"🎉 Correct!"
) {

score++;

scoreDisplay.textContent =
score;

showFeedback(
message,
true
);

finishQuestion();

}

/*
WRONG ANSWER

*/

function wrongAnswer(
correctAnswer
) {

showFeedback(
`❌ Not quite! Correct answer: ${correctAnswer}`,
false
);

finishQuestion();

}

/*
SHOW FEEDBACK

*/

function showFeedback(
message,
isCorrect
) {

feedback.textContent =
message;

feedback.classList.remove(
"correct",
"wrong"
);

if (
isCorrect
) {

feedback.classList.add(
  "correct"
);

}

else {

feedback.classList.add(
  "wrong"
);

}

}

/*
FINISH QUESTION

*/

function finishQuestion() {

checkBtn.classList.add(
"hidden"
);

nextBtn.classList.remove(
"hidden"
);

const buttons =
document.querySelectorAll(
"button"
);

buttons.forEach(
button => {

  if (
    button !==
    nextBtn
  ) {


    button.disabled =
      true;


  }


}

);

}

/*
NEXT QUESTION

*/

nextBtn.addEventListener(
"click",
() => {

currentQuestionIndex++;


if (
  currentQuestionIndex <
  questions.length
) {


  loadQuestion();


}


else {


  showResult();


}

}
);

/*
PROGRESS BAR

*/

function updateProgress() {

const percentage =
(
currentQuestionIndex /
questions.length
) * 100;

progress.style.width =
percentage + "%";

}

/*
SHOW RESULT

*/

function showResult() {

document.querySelector(
".question-card"
).classList.add(
"hidden"
);

document.querySelector(
".game-header"
).classList.add(
"hidden"
);

document.querySelector(
".progress-container"
).classList.add(
"hidden"
);

resultScreen.classList.remove(
"hidden"
);

finalScore.textContent =
score;

finalTotal.textContent =
questions.length;

progress.style.width =
"100%";

}

/*
RESTART GAME

*/

restartBtn.addEventListener(
"click",
() => {

currentQuestionIndex =
  0;


score =
  0;


scoreDisplay.textContent =
  score;


resultScreen.classList.add(
  "hidden"
);


document.querySelector(
  ".question-card"
).classList.remove(
  "hidden"
);


document.querySelector(
  ".game-header"
).classList.remove(
  "hidden"
);


document.querySelector(
  ".progress-container"
).classList.remove(
  "hidden"
);


loadQuestion();

}
);

/*
HELPER FUNCTIONS

*/

/*
SHUFFLE ARRAY
*/

function shuffleArray(
array
) {

for (
let i =
array.length - 1;

i > 0;

i--

) {

const j =
  Math.floor(
    Math.random() *
    (i + 1)
  );


[
  array[i],
  array[j]
] =
[
  array[j],
  array[i]
];

}

return array;

}

/*
NORMALIZE TEXT
*/

function normalizeText(
text
) {

return text

.toLowerCase()

.replace(
  /[.,!?]/g,
  ""
)

.trim();

}
