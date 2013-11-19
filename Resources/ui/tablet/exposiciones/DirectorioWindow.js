function DirectorioWindow(Window) {
	var network = require('lib/network');

	ExpDirWdw = Titanium.UI.createWindow({
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

	ExpDirWdw.add(imageViewBar);

	scrollView_1.add(table);

	ExpDirWdw.add(scrollView_1);

	function populateTable() {
		network.getAllExpositions(function(exposiciones) {
			var data = [];
			if (exposiciones != false) 
			{
				var i = 0;
				exposiciones.forEach(function(expo)
			    {
			      	var row = Titanium.UI.createTableViewRow({
						id : i,
						title : expo.name,
						font : {
							fontSize : '22dp'
						},
						color : 'black'
					});
					data.push(row);
					i++;
			    });

				table.setData(data);
			}

		});
	}

	populateTable();

	buttonClose.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		ExpDirWdw.close();
	});

	ExpDirWdw.addEventListener('android:back', function(e) {
		Ti.Media.vibrate();
		ExpDirWdw.close();
	});

	return ExpDirWdw;
}

module.exports = DirectorioWindow;

