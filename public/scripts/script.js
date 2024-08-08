 const tbody = document.querySelector("tbody");

            // Получение всех персонажей
            async function GetCharacters() {
                // отправляет запрос и получаем ответ
                const response = await fetch(
                    "http://localhost:3000/api/characters",
                    {
                        method: "GET",
                        headers: { Accept: "application/json" },
                    }
                );
                // если запрос прошел нормально
                if (response.ok === true) {
                    // получаем данные
                    const characters = await response.json();
                    // создаем кнопки для каждого персонажа
                    characters.forEach((character) => {
                        document
                            .querySelector(`button[data-id='${character.id}']`)
                            .addEventListener("click", () => {
                                GetCharacter(character.id);
                            });
                    });
                }
            }

            // Получение одного персонажа по id
            async function GetCharacter(id) {
                const response = await fetch(
                    `http://localhost:3000/api/characters/${id}`,
                    {
                        method: "GET",
                        headers: { Accept: "application/json" },
                    }
                );
                if (response.ok === true) {
                    const character = await response.json();
                    // очищаем таблицу
                    tbody.innerHTML = "";
                    // добавляем полученный персонаж в таблицу
                    tbody.append(row(character));
                }
            }

            // создание строки для таблицы
            function row(character) {
                const tr = document.createElement("tr");
                tr.setAttribute("data-rowid", character.id);

                const idTd = document.createElement("td");
                idTd.append(character.id);
                tr.append(idTd);

                const nameTd = document.createElement("td");
                nameTd.append(character.name);
                tr.append(nameTd);

                const titleTd = document.createElement("td");
                titleTd.append(character.title);
                tr.append(titleTd);

                const causeOfDeathTd = document.createElement("td");
                causeOfDeathTd.append(character.causeOfDeath);
                tr.append(causeOfDeathTd);

                const placeOfDeathTd = document.createElement("td");
                placeOfDeathTd.append(character.placeOfDeath);
                tr.append(placeOfDeathTd);

                const photoTd = document.createElement("td");
                const img = document.createElement("img");
                img.setAttribute("src", character.photo);
                img.setAttribute("class", "photo");
                photoTd.append(img);
                tr.append(photoTd);

                return tr;
            }

            // Функция для поиска персонажа по id
            function searchCharacter() {
                const input = document.getElementById("characterIdInput").value;
                if (input) {
                    GetCharacter(input);
                }
            }

            // Назначаем обработчик для кнопки поиска
            document
                .getElementById("searchBtn")
                .addEventListener("click", searchCharacter);

            // загрузка персонажей при загрузке страницы
            GetCharacters();