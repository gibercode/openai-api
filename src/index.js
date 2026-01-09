const express = require("express");
const cors = require("cors");
const app = express();
const port = 5001;
require("dotenv").config();

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
app.use(express.json());


app.post("/", async (req, res) => {
  const { prompt } = req.body;
  try {
    res.send({ data: 'hello world!' });
  } catch (err) {
    res.status(500).send({ err, prompt });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
