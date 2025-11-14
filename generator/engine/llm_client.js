require("dotenv").config();
const provider = require("../llm_providers/openai");


module.exports.generate = async function(canonicalJson) {
const prompt = `Generate API client + tests for: ${JSON.stringify(canonicalJson)}`;
return await provider.callLLM(prompt);
};
