const express = require("express");
const http = require("http");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const port = 5001;

const configuration = new Configuration({
  organization: 'org-RRstoS5NJNSxt2tl2muw27h4',
  apiKey: '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'
});

const openai = new OpenAIApi(configuration);
app.use(express.json())  

app.post("/", async (req, res) => {
  const { body } = req;
  try {
    const response = await openai.createCompletion({
      model:"text-davinci-003",
      prompt: body.text,
      temperature:1,
      max_tokens: 500,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0
    });

    res.json({ text: response?.data?.choices?[0]?.text || '' })

  } catch (err) {
    res.status(500).send('Something broke!')
  }
});

app.listen(port, () => {
  console.log(`Api running on ${port}`);
});
