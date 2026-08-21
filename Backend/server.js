const express = require("express");
const passport = require("passport");
const db = require("./config/db");
const hospitalRouter = require("./router/hospitalRouter");

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use("/hospital", hospitalRouter);

app.listen(4000, () => {
    console.log("Server is ruunning on port 4000")
});

