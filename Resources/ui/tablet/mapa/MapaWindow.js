function MapaWindow(Window) {

	mapaWdw = Titanium.UI.createWindow({
		tabBarHidden : true,
		backgroundColor : "white",
		width : '100%',
		height : '100%',
		layout : 'vertical',
		fullscreen: false,
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

	imageViewBar = Titanium.UI.createView({
		id : "imageViewBar",
		backgroundColor : Ti.App.Properties.getString('viewcolor'),
		height : 80,
		left : 0,
		top : 0,
		width : '100%',
		layout : 'horizontal'
	});

	imageView = Titanium.UI.createImageView({
		id : "imageView",
		image : "/images/iconmapa.png",
		width : 60,
		height : 60,
		top : 7,
		right : 3
	});

	labelTitulo = Titanium.UI.createLabel({
		id : "labelTitulo",
		height : 'auto',
		width : '70%',
		text : L('map'),
		font : {
			fontSize : '22dp'
		},
		color : 'white',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	buttonClose = Titanium.UI.createImageView({
		id : "buttonClose",
		image : "/images/close.png",
		width : 30,
		height : 30,
		top : 25
	});
	
	imageViewBar.add(imageView);
	imageViewBar.add(labelTitulo);
	imageViewBar.add(buttonClose);
	mapaWdw.add(imageViewBar);
	mapaWdw.add(webView);

	mapaWdw.addEventListener('android:back', function() {
		Ti.Media.vibrate();
		mapaWdw.close();
	});

	buttonClose.addEventListener('click', function() {
		Ti.Media.vibrate();
		mapaWdw.close();
	});

	return mapaWdw;
}

module.exports = MapaWindow;