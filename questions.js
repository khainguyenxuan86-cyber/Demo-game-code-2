const questions = [

/*
MULTIPLE CHOICE

*/

{
type: "multipleChoice",

question: "What animal is this?",

image: "images/cat.png",

choices: [
  "Dog",
  "Cat",
  "Bird",
  "Fish"
],

answer: "Cat"

},

{
type: "multipleChoice",

question: "What animal is this?",

image: "images/dog.png",

choices: [
  "Dog",
  "Cat",
  "Bird",
  "Fish"
],

answer: "Dog"

},

{
type: "multipleChoice",

question: "What is the past tense of 'go'?",

choices: [
  "Goed",
  "Went",
  "Gone",
  "Going"
],

answer: "Went"

},

/*
UNSCRAMBLE

*/

{
type: "unscramble",

question: "Put the words in the correct order.",

image: "images/football.png",

words: [
  "football",
  "I",
  "every",
  "play",
  "Sunday"
],

answer: "I play football every Sunday"

},

{
type: "unscramble",

question: "Put the words in the correct order.",

words: [
  "likes",
  "She",
  "books",
  "reading"
],

answer: "She likes reading books"

},

/*
WRITING

*/

{
type: "writing",

question:
  "Look at the picture and write one sentence.",

image: "images/pizza.png",

sampleAnswers: [
  "This is a pizza.",
  "I like pizza.",
  "My favourite food is pizza."
]

},

{
type: "writing",

question:
  "Write one sentence about what you do after school.",

sampleAnswers: [
  "I do my homework after school.",
  "I play football after school.",
  "I watch TV after school."
]

}

];
