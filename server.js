import express from "express";
import routes from "./routes.js";
import morgan from "morgan";
import helmet from "helmet";
import cors from 'cors';
import dotenv from "dotenv/config.js";
import db from './db.js';

const app = express();

app.use(morgan('tiny'));
 
app.use(cors());
 
app.use(helmet());

app.use(express.json());
app.use(routes);

db.sync();

app.listen(process.env.PORT, () => console.log(`Servidor iniciado na porta ${process.env.PORT}`));