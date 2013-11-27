function CreateIndicatorWindow(args) 
{
	var width = '60%', height = '25%';

	var args = args || {};
	var top = args.top || 8;
	var text = args.text || L('loading');

	var isAndroid = (Ti.Platform.osname == 'android') ? true : false;
	var isIphone = (Ti.Platform.osname == 'iphone') ? true : false;
	
	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();
	
	var createIndWdw = Titanium.UI.createWindow({
		height : '100%',
		width : '100%',
		backgroundColor : '#000',
		opacity : 0.0,
		fullscreen:pantallaCompleta,
		navBarHidden: true,
		//zIndex:-20,
		//modal: true,
		touchEnabled : false
	});

	var blackwindow = Titanium.UI.createView({
		height : height,
		width : width,
		borderRadius : 10,
		backgroundColor : '#000',
		opacity : 0.8,
		center : {
			y : '50%',
			x : '50%'
		},
		layout: 'horizontal'
	});
	
	function osIndicatorStyle() 
	{
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

	blackwindow.add(activityIndicator);
	activityIndicator.show();
	blackwindow.add(label);
	createIndWdw.add(blackwindow);

	createIndWdw.addEventListener('blur', function(e)
	{
		closeIndicator();
	});
	
	var actInd;
	
	function openIndicator() 
	{	
		var customMessage = L('loading');
		var interval = 2000;
		
		if(isIphone){
		    // window container
		    indWin = Titanium.UI.createWindow();
		    
		    indWin.fullscreen = true;

		    //  view
		    var indView = Titanium.UI.createView({height:150,width:250,borderRadius:10,backgroundColor:'#bbb',opacity:.8});

		    indWin.add(indView);

		        // message
		    var message = Titanium.UI.createLabel({
		        text: customMessage && typeof(customMessage!=='undefined') ? customMessage : L('please_wait'),
		        color:'#fff',width:'auto',height:'auto',textAlign:'center',
		        font:{fontSize:14,fontWeight:'bold'}});

		        indView.add(message);
		        indWin.open();

		        interval = interval ? interval : 2500;
		        setTimeout(function()
		        {
		            indWin.close({opacity:0,duration:1000});
		        },interval);
		        
		    indWin.addEventListener('blur', function(e)
    		{
		    	indWin.close();
    		});
		}
		
		
		//createIndWdw.open();
		//activityIndicator.show();
		
		//actInd = Titanium.UI.createActivityIndicator();
		//actInd.message = 'Please wait...';//message will only shows in android. 
		//Ti.UI.currentWindow.add(actInd);
		//actInd.show();*/
		if(isAndroid)
		{
			var toast = Titanium.UI.createNotification({
			    duration: Ti.UI.NOTIFICATION_DURATION_LONG,
			    message: customMessage
			});
			
			toast.show();
		}
		
		/*actInd = Titanium.UI.createActivityIndicator({
			height:50,
			message:"Requesting..",
			width:10
			});
		
		actInd.show();*/
		
	}

	createIndWdw.openIndicator = openIndicator;

	function closeIndicator() 
	{
		//actInd.hide();
		
		//if(!typeof(createIndWdw) == 'undefined' || !createIndWdw.closed)
		//if(Ti.UI.currentWindow.createIndWdw)
		//{
			//createIndWdw.close();
			//activityIndicator.hide();
		//}
		
	}

	createIndWdw.closeIndicator = closeIndicator;

	return createIndWdw;
}

// Public interface
exports.CreateIndicatorWindow = CreateIndicatorWindow; 