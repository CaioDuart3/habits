import express, {type Request, type Response, type NextFunction} from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import taskRoutes from "./routes/TaskRoutes.js"
const app = express();

app.use(morgan("tiny")); // Log HTTP requests no terminal

app.use(cors()); // Habilita CORS para permitir requisições de outros domínios

app.use(helmet()); // Adiciona cabeçalhos de segurança

app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

app.use("", taskRoutes)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(500).send(error.message);
});

export default app;