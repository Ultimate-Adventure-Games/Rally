const express = require('express'); 
const app = express();
const path = require("path");
const PORT = 3000;
const cors = require('cors');
const bodyParser = require("body-parser");
const apiRouter = require("./routes/api.js");


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use("/api", apiRouter);


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
});
