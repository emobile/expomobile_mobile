function QrReaderWindow(Window, win_name) {
	var network = require('lib/network');

	var qrReaderWdw = Ti.UI.createWindow({
		backgroundColor : 'white'
	});
	
	function showMessage(message)
	{
		Ti.UI.createAlertDialog({
			message: message,
			ok: L('ok'),
			title: L('alert_title')
			}).show();
	}

	if (Ti.Platform.osname == 'android') {
		var titaniumBarcode = require('com.mwaysolutions.barcode');

		titaniumBarcode.scan({
			success : function(data) {
				if (data && data.barcode) {
					Ti.Media.vibrate();
					//alert("Código leido: " + data.barcode);
					var send_qr_code = validarQR(data.barcode);
					if (send_qr_code != false) {
						sendQr(send_qr_code);
						qrReaderWdw.close();
					} else {
						showMessage(L("qr_not_supported"));
						qrReaderWdw.close();
					}

				} else {
					Ti.Media.vibrate();
					//alert("Código leido: " + data.barcode);
					var send_qr_code = validarQR(data.barcode);
					if (send_qr_code != false) {
						sendQr(send_qr_code);
					} else {
						showMessage(L("qr_not_supported"));
						qrReaderWdw.close();
					}
				}
			},
			error : function(err) {
				Ti.Media.vibrate();
				showMessage(L('errorqrcode'));
				qrReaderWdw.close();
			},
			cancel : function() {
				qrReaderWdw.close();
			}
		});

	} 
	else if (Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad')
	{
    	Titanium.UI.iPhone.statusBarHidden = true;
		
		var picker;	
		
		var openScanner = function() 
		{
			// Instantiate the Scandit SDK Barcode Picker view
			picker = scanditsdk.createView({
				width:"100%",
				height:"100%"
			});
			
			// Initialize the barcode picker, remember to paste your own app key here.
			picker.init("XWkcvlLgEeOZgSuLYTIqxK5VJ0cL3LOltYWM/qYAWTM",0);
		
		
			picker.showSearchBar(true);
			// add a tool bar at the bottom of the scan view with a cancel button (iphone/ipad only)
			picker.showToolBar(true);
		
			// Set callback functions for when scanning succeedes and for when the 
			// scanning is canceled.
			picker.setSuccessCallback(function(e) {
				//alert("success (" + e.symbology + "): " + e.barcode);
				sendQr(e.barcode);
			});
			picker.setCancelCallback(function(e) {
				closeScanner();
			});
		
			qrReaderWdw.add(picker);
			qrReaderWdw.addEventListener('open', function(e) {
				// Adjust to the current orientation.
				// since window.orientation returns 'undefined' on ios devices 
				// we are using Ti.UI.orientation (which is deprecated and no longer 
			    // working on Android devices.)
				if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad'){
		    		picker.setOrientation(Ti.UI.orientation);
				}	
				else {
					picker.setOrientation(window.orientation);
				}
				
				picker.setSize(Ti.Platform.displayCaps.platformWidth, 
							   Ti.Platform.displayCaps.platformHeight);
				picker.startScanning();		// startScanning() has to be called after the window is opened. 
			});
			qrReaderWdw.open();
		};
		
		// Stops the scanner, removes it from the window and closes the latter.
		var closeScanner = function() {
			if (picker != null) {
				picker.stopScanning();
				qrReaderWdw.remove(picker);
			}
			qrReaderWdw.close();
		};
		
		// Changes the picker dimensions and the video feed orientation when the
		// orientation of the device changes.
		Ti.Gesture.addEventListener('orientationchange', function(e) {
			qrReaderWdw.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, 
						   Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
			if (picker != null) {
				picker.setOrientation(e.orientation);
				picker.setSize(Ti.Platform.displayCaps.platformWidth, 
						Ti.Platform.displayCaps.platformHeight);
				// You can also adjust the interface here if landscape should look
				// different than portrait.
			}
		});
	}

	function sendQr(qrcode) {
		if (win_name == 'talleres') {
			network.postVisitWorkshop(qrcode, function(response) {
				if (response != false) {
					showMessage(response.msg);
				}
			});
		} else if (win_name == 'exposiciones') {
			network.postVisitExposition(qrcode, function(response) {
				if (response != false) {
					showMessage(response.msg);
				}
			});
		}
	}

	function validarQR(qrcode) {
		var qr = qrcode.split(':');
		if (qr[0] == "emobile") {
			return qr[1];
		} else {
			return false;
		}
	}

	qrReaderWdw.addEventListener('android:back', function() {
		qrReaderWdw.close();
	});

	return qrReaderWdw;
}

module.exports = QrReaderWindow;

