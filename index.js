window.addEventListener("DOMContentLoaded", () => {
    createFloorList();
    createRoomList();
    createTimeIntervals();
    document.querySelectorAll(".dropdown").forEach(function (dropDownWrapper) {
        dropDownHandlers(dropDownWrapper);
    });
});

function createFloorList() {
    for(let i = 3; i <= 27; i++) {
        let ul = document.querySelector(".floor-list");
        let li = document.createElement("li");
        li.classList.add("list-item");
        li.dataset.value = "Этаж " + i;
        li.appendChild(document.createTextNode("Этаж " + i));
        ul.appendChild(li);
    }
};

function createRoomList() {
    for(let i = 1; i <= 10; i++) {
        let ul = document.querySelector(".room-list");
        let li = document.createElement("li");
        li.classList.add("list-item");
        li.dataset.value = "Переговорная " + i;
        li.appendChild(document.createTextNode("Переговорная " + i));
        ul.appendChild(li);
    } 
};

function createTimeIntervals() {
    for(let i = 0; i <= 10; i++) {
        let ul = document.querySelector(".time-list");
        let li = document.createElement("li");
        li.classList.add("list-item");
        li.dataset.value = `${i + 9}:00 - ${i + 10}:00`;
        li.appendChild(document.createTextNode(`${i + 9}:00 - ${i + 10}:00`));
        ul.appendChild(li);
    }
}

function focusUnfilledButtons(answers) {
    let buttons = document.querySelectorAll(".dropdown-button");
    for(let i = 0; i < buttons.length - 1; i++) {
        if (answers[i] == 0) {
            buttons[i].classList.add("unfilled");
        }
    }
};

document.querySelectorAll(".form-button").forEach(function(item) {
    item.addEventListener("click", function(e) {
        let buttons = document.querySelectorAll(".dropdown-button");
        let inputs = document.querySelectorAll("input");
        if (e.target === document.querySelector(".clear-button")) {
            buttons.forEach(function(button) {
                button.classList.remove("unfilled");
                button.classList.remove("selected");
                button.innerText = "Выберите";
            });
            inputs.forEach(function(input) {
                input.value = "";
            });

            document.querySelector(".form-sent").classList.add("hidden");
        }
        else if (e.target === document.querySelector(".send-button")) {
            let data = {};
            let answers = [];
            let inputs = document.querySelectorAll(".dropdown-input").forEach(function(input) {
                data[input.dataset.value] = input.value;
                answers.push(input.value);
            });
            answers.pop();
            answers = answers.map(function(answersItem) {
                if (answersItem == "") {
                    return 0;
                }
                else {
                    return answersItem;
                }
            });
            let isEmptyInputs = answers.some(x => x == "");
            if (isEmptyInputs) {
                console.log("Пользователь ввёл не полные данные");
                focusUnfilledButtons(answers);
            }
            else {
                console.log(JSON.stringify(data));
                document.querySelector(".form-sent").classList.remove("hidden");
            };
        }
    });
});

function removeUnfilled() {
    window.event.target.classList.remove("unfilled");
}

function dropDownHandlers(dropDownWrapper) {
    const dropDownButton = dropDownWrapper.querySelector(".dropdown-button");
    const dropDownList = dropDownWrapper.querySelector(".list");
    const dropDownListItems = dropDownWrapper.querySelectorAll(".list-item");
    const dropDownInput = dropDownWrapper.querySelector(".dropdown-input");

    dropDownButton.addEventListener("click", function() {
        dropDownList.classList.toggle("hidden");
        dropDownButton.classList.toggle("focus");
    });

    dropDownListItems.forEach(function(item) {
        item.addEventListener("click", function(e) {
            e.stopPropagation();
            dropDownButton.innerText = this.innerText;
            dropDownInput.value = this.dataset.value;
            dropDownList.classList.add("hidden");
            dropDownButton.classList.remove("unfilled");
            dropDownButton.classList.remove("focus");
            dropDownButton.classList.add("selected");
        })
    });

    document.addEventListener("click", function(e) {
        if (e.target !== dropDownButton) {
            dropDownList.classList.add("hidden");
            dropDownButton.classList.remove("focus");
        }
    });

    document.addEventListener("keydown", function(e) {
        if (e.key === "Tab" || e.key === "Escape") {
            dropDownList.classList.add("hidden");
            dropDownButton.classList.remove("focus");
        }
    });
}