function ExposicionesWindow(Window) {
	var network = require('lib/network');

	expoWdw = Titanium.UI.createWindow({
		tabBarHidden : true,
		backgroundColor : "white",
		width : '100%',
		height : '100%',
		layout : 'vertical',
		fullscreen: false,
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

	expoWdw.add(imageViewBar);

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
			var Window;
			var mainWindow = require("ui/handheld/QrReaderWindow");
			new mainWindow(Window, 'exposiciones').open();
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

