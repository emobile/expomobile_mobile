function LoginView() 
{
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

		if (Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad')
		{
			//boton salir solo para android
		}
		else
		{
			scrollView_1.add(buttonSalir);
		}
		
	};

	var createbuttons = function() {

		buttonIngresar = Titanium.UI.createImageView({
			id : "buttonIngresar",
			width : Ti.UI.SIZE,
			height: Ti.UI.SIZE,
			top : 10
		});

		buttonSalir = Titanium.UI.createImageView({
			id : "buttonSalir",
			width : Ti.UI.SIZE,
			height: Ti.UI.SIZE,
			top : 5
		});
		
		if (L("language") == "es") {
			buttonIngresar.image = "/images/buttoningresar.png";
			buttonSalir.image = "/images/buttonsalir.png";
		} else {
			buttonIngresar.image = "/images/buttoningresar_e.png";
			buttonSalir.image = "/images/buttonsalir_e.png";
		}

	};

	var createTextFieldRegistro = function() {

		textFieldRegistro = Titanium.UI.createTextField({
			hintText : L('nip'),
			id : "textFieldRegistro",
			width : '250dp',
			passwordMask : true,
			top:'10',
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
			//enabled: false
		});
		
		var db = Ti.Database.open('anadicDB');
		db.execute('CREATE TABLE IF NOT EXISTS nip(nipId INTEGER PRIMARY KEY, nipNumber TEXT)');
		var nipNumber = db.execute('SELECT nipNumber FROM nip WHERE nipId = 1;');

		var nip = '';

		if (nipNumber.isValidRow()) {
			nip = nipNumber.fieldByName('nipNumber');
		}
		
		textFieldRegistro.value = nip;
		textFieldRegistro.focus();
		
		nipNumber.close();

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

		if (!textFieldRegistro.value == '') 
		{
			var db = Ti.Database.open('anadicDB');
			var id = db.execute('SELECT id FROM users WHERE userId = 1;');
			
			network.getNip(id.fieldByName('id'), textFieldRegistro.value, function(response) {
				if (response.access == 'ok') {
					/*textFieldRegistro.blur();
					var Window;
					var mainWindow = require("ui/handheld/MainWindow");
					new mainWindow(Window).open();*/
					
					var db = Ti.Database.open('anadicDB');
					var nipNumber = db.execute('SELECT nipNumber FROM nip WHERE nipId = 1;');

					if (!nipNumber.isValidRow()) {
						db.execute('INSERT INTO nip VALUES (1, "' + textFieldRegistro.value + '");');
					}

					nipNumber.close();
					db.close();

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

		} else 
		{
			Ti.UI.createAlertDialog({
				message: L('empty'),
				title: L('alert_title'),
				ok: L('ok')
			});
		}
	});

	var ventanaAlert = Titanium.UI.createAlertDialog({
		title : L('tittlealert'),
		message : L('closeapp'),
		buttonNames : [L('yes'), L('no')]
	});
	
	ventanaAlert.addEventListener('click', function(e) {
		if (e.index == 0) {
			Ti.Media.vibrate();
			
			if(Ti.Platform.osname == 'android')
			{
				Titanium.Android.currentActivity.finish(); 
			}
			else
			{
				loginView.getParent().close();
			}
		}
	});

	buttonSalir.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		ventanaAlert.show();
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

