function MainWindow(Window) {
	var network = require('lib/network');

	/*Ti.Facebook = require("facebook");
	 Ti.Facebook.appid = "307992816005643";
	 Ti.Facebook.permissions = ['publish_stream', 'read_stream', 'email', 'user_about_me', 'create_event'];*/

	var ANActivityIndicator = require('ui/common/ANActivityIndicator');
	var info = new ANActivityIndicator(L('loading'));

	/*var facebookAlert = Titanium.UI.createAlertDialog({
	 title : L('tittlealert'),
	 message : L('facebook_message'),
	 buttonNames : [L('yes'), L('no')]
	 });

	 facebookAlert.show();

	 facebookAlert.addEventListener('click', function(e) {
	 if (e.index == 0) {
	 Ti.Facebook.authorize();
	 }
	 });*/

	var herramientas = require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();

	info.show();

	mainWindow = Titanium.UI.createWindow({
		tabBarHidden : true,
		backgroundColor : "white",
		width : '100%',
		height : '100%',
		layout : 'vertical',
		fullscreen : pantallaCompleta,
		navBarHidden : true
		//exitOnClose: true
	});

	mainWindow.orientationModes = [Ti.UI.PORTRAIT];

	viewTop = Titanium.UI.createView({
		backgroundColor : "transparent",
		width : '100%',
		height : '25%',
		left : 3,
		right : 3,
		top : 5,
		layout : 'horizontal'
	});

	viewMiddle = Titanium.UI.createView({
		backgroundColor : "transparent",
		width : '100%',
		height : '25%',
		left : 3,
		right : 3,
		top : 3,
		layout : 'horizontal'
	});

	viewBottom = Titanium.UI.createView({
		backgroundColor : "transparent",
		width : '100%',
		height : '25%',
		left : 3,
		right : 3,
		top : 3,
		layout : 'horizontal'
	});

	viewLogo = Titanium.UI.createView({
		backgroundColor : "transparent",
		width : '100%',
		height : '20%',
		layout : 'vertical'
	});

	imageViewLogo = Titanium.UI.createImageView({
		id : "imageViewLogo",
		image : "/images/expomobile.png",
		height : 71.2, //89,
		top : 0,
		width : 147.6, //184.5,
		verticalAlign : 'center'
	});

	scrollView_1 = Titanium.UI.createScrollView({
		id : "scrollView_1",
		backgroundImage : '/images/background.png',
		height : '100%',
		width : '100%',
		layout : 'vertical'
	});

	/*imageViewBar = Titanium.UI.createView({
		id : "imageViewBar",
		backgroundColor : Ti.App.Properties.getString('viewcolor'),
		height : 40,
		left : 0,
		top : 0,
		width : '100%',
		layout : 'horizontal'
	});

	labelTitulo = Titanium.UI.createLabel({
		id : "labelTitulo",
		height : 'auto',
		width : '90%',
		text : L('menu'),
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
		top : 5
	});*/

	buttonPatrocinadores = Titanium.UI.createImageView({
		id : "buttonPatrocinadores",
		width : '32.5%',
		height : '90%'
	});

	buttonExposiciones = Titanium.UI.createImageView({
		id : "buttonExposiciones",
		width : '32.5%',
		height : '90%'
	});

	buttonTalleres = Titanium.UI.createImageView({
		id : "buttonTalleres",
		width : '32.5%',
		height : '90%'
	});

	buttonConferencias = Titanium.UI.createImageView({
		id : "buttonConferencias",
		width : '32.5%',
		height : '90%'
	});

	buttonActividades = Titanium.UI.createImageView({
		id : "buttonActividades",
		width : '32.5%',
		height : '90%'
	});

	buttonFaceToFace = Titanium.UI.createImageView({
		id : "buttonFaceToFace",
		image : "/images/facetoface.png",
		width : '32.5%',
		height : '90%'
	});

	buttonOfertas = Titanium.UI.createImageView({
		id : "buttonOfertas",
		width : '32.5%',
		height : '90%'
	});

	buttonRegistro = Titanium.UI.createImageView({
		id : "buttonRegistro",
		width : '32.5%',
		height : '90%'
	});

	buttonAgenda = Titanium.UI.createImageView({
		id : "agenda",
		width : '32.5%',
		height : '90%'
	});

	if (L("language") == "es") {
		buttonPatrocinadores.image = "/images/patrocinadores.png";
		buttonExposiciones.image = "/images/exposicion.png";
		buttonTalleres.image = "/images/talleres.png";
		buttonConferencias.image = "/images/conferencias.png";
		buttonActividades.image = "/images/actividades.png";
		buttonOfertas.image = "/images/ofertas.png";
		buttonRegistro.image = "/images/registro.png";
		buttonAgenda.image = "/images/agenda.png";
	} else {
		buttonPatrocinadores.image = "/images/sponsors.png";
		buttonExposiciones.image = "/images/exposition.png";
		buttonTalleres.image = "/images/workshops.png";
		buttonConferencias.image = "/images/conferences.png";
		buttonActividades.image = "/images/activities.png";
		buttonOfertas.image = "/images/offers.png";
		buttonRegistro.image = "/images/register.png";
		buttonAgenda.image = "/images/diary.png";
	}

	imageViewBar.add(labelTitulo);

	if (Titanium.Platform.osname == 'iphone' || Titanium.Platform.osname == 'ipad') {
		//no se agrega boton de cerrar
	} else {
		imageViewBar.add(buttonClose);
	}

	viewTop.add(buttonPatrocinadores);

	viewTop.add(buttonExposiciones);

	viewTop.add(buttonTalleres);

	viewMiddle.add(buttonConferencias);

	viewMiddle.add(buttonActividades);

	viewMiddle.add(buttonFaceToFace);

	viewBottom.add(buttonOfertas);

	viewBottom.add(buttonRegistro);

	viewBottom.add(buttonAgenda);

	viewLogo.add(imageViewLogo);

	scrollView_1.add(viewTop);

	scrollView_1.add(viewMiddle);

	scrollView_1.add(viewBottom);

	scrollView_1.add(viewLogo);

	/*scrollView_1.add(Ti.Facebook.createLoginButton({
	 top : 10,
	 style : Ti.Facebook.BUTTON_STYLE_WIDE
	 }));*/

	var cerrarlo = function(e) {
		ventanaAlert.show();
	};

	var templates = require('templates');
	var topBar = templates.getTopBar(L('menu'), cerrarlo);
	mainWindow.add(topBar);
	//mainWindow.add(imageViewBar);
	mainWindow.add(scrollView_1);


	buttonPatrocinadores.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		network.getSponsors(function(response) {
			if (response != false) {
				var Window;
				var mainWindow = require("ui/handheld/PatrocinadoresWindow");
				new mainWindow(Window).open();
			}
		});
	});

	buttonExposiciones.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		network.getSponsors(function(response) {
			if (response != false) {
				var Window;
				var mainWindow = require("ui/handheld/ExposicionesWindow");
				new mainWindow(Window).open();
			}
		});
	});

	/*buttonExposiciones.addEventListener('click', function(e) {
	 Ti.Media.vibrate();
	 var Window;
	 var mainWindow = require("ui/handheld/PatrocinadoresWindow2");
	 new mainWindow(Window).open();
	 });*/

	buttonTalleres.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		var Window;
		var mainWindow = require("ui/handheld/TalleresWindow");
		new mainWindow(Window).open();
	});

	buttonConferencias.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		var Window;
		var mainWindow = require("ui/handheld/ConferenciasWindow");
		new mainWindow(Window).open();
	});

	buttonActividades.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		var Window;
		var mainWindow = require("ui/handheld/ActividadesWindow");
		new mainWindow(Window).open();
	});

	buttonFaceToFace.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		var Window;
		var mainWindow = require("ui/handheld/FaceToFaceWindow");
		new mainWindow(Window).open();
	});

	buttonOfertas.addEventListener('click', function(e) {
		Ti.Media.vibrate();

		network.getExhibitors(true, function(response) {

			if (response.length == 0) {
				Ti.UI.createAlertDialog({
					message : L('no_ofertas'),
					ok : L('ok'),
					title : L('alert_title')
				}).show();
			} else if (response.length > 0) {
				var Window;
				var mainWindow = require("ui/handheld/OfertasWindow");
				new mainWindow(Window).open();
			} else {
				//error de conexion
			}
		});
	});

	buttonRegistro.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		var Window;
		var mainWindow = require("ui/handheld/RegistroWindow");
		new mainWindow(Window).open();
	});

	buttonAgenda.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		var Window;
		var mainWindow = require("ui/handheld/AgendaWindow");
		new mainWindow(Window).open();

	});

	var ventanaAlert = Titanium.UI.createAlertDialog({
		title : L('tittlealert'),
		message : L('closeapp'),
		buttonNames : [L('yes'), L('no')]
	});

	ventanaAlert.addEventListener('click', function(e) {
		if (e.index == 0) {
			Ti.Media.vibrate();
			if (Ti.Platform.osname == 'android') {
				Titanium.Android.currentActivity.finish();
			} else {
				mainWindow.close();
			}
		} else {
			//Cerrar alert
		}
	});

	buttonClose.addEventListener('click', function(e) {
		ventanaAlert.show();
	});

	//mainWindow.removeEventListener('android:back', e.callback);

	mainWindow.addEventListener('android:back', function(e) {
		ventanaAlert.show();
	});

	/*Ti.Facebook.addEventListener('login', function(e) {
	 if (e.success) {
	 alert("login");
	 } else {
	 if (e.error) {
	 alert(e.error);
	 }
	 }
	 });

	 Ti.Facebook.addEventListener('logout', function(e) {
	 alert('Logged out');
	 });*/

	info.hide();

	return mainWindow;
}

module.exports = MainWindow;

