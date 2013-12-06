function HorariosWindow(Window, days) {
	var network = require('lib/network');
	var totalExposiciones;
	var exposicionActual = 0;

	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();

	var diasSemana = L('weekDays').split(',');
    var nomMeses   = L('months').split(',');

	expHorWdw = Titanium.UI.createWindow({
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

	scrollView_1 = Titanium.UI.createScrollView({
		id : "scrollView_1",
		backgroundImage : '/images/background.png',
		height : '100%',
		width : '100%',
		layout : 'vertical'
	});

	scrollView_1.add(table);

	function cerrarExpHor()
	{
		Ti.Media.vibrate();
		expHorWdw.close();
	}
	
	var templates = require('templates');
	var topBar = templates.getTopBar(L('exhibitions'),'/images/horarios_blanco.png', cerrarExpHor);
	
	expHorWdw.add(topBar);
	expHorWdw.add(scrollView_1);
	
	var dias;

	function populateTable(days) {
		var data = [];

		dias = days;

		for (var i = 0; i < days.length; i++) 
		{
			var fecha =days[i].split("/");
			var formateada = new Date(fecha[2], fecha[1] - 1, fecha[0]);
			var titulo = diasSemana[formateada.getDay()] +" "+formateada.getDate() + " - "+ nomMeses[formateada.getMonth()];
			
			var row = Titanium.UI.createTableViewRow({
				id : i,
				title :titulo,
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
		}

		table.setData(data);
	}

	populateTable(days);

	table.addEventListener('click', function(e) {
		var Window;
		var mainWindow = require("ui/handheld/exposiciones/DetalleWindow");
		new mainWindow(Window, dias[e.index]).open();
	});

	expHorWdw.addEventListener('android:back', function(e) {
		cerrarExpHor();
	});

	return expHorWdw;
}

module.exports = HorariosWindow;

