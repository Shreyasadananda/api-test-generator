const { execSync } = require("child_process");


try {
execSync("npx eslint .", { stdio: "inherit" });
execSync("npm run build", { stdio: "inherit" });
execSync("npm test", { stdio: "inherit" });
console.log("Validation passed");
} catch (err) {
console.error("Validation failed");
process.exit(1);
}
