function ExposicionesWindow(Window) {
	var network = require('lib/network');

	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();

	expoWdw = Titanium.UI.createWindow({
		tabBarHidden : true,
		backgroundColor : "white",
		width : '100%',
		height : '100%',
		layout : 'vertical',
		fullscreen: pantallaCompleta,
		navBarHidden: true
	});

	table = Ti.UI.createTableView({
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

	function cerrarExpo()
	{
		Ti.Media.vibrate();
		expoWdw.close();
	}
	
	var templates = require('templates');
	var topBar = templates.getTopBar(L('exhibitions'),'/images/iconexposiciones.png', cerrarExpo);

	scrollView_1.add(table);
	expoWdw.add(topBar);
	expoWdw.add(scrollView_1);

	function populateTable() {
		var data = [];

		var row = Titanium.UI.createTableViewRow({
			id : 1,
			title : L('directory'),
			leftImage : '/images/directorio.png',
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
			title : L('schedules'),
			leftImage : '/images/horarios.png',
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

		var row = Titanium.UI.createTableViewRow({
			id : 4,
			title : L("register_visit"),
			leftImage : '/images/miqrcode.png',
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
			network.getExhibitors(false ,function(response) {
				if (response != false) {
					var Window;
					var mainWindow = require("ui/handheld/exposiciones/DirExposWindow");
					//var mainWindow = require("ui/handheld/exposiciones/DirectorioWindow");
					new mainWindow(Window).open();
				}
			});
		} else if (e.rowData.id == 2) {
			network.getExpositionDays(function(response) {
				if (response != false) {
					var Window;
					var mainWindow = require("ui/handheld/exposiciones/HorariosWindow");
					new mainWindow(Window, response).open();
				}
			});
		} else if (e.rowData.id == 3) {
			var Window;
			var mainWindow = require("ui/handheld/mapa/MapaWindow");
			new mainWindow(Window).open();
		} else if (e.rowData.id == 4) {
			if (Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad') 
			{
				var w = Titanium.UI.createWindow({
				  url:'ui/handheld/QRReaderIOSWindow.js',
				  win_name: 'exposiciones'
				});
				
				w.open();
			} 
			else {
				var Window;
				var mainWindow = require("ui/handheld/QrReaderWindow");
				new mainWindow(Window, 'exposiciones').open();
			}
		}
	});

	buttonClose.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		expoWdw.close();
	});

	expoWdw.addEventListener('android:back', function(e) {
		Ti.Media.vibrate();
		expoWdw.close();
	});

	return expoWdw;
}

module.exports = ExposicionesWindow;

