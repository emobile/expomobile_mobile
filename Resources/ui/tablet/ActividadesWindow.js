function ActividadesWindow(Window) {

	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();

	var actWdw = Titanium.UI.createWindow({
		tabBarHidden : true,
		backgroundColor : "white",
		width : '100%',
		height : '100%',
		layout : 'vertical',
		fullscreen: pantallaCompleta,
		navBarHidden: true
	});

	var table = Ti.UI.createTableView({
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

	function cerrarActividades()
	{
		Ti.Media.vibrate();
		actWdw.close();
	}
	
	var templates = require('templates');
	var topBar = templates.getTopBar(L('activities'),'/images/iconactividades.png', cerrarActividades);

	actWdw.add(topBar);
	actWdw.add(scrollView_1);

	function populateTable() {
		var data = [];

		var row = Titanium.UI.createTableViewRow({
			id : 2,
			title : L('schedules'),
			leftImage : '/images/horarios.png',
			isparent : true,
			opened : false,
			hasChild : true,
			sub : [{
				id : "horariosexpositores",
				left : '15%',
				title : L("exhibitors"),
				font : {
					fontSize : '20dp'
				},
				color : '#424242'
			}, {
				id : "horariosconferencias",
				left : '15%',
				title : L("conferences"),
				font : {
					fontSize : '20dp'
				},
				color : '#424242'
			}],
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
		if (e.rowData.id == 2) 
		{
			var network = require('lib/network');
			network.getData(network.SERVICES.ACTIVITIES_DAYS, function(response)
			{
				if(response.length == 0) 
				{
					Ti.UI.createAlertDialog({
					message: L('no_actividades'),
					ok: L('ok'),
					title: L('alert_title')
					}).show();
				}	
	    		else if(response.length > 0) 
				{
					var Window;
					var mainWindow = require("ui/handheld/actividades/HorariosWindow");
					new mainWindow(response,Window).open();
				}
	    		else 
				{
					//error de conexion
				}	
			}); 
			
		} else if (e.rowData.id == 3) {
			var Window;
			var mainWindow = require("ui/handheld/mapa/MapaWindow");
			new mainWindow(Window).open();
		}
		/*if (e.row.isparent) {
		 if (e.row.opened) {
		 for (var i = e.row.sub.length; i > 0; i = i - 1) {
		 table.deleteRow(e.index + i);
		 }
		 e.row.opened = false;
		 } else {
		 var currentIndex = e.index;
		 for (var i = 0; i < e.row.sub.length; i++) {
		 table.insertRowAfter(currentIndex, e.row.sub[i]);
		 currentIndex++;
		 }
		 e.row.opened = true;
		 }
		 } else {
		 if (e.row.id == 'directorioexpositores') {
		 var Window;
		 var mainWindow = require("ui/exposiciones/DirectorioWindow");
		 new mainWindow(Window).open();
		 } else if (e.row.id == 'directorioconferencias') {
		 var Window;
		 var mainWindow = require("ui/conferencias/DirectorioWindow");
		 new mainWindow(Window).open();
		 } else if (e.row.id == 'horariosexpositores') {
		 var Window;
		 var mainWindow = require("ui/exposiciones/HorariosWindow");
		 new mainWindow(Window).open();
		 } else if (e.row.id == 'horariosconferencias') {
		 var Window;
		 var mainWindow = require("ui/conferencias/HorariosWindow");
		 new mainWindow(Window).open();
		 }
		 }*/
	});

	actWdw.addEventListener('android:back', function(e) {
		Ti.Media.vibrate();
		actWdw.close();
	});

	return actWdw;
}

module.exports = ActividadesWindow;

