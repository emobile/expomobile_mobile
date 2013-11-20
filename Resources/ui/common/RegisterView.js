function RegisterView() {

	var network = require('lib/network');

	var imageViewLogo = null;

	var textFieldRegistro = null;

	var buttonRegistro = null;

	var scrollView_1 = null;

	var registerVw = null;

	registerVw = Titanium.UI.createView({
		tabBarHidden : true,
		backgroundColor : "white",
		layout : 'vertical',
		height : Ti.UI.SIZE
	});

	var labelPaso = Titanium.UI.createLabel({
		id : "labelPaso",
		height : 'auto',
		width : 'auto',
		text : L('step1'),
		font : {
			fontSize : '20dp'
		},
		color : 'white'
	});

	var createAttachChWindow = function() {

		createAttachChScrollView_1();

		registerVw.add(imageViewBar);

		registerVw.add(scrollView_1);

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
	
	var labelIndicaciones = Titanium.UI.createLabel({
		id : "labelIndicaciones",
		height : 'auto',
		width : 'auto',
		text : L('indications'),
		font : {
			fontSize : '12dp'
		},
		color : 'gray',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	var createAttachChScrollView_1 = function() {

		createScrollView_1();

		createImageViewBar();

		createImageViewLogo();

		scrollView_1.add(imageViewLogo);

		createTextFieldRegistro();

		scrollView_1.add(textFieldRegistro);

		createbuttonRegistro();

		scrollView_1.add(labelIndicaciones);
		scrollView_1.add(buttonRegistro);
		scrollView_1.add(buttonSalir);

	};

	var createbuttonRegistro = function() {

		buttonRegistro = Titanium.UI.createImageView({
			id : "buttonregistro",
			widht : '95%',
			top : 10
		});

		buttonSalir = Titanium.UI.createImageView({
			id : "buttonSalir",
			widht : '95%',
			top : 5
		});

		if (L("language") == "es") {
			buttonRegistro.image = "/images/buttonregistrologin.png";
			buttonSalir.image = "/images/buttonsalir.png";
		} else {
			buttonRegistro.image = "/images/buttonregistrologin_e.png";
			buttonSalir.image = "/images/buttonsalir_e.png";
		}
	};

	var createTextFieldRegistro = function() {

		textFieldRegistro = Titanium.UI.createTextField({
			hintText : L('register_number'),
			id : "textFieldRegistro",
			autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_ALL,
			width : '60%',
			top : 0,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		
		textFieldRegistro.focus();

	};

	var createImageViewLogo = function() {

		imageViewLogo = Titanium.UI.createImageView({
			id : "imageViewLogo",
			image : "/images/anadic.png",
			height : 235,
			top : 15,
			width : 178
			//verticalAlign : 'center'
		});

	};

	var createImageViewBar = function() {

		imageViewBar = Titanium.UI.createView({
			id : "imageViewBar",
			backgroundColor : Ti.App.Properties.getString('viewcolor'),
			height : '40',
			left : 0,
			top : 0,
			width : '100%'
		});

		imageViewBar.add(labelPaso);

	};

	createAttachChWindow();

	buttonRegistro.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		var registroValue = textFieldRegistro.value;
		if (registroValue != "") {
		network.getRegistro(textFieldRegistro.value, function(response) {
			if (response.sent == 'ok') {
				//response.group_name + "','" +
				var db = Ti.Database.open('anadicDB');
				db.execute("INSERT INTO users VALUES (1,'" + textFieldRegistro.value + "','" + response.name +  "','" +  response.group_name + "','" + response.subgroup_name + "','" + response.subgroup_leader + "', '" +
													 response.enterprise + "', '" + response.phone + "', '" + response.address + "');");
				db.close();

				var Window;
				var mainWindow = require("ui/handheld/NipWindow");
				new mainWindow(Window).open();

			}
			//else {
				//if (response != false) {
					//alert(response.msg);
				//}
			//}
		});
		} else {
		alert(L("empty_register"));
		}
	});

	var alert = Titanium.UI.createAlertDialog({
		title : L('tittlealert'),
		message : L('closeapp'),
		buttonNames : [L('yes'), L('no')]
	});

	alert.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		
		if(Ti.Platform.osname == 'android')
		{
			Titanium.Android.currentActivity(); 
			activity.finish();
		}
		else
		{
			createAttachChWindow.close();
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

	return registerVw;
}

module.exports = RegisterView;

