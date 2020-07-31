const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// set up express

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200
}))

const PORT = process.env.PORT || 5000;




const uri = process.env.MONGOD_URI
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
})

// Connect to Mongo

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => {
   console.log("Successfully connected to MongoDB")
})
.catch((err) => {
  console.log(err)
})


mongoose.connection
  .once("open", () => console.log("Successfully connected to MongoDB"))
  .on("error", (error) => {
    console.warn("Warning", error);
  });

// setup routes
app.get('/', (req, res) => {
  res.send('Nothing to see here, move along human')
})
app.use('/users', require('./routes/userRoutes'))
app.use('/projects', require('./routes/projectRouter'))

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
})