// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.

// open a single window
var window = Ti.UI.createWindow({
	backgroundColor:'white'
});

var label = Ti.UI.createLabel();
window.add(label);
window.open();

var titaniumBarcode = require('com.mwaysolutions.barcode');

function showMessage(message)
{
	Ti.UI.createAlertDialog({
		message: message,
		ok: L('ok'),
		title: L('alert_title')
		}).show();
}

Titanium.Barcode.scan({
  success:function(data) {
    if(data && data.barcode) {
      var label = Titanium.UI.createLabel({
        text:'Barcode: ' + data.barcode,
        textAlign:'center',
        width:'auto'
      });

      win.add(label);
    } else {
    	showMessage(JSON.stringify(data));
    }
  },

  error:function(err) { 
	  showMessage("Error!! " + err); 
  },

  cancel:function() { 
	  showMessage("cancel"); 
  }
});

