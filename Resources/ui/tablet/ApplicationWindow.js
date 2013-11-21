//Application Window Component Constructor
function ApplicationWindow() {

	Ti.App.Properties.setString('viewcolor', '#34495e');

	//load component dependencies
	var RegisterView = require('ui/common/RegisterView');
	var LoginView = require('ui/common/LoginView');

	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor : '#ffffff'
	});

	var db = Ti.Database.open('anadicDB');
	db.execute('CREATE TABLE IF NOT EXISTS users(userId INTEGER PRIMARY KEY, id TEXT, name TEXT, group_name TEXT, subgroup_name TEXT, subgroup_leader TEXT, enterprise TEXT, phone TEXT, address TEXT);');
	var id = db.execute('SELECT id FROM users WHERE userId = 1;');
	db.close();

		//construct UI
		if (id.isValidRow()) {
			var loginView = new LoginView();
			self.add(loginView);
		} else {
			var registerView = new RegisterView();
			self.add(registerView);
		}
	
	var alert = Titanium.UI.createAlertDialog({
		title : L('tittlealert'),
		message : L('closeapp'),
		buttonNames : [L('yes'), L('no')]
	});

	alert.addEventListener('click', function(e) {
		if (e.index == 0) {
			Ti.Media.vibrate();
			
			if(Ti.Platform.osname == 'android')
			{
				var activity = Titanium.Android.currentActivity; 
				activity.finish();
			}
			else
			{
				//createAttachChWindow.close();
				self.close();
			}
			
			exit();
		}
	});

	self.addEventListener('android:back', function() {
		alert.show();
	});

	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
