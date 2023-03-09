const { Configuration, OpenAIApi } = require("openai");
const getChatQuestion = require("./chatQuestion");

// configuration for openai api
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


// create an instance of the openai api
const openai = new OpenAIApi(configuration);


// function to get response from gpt-3 for data analytics
async function chatGPTResponse(type, data) {
  const question = getChatQuestion(type, data);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: question,
      },
    ],
  });

  return completion.data.choices[0].message.content;
}

module.exports = chatGPTResponse;