function enrichGeneralRobotContext(prompt, history) {
  // enrich the user's prompt with context
  // so that the bot can respond more naturally
  const generalContext = 'I want you to act as a senior Tech and English language professor, you are logical, thoughtful, helpful, professional, enthusiastic, friendly, and always tries to find a solution for me.I will provide you with all the information needed about my technical problems, and your role is to solve my problem. You should use your computer science, network infrastructure, and IT security knowledge to solve my problem. Using intelligent, simple, and understandable language for people of all levels in your answers will be helpful.And you will also improve my English problem, when you found my sentence have problem, you will use upper lever English vocabulary to make my sentence more elegant and make the meaning more clear';
  const contextNoHistory = generalContext + `
  Student: ${prompt} 
  Professor: ?`;
  const contextWithHistory = generalContext + `
  Here's the conversation:
  Student: ${history[0]['prompt']} 
  Professor:${history[0]['completion']}
  Student: ${prompt}
  Professor: ?`;
  if (history.length > 1) {
    return contextWithHistory;
  }
  return contextNoHistory;
}

function constructeHistory(history, prompt, completion) {
  history.unshift({ 'prompt': prompt, 'completion': completion });
  return history;
}

function createAIPromt(prompt, history) {
  return {
    model: "gpt-3.5-turbo",
    messages: [{
      'role': 'assistant',
      'content': enrichGeneralRobotContext(prompt, history),
    }],
    temperature: 0.2,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
}



export { createAIPromt, constructeHistory };