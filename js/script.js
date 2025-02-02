// Nossos elementos capturados do HTML por DOM
const inputElement = document.querySelector("#password");
const upperCaseCheckElement = document.querySelector("#uppercase-check");
const numberCheckElement = document.querySelector("#number-check");
const symbolCheckElement = document.querySelector("#symbol-check");
const securityIndicatorBarElement = document.querySelector("#security-indicator-bar");

let passwordLength = 16;        // Tamanho inicial da senha (definimos no HTML também como padrão o valor 16)

// Função para gerar a senha aleatória
function generatePassword() {
    let chars = "abcdefghijklmnopqrstuvwxyz";

    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbeChars = "0123456789";
    const symbolChars = "!?@#$%&*()[]{}/";

    if (upperCaseCheckElement.checked) {
        chars += upperCaseChars;
    }

    if (numberCheckElement.checked) {
        chars += numbeChars;
    }

    if (symbolCheckElement.checked) {
        chars += symbolChars;
    }

    let password = "";

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }

    inputElement.value = password;

    calculateQuality();
    calculateFontSize();
}

// Função para calcular a qualidade da senha e alterar a barra indicadora de segurança
function calculateQuality() {
    // 20% -> crítico | 100% -> safe
    // T*0.35 + M*0.15 + N*0.25 + S*0.25 = 100

    const percent = Math.round((passwordLength / 64) * 35 +
        (upperCaseCheckElement.checked ? 15 : 0)) +
        (numberCheckElement.checked ? 25 : 0) +
        (symbolCheckElement.checked ? 25 : 0);

    securityIndicatorBarElement.style.width = `${percent}%`

    if (percent > 69) {
        securityIndicatorBarElement.classList.remove("critical");
        securityIndicatorBarElement.classList.remove("warning");
        securityIndicatorBarElement.classList.add("safe");
    } else if (percent > 50) {
        securityIndicatorBarElement.classList.remove("critical");
        securityIndicatorBarElement.classList.add("warning");
        securityIndicatorBarElement.classList.remove("safe");
    } else {
        securityIndicatorBarElement.classList.add("critical");
        securityIndicatorBarElement.classList.remove("warning");
        securityIndicatorBarElement.classList.remove("safe");
    }

    if (percent >= 100) {
        securityIndicatorBarElement.classList.add("completed");
    } else {
        securityIndicatorBarElement.classList.remove("completed");
    }
}

// Função para calcular o tamanho da fonte da senha
function calculateFontSize() {
    if (passwordLength > 45) {
        inputElement.classList.remove("font-sm");
        inputElement.classList.remove("font-xs");
        inputElement.classList.add("font-xxs");
    } else if (passwordLength > 32) {
        inputElement.classList.remove("font-sm");
        inputElement.classList.add("font-xs");
        inputElement.classList.remove("font-xxs");
    } else if (passwordLength > 22) {
        inputElement.classList.add("font-sm");
        inputElement.classList.remove("font-xs");
        inputElement.classList.remove("font-xxs");
    } else {
        inputElement.classList.remove("font-sm");
        inputElement.classList.remove("font-xs");
        inputElement.classList.remove("font-xxs");
    }
}

// Função para copiar a senha
function copyPassword(event) {
    navigator.clipboard.writeText(inputElement.value);

    let button = event.currentTarget;
    let message = button.querySelector(".copy-message");

    message.classList.add("show");

    setTimeout(() => {
        message.classList.remove("show");
    }, 2000);
}

const passwordLenghtElement = document.querySelector("#password-length");

passwordLenghtElement.addEventListener("input", () => {
    passwordLength = passwordLenghtElement.value;
    document.querySelector("#password-length-text").textContent = passwordLength;
    generatePassword();
})

upperCaseCheckElement.addEventListener("click", generatePassword)
numberCheckElement.addEventListener("click", generatePassword)
symbolCheckElement.addEventListener("click", generatePassword)

document.querySelector("#copy1").addEventListener("click", copyPassword);
document.querySelector("#copy2").addEventListener("click", copyPassword);
document.querySelector("#renew").addEventListener("click", generatePassword);

generatePassword();