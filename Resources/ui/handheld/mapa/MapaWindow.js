function MapaWindow(Window) {

	// Function to test if device is iOS 7 or later
	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();
	
	mapaWdw = Titanium.UI.createWindow({
		tabBarHidden : true,
		backgroundColor : "white",
		width : '100%',
		height : '100%',
		layout : 'vertical',
		fullscreen: pantallaCompleta,
		navBarHidden: true
	});

	webView = Titanium.UI.createWebView({
		id : "webView",
		url : '/ui/handheld/mapa/index.html',
		//url : 'index.html', funcionando en android
		height : '100%',
		width : '100%',
		scalesPageToFit : true
	});

	function cerrarMapa()
	{
		Ti.Media.vibrate();
		mapaWdw.close();
	}
	
	var templates = require('templates');
	var topBar = templates.getTopBar(L('map'),'/images/iconmapa.png', cerrarMapa);
	
	mapaWdw.add(topBar);
	mapaWdw.add(webView);

	mapaWdw.addEventListener('android:back', function() {
		cerrarMapa();
	});

	return mapaWdw;
}

module.exports = MapaWindow;