/* global global */
var application = require("application");
var fontModule = require("ui/styling/font"); // for iOS
application.mainModule = "./components/splashscreen/splashscreen";
application.cssFile = "./app.css";

// iOS Font
if (application.ios) {
    fontModule.ios.registerFont("WeatherIcons-Regular.ttf");
}

application.start();
