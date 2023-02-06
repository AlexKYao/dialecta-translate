import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  // Run the prompt
  console.log(`API: Act as a ${req.body.selectedLanguage} translator, spelling corrector and improver.`)

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `I want you to act as a ${req.body.selectedLanguage} translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved conversational version of my text, in ${req.body.selectedLanguage}. Generate the response in a Github style markdown table with each original sentence and translated sentence in the same row with the first language name as the heading in the first column and the second language name as the heading in the second column.

    Translate this text: ${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  // Get the output
  const output = completion.data.choices.pop();

  // Send over the output to the UI
  res.status(200).json({ output });
};


// const basePromptPrefix = 
// `Give me a list 5 Spanish most-used vocabulary words for the theme below.

// Theme:
// `;
// const generateAction = async (req, res) => {
//   // Run first prompt
//   console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

//   const baseCompletion = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: `${basePromptPrefix}${req.body.userInput}`,
//     temperature: 0.7,
//     max_tokens: 250,
//   });
  
//   const basePromptOutput = baseCompletion.data.choices.pop();

//   // I build Prompt #2.
//   const secondPrompt = 
//   `
//   Take the list of vocabulary and theme below and generate five Spanish sentences in an informal style. Output both Spanish and English in two columns.

//   Theme: ${req.body.userInput}

//   Vocabulary: ${basePromptOutput.text}

//   Sentences:
//   `

//   // I call the OpenAI API a second time with Prompt #2
//   const secondPromptCompletion = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: `${secondPrompt}`,
//     // I set a higher temperature for this one. Up to you!
//     temperature: 0.7,
// 		// I also increase max_tokens.
//     max_tokens: 1250,
//   });
  
//   // Get the output
//   const secondPromptOutput = secondPromptCompletion.data.choices.pop();

//   // Send over the Prompt #2's output to our UI instead of Prompt #1's.
//   res.status(200).json({ output: secondPromptOutput });
// };

export default generateAction;