const fs = require("fs");
const input = process.argv[2];
const records = JSON.parse(fs.readFileSync(input, "utf8"));


const canonical = records.map(r => ({
method: r.method,
url: r.url,
request: {
headers: r.request_headers,
body: r.request_body
},
response: {
status: r.status,
headers: r.response_headers,
body: r.response_body
}
}));


console.log(JSON.stringify(canonical, null, 2));
