const fetch = require("node-fetch");


module.exports.callLLM = async function(prompt) {
const res = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${process.env.LLM_API_KEY}`
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages: [{ role: "user", content: prompt }],
max_tokens: 4000
})
});


const json = await res.json();
return json.choices[0].message.content;
};
