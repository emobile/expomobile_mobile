/*
 * Single Window Application Template:
 * A basic starting point for your application.  Mostly a blank canvas.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

// This is a single context application with multiple windows in a stack
(function() {
	//render appropriate components based on the platform and form factor
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Window;
	
	if (Ti.Platform.osname == 'android'){
        Ti.Gesture.addEventListener('orientationchange', function(e) {

          Ti.Android.currentActivity.setRequestedOrientation(Ti.Android.SCREEN_ORIENTATION_PORTRAIT);
        });
    }
	
	
	//if (isTablet) {
		//Window = require('ui/tablet/ApplicationWindow');
	//}
	//else {
		// Android uses platform-specific properties to create windows.
		// All other platforms follow a similar UI pattern.
		//if (osname === 'android') {
			//Window = require('ui/handheld/android/ApplicationWindow');
		//}
		//else {
	
		Window = require('ui/handheld/ApplicationWindow');
		new Window().open();	
	
})();


/*--------------------TIBAR TEST------------------------------------------------------

var win = Titanium.UI.createWindow({
    title:'TiBar Test App',
    backgroundColor:'#fff'
});

var TiBar = require('tibar');
var label = Titanium.UI.createLabel({
    text:'TiBar App',
    textAlign:'center',
    width:'auto'
});

var button = Ti.UI.createButton({
    title: "Scan barcode",
    height:50,
    width:250,
    bottom:20
});

button.addEventListener('click', function(){
    TiBar.scan({
        // simple configuration for iPhone simulator
        configure: {
            classType: "ZBarReaderController",
            sourceType: "Album",
            cameraMode: "Default",
            symbol:{
                "QR-Code":true,
            }
        },
        success:function(data){
            Ti.API.info('TiBar success callback!');
            if(data && data.barcode){
                Ti.UI.createAlertDialog({
                    title: "Scan result",
                    message: "Barcode: " + data.barcode + " Symbology:" + data.symbology
                }).show();
            }
        },
        cancel:function(){
            Ti.API.info('TiBar cancel callback!');
        },
        error:function(){
            Ti.API.info('TiBar error callback!');
        }
    });        
});

win.add(label);
win.add(button);

win.open();*/

