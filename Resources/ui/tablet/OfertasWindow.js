function OfertasWindow(Window) {

	windowOfertas = Titanium.UI.createWindow({
		tabBarHidden : true,
		backgroundColor : "white",
		width : '100%',
		height : '100%',
		layout : 'vertical',
		oldWin:Ti.currentWindow
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

	windowOfertas.add(imageViewBar);

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

	windowOfertas.addEventListener('android:back', function(e) {
		/*var Window;
		var mainWindow = require("ui/handheld/MainWindow");
		new mainWindow(Window).open();*/
		Ti.Media.vibrate();
		windowOfertas.close();
	});

	buttonClose.addEventListener('click', function(e) {
		/*Ti.Media.vibrate();
		var Window;
		var mainWindow = require("ui/handheld/MainWindow");
		new mainWindow(Window).open();*/
		Ti.Media.vibrate();
		windowOfertas.close();
	});
	
	

	return windowOfertas;
}

module.exports = OfertasWindow;

