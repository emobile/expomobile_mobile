function HorariosWindow(Window, days) {
	var network = require('lib/network');
	var totalExposiciones;
	var exposicionActual = 0;

	var diasSemana = L('weekDays').split(',');
    var nomMeses   = L('months').split(',');

	expHorWdw = Titanium.UI.createWindow({
		tabBarHidden : true,
		backgroundColor : "white",
		width : '100%',
		height : '100%',
		layout : 'vertical'
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
		image : "/images/iconexposiciones.png",
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
		text : L('exhibitions'),
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

	expHorWdw.add(imageViewBar);
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
		//new mainWindow(Window, e.rowData.title).open();
		new mainWindow(Window, dias[e.index]).open();
	});

	buttonClose.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		expHorWdw.close();
	});

	expHorWdw.addEventListener('android:back', function(e) {
		Ti.Media.vibrate();
		expHorWdw.close();
	});

	return expHorWdw;
}

module.exports = HorariosWindow;

