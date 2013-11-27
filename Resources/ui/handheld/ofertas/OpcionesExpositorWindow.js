function OpcionesExpositorWindow(Window) {

	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();

	windowOpc = Titanium.UI.createWindow({
		tabBarHidden : true,
		backgroundColor : "white",
		width : '100%',
		height : '100%',
		layout : 'vertical',
		//oldWin:Ti.currentWindow,
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

	windowOpc.add(imageViewBar);

	windowOpc.add(scrollView_1);

	function populateTable() {
		var data = [];
		var db = Ti.Database.open('anadicDB');
		var rows = db.execute('SELECT * FROM exhibitors');
		while (rows.isValidRow()) {
			var str = 'http://' + Ti.App.Properties.getString('hostname') + rows.fieldByName('mobile_logo_url');
			var patt = /missing.jpg/g;
			var result = patt.test(str);
			var urlImage;

			if (result) {
				urlImage = "/images/unavailable_small.jpg";
			} else {
				urlImage = 'http://' + Ti.App.Properties.getString('hostname') + rows.fieldByName('mobile_logo_url');	
			}
			
			data.push({
				id : rows.fieldByName('id'),
				title : rows.fieldByName('name'),
				leftImage : urlImage,
				font : {
					fontSize : '22dp'
				},
				color : 'black'
			});

			table.setData(data);
			rows.next();
		}

		rows.close();
		db.close();
	}

	populateTable();

	table.addEventListener('click', function(e) {
		var message = '';
		var exhibitor_id = e.rowData.id;
		var exhibitor_name = e.rowData.title;
		//var exhibitor_mobile_logo_url = e.rowData.urlImage;
		var exhibitor_mobile_logo_url = e.rowData.leftImage;

		var Window;
		var mainWindow = require("ui/handheld/ofertas/ExpositoresWindow");
		new mainWindow(Window, exhibitor_id, exhibitor_name, exhibitor_mobile_logo_url).open();

	});

	windowOpc.addEventListener('android:back', function(e) 
	{
		Ti.Media.vibrate();
		windowOpc.close();
	});

	buttonClose.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		windowOpc.close();
	});

	return windowOpc;
}

module.exports = OpcionesExpositorWindow;

