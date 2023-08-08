// Variables of Targeted Elements
const themeRadiosElList = document.querySelectorAll("input[type='radio']");
const monitorEl = document.querySelector("#calculator__monitor");
const btnNumberEl = document.querySelectorAll(".btn--number");
const clickedNumber = [];

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
    monitorEl.value = clickedNumber.join("");
};

for (const btn of btnNumberEl) {
    btn.addEventListener("click", displayNumber);
};