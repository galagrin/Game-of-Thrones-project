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

  //Set the initial background image
  cardContainer.style.backgroundImage = "url('/public/images/iron-throne.jpg')";
  cardContainer.style.backgroundSize = "cover";
  cardContainer.style.backgroundPosition = "center center";
  cardContainer.style.backgroundRepeat = "no-repeat";

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
        //Update background image and properties for found character
        const characterPhoto = character.photo
          ? `url(${character.photo})`
          : "url('/public/images/iron-throne.jpg')";
        cardContainer.style.backgroundImage = characterPhoto;
        cardContainer.style.backgroundSize = "cover";
        cardContainer.style.backgroundPosition = "top center";
        cardContainer.style.backgroundRepeat = "no-repeat";

        //Split the name into first and last name
        const [firstName, lastName] = (character.name || "").split(" ");

        //Handle undefined
        const lastNameToDisplay = lastName !== undefined ? lastName : "";

        //Create and display the card details
        cardContainer.innerHTML = `<div class="card">
        <h2><span class="first-name">${
          firstName || ""
        }</span><span class="last-name">${lastNameToDisplay}</span></h2>
		    <div class="character-details">
        <p><span class="label">Титул:</span><span class="value">${
          character.title || ""
        }</span></p>
        <p><span class="label">Причина смерти:</span><span class="value">${
          character.causeOfDeath || ""
        }</span></p>
        <p><span class="label">Место смерти:</span><span class="value">${
          character.placeOfDeath || ""
        }</span></p>
		</div>
        </div>`;
      } else {
        //If no character is found , set the background image to a different one
        cardContainer.innerHTML = `
        <div class="character-not-found-container">
        <p class="character-not-found">"Что мертво, умереть не может"</p>
        </div>`;
        cardContainer.style.backgroundImage = "url('/public/images/crown.jpg')";
        cardContainer.style.backgroundSize = "cover";
        cardContainer.style.backgroundPosition = "center center";
        cardContainer.style.backgroundRepeat = "no-repeat";
      }
    })
    .catch((error) => {
      cardContainer.textContent = "Не удалось отобразить информацию: " + error;
    })
    .finally(() => {
      loader.classList.remove("display");
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

// Слайдер
new Swiper(".slider", {
  slidesPerView: 1,
  // loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  centeredSlides: true,

  freeMode: true,
  speed: 2400,
  parallax: true,
  spaceBetween: 10,
  mousewheel: {
    enabled: true,
    sensitivity: 2.4,
  },
});

// ЗВУК

const sound = document.getElementById("sound");
const soundButton = document.getElementById("soundButton");

async function playMusic() {
  try {
    await sound.play();
    sound.volume = 0.1;
    soundButton.classList.remove("off");
  } catch (err) {
    soundButton.classList.add("off");
  }
}

function handlePlayButton() {
  if (sound.paused) {
    playMusic();
  } else {
    sound.pause();
    soundButton.classList.add("off");
  }
}

soundButton.addEventListener("click", handlePlayButton, false);
playMusic();

// Snow effect
let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };

const last = {
  starTimestamp: start,
  starPosition: originPosition,
  mousePosition: originPosition,
};

const config = {
  starAnimationDuration: 1500,
  minimumTimeBetweenStars: 250,
  minimumDistanceBetweenStars: 75,
  glowDuration: 75,
  maximumGlowPointSpacing: 10,
  colors: ["249 146 253", "252 254 255"],
  sizes: ["1.4rem", "1rem", "0.6rem"],
  animations: ["fall-1", "fall-2", "fall-3"],
};

let count = 0;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  selectRandom = (items) => items[rand(0, items.length - 1)];

const withUnit = (value, unit) => `${value}${unit}`,
  px = (value) => withUnit(value, "px"),
  ms = (value) => withUnit(value, "ms");

const calcDistance = (a, b) => {
  const diffX = b.x - a.x,
    diffY = b.y - a.y;

  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
};

const calcElapsedTime = (start, end) => end - start;

const appendElement = (element) => document.body.appendChild(element),
  removeElement = (element, delay) =>
    setTimeout(() => document.body.removeChild(element), delay);

const createStar = (position) => {
  const star = document.createElement("span"),
    color = selectRandom(config.colors);

  star.className = "star fa-solid fa-snowflake";

  star.style.left = px(position.x);
  star.style.top = px(position.y);
  star.style.fontSize = selectRandom(config.sizes);
  star.style.color = `rgb(${color})`;
  star.style.color = "rgb(169, 169, 169)";
  star.style.textShadow = `0px 0px 1.5rem rgb(169, 169, 169 / 0.5)`;

  star.style.animationName = config.animations[count++ % 3];
  star.style.starAnimationDuration = ms(config.starAnimationDuration);

  appendElement(star);

  removeElement(star, config.starAnimationDuration);
};

const createGlowPoint = (position) => {
  const glow = document.createElement("div");

  glow.className = "glow-point";

  glow.style.left = px(position.x);
  glow.style.top = px(position.y);

  appendElement(glow);

  removeElement(glow, config.glowDuration);
};

const determinePointQuantity = (distance) =>
  Math.max(Math.floor(distance / config.maximumGlowPointSpacing), 1);

const createGlow = (last, current) => {
  const distance = calcDistance(last, current),
    quantity = determinePointQuantity(distance);

  const dx = (current.x - last.x) / quantity,
    dy = (current.y - last.y) / quantity;

  Array.from(Array(quantity)).forEach((_, index) => {
    const x = last.x + dx * index,
      y = last.y + dy * index;

    createGlowPoint({ x, y });
  });
};

const updateLastStar = (position) => {
  last.starTimestamp = new Date().getTime();

  last.starPosition = position;
};

const updateLastMousePosition = (position) => (last.mousePosition = position);

const adjustLastMousePosition = (position) => {
  if (last.mousePosition.x === 0 && last.mousePosition.y === 0) {
    last.mousePosition = position;
  }
};

const handleOnMove = (e) => {
  const mousePosition = { x: e.clientX, y: e.clientY };

  adjustLastMousePosition(mousePosition);

  const now = new Date().getTime(),
    hasMovedFarEnough =
      calcDistance(last.starPosition, mousePosition) >=
      config.minimumDistanceBetweenStars,
    hasBeenLongEnough =
      calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;

  if (hasMovedFarEnough || hasBeenLongEnough) {
    createStar(mousePosition);

    updateLastStar(mousePosition);
  }

  createGlow(last.mousePosition, mousePosition);

  updateLastMousePosition(mousePosition);
};

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);

document.body.onmouseleave = () => updateLastMousePosition(originPosition);


// КАРТА

const map = document.getElementById('map');

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    map.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

map.addEventListener('click', toggleFullScreen);