const fs = require("fs");
const client = require("./llm_client");


const input = process.argv[2];
const outputDir = process.argv[3] || "artifacts/out";


async function main() {
const canonical = JSON.parse(fs.readFileSync(input, "utf8"));
const result = await client.generate(canonical);


if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(`${outputDir}/generated.txt`, result);


console.log("Generated →", outputDir);
}
main();
