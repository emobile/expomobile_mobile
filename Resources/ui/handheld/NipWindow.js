function NipWindow(Window) {

	var network = require('lib/network');

	var usuario = '';
	var nip = '';

	var db = Ti.Database.open('anadicDB');
	var id = db.execute('SELECT name FROM users WHERE userId = 1;');

	db.execute('CREATE TABLE IF NOT EXISTS nip(nipId INTEGER PRIMARY KEY, nipNumber TEXT);');
	var nipNumber = db.execute('SELECT nipNumber FROM nip WHERE nipId = 1;');

	if (nipNumber.isValidRow()) {
		nip = nipNumber.fieldByName('nipNumber');
	}
	
	nipNumber.close();

	if (id.isValidRow()) {
		usuario = id.fieldByName('name');
		id.close();
		if (usuario === 'undefined' || usuario == 'null') {
			usuario = '';
		}
	} else {
		usuario = '';
	}

	db.close();

	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();

	var nipWindow = Titanium.UI.createWindow({
		tabBarHidden : true,
		backgroundColor : "black",
		width : '100%',
		layout : 'vertical',
		height : Ti.UI.SIZE,
		fullscreen: pantallaCompleta,
		navBarHidden:true
	});

	var labelPaso = Titanium.UI.createLabel({
		id : "labelPaso",
		height : 'auto',
		width : 'auto',
		text : L('step2'),
		font : {
			fontSize : '20dp',
			fontWeight: 'bold'
		},
		color : 'white'
	});

	var labelUsuario = Titanium.UI.createLabel({
		id : "labelUsuario",
		height : 'auto',
		width : '90%',
		text : L('welcome') + ' ' + usuario + '!!',
		font : {
			fontSize : '20dp'
		},
		color : '#798d8d',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	var labelNIP = Titanium.UI.createLabel({
		id : "labelNIP",
		height : 'auto',
		width : '90%',
		text : L('nip_mail'),
		font : {
			fontSize : '14dp'
		},
		color : '#798d8d',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	var createAttachChWindow = function() {

		createAttachChScrollView_1();

		nipWindow.add(imageViewBar);

		nipWindow.add(scrollView_1);

	};

	var createScrollView_1 = function() {

		scrollView_1 = Titanium.UI.createScrollView({
			id : "scrollView_1",
			backgroundImage : '/images/background.png',
			height : '100%',
			left : 0,
			top : 0,
			width : '100%',
			layout : 'vertical'
		});

	};

	var createAttachChScrollView_1 = function() {

		createScrollView_1();

		createImageViewBar();

		createImageViewLogo();

		scrollView_1.add(imageViewLogo);

		scrollView_1.add(labelUsuario);

		scrollView_1.add(labelNIP);

		createtextFieldNip();

		scrollView_1.add(textFieldNip);

		createbuttons();

		scrollView_1.add(buttonIngresar);

		//scrollView_1.add(buttonCorreo);

		scrollView_1.add(buttonAtras);

	};

	var createbuttons = function() {

		buttonIngresar = Titanium.UI.createImageView({
			id : "buttonIngresar",
			width : Ti.UI.SIZE,
			top : 10
		});

		buttonCorreo = Titanium.UI.createImageView({
			id : "buttonCorreo",
			width : '95%',
			top : 5
		});

		buttonAtras = Titanium.UI.createImageView({
			id : "buttonAtras",
			width : Ti.UI.SIZE,
			top : 5
		});

		if (L("language") == "es") {
			buttonIngresar.image = "/images/buttoningresar.png";
			buttonCorreo.image = "/images/buttoncorreo.png";
			buttonAtras.image = "/images/buttonsalir.png";
		} else {
			buttonIngresar.image = "/images/buttoningresar_e.png";
			buttonCorreo.image = "/images/buttoncorreo_e.png";
			buttonAtras.image = "/images/buttonsalir_e.png";
		}

	};

	var createtextFieldNip = function() {

		textFieldNip = Titanium.UI.createTextField({
			hintText : "Ingresar NIP",
			id : "textFieldNip",
			width : '60%',
			passwordMask : true,
			value : nip,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
		});

		if (nip != '') {
			textFieldNip.value = nip;
		}

	};

	var createImageViewLogo = function() {

		imageViewLogo = Titanium.UI.createImageView({
			id : "imageViewLogo",
			image : "/images/anadic.png",
			height : 235,
			top : 10,
			width : 178,
			verticalAlign : 'center'
		});

	};

	var createImageViewBar = function() {

		imageViewBar = Titanium.UI.createView({
			id : "imageViewBar",
			backgroundColor : Ti.App.Properties.getString('viewcolor'),
			height : 40,
			left : 0,
			top : 0,
			width : '100%'
		});

		imageViewBar.add(labelPaso);

	};

	createAttachChWindow();
	
	if (nip != '') {
			textFieldNip.value = nip;
		}

	buttonIngresar.addEventListener('click', function(e) {
		Ti.Media.vibrate();

		if (!textFieldNip.value == '') {
			var db = Ti.Database.open('anadicDB');
			var id = db.execute('SELECT id FROM users WHERE userId = 1;');

			network.getNip(id.fieldByName('id'), textFieldNip.value, function(response) {
				if (response.access == 'ok') {

					var db = Ti.Database.open('anadicDB');
					var nipNumber = db.execute('SELECT nipNumber FROM nip WHERE nipId = 1;');

					if (!nipNumber.isValidRow()) {
						db.execute('INSERT INTO nip VALUES (1, "' + textFieldNip.value + '");');
					}

					nipNumber.close();
					db.close();

					textFieldNip.blur();
					var Window;
					var mainWindow = require("ui/handheld/MainWindow");
					new mainWindow(Window).open();

				}
				//else {
				//if (response != false) {
				//alert(response.msg);
				//}
				//}
			});

			db.close();

		} else {
			Ti.UI.createAlertDialog({
				message : response.msg,
				ok : L('empty'),
				title : L('alert_title')
			}).show();
		}

	});

	buttonCorreo.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		Ti.Platform.openURL("http://www.google.com");
	});

	//Quitar focus
	var first = true;
	textFieldNip.addEventListener('focus', function f(e) {
		if (first) {
			first = false;
			textFieldNip.blur();
		} else {
			textFieldNip.removeEventListener('focus', f);
		}
	});

	var ventanaAlert = Titanium.UI.createAlertDialog({
		title : L('alert_title'),
		message : L('closeapp'),
		buttonNames : [L('yes'), L('no')]
	});

	ventanaAlert.addEventListener('click', function(e) {
		if (e.index == 0) {
			Ti.Media.vibrate();
			Titanium.Android.currentActivity.finish();
		}
	});

	buttonAtras.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		ventanaAlert.show();
	});

	nipWindow.addEventListener('android:back', function() {
		Ti.Media.vibrate();
		ventanaAlert.show();
	});

	return nipWindow;
}

module.exports = NipWindow;
