// const { Configuration, OpenAIApi } = require("openai");

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    // const configuration = new Configuration({
    //   apiKey: process.env.OPEN_AI_KEY,
    // });
    // const response = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: event.body.text,
    //   temperature: 0,
    //   max_tokens: 42,
    // });

    const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
