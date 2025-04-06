const axios = require('axios');
const express = require('express');
const path = require('path');
const cors = require('cors');

const porta = process.env.PORT || 7000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, "pages", "index.html"));
})

app.post("/proxy", async (req, res) => {
  try {
    const { url, method, headers, body } = req.body;
    const response = await axios({ url, method, headers, data: body || null });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).send(error.response?.data || error.message);
  }
});

/*
app.listen(porta, ()=>{
  console.log(`Servidor rodando na porta http://localhost:${porta}`)
})*/
module.exports = app;
