const quotes = [
    "Typing is a skill that improves with practice.",
    "Stay focused and keep typing accurately.",
    "Speed comes with consistent and mindful practice."
  ];
  
  const quoteEl = document.getElementById("quote");
  const inputEl = document.getElementById("input");
  const statsEl = document.getElementById("stats");
  const resultBtn = document.getElementById("resultBtn");
  const resultsList = document.getElementById("resultsList");
  let quote = "";
  let startTime;
  let correctChars = 0;
  
  function startTest() {
    quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.innerHTML = quote
      .split("")
      .map((char) => `<span>${char}</span>`)
      .join("");
    inputEl.value = "";
    statsEl.style.display = "none";
    statsEl.innerHTML = "";
    startTime = new Date();
  }
  
  inputEl.addEventListener("input", () => {
    const inputText = inputEl.value;
    const quoteSpans = quoteEl.querySelectorAll("span");
    let correct = true;
    correctChars = 0;
  
    quoteSpans.forEach((char, index) => {
      const typedChar = inputText[index];
      if (!typedChar) {
        char.classList.remove("correct", "incorrect");
        correct = false;
      } else if (typedChar === char.textContent) {
        char.classList.add("correct");
        char.classList.remove("incorrect");
        correctChars++;
      } else {
        char.classList.add("incorrect");
        char.classList.remove("correct");
        correct = false;
      }
    });
  });
  
  function showResults() {
    const timeTaken = (new Date() - startTime) / 1000;
    const wordCount = quote.split(" ").length;
    const wpm = Math.round((wordCount / timeTaken) * 60);
    const totalChars = quote.length;
    const accuracy = ((correctChars / totalChars) * 100).toFixed(2);
  
    statsEl.innerHTML = `
      <p>Time: ${timeTaken.toFixed(2)}s</p>
      <p>Speed: ${wpm} WPM</p>
      <p>Accuracy: ${accuracy}%</p>
      <p>Characters Typed: ${correctChars} / ${totalChars}</p>
    `;
    statsEl.style.display = "block";
  }
  
  
  // Start initially
  startTest();
  