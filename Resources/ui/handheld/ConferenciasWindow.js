
function ConferenciasWindow(Window) {

	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();
	
	confWdw = Titanium.UI.createWindow({
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
		image : "/images/iconconferencias.png",
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
		text : L('conferences'),
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

	confWdw.add(imageViewBar);

	confWdw.add(scrollView_1);

	function populateTable() {
		var data = [];

		/*var row = Titanium.UI.createTableViewRow({
			id : 1,
			title : L('directory'),
			leftImage : '/images/directorio.png',
			isparent : true,
			opened : false,
			hasChild : false,
			sub : [{
				title : "Child 1"
			}],
			font : {
				fontSize : '22dp'
			},
			color : 'black'
		});
		data.push(row);*/

		var row = Titanium.UI.createTableViewRow({
			id : 2,
			title : L('schedules'),
			leftImage : '/images/horarios.png',
			isparent : true,
			opened : false,
			hasChild : false,
			sub : [{
				title : "Child 1"
			}],
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
			sub : [{
				title : "Child 1"
			}],
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
			network.getData(network.SERVICES.CONFERENCES_DAYS, function(response)
			{
				if(response.length == 0) 
				{
					Ti.UI.createAlertDialog({
					message: L('no_conferencias'),
					ok: L('ok'),
					title: L('alert_title')
					}).show();
				}	
	    		else if(response.length > 0) 
				{
					var Window;
					var mainWindow = require("ui/handheld/conferencias/HorariosWindow");
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

	buttonClose.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		confWdw.close();
	});

	confWdw.addEventListener('android:back', function(e) {
		//confWdw.removeEventListener('android:back');
		Ti.Media.vibrate();
		confWdw.close();
	});

	return confWdw;
}

module.exports = ConferenciasWindow;

