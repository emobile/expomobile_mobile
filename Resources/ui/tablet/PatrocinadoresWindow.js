function PatrocinadoresWindow(Window) {

	var patrocinadoresWindow = require("ui/handheld/patrocinadores/PatrocinadoresInfoWindow");

	patrocinadoresWdw = Titanium.UI.createWindow({
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

	scrollView_1 = Titanium.UI.createView({
		id : "scrollView_1",
		backgroundImage : '/images/background.png',
		height : '100%',
		width : '100%',
		layout : 'vertical'
	});
	
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
		image : "/images/iconpatrocinadores.png",
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
		text : L('sponsors'),
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

	patrocinadoresWdw.add(imageViewBar);
	
	scrollView_1.add(table);
	
	patrocinadoresWdw.add(scrollView_1);
	
	function populateTable() {
		var data = [];

	var db = Ti.Database.open('anadicDB');
		var db_rows = db.execute("SELECT * FROM sponsors");
		while (db_rows.isValidRow()) {
			
			var str = 'http://' + Ti.App.Properties.getString('hostname') + db_rows.fieldByName('mobile_logo_url');
			var patt = /missing.jpg/g;
			var result = patt.test(str);
			var urlImage;

			if (result ==  true) {
				urlImage = "/images/unavailable_small.jpg";
			} else {
				urlImage = 'http://' + Ti.App.Properties.getString('hostname') + db_rows.fieldByName('mobile_logo_url');	
			}
			
			var row = Titanium.UI.createTableViewRow({
				id : db_rows.fieldByName("id"),
				title : db_rows.fieldByName("name"),
				leftImage : urlImage,
				isparent : true,
				opened : false,
				hasChild : true,
				color : 'black'
			});
			data.push(row);

			db_rows.next();
		}
		db_rows.close();
		db.close();

		table.setData(data);
	}

	populateTable();
	
	table.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		var patrocinadoresView = patrocinadoresWindow.PatrocinadoresInfoWindow(e.rowData.id);
		patrocinadoresView.openView();
	});

	buttonClose.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		patrocinadoresWdw.close();
		/*var Window;
		var mainWindow = require("ui/handheld/MainWindow");
		new mainWindow(Window).open();*/
	});

	patrocinadoresWdw.addEventListener('android:back', function(e) {
		Ti.Media.vibrate();
		patrocinadoresWdw.close();
		/*var Window;
		var mainWindow = require("ui/handheld/MainWindow");
		new mainWindow(Window).open();*/
	});

	return patrocinadoresWdw;
}

module.exports = PatrocinadoresWindow;

