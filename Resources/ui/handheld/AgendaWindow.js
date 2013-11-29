function AgendaWindow(Window) {

	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();

	agendaWdw = Titanium.UI.createWindow({
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

	scrollView_1.add(table);

	function cerrarAgenda()
	{
		Ti.Media.vibrate();
		agendaWdw.close();
	}
	
	var templates = require('templates');
	var topBar = templates.getTopBar(L('diary'),'/images/iconagenda.png', cerrarAgenda);

	agendaWdw.add(topBar);
	agendaWdw.add(scrollView_1);

	function populateTable() {
		var data = [];

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

		table.setData(data);
	}

	populateTable();

	table.addEventListener('click', function(e) {
		if (e.rowData.id == 2) 
		{
			var network = require('lib/network');
			network.getData(network.SERVICES.DIARIES_DAYS, function(response)
			{
				if(response.length == 0) 
				{
					Ti.UI.createAlertDialog({
					message: L('no_eventos'),
					ok: L('ok'),
					title: L('alert_title')
					}).show();
				}	
	    		else if(response.length > 0) 
				{
					var Window;
					var mainWindow = require("ui/handheld/agenda/HorariosWindow");
					new mainWindow(response, Window).open();
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
	});

	agendaWdw.addEventListener('android:back', function(e) {
		Ti.Media.vibrate();
		agendaWdw.close();
	});

	return agendaWdw;
}

module.exports = AgendaWindow;

