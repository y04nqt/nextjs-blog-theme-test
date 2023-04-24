const { Configuration, OpenAIApi } = require('openai');

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    console.log(event);
    const body = JSON.parse(event.body);
    console.log(body);
    const text = JSON.stringify(body.text);

    const configuration = new Configuration({
      apiKey: process.env.OPEN_AI_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: text,
      temperature: 0,
      max_tokens: 42,
    });

    console.log(response.data.choices[0].text);
    // if (event.httpMethod === "OPTIONS") {
    //   return {
    //     statusCode: 200,
    //     headers,
    //     body: JSON.stringify({ message: "Successful preflight call." }),
    //   };
    // } else if (event.httpMethod === "POST") {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ response: response.data.choices[0].text }),
        // // more keys you can return:
        // headers: { "headerName": "headerValue", ... },
        // isBase64Encoded: true,
      };
    // }
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
