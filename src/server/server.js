//Express Dependency
const express = require('express');
//Body-Parser Dependency
const bodyParser = require('body-parser');
//Declaring the instance
const app = express();

var path = require('path');
let travelInfo = {};

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors Dependency
const cors = require('cors');
app.use(cors());
//Trigger the html
app.use(express.static('dist'));

app.get("/", function (req, res) {
	res.sendFile("dist/index.html");
});

// Post Route
app.post('/travel', addTravel);

function addTravel(req, res) {
 	travelInfo['city'] = req.body.city;
 	travelInfo['from'] = req.body.from;
 	travelInfo['to'] = req.body.to;
 	travelInfo['maxTemp'] = req.body.maxTemp;
 	travelInfo['minTemp'] = req.body.minTemp;
 	travelInfo['summary'] = req.body.summary;
    res.send(travelInfo);
}

//Server start ES6
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("Server is running on port " + port);
});