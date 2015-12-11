/* global __extends */
var observable = require("data/observable");
var fetchWeather = require("../api/api").fetchWeather;
var weatherIcon  = require("../shared/icons").icon;

var colorModule = require("color");
var Color = colorModule.Color;

var WeatherModel = (function (_super) {
    __extends(WeatherModel, _super);
    function WeatherModel() {
        _super.call(this);
        this._hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 
		this._isLoading = false;
        this._city = "Bucuresti";
		this._country = "Romania";
		this._weatherType = "Clear";
		this._temperature = 21;
		this._searchedCity = "Bucuresti";
		this._currentColor = "white";
		this._nextColor = this._randomColor();
		this._icon = weatherIcon();
    }
    //Function to convert hex format to a rgb color
    WeatherModel.prototype._rgb2hex = function(rgb) {
     return "#" + this._hex(rgb[0]) + this._hex(rgb[1]) + this._hex(rgb[2]);
    }

    WeatherModel.prototype._hex = function(x) {
      return isNaN(x) ? "00" : this._hexDigits[(x - x % 16) / 16] + this._hexDigits[x % 16];
    }
	WeatherModel.prototype._randomColor = function(){
		var colors = [0,1,2].map(function(){
			return Math.ceil(Math.random() *255);
		});
        var color = this._rgb2hex(colors);
        return color;
	};
    WeatherModel.prototype.getWeather = function (args) {
        var page = args.object.parent;
        var that = this;
        fetchWeather(this._searchedCity).then(function(response){
            var weatherList = response.list[0];
            // Store nextColor, since we'd like to start next time with it.
            var current = this._nextColor;
            
            that.set("temperature", Math.round(weatherList.main.temp));
            that.set("city", weatherList.name);
            that.set("country", weatherList.sys.country);
            that.set("weatherType", weatherList.weather[0].main);
            that.set("currentColor", current);
            that.set("nextColor", that._randomColor());
            page.style.backgroundColor = new Color(that.get("nextColor"));
            that.set("icon", weatherIcon(weatherList.weather[0].icon));
            
        })
    };
	
	Object.defineProperty(WeatherModel.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        set: function(value) {
            this._isLoading = value;
        },
        enumerable: true,
        configurable: true
    });
	
	Object.defineProperty(WeatherModel.prototype, "city", {
        get: function () {
            return this._city;
        },
        set: function(value) {
            this._city = value;
        },
        enumerable: true,
        configurable: true
    });
	Object.defineProperty(WeatherModel.prototype, "country", {
        get: function () {
            return this._country;
        },
        set: function(value) {
            this._country = value;
        },
        enumerable: true,
        configurable: true
    });
	Object.defineProperty(WeatherModel.prototype, "weatherType", {
        get: function () {
            return this._weatherType;
        },
        set: function(value) {
            this._weatherType = value;
        },
        enumerable: true,
        configurable: true
    });
	Object.defineProperty(WeatherModel.prototype, "temperature", {
        get: function () {
            return this._temperature;
        },
        set: function(value) {
            this._temperature = Math.round(value);
        },
        enumerable: true,
        configurable: true
    });
	Object.defineProperty(WeatherModel.prototype, "searchedCity", {
        get: function () {
            return this._searchedCity;
        },
        set: function(value) {
            this._searchedCity = value;
        },
        enumerable: true,
        configurable: true
    });
	Object.defineProperty(WeatherModel.prototype, "currentColor", {
        get: function () {
            return this._currentColor;
        },
        set: function(value) {
            this._currentColor = value;
        },
        enumerable: true,
        configurable: true
    });
	Object.defineProperty(WeatherModel.prototype, "nextColor", {
        get: function () {
            return this._nextColor;
        },
        set: function(value) {
            this._nextColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WeatherModel.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        set: function(value) {
            this._icon = value;
        },
        enumerable: true,
        configurable: true
    });
	
    return WeatherModel;
})(observable.Observable);
exports.WeatherModel = WeatherModel;
