let userData = JSON.parse(localStorage.getItem("studySync")) || {
  name: "",
  progress: 60
};

 let valid = true;

/* VALIDATION */
function validateSignup() {

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

function goDashboard(){
  switchSection("dashboard");drawChart();
    

}
function goOnboarding(){switchSection("onboarding");}

function savePreferences(){
  currentUser.profile={skill:skill.value,goal:goal.value,pace:pace.value};
  localStorage.setItem(currentUser.email,JSON.stringify(currentUser));
  loadCourses();
  switchSection("progressPage");
}

function loadCourses(){
  courseList.innerHTML="";
  ["HTML","CSS","JS","React","UIUX"].forEach(c=>{
    let div=document.createElement("div");
    div.className="course";
    div.innerText=c;
    div.onclick=()=>openLesson(c);
    courseList.appendChild(div);
  });
}

function openLesson(course){
  lessonTitle.innerText=course;
  watchTime=0;
  videoPlayer.ontimeupdate=()=>{
    watchTime=Math.floor(videoPlayer.currentTime);
    watchTimeSpan.innerText=watchTime;
    updateStudyTime();
  };
  switchSection("lessonPage");
}

function updateStudyTime(){
  currentUser.studyTime+=1;
  localStorage.setItem(currentUser.email,JSON.stringify(currentUser));
}

function completeLesson(){startQuiz();}

function startQuiz(){currentQuiz=0;score=0;showQuestion();switchSection("quizSection");}

function showQuestion(){question.innerText=quiz[currentQuiz].q;}

function answer(ans){
  if(ans===quiz[currentQuiz].a) score++;
  currentQuiz++;
  if(currentQuiz<quiz.length){showQuestion();} else showCertificate();
}

function showCertificate(){
  certText.innerText=`Score: ${score}/${quiz.length}`;
  switchSection("certificate");
}

function drawChart(){
  let ctx=progressChart.getContext("2d");
  ctx.clearRect(0,0,300,150);

  let scorePercent=(score/quiz.length)*100;
  let studyPercent=Math.min(currentUser.studyTime,100);
  let total=(scorePercent+studyPercent)/2;

  ctx.fillStyle="#fff";
  ctx.fillRect(50,50,total*2,30);

  studyTimeText.innerText="Study Time: "+currentUser.studyTime+"s";
}

function logout(){currentUser=null;switchSection("authSection");}
function toggleMode(){document.body.classList.toggle("dark");}
function switchSection(id){document.querySelectorAll("section").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active");}

// refs
const fullname=document.getElementById("fullname");
const email=document.getElementById("email");
const password=document.getElementById("password");
const plan=document.getElementById("plan");
const authTitle=document.getElementById("authTitle");
const welcomeText=document.getElementById("welcomeText");
const courseList=document.getElementById
const hamburger = document.getElementById("hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  // Toggle navbar background
  navbar.classList.toggle("active");

  // Optional: toggle a menu (example)
  alert("Menu clicked! You can show/hide links here.");
});