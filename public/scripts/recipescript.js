// получаем url страницы
const currentURL = window.location.href;

// Получаем элементы 
const ratingStars = document.querySelectorAll('.rating-star');
const output = document.getElementById("output");

// Изначальный рейтинг
let currentRating = 0;

// Восстанавливаем рейтинг из localStorage при загрузке страницы
window.addEventListener('load', () => {
    const savedRating = localStorage.getItem(`rating-${currentURL}`);
    if (savedRating) {
        currentRating = parseInt(savedRating);
        updateStarRating(currentRating);

    const savedOutputTextString = window.localStorage.getItem(`innerText-${currentURL}`);
    if(savedOutputTextString) {
        let savedOutputText = JSON.parse(savedOutputTextString);
        output.innerText = savedOutputText;
    }
    }
});

// Добавляем обработчик клика на звёздочки
ratingStars.forEach((star, index) => {
    star.addEventListener('click', () => {
        currentRating = index + 1;
        updateStarRating(currentRating);
        localStorage.setItem(`rating-${currentURL}`, currentRating);

        const outputText = `Ваша оценка: ${index + 1}  /5`;
        output.innerText = outputText;
        localStorage.setItem(`innerText-${currentURL}`, JSON.stringify(outputText));
    });
});

// Функция для обновления отображения рейтинга
function updateStarRating(rating) {
    ratingStars.forEach((star, index) => {
        if (index < rating) {
        star.classList.add('active');
    } else {
        star.classList.remove('active');
    }
});
}
