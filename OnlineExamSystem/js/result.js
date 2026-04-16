const resultContainer = document.getElementById("result-container");

const quizData = JSON.parse(localStorage.getItem("quizData"));
const userAnswers = JSON.parse(localStorage.getItem("userAnswers"));

let score = 0;

quizData.forEach((q, index) => {
  const div = document.createElement("div");
  div.className = "question-block";

  const userAnswer = userAnswers[index];
  const isCorrect = userAnswer === q.answer;

  if (isCorrect) score++;

  div.innerHTML = `
    <p><strong>Q${index + 1}: ${q.question}</strong></p>
    <p>Your Answer: <span style="color:${isCorrect ? 'green' : 'red'}">${userAnswer || "Skipped"}</span></p>
    <p>Correct Answer: <strong>${q.answer}</strong></p>
    <hr>
  `;
  resultContainer.appendChild(div);
});

const scoreDiv = document.createElement("div");
scoreDiv.innerHTML = `<h3 style="text-align:center;">✅ You scored ${score} out of ${quizData.length}</h3>`;
resultContainer.prepend(scoreDiv);
