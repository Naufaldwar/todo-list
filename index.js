const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const { PORT, mongoURI } = require("./config");
const ListRoutes = require("./routes/api/list");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
var uri =
  "mongodb://naufaldwiariananto:ym4pHpHCzlvMrGzQ@ac-2p2xh3l-shard-00-00.ngpiped.mongodb.net:27017,ac-2p2xh3l-shard-00-01.ngpiped.mongodb.net:27017,ac-2p2xh3l-shard-00-02.ngpiped.mongodb.net:27017/?ssl=true&replicaSet=atlas-hfazuy-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/list", ListRoutes);
app.get("/", (req, res) => res.send("hello"));

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
