const quizData = [
  {
    question: "Which keyword is used to inherit a class in Java?",
    options: ["this", "extends", "implements", "super"],
    answer: "extends"
  },
  {
    question: "What is the default value of a boolean in Java?",
    options: ["true", "false", "null", "0"],
    answer: "false"
  },
  {
    question: "Which of these is not a Java primitive type?",
    options: ["int", "String", "boolean", "float"],
    answer: "String"
  },
  {
    question: "Which method is the entry point of any Java program?",
    options: ["start()", "run()", "main()", "init()"],
    answer: "main()"
  },
  {
    question: "What is used to handle exceptions in Java?",
    options: ["try-catch", "do-while", "for loop", "if-else"],
    answer: "try-catch"
  }
];

const container = document.getElementById("quiz-container");

quizData.forEach((q, index) => {
  const div = document.createElement("div");
  div.className = "question-block";
  div.innerHTML = `<p><strong>Q${index + 1}: ${q.question}</strong></p>`;

  q.options.forEach(option => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="q${index}" value="${option}" />
      ${option}<br>
    `;
    div.appendChild(label);
  });

  container.appendChild(div);
});

// Timer (60s countdown)
let timeLeft = 60;
const timerElement = document.getElementById("timer");
const countdown = setInterval(() => {
  timeLeft--;
  timerElement.innerHTML = `⏰ Time Left: ${timeLeft} seconds`;
  if (timeLeft <= 0) {
    clearInterval(countdown);
    document.getElementById("submitBtn").click();
  }
}, 1000);

// Submit Logic
document.getElementById("submitBtn").addEventListener("click", () => {
  const userAnswers = quizData.map((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    return selected ? selected.value : "";
  });
  localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
  localStorage.setItem("quizData", JSON.stringify(quizData));
  window.location.href = "result.html";
});
