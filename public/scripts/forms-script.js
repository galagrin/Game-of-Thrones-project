const enterButton = document.getElementById("enter");
const dialog = document.querySelector("dialog");
const closeButtons = document.querySelector(".exit-form__button-close");
const registerButton = document.querySelector(".registration-form__button-registration");
const inputCheckbox = document.querySelector(".registration-form__checkbox");
const formRegister = document.querySelector(".registration-form");
const formLogin = document.querySelector(".login-form");


inputCheckbox.addEventListener("change", function () {
    if (inputCheckbox.checked) {
        registerButton.disabled = false;
    } else {
        registerButton.disabled = true;
    };
});


const loginButton = document.querySelector("#login-button");
const registrationButton = document.querySelector("#register-button");

//переключение форм
function toggleForms() {
    const registerForm = document.querySelector(".registration-form");
    const loginForm = document.querySelector(".login-form");
    registerForm.classList.toggle("hidden");
    loginForm.classList.toggle("hidden");
    registrationButton.setAttribute('aria-pressed', registrationButton.getAttribute('aria-pressed') === 'false');
    loginButton.setAttribute('aria-pressed', loginButton.getAttribute('aria-pressed') === 'false');
}

registrationButton.addEventListener("click", function () {
    toggleForms();
});

loginButton.addEventListener("click", function () {
    toggleForms();
});

//валидация формы регистрации
//валидация имени
const errorMessageName = document.getElementById("errorMessage-name");
const nameInput = document.getElementById("username");
const nameRegex = /^[A-Za-z]+$/;

function validateNameInput() {
    const inputValue = nameInput.value.trim();
    nameInput.classList.toggle('invalid', false);

    if (inputValue === '') {
        errorMessageName.textContent = "Заполните имя*";
        nameInput.classList.toggle('invalid', true);
        return false;
    }

    if (!nameRegex.test(nameInput.value.trim())) {
        errorMessageName.textContent = 'Имя может содержать только буквы*';
        nameInput.classList.toggle('invalid', true);
        return false;
    }

    if (inputValue.length < 2) {
        errorMessageName.textContent = "Имя не может быть меньше двух букв*";
        nameInput.classList.toggle('invalid', true);
        return false;
    }

    return true;
}

nameInput.addEventListener("blur", validateNameInput);

nameInput.addEventListener('focus', function () {
    errorMessageName.textContent = '';
});

//валидация почты
const emailInput = document.getElementById("email");
const errorMessageEmail = document.getElementById('errorMessage-email');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
emailInput.classList.toggle('invalid', false);

emailInput.addEventListener('input', function () {
    errorMessageEmail.textContent = '';
    emailInput.classList.remove('error');
});

function validateEmailInput() {
    const emailValue = emailInput.value.trim();

    if (!emailValue) {
        errorMessageEmail.textContent = 'Введите почту*';
        emailInput.classList.add('error');
        emailInput.classList.toggle('invalid', true);
        return false;
    }

    if (emailRegex.test(emailValue)) {
        emailInput.classList.remove('error');
        errorMessageEmail.textContent = '';
        return true;
    } else {
        emailInput.classList.add('error');
        errorMessageEmail.textContent = 'Некорректный email*';
        emailInput.classList.toggle('invalid', true);
        return false;
    }
}

emailInput.addEventListener('blur', validateEmailInput);

emailInput.addEventListener('focus', function () {
    errorMessageEmail.textContent = '';
});

const password = document.getElementById("password");
const errorMessagePassword = document.getElementById("errorMessage-password");
password.classList.toggle('invalid', false);

function validatePassword() {
    const passwordValue = password.value.trim()
    if (!passwordValue) {
        errorMessagePassword.textContent = "Некорректный пароль*";
        password.classList.toggle('invalid', true);
        return false;
    };

    if (passwordValue.length >= 3) {
        errorMessagePassword.textContent = "";
        return true;
    } else {
        errorMessagePassword.textContent = "Пароль должен быть не менее 3 символов*";
        password.classList.toggle('invalid', true);
        return false;
    };
}

password.addEventListener("blur", validatePassword);

password.addEventListener('focus', function () {
    errorMessagePassword.textContent = '';
});


//отмена стандартного поведения формы входа
formLogin.addEventListener("submit", function (evt) {
    evt.preventDefault();
    formLogin.reset();
});

//модальное окно
enterButton.addEventListener("click", function () {
    dialog.showModal();
    nameInput.value = '';
    errorMessageName.textContent = '';
    emailInput.value = '';
    errorMessageEmail.textContent = '';
    password.value = '';
    errorMessagePassword.textContent = '';

    nameInputLogin.value = '';
    errorMessageNameLogin.textContent = '';
    passwordLogin.value = '';
    errorMessagePasswordLogin.textContent = '';


    nameInput.classList.toggle('invalid', false);
    emailInput.classList.toggle('invalid', false);
    password.classList.toggle('invalid', false);
    nameInputLogin.classList.toggle('invalid', false);
    passwordLogin.classList.toggle('invalid', false);

    formLogin.reset();
    formRegister.reset();
});

//валидация формы входа 
//валидация имени
const errorMessageNameLogin = document.getElementById("errorMessage-name_login");
const nameInputLogin = document.getElementById("username_login");
nameInputLogin.classList.toggle('invalid', false);

function validateNameInputLogin() {
    if (nameInputLogin.value.trim() === '') {
        errorMessageNameLogin.textContent = "Заполните имя*";
        nameInputLogin.classList.toggle('invalid', true);
        return false;
    };

    if (nameInputLogin.value.length < 2) {
        errorMessageNameLogin.textContent = "Некорректное имя*";
        nameInputLogin.classList.toggle('invalid', true);
        return false;
    }

    return true;
}

nameInputLogin.addEventListener("blur", validateNameInputLogin);

//валидация пароля 
const passwordLogin = document.getElementById("password_login");
const errorMessagePasswordLogin = document.getElementById("errorMessage-password_login");
passwordLogin.classList.toggle('invalid', false);

function validatePasswordLogin() {
    const passwordString = passwordLogin.value.trim()
    if (!passwordString) {
        errorMessagePasswordLogin.textContent = "Заполните пароль*";
        passwordLogin.classList.toggle('invalid', true);
        return false;
    };

    if (passwordString.length >= 3) {
        errorMessagePasswordLogin.textContent = "";
        return true;
    } else {
        errorMessagePasswordLogin.textContent = "Некорректный пароль*";
        passwordLogin.classList.toggle('invalid', true);
        return false;
    };
}

passwordLogin.addEventListener("blur", validatePasswordLogin);

nameInputLogin.addEventListener('focus', function () {
    errorMessageNameLogin.textContent = '';
});

//валидация всей формы
formRegister.addEventListener("submit", function (event) {
    event.preventDefault()
    const isNameValid = validateNameInput();
    const isPasswordValid = validatePassword();
    const isEmailValid = validateEmailInput();

    if (!isNameValid) {
        errorMessageName.textContent = "Некорректное имя*";
    };

    if (!isEmailValid) {
        errorMessageEmail.textContent = 'Некорректный Email*';
    }

    if (!isPasswordValid) {
        errorMessagePassword.textContent = 'Некорректный пароль*';
    }

    if (!isNameValid || !isEmailValid || !isPasswordValid) {
        return;
    } else {
        toggleForms();
        formRegister.reset()
        dialog.close()
    }
});

passwordLogin.addEventListener('focus', function () {
    errorMessagePasswordLogin.textContent = '';
});