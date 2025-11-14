const fs = require("fs");
const input = process.argv[2];
const output = process.argv[3];


const raw = fs.readFileSync(input, "utf8").split("\n");
const sanitized = raw.filter(Boolean).map(line => {
const obj = JSON.parse(line);
if (obj.request_headers.Authorization) {
obj.request_headers.Authorization = "<redacted_token>";
}
return obj;
});


fs.writeFileSync(output, JSON.stringify(sanitized, null, 2));
console.log("Sanitized → " + output);
