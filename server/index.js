const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyPrser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  organization: "org-STW5TeQDB7SbMdlzFotmk3v2",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

//creating a simple api that calls the function above

const app = express();
app.use(bodyPrser.json());
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
const port = 3080;

app.post("/", async (req, res) => {
  const { message, currentModel } = req.body;
  // console.log(message, "message");
  const response = await openai.createCompletion({
    model: `${currentModel}`,
    // model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  res.json({
    message: response.data.choices[0].text,
  });
});

app.get("/models", async (req, res) => {
  const response = await openai.listEngines();
  console.log(response.data.data);
  res.json({
    models: response.data.data,
  });
});

app.listen(port, () => {
  console.log(`Example app listning at http://localhost:${port}`);
});
