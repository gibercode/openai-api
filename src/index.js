const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const port = 5001;
require("dotenv").config();

const configuration = new Configuration({
  organization: "org-RRstoS5NJNSxt2tl2muw27h4",
  apiKey: process.env.API_URL,
});

app.use(express.json());
const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    res.send({ response: response.data.choices[0].text });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
