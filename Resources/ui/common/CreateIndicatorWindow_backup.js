function CreateIndicatorWindow(args) {
	var width = '60%', height = '25%';

	var args = args || {};
	var top = args.top || 8;
	var text = args.text || L('loading');

	var createIndWdw = Titanium.UI.createWindow({
		height : '100%',
		width : '100%',
		backgroundColor : '#000',
		opacity : 0.0,
		fullscreen:false,
		navBarHidden: true
	});

	var blackwindow = Titanium.UI.createView({
		height : height,
		width : width,
		borderRadius : 10,
		touchEnabled : false,
		backgroundColor : '#000',
		opacity : 0.6,
		center : {
			y : '50%',
			x : '50%'
		},
		layout: 'horizontal'
	});
	
	/*var view = Ti.UI.createView({
		width : '95%',
		height : '95%',
		layout : 'vertical'
	});*/

	function osIndicatorStyle() {
		style = Ti.UI.iPhone.ActivityIndicatorStyle.BIG;

		if ('iPhone OS' !== Ti.Platform.name) {
			style = Ti.UI.ActivityIndicatorStyle.BIG_DARK;
		}

		return style;
	}

	var activityIndicator = Ti.UI.createActivityIndicator({
		style : osIndicatorStyle(),
		left : '10%',
		height : Ti.UI.FILL,
		width : '20%'	});

	var label = Titanium.UI.createLabel({
		width : 'auto',
		height : 'auto',
		text : L('loading'),
		color : '#ffffff',
		font : {
			fontSize : '18dp'
		},
		left: '20'
	});

	/*var alertDialog = Ti.UI.createAlertDialog({
		title : "",
		message : text,
		//buttonNames: ['OK'],
		//cancel:0
	});
	alertDialog.show();*/

	//view.add(activityIndicator);
	//view.add(label);
	blackwindow.add(activityIndicator);
	blackwindow.add(label);
	createIndWdw.add(blackwindow);

	createIndWdw.addEventListener('blur', function(e)
	{
		closeIndicator();
	});
	
	function openIndicator() {
		createIndWdw.open();
		activityIndicator.show();
	}

	createIndWdw.openIndicator = openIndicator;

	function closeIndicator() {
		//activityIndicator.hide();
		createIndWdw.close();
	}

	createIndWdw.closeIndicator = closeIndicator;

	return createIndWdw;
}

// Public interface
exports.CreateIndicatorWindow = CreateIndicatorWindow; 