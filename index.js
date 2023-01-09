#!/usr/bin/env node
//npm install - g

import chalk from "chalk";
import figlet from "figlet";
import { askQuestionYouWant, askOpenAIKey } from "./lib/inquire.js";
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

// openAI 
const configuration = new Configuration({
  apiKey: configObj.chatAiKey,
});
const openai = new OpenAIApi(configuration);

askQuestionYouWant().then(
  answer => {
    const question = createAIPromt(answer.question);
    const response = openai.createCompletion(question);
    return response;
  }).then((response) => {
    if (response.data && response.data.choices[0]) {
      console.log(chalk.bold.cyan(response.data.choices[0].text));
    } else {
      console.log(chalk.red("Nothing Found!"))
    }
  }
  );

