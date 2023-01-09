

function createAIPromt(params) {
  return {
    model: "text-davinci-003",
    prompt: params,
    temperature: 0.4,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  };
}

export { createAIPromt };