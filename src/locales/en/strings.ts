const fs = require("fs");

function loadStrings() {
  // Load strings from JSON file, and parse them into a JavaScript object
  const data = fs.readFileSync("./strings.json", "utf8");
  return JSON.parse(data);
}

module.exports = loadStrings();
