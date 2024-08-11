// ПОИСК

function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

let names = [];

fetch("http://localhost:3000/api/characters")
  .then((res) => res.json())
  .then((characters) => {
    characters.forEach((character) => {
      names.push(character.name);
    });
  });

autocomplete(document.getElementById("myInput"), names);

const cardContainer = document.getElementById("card-container");
const loader = document.getElementById("loading");
const searchButton = document.getElementById("search");

const renderCard = () => {
  loader.classList.add("display");
  fetch("http://localhost:3000/api/characters")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        cardContainer.textContent =
          "Не удалось отобразить информацию: " + response.status;
        return Promise.reject(response.status);
      }
    })
    .then((characters) => {
      const character = characters.find((c) => c.name === myInput.value);
      if (character) {
        //Set the background image of the card container
        cardContainer.style.backgroundImage = `url(${character.photo})`;
        cardContainer.style.backgroundSize = "cover";
        cardContainer.style.backgroundPosition = "center";
        cardContainer.style.backgroundRepeat = "no-repeat";

        //Create and display the card details
        cardContainer.innerHTML = `<div class="card">
        <h2>${character.name}</h2>
		<div class="character-details">
        <p>Титул: ${character.title}</p>
        <p>Причина смерти: ${character.causeOfDeath}</p>
        <p>Место смерти: ${character.placeOfDeath}</p>
		</div>
        </div>`;
      } else {
        cardContainer.innerHTML = `<p>Персонаж не найден</p>`;
        cardContainer.style.backgroundImage =
          "url('/public/images/iron-throne.jpg')";
        cardContainer.style.backgroundPosition = "top center";
      }
      loader.classList.remove("display");
    })
    .catch((error) => {
      loader.classList.remove("display");
      cardContainer.textContent =
        "Не удалось отобразить информацию: " + error.message;
    });
};

searchButton.addEventListener("click", renderCard);
myInput.addEventListener("focus", () => {
  if (myInput.value.length !== 0) {
    myInput.value = "";
  }
});

// ПОИСК

// ЦИТАТЫ
const quotes = [
  {
    text: "Начнем убивать мужчин на свадьбах — и они будут бояться брака еще больше, чем прежде.",
    author: "Оленна Тирелл (Буря мечей)",
  },
  {
    text: "Мир — это не просто место, где мы живем. Это место, где мы сражаемся, за что стоит бороться.",
    author: "Дейенерис Таргариен (Танец драконов)",
  },
  {
    text: "Когда люди говорят о справедливости, они часто подразумевают месть.",
    author: "Джон Сноу (Ветра зимы)",
  },
  {
    text: "Время никогда не ждет. Оно ускользает, пока мы тратим его на мелочи.",
    author: "Серсея Ланнистер (Пиршество воробья)",
  },
  {
    text: "Каждый человек выбирает свою судьбу. Ты сам выбираешь, как будешь жить свою жизнь.",
    author: "Арья Старк (Становление героем)",
  },
  {
    text: "Смелость — это не отсутствие страха, а умение идти вперед, несмотря на него.",
    author: "Бриенна Тарт (Пляска с драконами)",
  },
  {
    text: "Я не могу быть нормальным человеком, когда вокруг меня так много глупцов.",
    author: "Тирион Ланнистер (Буря мечей)",
  },
  {
    text: "Когда все кажется разрушенным, помни, что есть еще один путь. Вперёд, а не назад.",
    author: "Санса Старк (Ветра зимы)",
  },
  {
    text: "Лучше умереть на поле боя, чем остаться в тени за спиной другого.",
    author: "Джорах Мормонт (Танец драконов)",
  },
];

function displayQuote() {
  const quoteContainer = document.getElementById("quote-container");
  quoteContainer.innerHTML = "";

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const quoteItem = document.createElement("div");
  quoteItem.className = "quote-item";

  const quoteText = document.createElement("p");
  quoteText.className = "quote-text";
  quoteText.textContent = `"${randomQuote.text}"`;
  quoteItem.appendChild(quoteText);

  const quoteAuthor = document.createElement("p");
  quoteAuthor.className = "quote-author";
  quoteAuthor.textContent = `— ${randomQuote.author}`;
  quoteItem.appendChild(quoteAuthor);

  quoteContainer.appendChild(quoteItem);
}

document.addEventListener("DOMContentLoaded", () => {
  displayQuote();
  setInterval(displayQuote, 30000); // сейчас таймаут 30 сек
});

// ЦИТАТЫ

// // Получение всех персонажей
// async function GetCharacters() {
//     // отправляет запрос и получаем ответ
//     const response = await fetch("http://localhost:3000/api/characters",
//         {
//             method: "GET",
//             headers: { Accept: "application/json" },
//         }
//         );
//     // если запрос прошел нормально
//     if (response.ok === true) {
//         // получаем данные
//         const characters = await response.json();
//         // создаем кнопки для каждого персонажа
//         characters.forEach((character) => {
//             document.querySelector(`button[data-id='${character.id}']`).addEventListener("click", () => {
//                 GetCharacter(character.id);
//             });
//         });
//     }
// }

// // Получение одного персонажа по id
// async function GetCharacter(id) {
//     const response = await fetch(`http://localhost:3000/api/characters/${id}`,
//         {
//             method: "GET",
//             headers: { Accept: "application/json" },
//         }
//         );
//     if (response.ok === true) {
//         const character = await response.json();
//         // очищаем таблицу
//         tbody.innerHTML = "";
//         // добавляем полученный персонаж в таблицу
//         tbody.append(row(character));
//     }
// }

// // Функция для поиска персонажа по id
// function searchCharacter() {
//     const input = document.getElementById("characterIdInput").value;
//     if (input) {
//         GetCharacter(input);
//     }
// }
