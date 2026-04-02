let userData = JSON.parse(localStorage.getItem("studySync")) || {
  name: "",
  progress: 60
};



/* VALIDATION */
function validateSignup() {
  let valid = true;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  document.querySelectorAll(".error").forEach(e => e.innerText = "");
  document.querySelectorAll("input").forEach(i => i.classList.remove("error-border"));

  if (name.value === "") {
    document.getElementById("nameError").innerText = "Name required";
    name.classList.add("error-border");
    valid = false;
  }

  if (!email.value.includes("@")) {
    document.getElementById("emailError").innerText = "Invalid email";
    email.classList.add("error-border");
    valid = false;
  }

  if (password.value.length < 6) {
    document.getElementById("passwordError").innerText = "Min 6 chars";
    password.classList.add("error-border");
    valid = false;
  }

  if (valid) startOnboarding();
}

/* NAVIGATION */
function showLogin() {
  document.getElementById("signup").classList.add("hidden");
  document.getElementById("login").classList.remove("hidden");
}

function startOnboarding() {
  document.getElementById("signup").classList.add("hidden");
  document.getElementById("login").classList.add("hidden");
  document.getElementById("onboarding").classList.remove("hidden");
}

/* STEPS */
function nextStep(step) {
  document.querySelectorAll("#onboarding > div").forEach(el => {
    if (el.id !== "step" + step && !el.classList.contains("steps")) {
      el.classList.add("hidden");
    }
  });

  document.getElementById("step" + step).classList.remove("hidden");

  const lines = document.querySelectorAll(".line");
  lines.forEach((line, index) => {
    line.classList.toggle("active", index < step);
  });
}

/* DASHBOARD */
function showDashboard() {
  document.getElementById("onboarding").classList.add("hidden");
  document.getElementById("loader").classList.remove("hidden");

  const name = document.getElementById("onbName").value || "User";
  userData.name = name;

  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    document.querySelector("#dashboard h3").innerText =
      "Hi " + userData.name + " 👋";

    const bar = document.querySelector(".bar");
    const text = document.querySelector(".progress-text");

    let count = 0;
    let progress = userData.progress;

    let interval = setInterval(() => {
      if (count >= progress) clearInterval(interval);
      bar.style.width = count + "%";
      text.innerText = count + "%";
      count++;
    }, 20);

    localStorage.setItem("studySync", JSON.stringify(userData));

  }, 1500);
}

/* DARK MODE */
function toggleTheme() {
  document.body.classList.toggle("dark");
}

const hamburger = document.getElementById("hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  // Toggle navbar background
  navbar.classList.toggle("active");

  // Optional: toggle a menu (example)
  alert("Menu clicked! You can show/hide links here.");
});
