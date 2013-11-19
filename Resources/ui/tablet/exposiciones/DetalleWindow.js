function DetalleWindow(Window, day) {
	var network = require('lib/network');

	var exposiciones;
	var contenedor;
	var totalExposiciones;
	var exposicionActual = 0;

	expDetWdw = Titanium.UI.createWindow({
		tabBarHidden : true,
		backgroundImage : '/images/background.png',
		width : '100%',
		height : '100%',
		layout : 'vertical'
	});

	scrollView = Titanium.UI.createView({
		id : "scrollView",
		backGroundColor : 'transparent',
		height : '70%',
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
		image : "/images/iconexposiciones.png",
		width : 60,
		height : 60,
		top : 7,
		right : 3
	});
	imageViewBar.add(imageView);

	labelTitulo = Titanium.UI.createLabel({
		id : "labelTitulo",
		height : 'auto',
		width : '70%',
		text : L('exhibitions'),
		font : {
			fontSize : '22dp'
		},
		color : 'white',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	imageViewBar.add(labelTitulo);

	buttonClose = Titanium.UI.createImageView({
		id : "buttonClose",
		image : "/images/close.png",
		width : 30,
		height : 30,
		top : 25
	});
	imageViewBar.add(buttonClose);

	bottomBar = Titanium.UI.createView({
		id : "bottomBar",
		backgroundColor : "transparent",
		height : '10%',
		width : '100%',
		top : "-1px",
		left : 0
	});

	buttonFirst = Titanium.UI.createImageView({
		id : "buttonFirst",
		image : "/images/buttonfirst.png",
		width : 48,
		height : 48,
		top : "0%",
		left : "10px"
	});

	viewSlide = Titanium.UI.createImageView({
		id : "buttonMiddle",
		image : "/images/swipefinger.png",
		width : 48,
		height : 48,
		center : {
			x : '50%',
			y : '0%'
		}
	});

	buttonLast = Titanium.UI.createImageView({
		id : "buttonLast",
		image : "/images/buttonfinal.png",
		width : 48,
		height : 48,
		top : "0%",
		right : "10px"
	});

	contenedor = Titanium.UI.createScrollView({
		backgroundColor : "transparent",
		width : '100%',
		height : '100%',
		layout : 'vertical'
	});

	labelCuentaExposiciones = Titanium.UI.createLabel({
		id : "labelExposiciones",
		height : 'auto',
		width : 'auto',
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : '#2c2c2c',
		left : '75%'
	});

	line = Ti.UI.createView({
		width : '90%',
		height : 1,
		backgroundColor : 'black',
		anchorPoint : {
			x : 0,
			y : 0
		},
		top : 3,
		bottom : 3
	});

	labelExposicionTitulo = Titanium.UI.createLabel({
		id : "labelExposicionTitulo",
		height : 'auto',
		width : 'auto',
		text : L('exhibition'),
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : 'black'
	});

	textFieldExposicion = Titanium.UI.createTextField({
		id : "textFieldExposicion",
		width : '90%',
		enabled : false,
		font : {
			fontWeight : 'bold',
			fontSize : '18dp'
		},
		color : '#798d8d'
	});
	
	labelHora = Titanium.UI.createLabel({
		id : "labelHora",
		height : 'auto',
		width : 'auto',
		text : L('hour'),
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : 'black'
	});

	textFieldHora = Titanium.UI.createTextField({
		id : "textFieldHora",
		width : '90%',
		enabled : false,
		font : {
			fontWeight : 'bold',
			fontSize : '18dp'
		},
		color : '#798d8d'
	});

	labelFechaInicio = Titanium.UI.createLabel({
		id : "labelFechaInicio",
		height : 'auto',
		width : 'auto',
		text : L('start_time'),
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : 'black'
	});

	textFieldFechaInicio = Titanium.UI.createTextField({
		id : "textFieldFechaInicio",
		width : '90%',
		enabled : false,
		font : {
			fontWeight : 'bold',
			fontSize : '18dp'
		},
		color : '#798d8d'
	});

	labelFechaTermino = Titanium.UI.createLabel({
		id : "labelFechaTermino",
		height : 'auto',
		width : 'auto',
		text : L('end_time'),
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : 'black'
	});

	textFieldFechaTermino = Titanium.UI.createTextField({
		id : "textFieldFechaTermino",
		width : '90%',
		enabled : false,
		font : {
			fontWeight : 'bold',
			fontSize : '18dp'
		},
		color : '#798d8d'
	});

	contenedor.add(labelCuentaExposiciones);
	contenedor.add(line);
	contenedor.add(labelExposicionTitulo);
	contenedor.add(textFieldExposicion);
	contenedor.add(labelHora);
	contenedor.add(textFieldHora);
	contenedor.add(labelFechaInicio);
	contenedor.add(textFieldFechaInicio);
	contenedor.add(labelFechaTermino);
	contenedor.add(textFieldFechaTermino);

	scrollView.add(contenedor);

	var alert = Titanium.UI.createAlertDialog({
		title : L('tittlealert'),
		message : L('noexhibitions'),
		buttonNames : [L('ok')]
	});

	function populateViews() {
		if (totalExposiciones > 0) {

			labelCuentaExposiciones.text = exposicionActual + 1 + " " + L('of') + " " + totalExposiciones;
			textFieldExposicion.value = exposiciones[exposicionActual].name;
			textFieldHora.value = exposiciones[exposicionActual].start_hour + " - " + exposiciones[exposicionActual].end_hour;
			textFieldFechaInicio.value = exposiciones[exposicionActual].start_day;
			textFieldFechaTermino.value = exposiciones[exposicionActual].end_day;

		} else {
			alert.show();
		}
	}

	network.getExpositions(day, function(response) {
		exposiciones = response;
		totalExposiciones = exposiciones.length;

		populateViews();
	});

	expDetWdw.add(imageViewBar);
	expDetWdw.add(scrollView);

	bottomBar.add(buttonFirst);
	bottomBar.add(viewSlide);
	bottomBar.add(buttonLast);

	expDetWdw.add(bottomBar);

	alert.addEventListener('click', function(e) {
		if (e.index == 0) {
			var Window;
			var mainWindow = require("ui/handheld/ExposicionesWindow");
			new mainWindow(Window).open();
		}
	});

	buttonFirst.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		exposicionActual = 0;
		populateViews();
	});

	buttonLast.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		exposicionActual = totalExposiciones - 1;
		populateViews();
	});

	function formatDate(date) {
		var arrayDate = date.substring(0, 10).split("-");
		var formattedDate = arrayDate[2] + "-" + arrayDate[1] + "-" + arrayDate[0];
		return formattedDate;
	}

	scrollView.addEventListener('swipe', function(e) {
		if (e.direction == 'left') {
			if (exposicionActual < totalExposiciones - 1) {
				exposicionActual++;
				populateViews();
			} else {
				Ti.Media.vibrate();
			}
		} else if (e.direction == 'right') {
			if (exposicionActual > 0) {
				exposicionActual--;
				populateViews();
			} else {
				Ti.Media.vibrate();
			}
		}
	});

	buttonClose.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		expDetWdw.close();
	});

	expDetWdw.addEventListener('android:back', function() {
		Ti.Media.vibrate();
		expDetWdw.close();
	});

	return expDetWdw;
}

module.exports = DetalleWindow;

