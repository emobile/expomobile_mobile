function QrReaderWindow(Window, win_name) {
	var network = require('lib/network');

	var qrReaderWdw = Ti.UI.createWindow({
		backgroundColor : 'white'
	});

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
						Ti.UI.createAlertDialog({
								message: L("qr_not_supported"),
								ok: L('ok'),
								title: L('alert_title') 
						}).show();
						
						qrReaderWdw.close();
					}

				} else {
					Ti.Media.vibrate();
					//alert("Código leido: " + data.barcode);
					var send_qr_code = validarQR(data.barcode);
					if (send_qr_code != false) {
						sendQr(send_qr_code);
					} else 
					{
						Ti.UI.createAlertDialog({
								message: L("qr_not_supported"),
								ok: L('ok'),
								title: L('alert_title') 
						}).show();
						
						qrReaderWdw.close();
					}
				}
			},
			error : function(err) 
			{
				Ti.Media.vibrate();
				Ti.UI.createAlertDialog({
								message: L('errorqrcode'),
								ok: L('ok'),
								title: L('alert_title') 
						}).show();
				
				qrReaderWdw.close();
			},
			cancel : function() {
				qrReaderWdw.close();
			}
		});

	} else {
		var TiBar = require('tibar');
		TiBar.scan({
			//simple configuration for iPhone simulator
			configure : {
				classType : "ZBarReaderController",
				sourceType : "Album",
				cameraMode : "Default",
				symbol : {
					"QR-Code" : true,
				}
			},
			success : function(data) {
				Ti.API.info('TiBar success callback!');
				if (data && data.barcode) {
					/*Ti.UI.createAlertDialog({
					 title : "Scan result",
					 message : "Barcode: " + data.barcode + " Symbology:" + data.symbology
					 }).show();*/
					var send_qr_code = validarQR(data.barcode);
					if (send_qr_code != false) {
						sendQr(send_qr_code);
						qrReaderWdw.close();
					} else {
						
						Ti.UI.createAlertDialog({
								message: L("qr_not_supported"),
								ok: L('ok'),
								title: L('alert_title') 
						}).show();
						
						qrReaderWdw.close();
					}
				}
			},
			cancel : function() {
				qrReaderWdw.close();
			},
			error : function() {
				alert(L('errorqrcode'));
				qrReaderWdw.close();
			}
		});
	}

	function sendQr(qrcode) {
		if (win_name == 'talleres') {
			network.postVisitWorkshop(qrcode, function(response) {
				if (response != false) {
					Ti.UI.createAlertDialog({
					message: response.msg,
					ok: L('ok'),
					title: L('alert_title') 
				}).show();
				}
			});
		} else if (win_name == 'exposiciones') {
			network.postVisitExposition(qrcode, function(response) {
				if (response != false) {
					Ti.UI.createAlertDialog({
					message: response.msg,
					ok: L('ok'),
					title: L('alert_title') 
				}).show();
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

