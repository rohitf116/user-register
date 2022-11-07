const { response } = require("express");
const express = require("express");
const { connect } = require("mongoose");
const router = require("./routes/router");
const app = express();
app.use(express.json());
connect(
  "mongodb+srv://rohit_sonawane:SuperSu@cluster0.e9hjfiy.mongodb.net/testforintervie"
)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });
console.log(process.env);
app.use("/", router);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
