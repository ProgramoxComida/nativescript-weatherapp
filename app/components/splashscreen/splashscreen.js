var frameModule = require("ui/frame");
var imageModule = require("ui/image");

exports.loaded= function(args) {
 
    // Hide the iOS UINavigationBar so it doesn't get in the way of the animation
    if (frameModule.topmost().ios) {
        frameModule.topmost().ios.navBarVisibility = "never";
    }
 
    // Create a new image
    var item = new imageModule.Image();

    item.src = "res://icon";
    item.height = 150;
    item.on("loaded", function (args) {
        args.object
            // Shrink the logo over 1.5 seconds
            .animate({
                scale: { x: 0.6, y: 0.6 },
                duration: 1500
            })
            .then(function () {
                // Drastically increase the size of the logo
                return args.object.animate({
                    scale: { x: 4, y: 4 },
                    duration: 750
                });
            })
            .then(function () {
                // Fade out the logo
                return args.object.animate({
                    opacity: 0,
                    duration: 200
                });
            })
            .then(function () {
                // Navigate to the starting page.
                // this is the main page
                frameModule.topmost().navigate({
                    moduleName: "components/main/main",
                    animated: false
                });
            });
    });
 
    page = args.object;
 
    // Append the dynamically created image to the <GridLayout>
    var grid = page.getViewById("grid");
    grid.addChild(item);
};