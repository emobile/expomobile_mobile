function OfertasWindow(Window) {

	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();

	windowOfertas = Titanium.UI.createWindow({
		tabBarHidden : true,
		backgroundColor : "white",
		width : '100%',
		height : '100%',
		layout : 'vertical',
		oldWin:Ti.currentWindow,
		fullscreen: pantallaCompleta,
		navBarHidden: true
	});

	table = Ti.UI.createTableView({
		top : 10,
		width : '90%',
		height : '100%'
	});

	scrollView_1 = Titanium.UI.createView({
		id : "scrollView_1",
		backgroundImage : '/images/background.png',
		height : '100%',
		width : '100%',
		layout : 'vertical'
	});

	scrollView_1.add(table);

	function cerrarOfertas()
	{
		Ti.Media.vibrate();
		windowOfertas.close();
	}
	
	var templates = require('templates');
	var topBar = templates.getTopBar(L('offers'),'/images/iconofertas.png', cerrarOfertas);

	windowOfertas.add(topBar);
	windowOfertas.add(scrollView_1);

	function populateTable() {
		var data = [];

		var row = Titanium.UI.createTableViewRow({
			id : 1,
			title : L('byexhibitor'),
			leftImage : '/images/expositor.png',
			isparent : true,
			opened : false,
			hasChild : false,
			font : {
				fontSize : '22dp'
			},
			color : 'black'
		});
		data.push(row);

		var row = Titanium.UI.createTableViewRow({
			id : 2,
			title : L('alloffers'),
			leftImage : '/images/expositores.png',
			isparent : true,
			opened : false,
			hasChild : false,
			font : {
				fontSize : '22dp'
			},
			color : 'black'
		});
		data.push(row);

		var row = Titanium.UI.createTableViewRow({
			id : 3,
			title : L('map'),
			leftImage : '/images/mapa.png',
			isparent : true,
			opened : false,
			hasChild : false,
			font : {
				fontSize : '22dp'
			},
			color : 'black'
		});
		data.push(row);

		table.setData(data);
	}

	populateTable();

	table.addEventListener('click', function(e) {
		if (e.rowData.id == 1) {
			var Window;
			var mainWindow = require("ui/handheld/ofertas/OpcionesExpositorWindow");
			new mainWindow(Window).open();
		} else if (e.rowData.id == 2) {
			var Window;
			var mainWindow = require("ui/handheld/ofertas/ExpositoresWindow");
			new mainWindow(Window, 0, 0, 0).open();
		} else if (e.rowData.id == 3) {
			var Window;
			var mainWindow = require("ui/handheld/mapa/MapaWindow");
			new mainWindow(Window).open();
		}
	});

	windowOfertas.addEventListener('android:back', evento = function(e){
	    e.source.removeEventListener('android:back', arguments.callee);
	    cerrarOfertas();
	});
	return windowOfertas;
}

module.exports = OfertasWindow;

