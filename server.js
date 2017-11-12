// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var multer = require('multer');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/upload', upload.single('data'), function(req, resp)  {
  if (req.file) {
    console.log(JSON.stringify({
      filename: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype
    }));
    resp.status(200).json({
      filename: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype
    });
    
  } else {
    console.log('error');
    resp.status(500).json({ error: `No file was provided in the 'data' field` });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
