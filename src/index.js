const express = require("express");
const OpenAI = require("openai");
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

const openai = new OpenAI({
  apiKey: process.env.API_URL,
});

app.post("/", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a music recommender from spotify and you should return all the responses as an array of objects with the name of the artist and song name and don't repeat songs, return a random number of element between 5 and 50 if it's not specified in the prompt",
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-4",
    });

    if (!response) return res.send({ key: "error" });
    res.send({ data: response.choices[0].message.content });
  } catch (err) {
    res.status(500).send({ err, prompt });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
