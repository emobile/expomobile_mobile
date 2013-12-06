function DetalleWindow(Window, day) {
	
	var network = require('lib/network');

	var usuario = '';

	var db = Ti.Database.open('anadicDB');
	var id = db.execute('SELECT name FROM users WHERE userId = 1;');
	

	if (id.isValidRow()) {
		usuario = id.fieldByName('name');
		
		if (usuario === 'undefined' || usuario == 'null') {
			usuario = '';
		}
	} else {
		usuario = '';
	}

	id.close();
	db.close();

	var citas;
	var contenedor;
	var totalCitas;
	var citaActual = 0;
	
	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();

	faceDetWdw = Titanium.UI.createWindow({
		tabBarHidden : true,
		backgroundImage : '/images/background.png',
		width : '100%',
		height : '100%',
		layout : 'composite',
		fullscreen: pantallaCompleta,
		navBarHidden: true
	});

	faceDetWdw.addEventListener('load', function(){
		textFieldEntrevista.blur();
	});
	
	scrollView = Titanium.UI.createView({
		id : "scrollView",
		backGroundColor : 'transparent',
		height : Ti.UI.SIZE,
		width : '100%',
		layout : 'vertical',
		top: '80'
	});

	function cerrarDetalleWdw()
	{
		Ti.Media.vibrate();
		faceDetWdw.close();
	}
	
	var templates = require('templates');
	var topBar = templates.getTopBar(L('facetoface'),'/images/iconfacetoface.png', cerrarDetalleWdw);

	bottomBar = Titanium.UI.createView({
		id : "bottomBar",
		backgroundColor : "transparent",
		height : Ti.UI.SIZE,
		width : '100%',
		bottom: '5'
	});

	buttonFirst = Titanium.UI.createImageView({
		id : "buttonFirst",
		image : "/images/buttonfirst.png",
		width : 48,
		height : 48,
		top : "0%",
		left : "10px"
	});

	/*viewSlide = Titanium.UI.createImageView({
		id : "buttonMiddle",
		image : "/images/swipefinger.png",
		width : 48,
		height : 48,
		center : {
			x : '50%',
			y : '50%'
		}
	});*/

	buttonLast = Titanium.UI.createImageView({
		id : "buttonLast",
		image : "/images/buttonfinal.png",
		width : 48,
		height : 48,
		top : "0%",
		right : "10px"
	});

	contenedor = Titanium.UI.createView({
		backgroundColor : "transparent",
		width : '100%',
		height : Ti.UI.SIZE,
		layout : 'vertical'
			});

	labelCuentaCitas = Titanium.UI.createLabel({
		id : "labelCuentaCitas",
		height : 'auto',
		width : 'auto',
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : '#2c2c2c',
		right : '5%'
	});

	labelSocioTitulo = Titanium.UI.createLabel({
		id : "labelSocioTitulo",
		height : 'auto',
		width : 'auto',
		text : L('partner'),
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : 'black',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	labelSocio = Titanium.UI.createLabel({
		id : "labelSocio",
		height : 'auto',
		width : 'auto',
		text : usuario,
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : '#798d8d',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
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

	labelEntrevistaTitulo = Titanium.UI.createLabel({
		id : "labelEntrevistaTitulo",
		height : 'auto',
		width : 'auto',
		text : L('interview'),
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : 'black'
	});

	textFieldEntrevista = Titanium.UI.createTextField({
		id : "textFieldEntrevista",
		width : '90%',
		enabled : false,
		font : {
			fontWeight : 'bold',
			fontSize : '18dp'
		},
		color : '#798d8d',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	labelEmpresaTitulo = Titanium.UI.createLabel({
		id : "labelEmpresaTitulo",
		height : 'auto',
		width : 'auto',
		text : L('enterprise'),
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : 'black'
	});

	textFieldEmpresa = Titanium.UI.createTextField({
		id : "textFieldEmpresa",
		width : '90%',
		enabled : false,
		font : {
			fontWeight : 'bold',
			fontSize : '18dp'
		},
		color : '#798d8d',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	labelEmailTitulo = Titanium.UI.createLabel({
		id : "labelEmailTitulo",
		height : 'auto',
		width : 'auto',
		text : L('email'),
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : 'black'
	});

	textFieldEmail = Titanium.UI.createTextField({
		id : "textFieldEmail",
		width : '90%',
		enabled : false,
		font : {
			fontWeight : 'bold',
			fontSize : '18dp'
		},
		color : '#798d8d'
	});

	labelTelefonoTitulo = Titanium.UI.createLabel({
		id : "labelTelefonoTitulo",
		height : 'auto',
		width : 'auto',
		text : L('telephone'),
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : 'black'
	});

	textFieldTelefono = Titanium.UI.createTextField({
		id : "textFieldPhone",
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

	contenedor.add(labelCuentaCitas);
	contenedor.add(labelSocioTitulo);
	contenedor.add(labelSocio);
	contenedor.add(line);
	contenedor.add(labelEntrevistaTitulo);
	contenedor.add(textFieldEntrevista);
	contenedor.add(labelEmpresaTitulo);
	contenedor.add(textFieldEmpresa);
	contenedor.add(labelTelefonoTitulo);
	contenedor.add(textFieldTelefono);
	contenedor.add(labelFechaInicio);
	contenedor.add(textFieldFechaInicio);
	contenedor.add(labelFechaTermino);
	contenedor.add(textFieldFechaTermino);

	scrollView.add(contenedor);

	var alert = Titanium.UI.createAlertDialog({
		title : L('nodates'),
		message : L("schedule_appointment"),
		buttonNames : [L('ok')]
	});

	function populateViews() {
		if (totalCitas > 0) {

			labelCuentaCitas.text = citaActual + 1 + " " + L('of') + " " + totalCitas;
			textFieldEntrevista.value = citas[citaActual].int_name;
			textFieldEmpresa.value = citas[citaActual].int_social_reason;
			//textFieldEmail.value = citas[citaActual].app_email;
			textFieldTelefono.value = citas[citaActual].attendee_phone;
			textFieldFechaInicio.value = formatDate(citas[citaActual].start_date);
			textFieldFechaTermino.value = formatDate(citas[citaActual].end_date);

		} else {
			alert.show();
		}
	}

	network.getFacetoFace(day, function(response) {
		citas = response;
		totalCitas = citas.length;
		populateViews();
	});

	faceDetWdw.add(topBar);
	faceDetWdw.add(scrollView);

	bottomBar.add(buttonFirst);
	bottomBar.add(buttonPrev);
	bottomBar.add(buttonNext);
	bottomBar.add(buttonLast);

	faceDetWdw.add(bottomBar);

	alert.addEventListener('click', function(e) {
		if (e.index == 0) {
			var Window;
			var mainWindow = require("ui/handheld/FaceToFaceWindow");
			new mainWindow(Window).open();
		}
	});

	buttonFirst.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		citaActual = 0;
		populateViews();
	});

	buttonLast.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		citaActual = totalCitas - 1;
		populateViews();
	});
	
	buttonPrev.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		if (citaActual > 0) 
		{
			citaActual--;
			populateViews();
		}
	});

	buttonNext.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		if (citaActual < totalCitas - 1)
		{ 
			citaActual++;
			populateViews();
		}
	});

	function formatDate(date) {
		var arrayDate = date.substring(0, 10).split("-");
		var hora = date.substring(11, 16).split("-");
		var formattedDate = arrayDate[2] + "-" + arrayDate[1] + "-" + arrayDate[0] + "  "+hora;
		return formattedDate;
	}

	faceDetWdw.addEventListener('android:back', function() {
		Ti.Media.vibrate();
		faceDetWdw.close();
	});

	return faceDetWdw;
}

module.exports = DetalleWindow;

