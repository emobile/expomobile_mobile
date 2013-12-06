
function InfoWindow(args) {
	var width = '92%', height = '90%';

	var args = args || {};
	var top = args.top || '3%';
	
	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();

	infoWdw = Titanium.UI.createWindow({
		height : '100%',
		width: '100%',
		navBarHidden: true,
		backgroundColor : 'transparent',
		fullscreen: pantallaCompleta,
		//touchEnabled : false
		//backgroundColor : '#000',
		opacity : 1.0
	});
	
	blackwindow = Titanium.UI.createView({
		height : Ti.UI.SIZE,
		width : width,
		borderRadius : 10,
		//touchEnabled : false,
		backgroundColor : '#000',
		opacity : 0.8,
		center : {
			y : '50%'
		},
		layout:'vertical',
		bottom: '10dp'
	});

	imageViewPrincipal = Titanium.UI.createImageView({
		height : 76,
		top : 0,
		width : 76,
		image : "/images/calendar.png",
		center : {
			x : '50%'
		}
	});

	buttonClose = Titanium.UI.createImageView({
		id : "buttonClose",
		image : "/images/close.png",
		width : 30,
		height : 30,
		right : 10,
		top : '10dp'
	});

	scrollView = Titanium.UI.createScrollView({
		width : '100%',
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent',
		layout : 'vertical'
	});

	labelHeader = Titanium.UI.createLabel({
		text : "Titulo",
		height : Ti.UI.SIZE,
		font : {
			fontSize : '18dp',
			fontWeight : 'bold'
		},
		color : 'white',
		top : '0',
		center : {
			x : '50%'
		},
		width: Ti.UI.SIZE,
		left: '5%',
		right: '10dp'
	});

	labelCampos = Titanium.UI.createLabel({
		text : "Campos",
		height : Ti.UI.SIZE,
		left : '5%',
		width : '90%',
		font : {
			fontSize : '16dp'
		},
		color : 'white',
		top : 10
	});

	/*labelDatos = Titanium.UI.createLabel({
	 text : "Detalle",
	 height : Ti.UI.SIZE,
	 right : 10,
	 width : '40%',
	 font : {
	 fontSize : '16dp',
	 color: '#DDD',
	 },
	 color : 'white',
	 top:0
	 });*/

	viewLinea = Titanium.UI.createView({
		width : '90%',
		height : 1,
		backgroundColor : 'white',
		bottom : 2,
		left : '5%'
	});

	viewTop = Titanium.UI.createView({
		width : '100%',
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent',
		layout: 'vertical'
	});

	viewContainer = Titanium.UI.createView({
		width : '100%',
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent',
		layout : 'horizontal',
		bottom: '5%'
	});

	viewTop.add(buttonClose);
	viewTop.add(imageViewPrincipal);
	viewTop.add(labelHeader);
	viewTop.add(viewLinea);
	viewContainer.add(labelCampos);
	//viewContainer.add(labelDatos);

	blackwindow.add(viewTop);
	blackwindow.add(viewContainer);
	
	scrollView.add(blackwindow);
	
	//scrollView.add(viewTop);
	//scrollView.add(viewContainer);

	infoWdw.add(scrollView);

	//var datos;

	/*function openView(datos)
	 {
	 //datos = parDatos;
	 var camposDisplay = "";
	 var infoDisplay = "";
	 for(var prop in datos)
	 {
	 /*var mayorLong = prop.length;

	 if(datos[prop].length > mayorLong)
	 mayorLong = datos[prop].length;

	 var noLineas = mayorLong / 12)

	 camposDisplay += prop + ":\n\n";
	 infoDisplay += datos[prop] + "\n\n";

	 }
	 labelCampos.text = camposDisplay;
	 labelDatos.text = infoDisplay;
	 infoWdw.open();
	 }*/

	function openView(datos) {
		var camposDisplay = "";
		var infoDisplay = "";
		var esElTitulo = true;
		for (var prop in datos) {
			if (esElTitulo) {
				labelHeader.text = datos[prop];
				esElTitulo = false;
			} else {
				camposDisplay += prop + ": " + datos[prop] + "\n";
			}
			/*infoDisplay += datos[prop] + "\n\n";*/
		}
		labelCampos.text = camposDisplay;
		//labelDatos.text = infoDisplay;
		infoWdw.open();
	}


	infoWdw.openView = openView;

	function closeView() {
		infoWdw.close();
	}


	infoWdw.closeView = closeView;

	buttonClose.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		closeView();
	});

	infoWdw.addEventListener('android:back', function(e) {
		Ti.Media.vibrate();
		closeView();
	});

	return infoWdw;
}

exports.InfoWindow = InfoWindow;
