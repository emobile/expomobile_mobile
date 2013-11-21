function RegistroWindow(Window) {

	var contactoWindow = require("ui/common/ContactoWindow");

	registroWdw = Titanium.UI.createWindow({
		tabBarHidden : true,
		backgroundColor : "white",
		width : '100%',
		height : 'auto',
		layout : 'vertical',
		fullscreen: false,
		navBarHidden: true
	});

	var colorFontLabel = 'black';
	var colorFontText = 'gray';

	var db = Ti.Database.open('anadicDB');
	var usuario = db.execute('SELECT id, enterprise, address, phone, group_name, subgroup_name FROM users WHERE userId = 1;');

	scrollView = Titanium.UI.createScrollView({
		id : "scrollView",
		backgroundImage : '/images/background.png',
		height : 'auto',
		width : '100%',
		layout : 'vertical'
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
		image : "/images/iconregistro.png",
		width : 60,
		height : 60,
		top : 7,
		right : 3
	});

	labelTitulo = Titanium.UI.createLabel({
		id : "labelTitulo",
		height : 'auto',
		width : '70%',
		text : L('register'),
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

	labelEmpresa = Titanium.UI.createLabel({
		id : "labelEmpresa",
		height : 'auto',
		width : '70%',
		text : L('enterprise'),
		font : {
			fontSize : '16dp'
		},
		color : colorFontLabel,
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		top : '10px'
	});

	textEmpresa = Titanium.UI.createTextArea({
		id : "textEmpresa",
		value : usuario.fieldByName("enterprise"),
		height : Ti.UI.SIZE,
		width : '70%',
		font : {
			fontSize : '16dp'
		},
		color : colorFontText,
		enabled : 'false'
	});

	labelTelefono = Titanium.UI.createLabel({
		id : "labelTelefono",
		height : 'auto',
		width : '70%',
		text : L('telephone'),
		font : {
			fontSize : '16dp'
		},
		color : colorFontLabel,
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT
	});

	textTelefono = Titanium.UI.createTextArea({
		id : "textTelefono",
		value : usuario.fieldByName("phone"),
		height : Ti.UI.SIZE,
		width : '70%',
		font : {
			fontSize : '16dp'
		},
		color : colorFontText,
		enabled : 'false'
	});

	labelDireccion = Titanium.UI.createLabel({
		id : "labelDireccion",
		height : 'auto',
		width : '70%',
		text : L('address'),
		font : {
			fontSize : '16dp'
		},
		color : colorFontLabel,
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT
	});

	textDireccion = Titanium.UI.createTextArea({
		id : "textDireccion",
		value : usuario.fieldByName("address"),
		height : Ti.UI.SIZE,
		width : '70%',
		font : {
			fontSize : '16dp'
		},
		color : colorFontText,
		enabled : 'false'
	});
	
	labelGrupo = Titanium.UI.createLabel({
		id : "labelGrupo",
		height : 'auto',
		width : '70%',
		text : L('grupo'),
		font : {
			fontSize : '16dp'
		},
		color : colorFontLabel,
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT
	});

	textGrupo = Titanium.UI.createTextArea({
		id : "textSubgrupo",
		value : usuario.fieldByName("group_name"),
		height : Ti.UI.SIZE,
		width : '70%',
		font : {
			fontSize : '16dp'
		},
		color : colorFontText,
		enabled : 'false'
	});
	
	labelSubgrupo = Titanium.UI.createLabel({
		id : "labelSubgrupo",
		height : 'auto',
		width : '70%',
		text : L('subgrupo'),
		font : {
			fontSize : '16dp'
		},
		color : colorFontLabel,
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT
	});

	textSubgrupo = Titanium.UI.createTextArea({
		id : "textSubgrupo",
		value : usuario.fieldByName("subgroup_name"),
		height : Ti.UI.SIZE,
		width : '70%',
		font : {
			fontSize : '16dp'
		},
		color : colorFontText,
		enabled : 'false'
	});

	buttonSugerencias = Titanium.UI.createButton({
		id : "buttonSugerencias",
		height : 'auto',
		width : '70%',
		title : L('suggestions'),
		font : {
			fontSize : '18dp'
		},
		color : 'blue',
		top : '10px',
		systemButton: Ti.UI.iPhone.SystemButton.CANCEL
	});

	db.close();
	usuario.close();

	scrollView.add(labelEmpresa);
	scrollView.add(textEmpresa);
	scrollView.add(labelTelefono);
	scrollView.add(textTelefono);
	scrollView.add(labelDireccion);
	scrollView.add(textDireccion);
	scrollView.add(labelGrupo);
	scrollView.add(textGrupo);
	scrollView.add(labelSubgrupo);
	scrollView.add(textSubgrupo);
	scrollView.add(buttonSugerencias);

	imageViewBar.add(imageView);
	imageViewBar.add(labelTitulo);
	imageViewBar.add(buttonClose);

	registroWdw.add(imageViewBar);
	registroWdw.add(scrollView);

	buttonSugerencias.addEventListener('click', function(e) {

		var db = Ti.Database.open('anadicDB');
		db.execute('CREATE TABLE IF NOT EXISTS rating(rateId INTEGER PRIMARY KEY, rate TEXT);');
		var row = db.execute('SELECT rate FROM rating WHERE rateId = 1;');
		db.close();

		if (row.isValidRow()) {
			alert(L("qualified") + "\n" + L("qualified2") + " " + row.fieldByName("rate"));
			row.close();

		} else {
			row.close();
			//var contactoView = contactoWindow.ContactoWindow();
			//contactoView.openView();
			
			//var Window;
			var contactoWindow = require("/ui/common/ContactoWindow");
			new contactoWindow.ContactoWindow();
		}

	});

	buttonClose.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		registroWdw.close();
	});

	registroWdw.addEventListener('android:back', function(e) {
		Ti.Media.vibrate();
		registroWdw.close();
	});

	return registroWdw;
}

module.exports = RegistroWindow;

