const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

const dataFilePath = path.join(__dirname, "data.json");

// Функция для загрузки данных из файла
function loadData() {
    if (fs.existsSync(dataFilePath)) {
        const rawData = fs.readFileSync(dataFilePath);
        return JSON.parse(rawData);
    }
    return [];
}

// Загрузка данных при старте сервера
let characters = loadData();

// вспомогательная функция для поиска индекса персонажа по id
function findCharacterIndexById(id) {
    for (let i = 0; i < characters.length; i++) {
        if (characters[i].id == id) return i;
    }
    return -1;
}

app.get("/api/characters", function (_, res) {
    res.send(characters);
});

// получение одного персонажа по id
app.get("/api/characters/:id", function (req, res) {
    const id = req.params.id;
    const index = findCharacterIndexById(id);
    if (index > -1) {
        res.send(characters[index]);
    } else {
        res.status(404).send("Character not found");
    }
});

app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
});
