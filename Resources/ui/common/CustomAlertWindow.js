function CreateIndicatorWindow(args) {
	var width = '50%', height = '60%';

	var args = args || {};
	var top = args.top || 10;
	var text = args.text || L('loading');

	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();

	var customAlertWdw = Titanium.UI.createWindow({
		height : height,
		width : width,
		top : top,
		borderRadius : 10,
		touchEnabled : false,
		backgroundColor : '#000',
		opacity : 0.6,
		fullscreen: pantallaCompleta
	});

	var view = Ti.UI.createView({
		width : '95%',
		height : '95%',
		layout : 'horizontal'
	});

	function osIndicatorStyle() {
		style = Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN;

		if ('iPhone OS' !== Ti.Platform.name) {
			style = Ti.UI.ActivityIndicatorStyle.DARK;
		}

		return style;
	}

	var activityIndicator = Ti.UI.createActivityIndicator({
		style : osIndicatorStyle(),
		left : '10%',
		height : Ti.UI.FILL,
		width : '20%'
	});

	var label = Titanium.UI.createLabel({
		left : 10,
		width : 'auto',
		height : 'auto',
		text : text,
		color : '#ffffff',
		font : {
			fontSize : '20dp'
		}
	});

	view.add(activityIndicator);
	view.add(label);
	customAlertWdw.add(view);

	function openIndicator() {
		customAlertWdw.open();
		activityIndicator.show();
	}


	customAlertWdw.openIndicator = openIndicator;

	function closeIndicator() {
		activityIndicator.hide();
		customAlertWdw.close();
	}


	customAlertWdw.closeIndicator = closeIndicator;

	return customAlertWdw;
}

// Public interface
exports.CreateIndicatorWindow = CreateIndicatorWindow;