// Variables of Targeted Elements
const themeRadiosElList = document.querySelectorAll("input[type='radio']");
const monitorEl = document.querySelector("#calculator__monitor");
const btnNumberEl = document.querySelectorAll(".btn--number");
const btnOperationEl = document.querySelectorAll(".btn--operation");
const zeroBtnEl = document.getElementById("0");
const btnDelEl = document.querySelector(".btn--remove");
const btnEqualEl = document.querySelector(".btn--equal");
const btnResetEl = document.querySelector(".btn--reset");
const commaBtnEl = document.getElementById(".");
const valueHolderEl = document.querySelector("#valueHolder");
let clickedNumber = [];
let holdNumber = [null, null];

const calculator = {
    result: undefined,
    "+": function () {
        this.result = this.subject + this.object;
    },
    "-": function () {
        this.result = this.subject - this.object;
    },
    "*": function () {
        this.result = this.subject * this.object;
    },
    "/": function () {
        this.result = this.subject / this.object;
    }
};

// Variables for Themes Purposes
let selectedTheme = "dark--theme";
let whichRadioActive;

// Function to Change Calculator's Theme
function changeTheme() {
    const bodyEl = document.body;
    bodyEl.classList.remove(selectedTheme);

    for (const radio of themeRadiosElList) {
        if (radio.checked) whichRadioActive = radio;
    }

    switch (whichRadioActive.id) {
        case "1":
            selectedTheme = "dark--theme";
            break;
        case "2":
            selectedTheme = "light--theme";
            break;
        case "3":
            selectedTheme = "purplish--theme";
            break;
    };
    bodyEl.classList.add(selectedTheme);
};

for (const radio of themeRadiosElList) {
    radio.addEventListener("click", changeTheme);
};

// Function to Display Number on Calculator's Monitor
function displayNumber(e) {
    const number = e.target.id;
    for (const btn of btnOperationEl) btn.disabled = false;
    btnEqualEl.disabled = false;

    if (number === ".") {
        if (clickedNumber.length === 0) clickedNumber.push("0", number);
        else clickedNumber.push(number);
        commaBtnEl.disabled = true;
    } else clickedNumber.push(number);

    calculator.object = Number(clickedNumber.join(""));
    monitorEl.value = clickedNumber.join("");

    if (calculator.subject !== undefined && calculator.operation && calculator.object !== undefined) {
        calculator[calculator.operation]();
    }
};

for (const btn of btnNumberEl) {
    btn.addEventListener("click", displayNumber);
};

//Function to Display Operation on Calculator's Monitor
function calculatorOperation(e) {
    const operationSign = e.target.id;
    calculator.operation = operationSign;
    for (const btn of btnNumberEl) btn.disabled = false;

    commaBtnEl.disabled = false;
    btnDelEl.disabled = false;

    if (calculator.object === undefined) {
        holdNumber[holdNumber.length - 1] = operationSign;
    } else {
        calculator.subject = Number(calculator.object);
        if (holdNumber[0] === null) {
            holdNumber[0] = calculator.subject;
        } else {
            holdNumber[0] = Math.round(calculator.result * 1000) / 1000;
            calculator.subject = calculator.result;
        }
        holdNumber[1] = calculator.operation;
        delete calculator.object;
    }

    clickedNumber = [];

    valueHolderEl.textContent = holdNumber.join("");
    monitorEl.value = clickedNumber.join("");
}

for (const btn of btnOperationEl) {
    btn.addEventListener("click", calculatorOperation);
}

// Function to Delete Numbers
function delNumber() {
    clickedNumber.pop();
    if (clickedNumber.length > 0) {
        calculator.object = Number(clickedNumber.join(""));
    }
    else delete calculator.object;

    if (calculator.subject !== undefined && calculator.operation && calculator.object !== undefined) {
        calculator[calculator.operation]();
    }
    monitorEl.value = clickedNumber.join("");
}
btnDelEl.addEventListener("click", delNumber);

// Equal Function
function equals() {
    valueHolderEl.textContent = "";
    for (const btn of btnNumberEl) btn.disabled = true;
    btnDelEl.disabled = true;

    clickedNumber = [calculator.result || calculator.object || calculator.subject];

    monitorEl.value = clickedNumber.join("");
};

btnEqualEl.addEventListener("click", equals);

// Function to reset calculator
function resetCalculator() {
    calculator.result = undefined;
    valueHolderEl.textContent = "";
    monitorEl.value = "";
    holdNumber = [null, null];
    clickedNumber = [];
    delete calculator.subject;
    delete calculator.object;
    delete calculator.operation;
    for (const btn of btnNumberEl) btn.disabled = false;
    for (const btn of btnOperationEl) btn.disabled = true;
    btnDelEl.disabled = false;
};

btnResetEl.addEventListener("click", resetCalculator);

