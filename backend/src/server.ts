import dotenv from "dotenv";
import app from "./app.js";

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const PORT : number = Number(process.env.PORT) || 3000; // Define a porta a partir da variável de ambiente ou usa 3000 como padrão

app.listen(PORT, () => { // Inicia o servidor e escuta na porta definida
    console.log(`Servidor rodando na porta ${PORT}`);
});

