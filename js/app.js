"use strict";
const form = document.forms['main__form'],
      input = form.querySelector("input"),
      taskList = document.querySelector(".main__tasks .task__list"),
      theme = document.querySelector(".theme"),
      nav = document.querySelector(".navbar"),
      signUp = document.querySelector(".sign__up"),
      logIn = document.querySelector(".log__in"),
      taskBtn = document.querySelector(".main__form_btn");

let tasksArr = [];

// Check theme and tasks     
function checkThemeAndTasks() {
    if (localStorage.getItem("theme") && localStorage.getItem("theme") == "dark") {
        setDarkTheme();
        theme.value = "dark";
    } else {
        setLightTheme();
        theme.value ="light";
    }
    
    if (localStorage.getItem("tasks")) {
        const arr = localStorage.getItem("tasks").split(",");
        tasksArr = [...arr];
        renderTasks();
    }
}
checkThemeAndTasks();

// Set dark theme function
function setDarkTheme() {
    if (localStorage.getItem("theme") == "dark") {
        nav.classList.add("dark_for_nav");
        signUp.classList.add("dark_for_nav_btn");
        logIn.classList.add("dark_for_nav_btn");
        theme.classList.add("dark_for_nav_select");
        taskBtn.classList.add("dark_for_task_btn");
        document.querySelectorAll(".task__number").forEach(num => num.classList.add("dark__task_number"));
    }
}

// Set light theme function
function setLightTheme() {
    nav.classList.remove("dark_for_nav");
    signUp.classList.remove("dark_for_nav_btn");
    logIn.classList.remove("dark_for_nav_btn");
    theme.classList.remove("dark_for_nav_select");
    taskBtn.classList.remove("dark_for_task_btn");
    document.querySelectorAll(".task__number").forEach(num => num.classList.remove("dark__task_number"));
}

// On change theme
theme.addEventListener("change", () => {
    localStorage.setItem("theme", theme.value);

    // save theme in local storage 
    if (localStorage.getItem("theme") == "dark") {
       setDarkTheme();
       localStorage.setItem("theme", "dark");
    } else {
        setLightTheme();
        localStorage.setItem("theme", "light");
    }
})

// Form submit
form.addEventListener("submit", (e) =>{
    e.preventDefault();
    tasksArr.push(input.value);
    localStorage.setItem("tasks", tasksArr);
    renderTasks();
    form.reset();
})

// Check theme for tasks
function checkTheme() {
    if (theme.value == "dark") {
        return "dark__task_number";
    }
}

// Render tasks
function renderTasks() {
    clearList();
    tasksArr.forEach((text, i) => {
        const li = document.createElement("li");
        li.classList.add("tasks__item");
        li.innerHTML = `
            <div class="task__number ${checkTheme()}">${i+1}</div>
            <div class="task__text">${text}</div>
            <button class="complete"><i class="fa-solid fa-check"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        `;
        taskList.append(li);

        li.addEventListener("click", (e) => {
            if (e.target.classList.contains("delete") || e.target.parentElement.classList.contains("delete")) {
                tasksArr.splice(i, 1);
                localStorage.removeItem("tasks", tasksArr.splice(i,1));
                localStorage.getItem("tasks")
                clearList();
                renderTasks();
            } else if (e.target.classList.contains("complete") || e.target.parentElement.classList.contains("complete")) {
                li.querySelector(".task__text").classList.toggle("check");
            }
        })
    })
};

// Clear tasks list
function clearList() {
    taskList.innerHTML = "";
}
