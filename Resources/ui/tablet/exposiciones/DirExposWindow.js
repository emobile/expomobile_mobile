function DirExposWindow(Window) {

	var expoInfoWindow = require("ui/handheld/exposiciones/ExposicionesInfoWindow");

	patrocinadoresWdw = Titanium.UI.createWindow({
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
	
	/*imageViewBar = Titanium.UI.createView({
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
	
	labelTitulo = Titanium.UI.createLabel({
		id : "labelTitulo",
		height : 'auto',
		text : L('exhibitions'),
		font : {
			fontSize : '22dp'
		},
		color : 'white',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	buttonClose = Titanium.UI.createImageView({
		id : "buttonClose",
		image : "/images/close.png",
		width : 30,
		height : 30,
		top : 10,
		right: 10
	});*/
	
	imageViewBar = Titanium.UI.createView({
		id : "imageViewBar",
		backgroundColor : Ti.App.Properties.getString('viewcolor'),
		height : 80,
		left : 0,
		top : 0,
		width : '100%'
	});

	imageView = Titanium.UI.createImageView({
		id : "imageView",
		image : "/images/iconexposiciones.png",
		width : 60,
		height : 60,
		top : '10dp',
		left : '10dp'
	});

	labelTitulo = Titanium.UI.createLabel({
		id : "labelTitulo",
		width: Ti.UI.SIZE,
		height : 'auto',
		text : L('exhibitions'),
		font : {
			fontSize : '22dp'
		},
		color : 'white',
		center : {
			x : '50%'
		},
		top : 15
	});
	
	buttonClose = Titanium.UI.createImageView({
		id : "buttonClose",
		image : "/images/close.png",
		width : 30,
		height : 30,
		top : '10dp',
		right: '10dp'
	});
	
	imageViewBar.add(labelTitulo);
	imageViewBar.add(imageView);
	imageViewBar.add(buttonClose);
	patrocinadoresWdw.add(imageViewBar);
	scrollView_1.add(table);
	patrocinadoresWdw.add(scrollView_1);
	
	function populateTable() 
	{
		var data = [];

		var db = Ti.Database.open('anadicDB');
		var db_rows = db.execute("SELECT * FROM exhibitors");
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
			
			var etiqueta = db_rows.fieldByName("social_reason");
			if(etiqueta.length > 25)
				etiqueta = etiqueta.substring(0,24)+"...";
			
			var row = Titanium.UI.createTableViewRow({
				id : db_rows.fieldByName("id"),
				//title : db_rows.fieldByName("name"),
				title : etiqueta,
				//leftImage : urlImage,
				isparent : true,
				opened : false,
				hasChild : true,
				color : 'black',
				height: 32
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
		var patrocinadoresView = expoInfoWindow.ExposicionesInfoWindow(e.rowData.id);
		patrocinadoresView.openView();
	});

	buttonClose.addEventListener('click', cerrar);
	
	function cerrar()
	{
		Ti.Media.vibrate();
		patrocinadoresWdw.close();
	}
	
	patrocinadoresWdw.addEventListener('android:back', evento = function(e){
	    e.source.removeEventListener('android:back', arguments.callee);
	    cerrar();
	});

	return patrocinadoresWdw;
}

module.exports = DirExposWindow;

