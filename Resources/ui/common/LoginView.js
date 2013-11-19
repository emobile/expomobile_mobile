function LoginView() {

	var network = require('lib/network');

	var usuario = '';

	var db = Ti.Database.open('anadicDB');
	var id = db.execute('SELECT name FROM users WHERE userId = 1;');
	

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
	
	var loginView = Titanium.UI.createView({
		tabBarHidden : true,
		backgroundColor : "black",
		width : '100%',
		layout : 'vertical',
		height : Ti.UI.SIZE
	});

	var labelUsuario = Titanium.UI.createLabel({
		id : "labelUsuario",
		height : 'auto',
		width : '90%',
		text : L('welcome') + ' ' + usuario + '!!!',
		font : {
			fontSize : '18dp'
		},
		color : '#798d8d',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	var createAttachChWindow = function() {

		createAttachChScrollView_1();

		loginView.add(imageViewBar);

		loginView.add(scrollView_1);

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

		createTextFieldRegistro();

		scrollView_1.add(textFieldRegistro);

		createbuttons();

		scrollView_1.add(buttonIngresar);

		scrollView_1.add(buttonCorreo);

		scrollView_1.add(buttonSalir);
	};

	var createbuttons = function() {

		buttonIngresar = Titanium.UI.createImageView({
			id : "buttonIngresar",
			width : '95%',
			top : 10
		});

		buttonCorreo = Titanium.UI.createImageView({
			id : "buttonCorreo",
			width : '95%',
			top : 5
		});

		buttonSalir = Titanium.UI.createImageView({
			id : "buttonSalir",
			width : '95%',
			top : 5
		});

		if (L("language") == "es") {
			buttonIngresar.image = "/images/buttoningresar.png";
			buttonCorreo.image = "/images/buttoncorreo.png";
			buttonSalir.image = "/images/buttonsalir.png";
		} else {
			buttonIngresar.image = "/images/buttoningresar_e.png";
			buttonCorreo.image = "/images/buttoncorreo_e.png";
			buttonSalir.image = "/images/buttonsalir_e.png";
		}

	};

	var createTextFieldRegistro = function() {

		textFieldRegistro = Titanium.UI.createTextField({
			hintText : L('nip'),
			id : "textFieldRegistro",
			//value : "uja1",
			width : '60%',
			passwordMask : true,
			top:'10',
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		
		textFieldRegistro.focus();

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

	};

	createAttachChWindow();

	buttonIngresar.addEventListener('click', function(e) {
		Ti.Media.vibrate();

		//if (!textFieldRegistro.value == '') {
		var db = Ti.Database.open('anadicDB');
		var id = db.execute('SELECT id FROM users WHERE userId = 1;');
		
		network.getNip(id.fieldByName('id'), textFieldRegistro.value, function(response) {
			if (response.access == 'ok') {
				textFieldRegistro.blur();
				var Window;
				var mainWindow = require("ui/handheld/MainWindow");
				new mainWindow(Window).open();

			} 
			//else if (response.access == 'no') {
				//alert(response.msg);
			//}
		});
		
		db.close();

		//} else {
		//alert(L('empty'));
		//}
	});

	buttonCorreo.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		Ti.Platform.openURL("http://www.google.com");
	});


	var alert = Titanium.UI.createAlertDialog({
		title : L('tittlealert'),
		message : L('closeapp'),
		buttonNames : [L('yes'), L('no')]
	});
	
	alert.addEventListener('click', function(e) {
		if (e.index == 0) {
			Ti.Media.vibrate();
			
			if(Ti.Platform.osname == 'android')
			{
				Titanium.Android.currentActivity.finish(); 
			}
			else
			{
				//createAttachChWindow.close();
				loginView.getParent().close();
			}
		}
	});

	buttonSalir.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		alert.show();
	});

	//Quitar focus
	var first = true;
	textFieldRegistro.addEventListener('focus', function f(e) {
		if (first) {
			first = false;
			textFieldRegistro.blur();
		} else {
			textFieldRegistro.removeEventListener('focus', f);
		}
	});

	return loginView;
}

module.exports = LoginView;

