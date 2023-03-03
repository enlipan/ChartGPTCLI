#!/usr/bin/env node
//npm install - g

import chalk from "chalk";
import figlet from "figlet";
import { askQuestionYouWant, askOpenAIKey, askKeepGoingon } from "./lib/inquire.js";
import { createAIPromt, constructeHistory } from "./lib/requestAI.js";
import { getConfig, saveConfig } from "./lib/config.js";


import { Configuration, OpenAIApi } from "openai";

const configObj = {
  moduleGPTName: "text-davinci-003",
  chatKeyName: "openAiKey",
  chatAiKey: ""
};

// show welcome
console.clear();
console.log(chalk.yellow(
  figlet.textSync("AI-Chart", { horizontalLayout: "full" })
));

// check Key
// checkConfig 
const runCheckKey = async () => {
  configObj.chatAiKey = getConfig(configObj.chatKeyName);
  if (!configObj.chatAiKey) {
    const answer = await askOpenAIKey();
    configObj.chatAiKey = answer.key;
    saveConfig({ [configObj.chatKeyName]: answer.key });
  }
};
await runCheckKey();


let shouldKeepDoing;
let hintMsg = "Your Command?";
let history = [{ 'prompt': '', 'completion': '' }];
// openAI 
const configuration = new Configuration({
  apiKey: configObj.chatAiKey,
});
const openai = new OpenAIApi(configuration);
const runCompletion = async () => {
  let inputQuesiton = await askQuestionYouWant(hintMsg);
  let questionOriginal = inputQuesiton.question.trimEnd();
  console.log(chalk.bold.white("\nQestion:\n" + questionOriginal));
  let prompt = createAIPromt(questionOriginal, history);
  let response = await openai.createChatCompletion(prompt);
  if (response.data && response.data.choices[0]) {
    let robotAnswerOriginal = response.data.choices[0].message.content;
    let promtTokens = response.data.usage.prompt_tokens;
    let usageTokens = response.data.usage.total_tokens;

    history = constructeHistory(history, questionOriginal, robotAnswerOriginal);
    console.log(chalk.bold.cyan(`AI-Chart(${promtTokens}/${usageTokens}):\n` + robotAnswerOriginal));
  } else {
    console.log(chalk.red("Nothing !"));
  }
};

do {
  await runCompletion();
  shouldKeepDoing = await askKeepGoingon();
}
while (shouldKeepDoing);
