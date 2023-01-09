import inquirer from "inquirer";

async function askOpenAIKey() {
  const question = {
    name: 'key',
    type: 'input',
    message: 'Enter your OpenAI-Key:\n',
    validate: function (value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter your OpenAI-Key.';
      }
    }
  };
  // promise response answer with object
  // with the key of name("key")
  return await inquirer.prompt(question);
};

async function askQuestionYouWant() {
  const question = {
    name: 'question',
    type: 'editor',
    message: 'My lord, what do you want me to do?\n',
    validate: function (value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter your Question.';
      }
    },
  };
  return await inquirer.prompt(question);
};

export { askQuestionYouWant, askOpenAIKey };