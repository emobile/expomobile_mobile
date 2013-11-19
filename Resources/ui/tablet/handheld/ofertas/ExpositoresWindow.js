function ExpositoresWindow(Window, expositorId, rowName, rowImage) {

	var network = require('lib/network');
	//var ANActivityIndicator = require('ui/common/ANActivityIndicator');
	//var info = new ANActivityIndicator(L('loading'));

	winExpW = Titanium.UI.createWindow({
		tabBarHidden : true,
		backgroundImage : '/images/background.png',
		width : '100%',
		height : '100%',
		layout : 'vertical',
		fullscreen: false,
		navBarHidden: true
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
			y : '50%'
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
		layout : 'composite'
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
		right: '10px',
		top:'0px'
	});

	labelExpositorTitulo = Titanium.UI.createLabel({
		id : "labelExpositorTitulo",
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		text : L('exhibitor'),
		top: 35,
		right : 10,
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
		top:0
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
		top : 55,
		right : 10
	});

	imageViewExpositor = Titanium.UI.createImageView({
		id : "imageViewExpositor",
		image : "images/unavailable.jpg",
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		left : '10px',
		top: '10px'
	});

	line = Ti.UI.createView({
		width : '90%',
		height : 1,
		backgroundColor : 'black',
		anchorPoint : {
			x : 0,
			y : 0
		},
		top : 80,
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
		top: 90
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
		left : 10,
		top: 110
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
		top: 90
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
		top: 110
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
		left : 10,
		top: 150
	});

	labelUbicacion = Titanium.UI.createLabel({
		id : "labelUbicacion",
		height : 'auto',
		width : 'auto',
		font : {
			fontSize : '18dp'
		},
		color : '#686868',
		left : 10,
		top: 170
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
		top: '210'
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
		top: '230'
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
		top : '210',
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
		top: '230'
	});

	viewExpositor.add(imageViewExpositor);
	viewExpositor.add(labelExpositor);
	viewExpositor.add(labelCuentaOfertas);
	viewExpositor.add(labelExpositorTitulo);
	
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
			//info.show();
			
			/*var toast = Titanium.UI.createNotification({
			    duration: Ti.UI.NOTIFICATION_DURATION_LONG,
			    message: L('loading'),
			});
			
			toast.show();
			
			var indicatorWindow = require('ui/common/CreateIndicatorWindow');
			var indicator = indicatorWindow.CreateIndicatorWindow();
			indicator.openIndicator();*/
			

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
			labelDescripcion.text = ofertas[ofertaActual].description;
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
		winExpW.close();
	});

	winExpW.addEventListener('android:back', function(e) {
		Ti.Media.vibrate();
		winExpW.close();
		
	});

	return winExpW;
}

module.exports = ExpositoresWindow;

