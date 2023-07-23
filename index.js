const themeRadiosElList = document.querySelectorAll("input[type='radio']");
let selectedTheme = "dark--theme";
let whichRadioActive;

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
}

for (const radio of themeRadiosElList) {
    radio.addEventListener("click", changeTheme);
};