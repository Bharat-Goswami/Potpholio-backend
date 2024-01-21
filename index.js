const express = require("express");
require('dotenv').config();
const { connection } = require("./db");
const cors = require("cors"); 
const UserModel = require("./module"); // Correct import statement
const app = express();

app.use(cors()); 
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "API working" });
});

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    console.error("Error fetching users from MongoDB:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/users/add", async (req, res) => {
  try {
    const user = req.body;
    const newUser = await UserModel.create(user);
    res.send({ Successful: "Successfully posted to MongoDB", newUser });
  } catch (error) {
    console.error("Error posting to MongoDB:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await connection();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
  console.log(`Listening on port ${PORT}`);
});
