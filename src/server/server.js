//Express Dependency
const express = require('express');
//Body-Parser Dependency
const bodyParser = require('body-parser');
//Declaring the instance
const app = express();
//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors Dependency
const cors = require('cors');
app.use(cors());
//Trigger the html
app.use(express.static('dist'));

//Receive Info
app.get("/", function (req, res) {
	res.sendFile("dist/index.html");
});

//Server start ES6
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("Server is running on port " + port);
});