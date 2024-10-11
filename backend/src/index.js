const express = require("express");

const app = express();

app.get("/tasks", (request, response) =>
  response.status(200).send("Hello, Word")
);

app.listen(3333, () => console.log("Server running on port 3333"));
