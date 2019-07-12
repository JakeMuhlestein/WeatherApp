/****************************************************************
* Weather OPA using openweathermap API
***************************************************************/

//require request package
const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

//API key *****Don't Steal Please :) ***** 
var apiKey = 'c10aa5c735891861ff883743b62e8fea';

//set port
app.use( express.static( "public" ) );
//app.set('views', path.join(__dirname, 'views'))
app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

//Have root set up to take user input for city or zip for forecast
app.get('/', function (req, res) {
  res.render('index', {weather: null, error: 'Error, please try again'});
})

//Post results returned from API call to root
app.post('/', function (req, res) {

    //console.log(req.body.city) test
    //get user city or zip
	var city = req.body.city;

	//URL for weather API
	var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

	request(url, function (err, response, body) {
    if(err){
    	res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
    	var weather = JSON.parse(body)

        if(weather.main == undefined){
        	res.render('index', {weather: null, error: 'Error, please try again'});
      	} else {
        	var weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
          var loc = weather.name;
          var curTemp = weather.main.temp;
          var clouds = weather.clouds.all;
          var windSpeed = weather.wind.speed;
          var time = weather.dt;
        	res.render('index', {weather: weatherText, windSpeed: windSpeed,  
          curTemp: curTemp, clouds: clouds, loc: loc, time: time, error: null});
      	}
    }
  });
})

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})

/*const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

var apiKey = 'c10aa5c735891861ff883743b62e8fea';



app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


app.get('/', function (req, res) {
  res.render('index', {weather: null, error: 'Error, please try again'});
})

app.post('/', function (req, res) {

	//res.render('index');
    console.log(req.body.city)
	var city = req.body.city;
	var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

	request(url, function (err, response, body) {
    if(err){
    	res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
    	var weather = JSON.parse(body)

        if(weather.main == undefined){
        	res.render('index', {weather: null, error: 'Error, please try again'});
      	} else {
        	var weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        	res.render('index', {weather: weatherText, error: null});
      	}
    }
  });
})

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
})*/