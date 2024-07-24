import express from "express";
const app = express();
import crudRoutes from "./routes/Crud"
import connectToMongo from "./db";
import cors from 'cors'
const PORT = 2000;
connectToMongo()

app.use(cors());

app.use(express.json());


app.use("/api",crudRoutes);

app.listen(PORT, () => {
  console.log("----connected with express server on PORT  http://localhost:" + PORT);
});