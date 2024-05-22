import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { connect } from "./service/database"

import upsideDownRoutes from './routes/upsideDownRoutes';

import swaggerUi from "swagger-ui-express";

import cors from "cors"

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const databaseUrl = process.env.DATABASE_URL || ""

connect(databaseUrl)

	
// aceitar requisições desse endereço
const corsOptions = { 
  origin : ['http://localhost:3000'], 
} 
 
app.use(cors(corsOptions)) 


app.use(express.json());
app.use(express.static("public"));
app.use(
    "/swagger", // endereço de onde o swagger responde
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
  );


app.use('/api/upsideDown', upsideDownRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Upside Down Backend');
});

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})