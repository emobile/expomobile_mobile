function FaceToFaceWindow(Window) {
	var network = require('lib/network');

	faceToFaceWdw = Titanium.UI.createWindow({
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
		image : "/images/iconfacetoface.png",
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
		text : L('facetoface'),
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

	faceToFaceWdw.add(imageViewBar);

	faceToFaceWdw.add(scrollView_1);

	function populateTable() {
		var data = [];

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

		table.setData(data);
	}

	populateTable();

	table.addEventListener('click', function(e) 
	{
		if (e.rowData.id == 2) {
			
			network.getFaceToFaceDays(function(response) {
				
			if(response.length == 0) 
			{
				alert(L('no_appoinments'));	
			}	
    		else if(response.length > 0) 
			{
				var Window;
				var mainWindow = require("ui/handheld/facetoface/HorariosWindow");
				new mainWindow(Window, response).open();
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
		faceToFaceWdw.close();
	});

	faceToFaceWdw.addEventListener('android:back', function(e) {
		Ti.Media.vibrate();
		faceToFaceWdw.close();
	});

	return faceToFaceWdw;
}

module.exports = FaceToFaceWindow;

