function HorariosWindow(Window, days) {
	var network = require('lib/network');
	var totalCitas;
	var citaActual = 0;
	
	var diasSemana = L('weekDays').split(',');
	var nomMeses = L('months').split(',');

	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();

	faceHorWdw = Titanium.UI.createWindow({
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

	function cerrarFaceHorWdw()
	{
		Ti.Media.vibrate();
		faceHorWdw.close();
	}
	
	var templates = require('templates');
	var topBar = templates.getTopBar(L('facetoface'),'/images/horarios_blanco.png', cerrarFaceHorWdw);
	
	faceHorWdw.add(topBar);
	faceHorWdw.add(scrollView_1);

	var dias;

	function populateTable(days) {
		var data = [];

		dias = days;

		for (var i = 0; i < days.length; i++) 
		{
			var fecha = days[i].split("/");
			var formateada = new Date(fecha[2], fecha[1] - 1, fecha[0]);
			var titulo = diasSemana[formateada.getDay()] + " " + formateada.getDate() + " - " + nomMeses[formateada.getMonth()];
			
			var row = Titanium.UI.createTableViewRow({
				id : i,
				title : titulo,
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
		var mainWindow = require("ui/handheld/facetoface/DetalleWindow");
		new mainWindow(Window, dias[e.index]).open();
	});

	faceHorWdw.addEventListener('android:back', function(e) {
		Ti.Media.vibrate();
		faceHorWdw.close();
	});

	return faceHorWdw;
}

module.exports = HorariosWindow;

