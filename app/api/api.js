var fetch = require("fetch").fetch;

module.exports = {
	fetchWeather: function(city){
		var url = "http://api.openweathermap.org/data/2.5/find?q="+ city +"&units=metric&appid=2de143494c0b295cca9337e1e96b00e0";
		
		return fetch(url).then(function(response){ return response.json() });
	}
};