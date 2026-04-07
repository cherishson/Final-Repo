let users = {};
let currentUser = null;

/* Navigation */
function showPage(page) {
  document.querySelectorAll(".container").forEach(p => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
}

/* Signup */
function signup() {
  let user = document.getElementById("signupUser").value;
  let pass = document.getElementById("signupPass").value;

  if (!user || !pass) return alert("Fill all fields");

  users[user] = pass;
  alert("Account created!");
  showPage("loginPage");
}

/* Login */
function login() {
  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  if (users[user] && users[user] === pass) {
    currentUser = user;
    document.getElementById("userName").innerText = user;
    showPage("dashboardPage");
    generateQuiz();
  } else {
    alert("Invalid login");
  }
}

/* Sections */
function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.style.display = "none");
  document.getElementById(id).style.display = "block";
}

/* Dark Mode */
function toggleDark() {
  document.body.classList.toggle("dark");
}

/* Profile */
function saveProfile() {
  let course = document.getElementById("course").value;
  let level = document.getElementById("level").value;

  document.getElementById("profileInfo").innerText =
    "Course: " + course + " | Level: " + level;

  document.getElementById("streak").innerText =
    Math.floor(Math.random() * 50);
}

/* Quiz */
let questions = [];

function generateQuiz() {
  questions = [];
  for (let i = 1; i <= 20; i++) {
    questions.push({
      q: "Question " + i,
      a: ["A", "B", "C", "D"]
    });
  }
  displayQuiz();
}

function displayQuiz() {
  let container = document.getElementById("quizContainer");
  container.innerHTML = "";

  questions.forEach((q, i) => {
    let div = document.createElement("div");
    div.className = "question";
    div.innerHTML = q.q + "<br>";

    q.a.forEach(opt => {
      div.innerHTML += `<input type="radio" name="q${i}"> ${opt}<br>`;
    });

    container.appendChild(div);
  });
}

function submitQuiz() {
  alert("Quiz submitted! 🎉");
}

/* Payment */
function pay() {
  alert("Redirecting to payment gateway...");
}

/* Logout */
function logout() {
  currentUser = null;
  showPage("loginPage");
}