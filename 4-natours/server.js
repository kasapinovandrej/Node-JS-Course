const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 3000;

console.log(app.get("env"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
