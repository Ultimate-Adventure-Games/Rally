const express = require('express'); 
const app = express();
const path = require("path");
const PORT = 3000;
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
});
