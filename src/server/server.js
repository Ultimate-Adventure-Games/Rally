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

//UPLOAD IMAGES
app.use(formData.parse())

app.post('/image-upload', (req, res) => {

  const values = Object.values(req.files)
  const promises = values.map(image => cloudinary.uploader.upload(image.path))
  
  Promise
    .all(promises)
    .then(results => res.json(results))
})
//UPLOAD IMAGES

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
});
