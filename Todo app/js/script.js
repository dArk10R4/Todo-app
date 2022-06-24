// deyisenler
let list = document.querySelector(".list");
let arr = [{ text: "qablari yu", completed: true, id: 1 }];
let activearr = [];
let completedarr = [];
let currentarr = arr;
let inputText = document.getElementById("inp");
let obj = {};
let idli = 1;
let form = document.getElementById("form");
let inpcheck = document.getElementById("inpcheck");
let leftmis = 0;
let leftmisp = document.getElementById("divp");
let all = document.getElementById("all");
let active = document.getElementById("active");
let completed = document.getElementById("completed");
let clearCompleted = document.getElementById("clearCompleted");
let changemode = document.getElementById("changemode");
let isdark = window.matchMedia("(prefers-color-scheme: dark)").matches;
let body = document.getElementById("body");
let formdiv = document.getElementById("formdiv");
let formdiv2 = document.getElementById("formdiv2");
let listLi = document.getElementsByClassName("listLi");
let liP = document.getElementsByClassName("li__p");
let filtertodo = document.getElementById("filertodo");
let filterdo = filtertodo;
let filterDiv = document.getElementById("filterDiv");
//kodlar
addli(arr);
leftmission();
mobilestyling();
inputText.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    event.preventDefault();
    if (!inputText.value == "") {
      idli++;
      obj = { text: inputText.value, completed: inpcheck.checked, id: idli };
      arr.push(obj);
      obj = {};
      inpcheck.checked = false;
      inputText.value = "";
      filt();
    }
  }
});
list.addEventListener("click", function (event) {
  if (event.target.tagName == "INPUT") {
    let mybool = event.target.nextElementSibling.classList.toggle("completed");

    for (elem of arr) {
      if (elem.id == event.target.parentElement.parentElement.id) {
        elem.completed = mybool;
      }
    }
  }

  filt();
  leftmission();
});

function addli(array) {
  let html = ``;
  for (elem of array) {
    html += `
    <li id="${elem.id}" class="listLi ${isdark ? "listLiDark" : ""} ">
    <div class="list_li__div">
      <input type="checkbox" name="taskckeck" id="" class="licheck" ${
        elem.completed ? "checked" : ""
      } />
      <p class="li__p ${elem.completed ? "completed" : ""} ${
      isdark ? "liPDark" : ""
    }">${elem.text}</p>
    </div>
    <img src="../style/images/icon-cross.svg" alt="" class="list_li__img">
  </li>
        `;
  }
  list.innerHTML = html;
  leftmission();
  chngmode();
}
function leftmission() {
  activearr = [];
  completedarr = [];
  for (elem in arr) {
    if (!arr[elem].completed) {
      leftmis++;
      activearr.push(arr[elem]);
    } else {
      completedarr.push(arr[elem]);
    }
  }
  leftmisp.innerHTML = `${leftmis} item left`;
  leftmis = 0;
}

all.addEventListener("click", function () {
  all.classList.add("filter");
  currentarr = arr;
  active.classList.remove("filter");
  completed.classList.remove("filter");
  addli(arr);
});
active.addEventListener("click", function () {
  addli(activearr);
  currentarr = activearr;
  all.classList.remove("filter");
  active.classList.add("filter");
  completed.classList.remove("filter");
});
completed.addEventListener("click", function () {
  currentarr = completedarr;
  all.classList.remove("filter");
  active.classList.remove("filter");
  completed.classList.add("filter");
  addli(completedarr);
});
function filt() {
  completedarr = [];
  activearr = [];
  for (elem in arr) {
    if (!arr[elem].completed) {
      activearr.push(arr[elem]);
    } else {
      completedarr.push(arr[elem]);
    }
  }
  if (all.classList.contains("filter")) {
    currentarr = arr;
  } else if (completed.classList.contains("filter")) {
    currentarr = completedarr;
  } else {
    currentarr = activearr;
  }
  addli(currentarr);
}
list.addEventListener("click", function (event) {
  if (event.target.tagName == "IMG") {
    let deletedarr = arr.filter(function (x) {
      if (x.id != event.target.parentElement.id) {
        return x;
      }
    });
    arr = deletedarr;
    filt();
  }
});
clearCompleted.addEventListener("click", function () {
  let deletedarr = arr.filter(function (x) {
    if (!x.completed) {
      return x;
    }
  });
  arr = deletedarr;
  filt();
});
changemode.addEventListener("click", function () {
  isdark = !isdark;
  chngmode();
});
function chngmode() {
  if (isdark == true) {
    changemode.src = "../style/images/icon-sun.svg";
    body.classList.add("dark");
    inputText.classList.add("inp__dark");
    formdiv.classList.add("form__divinp-dark");
    formdiv2.classList.add("main__divwithli-dark");
    for (elem of listLi) {
      elem.classList.add("listLiDark");
    }
    for (i of liP) {
      i.classList.add("liPDark");
    }
    document.documentElement.classList.add("Htmldark");
  } else {
    changemode.src = "../style/images/icon-moon.svg";
    body.classList.remove("dark");
    inputText.classList.remove("inp__dark");
    formdiv.classList.remove("form__divinp-dark");
    formdiv2.classList.remove("main__divwithli-dark");
    for (elem of listLi) {
      elem.classList.remove("listLiDark");
    }
    for (i of liP) {
      i.classList.remove("liPDark");
    }
    document.documentElement.classList.remove("Htmldark");
  }
}
window.addEventListener("resize", mobilestyling);
function mobilestyling() {
  if (this.window.innerWidth < 600) {
    filtertodo.remove();
    filterdo.classList.add("mobile");
    form.insertAdjacentElement("beforeend", filterdo);
  } else {
    filtertodo.remove();
    filterdo.classList.remove("mobile");
    filterDiv.insertBefore(filterdo, filterDiv.lastElementChild);
  }
}
