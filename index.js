#!/usr/bin/env node
//npm install - g

import chalk from "chalk";
import figlet from "figlet";
import { askQuestionYouWant, askOpenAIKey, askKeepGoingon } from "./lib/inquire.js";
import { createAIPromt } from "./lib/requestAI.js";
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
let hintMsg = "Your Command?"
let history = { priorQ: '', priorA: '' };
// openAI 
const configuration = new Configuration({
  apiKey: configObj.chatAiKey,
});
const openai = new OpenAIApi(configuration);
const runCompletion = async () => {
  let inputQuesiton = await askQuestionYouWant(hintMsg);
  let questionOriginal = inputQuesiton.question.trimEnd();
  console.log(chalk.bold.cyan("\nQestion:\n" + questionOriginal));
  let prompt = createAIPromt(questionOriginal, history.priorQ, history.priorA);
  let response = await openai.createCompletion(prompt);
  if (response.data && response.data.choices[0]) {
    let robotAnswerOriginal = response.data.choices[0].text;
    history.priorQ = questionOriginal;
    history.priorA = robotAnswerOriginal;
    console.log(chalk.bold.cyanBright("AI-Chart:\n" + robotAnswerOriginal));
  } else {
    console.log(chalk.red("Nothing Found!"));
  }
};

do {
  await runCompletion();
  shouldKeepDoing = await askKeepGoingon();
}
while (shouldKeepDoing);
