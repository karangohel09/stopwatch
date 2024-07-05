let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];

function startPause() {
  if (timerInterval) {
    // Pause
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById("startPause").textContent = "Resume";
  } else {
    // Start
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    document.getElementById("startPause").textContent = "Pause";
  }
}

function reset() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  laps = [];
  document.getElementById("display").textContent = "00:00:00.000";
  document.getElementById("startPause").textContent = "Start";
  document.getElementById("laps").innerHTML = "";
}

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  displayTime(elapsedTime);
}

function displayTime(time) {
  const ms = Math.floor(time % 1000);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  const formattedTime = `
    ${hours.toString().padStart(2, "0")}:
    ${minutes.toString().padStart(2, "0")}:
    ${seconds.toString().padStart(2, "0")}:
    ${ms.toString().padStart(3, "0")}
  `;

  document.getElementById("display").textContent = formattedTime;
}

function lap() {
  if (timerInterval) {
    const currentTime = Date.now();
    const lapTime = currentTime - startTime;
    laps.push(lapTime);
    
    const li = document.createElement("li");
    const minutes = Math.floor((lapTime / (1000 * 60)) % 60);
    const seconds = Math.floor((lapTime / 1000) % 60);
    const ms = Math.floor(lapTime % 1000);
    li.textContent = `Lap ${laps.length}: ${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
    document.getElementById("laps").appendChild(li);
  }
}

