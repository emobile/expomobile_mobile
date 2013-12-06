function ExpositoresWindow(Window, expositorId, rowName, rowImage) {

	var network = require('lib/network');
	
	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();
	
	var espacio_vertical = 0;

	winExpW = Titanium.UI.createWindow({
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
		height : '70%',
		width : '100%',
		layout : 'vertical'
	});

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
		left : "10"
	});
	
	buttonPrev = Titanium.UI.createImageView({
		id : "buttonPrev",
		image : "/images/previous.png",
		width : 48,
		height : 48,
		top : "0%",
		left : "68"
	});

	buttonLast = Titanium.UI.createImageView({
		id : "buttonLast",
		image : "/images/buttonfinal.png",
		width : 48,
		height : 48,
		top : "0%",
		right : "10"
	});
	
	buttonNext = Titanium.UI.createImageView({
		id : "buttonNext",
		image : "/images/next.png",
		width : 48,
		height : 48,
		top : "0%",
		right : "68"
	});

	var ofertas;
	var contenedor;
	var totalOfertas;
	var ofertaActual = 0;

	if (expositorId == 0) {
		network.getAllOffers(function(response) {
			ofertas = response;
			totalOfertas = ofertas.length;
			populateViews();
		});
	} else {
		network.getOffers(expositorId, function(response) {
			ofertas = response;
			totalOfertas = ofertas.length;
			populateViews();
		});
	}

	contenedor = Titanium.UI.createView({
		backgroundColor : "transparent",
		width : '100%',
		height : Ti.UI.SIZE,
		layout : 'composite',
		top: 200
	});

	labelCuentaOfertas = Titanium.UI.createLabel({
		id : "labelCuentaOfertas",
		height : Ti.UI.SIZE,
		width : '100%',
		font : {
			fontWeight : 'bold',
			fontSize : '18dp'
		},
		color : '#2c2c2c',
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		right: '10',
		top:'0'
	});

	labelExpositorTitulo = Titanium.UI.createLabel({
		id : "labelExpositorTitulo",
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		text : L('exhibitor'),
		top: 100,
		left : 10,
		font : {
			fontWeight : 'bold',
			fontSize : '18dp'
		},
		color : 'black'
	});

	viewExpositor = Titanium.UI.createView({
		id : 'viewExpositor',
		height : Ti.UI.SIZE,
		width : '100%',
		layout : 'composite',
		left : 0,
		top: 80
	});

	labelExpositor = Titanium.UI.createLabel({
		id : "labelExpositor",
		height : 'auto',
		width : 'auto',
		font : {
			fontSize : '20dp',
			fontWeight : 'bold'
		},
		color : '#686868',
		top : 100,
		right : 10
	});

	imageViewExpositor = Titanium.UI.createImageView({
		id : "imageViewExpositor",
		image : "images/unavailable.jpg",
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		left : '10',
		top: '25',
		bottom: '30'
	});

	line = Ti.UI.createView({
		width : '100%',
		height : 1,
		backgroundColor : 'black',
		anchorPoint : {
			x : 0,
			y : 0
		},
		top : 5,
		left: 10,
		right: 10
	});

	labelDescripcionTitulo = Titanium.UI.createLabel({
		id : "labelDescripcionTitulo",
		height : 'auto',
		width : 'auto',
		text : L('description'),
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : 'black',
		left : 10,
		top: espacio_vertical + 5
	});

	labelDescripcion = Titanium.UI.createTextArea({
		id : "labelDescripcion",
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		font : {
			fontSize : '20dp',
			fontWeight : 'bold'
		},
		color : '#686868',
		width : '65%',
		height : 140,
		left : 10,
		top: espacio_vertical + 30,
		editable: false,
		borderRadius: '10',
		scrollsToTop: true
	});
	
	scrollText = Titanium.UI.createScrollView({
		width : 180,
		height : 95,
		left : 10,
		top: espacio_vertical + 30,
		borderColor: '#444444',
		borderWidth: 1,
		backgroundColor: '#FFFFFF'
	});

	labelPrecioTitulo = Titanium.UI.createLabel({
		id : "labelPrecio",
		height : 'auto',
		width : 'auto',
		text : L('price'),
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : 'black',
		right : 10,
		top: espacio_vertical + 5
	});

	labelPrecio = Titanium.UI.createLabel({
		id : "labelPrecio",
		height : 'auto',
		width : 'auto',
		font : {
			fontWeight : 'bold',
			fontSize : '24dp'
		},
		color : '#686868',
		right : 10,
		top: espacio_vertical + 20
	});

	labelUbicacionTitulo = Titanium.UI.createLabel({
		id : "labelUbicacionTitulo",
		height : 'auto',
		width : 'auto',
		text : L('location'),
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : 'black',
		right : 10,
		top: espacio_vertical + 95
	});

	labelUbicacion = Titanium.UI.createLabel({
		id : "labelUbicacion",
		height : 'auto',
		width : 'auto',
		font : {
			fontSize : '18dp'
		},
		color : '#686868',
		right : 10,
		top: espacio_vertical + 115
	});

	labelFechaInicioTitulo = Titanium.UI.createLabel({
		id : "labelFechaInicioTitulo",
		height : 'auto',
		width : 'auto',
		text : L('start_time'),
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : 'black',
		left : '10',
		top: espacio_vertical + 180
	});

	labelFechaInicio = Titanium.UI.createLabel({
		id : "labelFechaInicio",
		height : 'auto',
		width : 'auto',
		font : {
			fontSize : '18dp'
		},
		color : '#686868',
		left : '20',
		top: espacio_vertical + 200
	});

	labelFechaTerminoTitulo = Titanium.UI.createLabel({
		id : "labelFechaTerminoTitulo",
		height : 'auto',
		width : 'auto',
		text : L('end_time'),
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : 'black',
		top : espacio_vertical + 180,
		right: '10'
	});

	labelFechaTermino = Titanium.UI.createLabel({
		id : "labelFechaTermino",
		height : 'auto',
		width : 'auto',
		font : {
			fontSize : '18dp'
		},
		color : '#686868',
		right : '10',
		top: espacio_vertical + 200
	});
	
	function cerrarExpWin()
	{
		Ti.Media.vibrate();
		winExpW.close();
	}
	
	var templates = require('templates');
	var topBar = templates.getTopBar(L('offers'),'/images/iconofertas.png', cerrarExpWin);

	
	viewExpositor.add(imageViewExpositor);
	viewExpositor.add(labelExpositor);
	viewExpositor.add(labelCuentaOfertas);
	viewExpositor.add(labelExpositorTitulo);
	
	contenedor.add(line);
	contenedor.add(labelDescripcionTitulo);
	//scrollText.add(labelDescripcion);
	contenedor.add(labelDescripcion);
	contenedor.add(labelPrecioTitulo);
	contenedor.add(labelPrecio);
	contenedor.add(labelUbicacionTitulo);
	contenedor.add(labelUbicacion);
	contenedor.add(labelFechaInicioTitulo);
	contenedor.add(labelFechaInicio);
	contenedor.add(labelFechaTerminoTitulo);
	contenedor.add(labelFechaTermino);

	function populateViews() {
		if (totalOfertas > 0) {

			//Si es igual a cero mostrara todas las ofertas
			if (expositorId == 0) 
			{
				var db = Ti.Database.open('anadicDB');
				var rows = db.execute("SELECT mobile_logo_url FROM exhibitors WHERE name='" + ofertas[ofertaActual].exhibitor_name + "'");
				
				if (rows.isValidRow()) 
				{
					if (isNaN(rows.fieldByName('mobile_logo_url')))
					{
						imageViewExpositor.image = 'http://' + Ti.App.Properties.getString('hostname') + rows.fieldByName('mobile_logo_url');
					}
				}
				rows.close();
				db.close();
			} else {
				imageViewExpositor.image = rowImage;
			}

			precio = ofertas[ofertaActual].price.split(".");

			labelCuentaOfertas.text = ofertaActual + 1 + " " + L('of') + " " + totalOfertas;
			labelExpositor.text = ofertas[ofertaActual].exhibitor_name;
			labelDescripcion.value = ofertas[ofertaActual].description;
			labelUbicacion.text = ofertas[ofertaActual].location;
			labelPrecio.text = "$" + precio[0];
			labelFechaInicio.text = formatDate(ofertas[ofertaActual].start_date);
			labelFechaTermino.text = formatDate(ofertas[ofertaActual].end_date);

			//info.hide();
		} else//No encontro ofertas
		{
			labelNoHayOfertas = Titanium.UI.createLabel({
				id : "labelNoHayOfertas",
				height : 'auto',
				width : 'auto',
				text : L('nooffers'),
				font : {
					fontWeight : 'bold',
					fontSize : '20dp'
				},
				color : 'black',
				top : 20
			});

			scrollView.add(labelNoHayOfertas);
		}
	}

	bottomBar.add(buttonFirst);
	bottomBar.add(buttonPrev);
	bottomBar.add(buttonNext);
	bottomBar.add(buttonLast);

	winExpW.add(topBar);
	winExpW.add(viewExpositor);
	winExpW.add(contenedor);
	winExpW.add(bottomBar);

	buttonFirst.addEventListener('click', function(e) {
		cambiarOferta(0);
	});

	buttonLast.addEventListener('click', function(e) {
		cambiarOferta(totalOfertas - 1);
	});
	
	buttonPrev.addEventListener('click', function(e) {
		if (ofertaActual > 0) 
			cambiarOferta(ofertaActual - 1);
		else
			Ti.Media.vibrate();
	});
	
	buttonNext.addEventListener('click', function(e) {
		if (ofertaActual < totalOfertas - 1) 
			cambiarOferta(ofertaActual + 1);
		else
			Ti.Media.vibrate();
	});
	

	function cambiarOferta(idOferta)
	{
		Ti.Media.vibrate();
		ofertaActual = idOferta;
		populateViews();
	}

	function limpiarVistas() {
		scrollView.getChildren().forEach(function(vista) {
			scrollView.remove(vista);
		});
		contenedor.getChildren().forEach(function(vista) {
			contenedor.remove(vista);
		});
	}

	function formatDate(date) {
		var arrayDate = date.substring(0, 10).split("-");
		var formattedDate = arrayDate[2] + "-" + arrayDate[1] + "-" + arrayDate[0];
		return formattedDate;
	}

	winExpW.addEventListener('android:back', function(e) {
		Ti.Media.vibrate();
		winExpW.close();
	});

	return winExpW;
}

module.exports = ExpositoresWindow;

