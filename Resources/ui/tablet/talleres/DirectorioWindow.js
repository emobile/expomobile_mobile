function DirectorioWindow(Window) {

	var network = require('lib/network');

	var window1 = Titanium.UI.createWindow({
		tabBarHidden : true,
		backgroundColor : "white",
		width : '100%',
		height : '100%',
		layout : 'vertical'
	});

	var table = Ti.UI.createTableView({
		width : '90%',
		height : '100%'
	});

	var createAttachChWindow = function() {

		createAttachChScrollView_1();

		window1.add(imageViewBar);

		window1.add(scrollView_1);

	};

	var createScrollView_1 = function() {

		scrollView_1 = Titanium.UI.createScrollView({
			id : "scrollView_1",
			backgroundImage : '/images/background.png',
			height : '100%',
			width : '100%',
			layout : 'vertical'
		});

	};

	var createAttachChScrollView_1 = function() {

		createScrollView_1();

		scrollView_1.add(table);

		createImageViewBar();

	};

		var createImageViewBar = function() {

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
			image : "/images/icontalleres.png",
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
			text : L('workshops'),
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
	};

	function populateTable() {
		var data = [];

		/*network.getExhibitors(function(response) {
		 results = response;
		 if (response == false) {

		 for (var i = 0; i < results.length; i++) {
		 data.push({
		 id : results[i].id,
		 title : results[i].name,
		 leftImage : Ti.App.Properties.getString('hostname') + results[i].mobile_logo_url,
		 font : {
		 fontSize : '22dp'
		 },
		 color : 'black'
		 });
		 }
		 table.setData(data);
		 }
		 });*/

	}

	populateTable();

	createAttachChWindow();

	buttonClose.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		window1.close();
	});

	window1.addEventListener('android:back', function(e) {
		Ti.Media.vibrate();
		window1.close();
	});

	return window1;
}

module.exports = DirectorioWindow;

