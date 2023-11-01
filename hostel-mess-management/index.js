const connectToMongo = require("./db");

const crypto = require("crypto");

const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const express = require("express");
var cors = require("cors");
connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/formAuth", require("./routes/formAuth"));
app.use("/api/passwordReset", require("./routes/passwordReset"));

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});
