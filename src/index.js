const express = require("express");
const http = require("http");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const port = 443;
const configuration = new Configuration({
  apiKey: process.env.API_URL
});

const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "text here",
      temperature: 0.7,
      max_tokens: 100,
    });

    res.json({ response });
  } catch (err) {
		console.log(err);
    res.status(500).send('Something broke!')
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
