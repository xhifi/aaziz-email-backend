const PORT = 1234;
require("dotenv").config();
const express = require("express");
require("express-async-errors");

const app = express();

app.use(require("cors")());
app.use(express.json());

app.use("/api/v1/", require("./routes/subscribers"));

app.use(require("./middlewares/errorHandler"));
app.use(require("./middlewares/catchAllException"));

app.listen(PORT, (err) => {
  console.log(`Listening on ${PORT}`);
});
