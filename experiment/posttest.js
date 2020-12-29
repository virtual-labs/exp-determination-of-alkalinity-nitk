
// Don't touch the below code

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------

  const myQuestions = [
    {
      question: "Higher is the alkalinity in water easier it is for pH change.",
      answers: {
        a: "False",
        b: "True"
      },
      correctAnswer: "a"
    },

    {
      question: "Excessive alkalinity level in human body can ",
      answers: {
        a: "Expel the unwanted pathogens in the bloodstream",
        b: "Cause skin irritations",
        c: "Lead to gastrointestinal issues",
        d: "All of the above"
      },
      correctAnswer: "d"
    },

    {
      question: "Data obtained from alkalinity is used for following engineering practices. ",
      answers: {
        a: "Chemical coagulation of water and waste water",
        b: "Water softening",
        c: "Corrosion control",
        d: "All of the above"
      },
      correctAnswer: "d"
    },
    {
      question: "Majority of mineral water supplied is mostly",
      answers: {
        a: "Acidic",
        b: "Neutral",
        c: "Alkaline",
        d: "None of the above"
      },
      correctAnswer: "c"
    },
    {
      question: "Alkalinity measurements are used in the interpretation and control of waste water treatment process.",
      answers: {
        a: "False",
        b: "True"
      },
      correctAnswer: "b"
    }
  ];

// ---------------------------- End -------------------------------

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
