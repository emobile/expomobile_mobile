//function contWindow(Window) {
function ContactoWindow() {
	var network = require('lib/network');

	var width = '92%', height = '90%';

	var args = args || {};
	var top = args.top || 80;
	
	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();

	contWindow = Titanium.UI.createWindow({
		height : '100%',
		width: '100%',
		navBarHidden: true,
		backgroundColor : 'transparent',
		opacity : 1.0,
		fullscreen: pantallaCompleta
	});
	
	blackWindow = Titanium.UI.createView({
		height : height,
		width : width,
		borderRadius : 10,
		backgroundColor : '#000',
		opacity : 0.9,
		center : {
			y : '50%'
		},
		layout : 'vertical'
	});

	buttonClose = Titanium.UI.createImageView({
		id : "buttonClose",
		image : "/images/close.png",
		width : 30,
		height : 30,
		right : 10,
		top : 10
	});

	imageViewIcono = Titanium.UI.createImageView({
		id : "imageViewIcono",
		width : 50,
		height : 50,
		left : "10",
		image : "/images/bueno.png"
	});

	scrollView = Titanium.UI.createScrollView({
		width : '100%',
		height : '100%',
		backgroundColor : 'transparent',
		layout : 'vertical',
		bottom: 20
	});

	sugerencias = Titanium.UI.createTextArea({
		width : "90%",
		height : 100,
		top : '2%',
		left : "5%",
		hintText : L("comments"),
		maxLength: 100
	});

	btnEnvia = Titanium.UI.createButton({
		title : L('send'),
		right : '5%',
		top : '2%',
		height : Ti.UI.SIZE,
		width : '25%'
	});

	labelHeader = Titanium.UI.createLabel({
		text : L("suggestions"),
		height : Ti.UI.SIZE,
		font : {
			fontSize : '18dp',
			fontWeight : 'bold'
		},
		color : 'white',
		top : 10,
		center : {
			x : '50%'
		}
	});

	labelDescripcion = Titanium.UI.createLabel({
		text : L('joinus') + L('joinus2'),
		height : Ti.UI.SIZE,
		left : '5%',
		width : '90%',
		font : {
			fontSize : '14dp'
		},
		color : 'white',
		top : '2%',
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT
	});

	labelPregunta = Titanium.UI.createLabel({
		text : L('rating'),
		height : Ti.UI.SIZE,
		left : '5%',
		width : '90%',
		font : {
			fontSize : '14dp'
		},
		color : 'white',
		top : '2%'
	});

	viewLinea = Titanium.UI.createView({
		width : '90%',
		height : 1,
		backgroundColor : 'white',
		top : 50,
		left : '5%'
	});

	viewTop = Titanium.UI.createView({
		width : '100%',
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent',
	});

	viewRow = Titanium.UI.createView({
		width : '100%',
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent',
		layout : 'horizontal'
	});

	viewContainer = Titanium.UI.createView({
		width : '100%',
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent',
		layout : 'vertical'
	});

	spCalificaciones = Ti.UI.createPicker({
		left : '5%',
		top : '2%',
		height: '180',
		width: '150'
	});

	var data = new Array();

	var calificaciones = L('qualifications').split(',');
	camposDisplay = L('joinus');

	var rate = 3;
	

	data[0] = Ti.UI.createPickerRow({
		value : 3,
		title : calificaciones[0]
	});
	data[1] = Ti.UI.createPickerRow({
		value : 2,
		title : calificaciones[1]
	});
	data[2] = Ti.UI.createPickerRow({
		value : 1,
		title : calificaciones[2]
	});
	
	var rateValue = calificaciones[0];
	
	spCalificaciones.add(data);
	spCalificaciones.selectionIndicator = true;

	viewTop.add(buttonClose);
	viewTop.add(labelHeader);
	viewTop.add(viewLinea);

	viewRow.add(spCalificaciones);
	viewRow.add(imageViewIcono);

	viewContainer.add(labelPregunta);
	viewContainer.add(viewRow);
	viewContainer.add(labelDescripcion);
	viewContainer.add(sugerencias);
	viewContainer.add(btnEnvia);

	scrollView.add(viewTop);
	scrollView.add(viewContainer);

	blackWindow.add(scrollView);
	
	//scrollView.add(blackWindow);
	
	contWindow.add(blackWindow);

	function openView() {
		contWindow.open();
	}

	contWindow.openView = openView;

	function closeView() {
		contWindow.close();
	}

	contWindow.closeView = closeView;

	spCalificaciones.addEventListener('change', function(e) {
		rate = spCalificaciones.getSelectedRow(0).value;
		rateValue = spCalificaciones.getSelectedRow(0).title;
		if (rate == 3) {
			imageViewIcono.image = "/images/bueno.png";
		} else if (rate == 2) {
			imageViewIcono.image = "/images/regular.png";
		} else if (rate == 1) {
			imageViewIcono.image = "/images/malo.png";
		}
	});

	buttonClose.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		closeView();
	});

	btnEnvia.addEventListener('click', function(e) {
		Ti.Media.vibrate();
		var db = Ti.Database.open('anadicDB');
		db.execute('CREATE TABLE IF NOT EXISTS rating(rateId INTEGER PRIMARY KEY, rate TEXT);');
		
		network.postSuggestions(rate, sugerencias.value, function(response) {
			if (response != false) {
				var db = Ti.Database.open('anadicDB');
				db.execute("INSERT INTO rating VALUES (1,'" + rateValue + "');");
				db.close();
				var dialog = Ti.UI.createAlertDialog({
				    message: response.msg,
				    ok: L('ok'),
				    title: L('alert_title')
				  }).show();
				closeView();
			}
		});
	});

	contWindow.addEventListener('android:back', function(e) {
		Ti.Media.vibrate();
		closeView();
	});

	contWindow.open();
}

module.exports.ContactoWindow = ContactoWindow;
