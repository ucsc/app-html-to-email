const compression = require("compression");
const express = require("express");
const app = express();
const port = process.env.PORT || 5500;

app.use(compression());
app.use(express.json({ extended: false }));
app.use("/", require("./routes/index"));

app.listen(port, () => console.log(`Server is running on port ${port}`));
