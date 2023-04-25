import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDatabase } from './db/services/database.service';
import route from "./db/route/route"

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

connectToDatabase()

app.use(route);

app.listen(port, () => console.info(`tracker-organization-service is running`));


export default { app }
