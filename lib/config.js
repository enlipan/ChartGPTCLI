import Configstore from "configstore";
///Users/[YOUR-USERNME]/.config/configstore/xx.json
const config = new Configstore("openAI");

function saveConfig(obj) {
  if (obj) {
    Object.keys(obj).forEach((key, index) => {
      config.set(key, obj[key]);
    });
  }
};

function getConfig(key) {
  return config.get(key);
};

export { saveConfig, getConfig };