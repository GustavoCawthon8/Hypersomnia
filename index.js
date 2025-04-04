import express from 'express';
import chalk from 'chalk';
import axios from 'axios';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';

const porta = process.env.PORT || 7000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(express.static("public"));
app.post("/proxy", async (req, res) => {
  try {
    const { url, method, headers, body } = req.body;
    const response = await axios({ url, method, headers, data: body || null });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).send(error.response?.data || error.message);
  }
});

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, "public", "index.html"));
})

app.listen(porta, ()=>{
  console.log(chalk.bgGreen(`Servidor rodando na porta http://localhost:${porta}`))
})