const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const taskRoutes = require("./routes/TaskRoutes");

const app = express();

app.use(morgan("tiny")); // Log HTTP requests no terminal

app.use(cors()); // Habilita CORS para permitir requisições de outros domínios

app.use(helmet()); // Adiciona cabeçalhos de segurança

app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

app.use("", taskRoutes);

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send(error.message);
});

module.exports = app;
