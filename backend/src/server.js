const app = require("./app");
require("dotenv").config();
const { createClient } = require("redis");
const client = createClient();

const PORT = process.env.PORT || 3333;

const startup = async () => {
  await client.connect();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startup();
