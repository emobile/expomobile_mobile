function ExpositoresWindow(Window, expositorId, rowName, rowImage) {

	var network = require('lib/network');
	var ANActivityIndicator = require('ui/common/ANActivityIndicator');
	var info = new ANActivityIndicator(L('loading'));

	winExpW = Titanium.UI.createWindow({
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
		image : "/images/iconofertas.png",
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
		text : L('offers'),
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

	contenedor = Titanium.UI.createScrollView({
		backgroundColor : "transparent",
		width : '100%',
		height : '100%',
		layout : 'vertical'
	});

	labelCuentaOfertas = Titanium.UI.createLabel({
		id : "labelCuentaOfertas",
		height : 'auto',
		width : 'auto',
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : '#2c2c2c',
		left : '75%'
	});

	labelExpositorTitulo = Titanium.UI.createLabel({
		id : "labelExpositorTitulo",
		height : 'auto',
		width : 'auto',
		text : L('exhibitor'),
		left : 35,
		font : {
			fontWeight : 'bold',
			fontSize : '20dp'
		},
		color : 'black'
	});

	viewExpositor = Titanium.UI.createView({
		id : 'viewExpositor',
		height : Ti.UI.SIZE,
		width : '100%',
		layout : 'horizontal',
		left : 35
	});

	labelExpositor = Titanium.UI.createLabel({
		id : "labelExpositor",
		height : 'auto',
		width : 'auto',
		font : {
			fontSize : '22dp',
			fontWeight : 'bold'
		},
		color : '#686868',
		top : 5,
		left : 25
	});

	imageViewExpositor = Titanium.UI.createImageView({
		id : "imageViewExpositor",
		image : "images/unavailable.jpg",
		width : 60,
		height : 60,
		center : {
			x : '50%',
			y : '50%'
		},
		left : '40%'
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
		left : 35
	});

	labelDescripcion = Titanium.UI.createLabel({
		id : "labelDescripcion",
		height : 'auto',
		width : 'auto',
		font : {
			fontSize : '20dp',
			fontWeight : 'bold'
		},
		color : '#686868',
		left : 55
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
		left : 35
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
		left : 55
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
		left : 35
	});

	labelUbicacion = Titanium.UI.createLabel({
		id : "labelUbicacion",
		height : 'auto',
		width : 'auto',
		font : {
			fontSize : '18dp'
		},
		color : '#686868',
		left : 55
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
		left : '50%'
	});

	labelFechaInicio = Titanium.UI.createLabel({
		id : "labelFechaInicio",
		height : 'auto',
		width : 'auto',
		font : {
			fontSize : '18dp'
		},
		color : '#686868',
		left : '50%'
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
		left : '50%'
	});

	labelFechaTermino = Titanium.UI.createLabel({
		id : "labelFechaTermino",
		height : 'auto',
		width : 'auto',
		font : {
			fontSize : '18dp'
		},
		color : '#686868',
		left : '50%'
	});

	viewExpositor.add(labelExpositor);
	viewExpositor.add(imageViewExpositor);

	contenedor.add(labelCuentaOfertas);
	contenedor.add(labelExpositorTitulo);
	contenedor.add(viewExpositor);
	contenedor.add(line);
	contenedor.add(labelDescripcionTitulo);
	contenedor.add(labelDescripcion);
	contenedor.add(labelPrecioTitulo);
	contenedor.add(labelPrecio);
	contenedor.add(labelUbicacionTitulo);
	contenedor.add(labelUbicacion);
	contenedor.add(labelFechaInicioTitulo);
	contenedor.add(labelFechaInicio);
	contenedor.add(labelFechaTerminoTitulo);
	contenedor.add(labelFechaTermino);

	scrollView.add(contenedor);

	function populateViews() {
		if (totalOfertas > 0) {
			info.show();

			if (expositorId == 0) {
				var db = Ti.Database.open('anadicDB');
				var rows = db.execute("SELECT mobile_logo_url FROM exhibitors WHERE name='" + ofertas[ofertaActual].exhibitor_name + "'");
				if (rows.isValidRow()) {
					if (!isNaN(rows.fieldByName('mobile_logo_url'))){
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
			labelDescripcion.text = ofertas[ofertaActual].description;
			labelUbicacion.text = ofertas[ofertaActual].location;
			labelPrecio.text = "$" + precio[0];
			labelFechaInicio.text = formatDate(ofertas[ofertaActual].start_date);
			labelFechaTermino.text = formatDate(ofertas[ofertaActual].end_date);

			info.hide();
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


	winExpW.add(imageViewBar);
	winExpW.add(scrollView);

	bottomBar.add(buttonFirst);
	bottomBar.add(viewSlide);
	bottomBar.add(buttonLast);

	winExpW.add(bottomBar);

	buttonFirst.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		ofertaActual = 0;

		//limpiarVistas();
		populateViews();
	});

	buttonLast.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		ofertaActual = totalOfertas - 1;

		//limpiarVistas();
		populateViews();
	});

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


	scrollView.addEventListener('swipe', function(e) {
		if (e.direction == 'left') {
			if (ofertaActual < totalOfertas - 1) {
				ofertaActual++;
				//limpiarVistas();
				populateViews();
			} else {
				Ti.Media.vibrate();
			}
		} else if (e.direction == 'right') {
			if (ofertaActual > 0) {
				ofertaActual--;
				//limpiarVistas();
				populateViews();
			} else {
				Ti.Media.vibrate();
			}
		}
	});

	buttonClose.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		/*var Window;
		var mainWindow = require("ui/handheld/OfertasWindow");
		new mainWindow(Window).open();*/
		winExpW.close();
	});

	winExpW.addEventListener('android:back', function(e) {
		Ti.Media.vibrate();
		/*var Window;
		var mainWindow = require("ui/handheld/OfertasWindow");
		new mainWindow(Window).open();*/
		winExpW.close();
		
	});

	return winExpW;
}

module.exports = ExpositoresWindow;

