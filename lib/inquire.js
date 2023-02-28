import inquirer from "inquirer";

async function askSimpleInput(name, msg, emptyHint) {
  const question = {
    name: name,
    type: 'input',
    message: msg,
    validate: function (value) {
      if (value.length) {
        return true;
      } else {
        return emptyHint;
      }
    }
  };
  // promise response answer with object
  // with the key of name("key")
  return await inquirer.prompt(question);
};

async function askKeepGoingon() {
  const answer = await askSimpleInput('key', 'Continue conversation: Y/else(exit):', 'Didn\'t receive any input.');
  if (answer.key.toUpperCase() === "Y") {
    return 1;
  }
  return 0;
};

async function askOpenAIKey() {
  return askSimpleInput('key', 'Enter your OpenAI-Key:\n', 'Please enter your OpenAI-Key.');
};

async function askQuestionYouWant(hintMsg) {
  const question = {
    name: 'question',
    type: 'editor',
    message: hintMsg,
    validate: function (value) {
      if (value.length) {
        return true;
      } else {
        return 'Pls enter your Command.';
      }
    },
  };
  return await inquirer.prompt(question);
};

export { askQuestionYouWant, askOpenAIKey, askSimpleInput, askKeepGoingon };