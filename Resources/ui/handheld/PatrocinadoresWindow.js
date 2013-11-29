function PatrocinadoresWindow(Window) {

	var patrocinadoresWindow = require("ui/handheld/patrocinadores/PatrocinadoresInfoWindow");

	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();

	patrocinadoresWdw = Titanium.UI.createWindow({
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
	
	function cerrarPatro()
	{
		Ti.Media.vibrate();
		patrocinadoresWdw.close();
	}
	
	var templates = require('templates');
	var topBar = templates.getTopBar(L('sponsors'),'/images/iconpatrocinadores.png', cerrarPatro);
	
	patrocinadoresWdw.add(topBar);
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
			
			var etiqueta = db_rows.fieldByName("social_reason");
			if(etiqueta.length > 31)
				etiqueta = etiqueta.substring(0,28)+"...";
			
			var row = Titanium.UI.createTableViewRow({
				id : db_rows.fieldByName("id"),
				//title : db_rows.fieldByName("name"),
				title : etiqueta,
				//leftImage : urlImage,
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

	patrocinadoresWdw.addEventListener('android:back', evento = function(e){
	    e.source.removeEventListener('android:back', arguments.callee);
	    cerrarPatro();
	});

	return patrocinadoresWdw;
}

module.exports = PatrocinadoresWindow;


