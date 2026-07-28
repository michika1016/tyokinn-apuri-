// ============================
// SaveLeaf
// JavaScript Part1
// ============================

// ---------- 要素取得 ----------

const goalInput = document.getElementById("goalInput");
const saveGoal = document.getElementById("saveGoal");

const money = document.getElementById("money");
const progressBar = document.getElementById("progressBar");
const percent = document.getElementById("percent");
const remain = document.getElementById("remain");

const addButtons =
document.querySelectorAll(".addMoney");

const customMoney =
document.getElementById("customMoney");

const customAdd =
document.getElementById("customAdd");

const todaySave =
document.getElementById("todaySave");

const totalSave =
document.getElementById("totalSave");

const achievement =
document.getElementById("achievementText");

// ---------- データ ----------

let goal =
Number(localStorage.getItem("goal")) || 0;

let total =
Number(localStorage.getItem("total")) || 0;

let today =
Number(localStorage.getItem("today")) || 0;

// ---------- 初期表示 ----------

goalInput.value =
goal === 0 ? "" : goal;

updateScreen();

// ---------- 目標保存 ----------

saveGoal.addEventListener("click",()=>{

goal =
Number(goalInput.value);

localStorage.setItem(
"goal",
goal
);

updateScreen();

});

// ---------- 金額追加 ----------

addButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

const add =
Number(btn.dataset.money);

total += add;

today += add;

saveData();

});

});

// ---------- 自由入力 ----------

customAdd.addEventListener("click",()=>{

const add =
Number(customMoney.value);

if(add<=0){

alert("金額を入力してください😊");

return;

}

total += add;

today += add;

customMoney.value="";

saveData();

});

// ---------- 保存 ----------

function saveData(){

localStorage.setItem(
"total",
total
);

localStorage.setItem(
"today",
today
);

updateScreen();

}

// ---------- 表示更新 ----------

function updateScreen(){

money.textContent =
"¥"+total.toLocaleString();

todaySave.textContent =
"¥"+today.toLocaleString();

totalSave.textContent =
"¥"+total.toLocaleString();

if(goal===0){

progressBar.style.width="0%";

percent.textContent="0%";

remain.textContent="目標を設定してください";

achievement.textContent=
"目標を設定して始めよう！";

return;

}

let rate =
(total/goal)*100;

if(rate>100){

rate=100;

}

progressBar.style.width =
rate+"%";

percent.textContent =
Math.floor(rate)+"%";

remain.textContent =
"あと ¥"+
Math.max(goal-total,0).toLocaleString();

// ---------- 達成メッセージ ----------

if(total >= goal){

achievement.textContent =
"🎉 おめでとう！目標達成！！";

}else if(total >= goal*0.75){

achievement.textContent =
"🔥 あと少し！頑張ろう！";

}else if(total >= goal*0.5){

achievement.textContent =
"🌱 半分達成！";

}else if(total >= goal*0.25){

achievement.textContent =
"👏 いい調子！";

}else{

achievement.textContent =
"💪 コツコツ貯金しよう！";

}

}

// ============================
// Memo
// ============================

const memo =
document.getElementById("memo");

memo.value =
localStorage.getItem("memo") || "";

memo.addEventListener("input",()=>{

localStorage.setItem(
"memo",
memo.value
);

});

// ============================
// Dark Mode
// ============================

const darkMode =
document.getElementById("darkMode");

if(localStorage.getItem("dark")=="true"){

document.body.classList.add("dark");

}

darkMode.addEventListener("click",()=>{

document.body.classList.toggle("dark");

localStorage.setItem(
"dark",
document.body.classList.contains("dark")
);

});

// ============================
// Reset
// ============================

const resetData =
document.getElementById("resetData");

resetData.addEventListener("click",()=>{

const ok =
confirm("本当にリセットしますか？");

if(!ok) return;

goal = 0;
total = 0;
today = 0;

goalInput.value = "";

localStorage.removeItem("goal");
localStorage.removeItem("total");
localStorage.removeItem("today");
localStorage.removeItem("memo");

memo.value = "";

updateScreen();

});

// ============================
// Enterキーで追加
// ============================

customMoney.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

customAdd.click();

}

});

// ============================
// 初期表示
// ============================

updateScreen();

console.log("🌱 SaveLeaf Ready!");
