var weatherModel = require("../../models/Weather").WeatherModel;
var viewModule = require("ui/core/view");
var colorModule = require("color");
var Color = colorModule.Color;

var page;
	
function onPageLoad(args){
	page = args.object;
	page.bindingContext = new weatherModel();
	viewModule.getViewById( page, "searchedCity" ).dismissSoftInput();
}

exports.onPageLoad = onPageLoad;