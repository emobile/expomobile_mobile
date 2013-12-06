function DetalleWindow(Window, day) {
	var network = require('lib/network');

	var exposiciones;
	var contenedor;
	var totalExposiciones;
	var exposicionActual = 0;

	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();

	expDetWdw = Titanium.UI.createWindow({
		tabBarHidden : true,
		backgroundImage : '/images/background.png',
		width : '100%',
		height : '100%',
		layout : 'composite',
		fullscreen: pantallaCompleta,
		navBarHidden: true
	});

	scrollView = Titanium.UI.createView({
		id : "scrollView",
		backGroundColor : 'transparent',
		height : Ti.UI.SIZE,
		width : '100%',
		layout : 'vertical',
		top:80
	});

	function cerrarDetalle()
	{
		Ti.Media.vibrate();
		expDetWdw.close();
	}
	
	var templates = require('templates');
	var topBar = templates.getTopBar(L('exhibitions'),'/images/iconexposiciones.png', cerrarDetalle);

	bottomBar = Titanium.UI.createView({
		id : "bottomBar",
		backgroundColor : "transparent",
		height : Ti.UI.SIZE,
		width : '100%',
		bottom : "5",
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

	buttonPrev = Titanium.UI.createImageView({
		id : "buttonPrev",
		image : "/images/previous.png",
		width : 48,
		height : 48,
		top : "0%",
		left : "68"
	});

	buttonNext = Titanium.UI.createImageView({
		id : "buttonNext",
		image : "/images/next.png",
		width : 48,
		height : 48,
		top : "0%",
		right : "68"
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
		height : Ti.UI.SIZE,
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
		right : '5%'
	});

	line = Ti.UI.createView({
		width : '100%',
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
		color : '#798d8d',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
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
		color : '#798d8d',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
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
		color : '#798d8d',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
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
		color : '#798d8d',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	buttonPrev.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		if (exposicionActual > 0) 
		{
			exposicionActual--;
			populateViews();
		}
	});

	buttonNext.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		if (exposicionActual < totalExposiciones - 1)
		{ 
			exposicionActual++;
			populateViews();
		}
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

	expDetWdw.addEventListener('load', function(){
		textFieldExposicion.blur();
	});
	
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

	expDetWdw.add(topBar);
	expDetWdw.add(scrollView);

	bottomBar.add(buttonFirst);
	bottomBar.add(buttonLast);
	bottomBar.add(buttonPrev);
	bottomBar.add(buttonNext);

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
	
	buttonPrev.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		if (exposicionActual > 0) 
		{
			exposicionActual--;
			populateViews();
		}
	});

	buttonNext.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		if (exposicionActual < totalExposiciones - 1)
		{ 
			exposicionActual++;
			populateViews();
		}
	});
	
	function formatDate(date) {
		var arrayDate = date.substring(0, 10).split("-");
		var formattedDate = arrayDate[2] + "-" + arrayDate[1] + "-" + arrayDate[0];
		return formattedDate;
	}

	expDetWdw.addEventListener('android:back', function() {
		Ti.Media.vibrate();
		expDetWdw.close();
	});

	return expDetWdw;
}

module.exports = DetalleWindow;

