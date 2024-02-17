const express = require("express");
const OpenAI = require("openai");
const app = express();
const port = 5001;

require("dotenv").config();

// const configuration = new Configuration({
//   organization: "org-RRstoS5NJNSxt2tl2muw27h4",
//   apiKey:
//     process.env.API_URL ||
//     "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",
// });

app.use(express.json());
// const openai = new OpenAIApi(configuration);

const openai = new OpenAI({
  apiKey: process.env.API_URL, // This is the default and can be omitted
});

app.post("/", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a music recommender from spotify and you should return all the responses as an array with the name of the artist and song name",
        },
        { role: "user", content: "recommend me something cool and old" },
      ],
      model: "gpt-3.5-turbo",
    });
    // const response = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   max_tokens: 7,
    //   temperature: 0,
    // messages: [
    //   {
    //     role: "system",
    //     content:
    //       "You are a music recommender from spotify and you should return all the responses as an array with the name of the artist and song name",
    //   },
    //   { role: "user", content: "recommend me something cool and old" },
    // ],
    // });

    res.send({ response });

    if (!response) return res.send({ key: "error" });
    res.send({ response });
  } catch (err) {
    res.status(500).send({ err, prompt });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const response = await openai.createChatCompletion({
//   model: "",
//   prompt,
//   temperature: 0.5,
//   max_tokens: 64,
//   top_p: 1.0,
//   frequency_penalty: 0.0,
//   presence_penalty: 0.0,
// });
