const compression = require("compression");
const express = require("express");
const flash = require('express-flash');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 5500;

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET, // Replace with a real secret in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.SECURE_COOKIE || true } // Set to true if using https
}));

app.use(compression());
app.use(flash());
app.use(express.json({ extended: false }));
app.use("/", require("./routes/index"));

app.set('view engine', 'ejs');

app.listen(port, () => console.log(`Server is running on port ${port}`));
