const express = require("express");
const dbConnection = require("./db");
const app = express();

const PORT = process.env.PORT || 3000;

// import routes
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");

app.use(express.urlencoded({ extended: true }));

app.use(signupRoute);
app.use(loginRoute);
app.use(userRoute);

app.get("/", (req, res) => {
  res.json({
    message: "supp",
  });
});

dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
  });
});
