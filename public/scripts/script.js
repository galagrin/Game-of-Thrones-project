// const tbody = document.querySelector("tbody");

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

// // создание строки для таблицы
// function row(character) {
//     const tr = document.createElement("tr");
//     tr.setAttribute("data-rowid", character.id);

//     const idTd = document.createElement("td");
//     idTd.append(character.id);
//     tr.append(idTd);

//     const nameTd = document.createElement("td");
//     nameTd.append(character.name);
//     tr.append(nameTd);

//     const titleTd = document.createElement("td");
//     titleTd.append(character.title);
//     tr.append(titleTd);

//     const causeOfDeathTd = document.createElement("td");
//     causeOfDeathTd.append(character.causeOfDeath);
//     tr.append(causeOfDeathTd);

//     const placeOfDeathTd = document.createElement("td");
//     placeOfDeathTd.append(character.placeOfDeath);
//     tr.append(placeOfDeathTd);

//     const photoTd = document.createElement("td");
//     const img = document.createElement("img");
//     img.setAttribute("src", character.photo);
//     img.setAttribute("class", "photo");
//     photoTd.append(img);
//     tr.append(photoTd);

//     return tr;
// }

// // Функция для поиска персонажа по id
// function searchCharacter() {
//     const input = document.getElementById("characterIdInput").value;
//     if (input) {
//         GetCharacter(input);
//     }
// }





// ПОИСК

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

let names = []

fetch("http://localhost:3000/api/characters")
  .then(res => res.json())
  .then(characters => {
    characters.forEach(character => {
        names.push(character.name);
    })
  })

autocomplete(document.getElementById("myInput"), names);

const cardContainer = document.getElementById('card-container');
const searchButton = document.getElementById('search');

const renderCard = () => {
    fetch("http://localhost:3000/api/characters")
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            cardContainer.textContent = 'Не удалось отобразить информацию: ' + response.status;
            return Promise.reject(response.status);
        }
    })
    .then(characters => {
    characters.forEach(character => {
        if (myInput.value === character.name) {
            cardContainer.innerHTML = `<div class="card">
                    <h2>${character.name}</h2>
                    <img class="character-pic" src="${character.photo}" alt="">
                    <p>Титул: ${character.title}</p>
                    <p>Причина смерти: ${character.causeOfDeath}</p>
                    <p>Место смерти: ${character.placeOfDeath}</p>
                </div>`
        }
    })
    })
    .catch((error) => {
        cardContainer.textContent = 'Не удалось отобразить информацию: ' + error.message;
    })
}

searchButton.addEventListener('click', renderCard);
myInput.addEventListener('focus', () => {
    if (myInput.value.length !== 0) {
            myInput.value = "";
    }
})

// ПОИСК