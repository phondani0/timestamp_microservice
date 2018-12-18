// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp', (req, res)=>{
  var time = Date.now();
  var date = new Date(time);
  
  var data = {
      unix: date.getTime(time),
      utc: date.toUTCString(time)
    }
    
    res.send(data);
});

app.get('/api/timestamp/:time', (req, res)=> {
  var time = req.params.time;
  if(time.indexOf('-') < 0) {
    time = parseInt(time, 10);
  }
    
  var date = new Date(time);
  
  if(date === "Invalid Date") {
    res.send({"unix": null, "utc" : "Invalid Date" });
  }
  else {
    var data = {
      unix: date.getTime(time),
      utc: date.toUTCString(time)
    }
    
    res.send(data);
  }
});

app.get('*', (req, res)=>{
  res.status(404).send('404 Not Found');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});