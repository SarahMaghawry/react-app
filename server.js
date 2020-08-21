const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

global.Task = require("./app/models/taskModel");
const routes = require("./app/routes/taskRoutes");

//searched for this line and it could be removed in the earlier mongoose versions as v5
mongoose.Promise = global.Promise;
// this line to avoid deprecation warnings
mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb://localhost/TaskTrackerDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} NOT FOUND` });
});

console.log(`Server started on PORT ${port}`);
