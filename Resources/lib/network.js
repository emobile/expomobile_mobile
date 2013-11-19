
//Ti.App.Properties.setString('hostname', '192.168.1.95:3000');
//var hostname = '192.168.1.95:3000';

Ti.App.Properties.setString('hostname', 'expomobile.com.mx');
var hostname = 'expomobile.com.mx';

//Ti.App.Properties.setString('hostname', 'expomobile.com.mx');
//var hostname = 'expomobile.com.mx';

var indicatorWindow = require('ui/common/CreateIndicatorWindow');
var indicator = indicatorWindow.CreateIndicatorWindow();

exports.SERVICES = {
	CONFERENCES_DAYS : "/mobile_services/index_conference_days",
	CONFERENCES : "/mobile_services/index_conferences?day=",
	DIARIES_DAYS : "/mobile_services/index_diary_days",
	DIARIES : "/mobile_services/index_diaries?day=",
	ACTIVITIES_DAYS : "/mobile_services/index_activity_days",
	ACTIVITIES : "/mobile_services/index_activities?day=",
	WORKSHOPS_DAYS : "/mobile_services/index_workshop_days",
	WORKSHOPS : "/mobile_services/index_workshops?day=",
};

function showMessage(message)
{
	Ti.UI.createAlertDialog({
		message: message,
		ok: L('ok'),
		title: L('alert_title')
		}).show();
}

exports.getRegistro = function(id, callback) {
	if (checkInternetConnection()) {
		//indicator = indicatorWindow.CreateIndicatorWindow();
		indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		var url = 'http://' + hostname + '/mobile_services/get_attendee_id?attendee_id=' + id;

		network.open('GET', url);
		network.setRequestHeader("Content-Type", "application/json", "Accept", "application/json");
		network.send();

		network.setTimeout(15000);

		network.onerror = function(e) {
			indicator.closeIndicator();
			showMessage(L('server_error'));
			callback(false);
		};

		network.onload = function() {
			var response = JSON.parse(this.responseText);
			indicator.closeIndicator();
			if (response.sent == "no") {
				showMessage(response.msg);
			}
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};

exports.getNip = function(id, nip, callback) {
	if (checkInternetConnection()) {
		//indicator = indicatorWindow.CreateIndicatorWindow();
		//callback({"access":"ok","msg":"Tu NIP fue validado exitosamente"});
		
		//vntana-cargando
		var activityIndicator = Ti.UI.createActivityIndicator({
			  color: 'white',
			  font: {fontFamily:'Helvetica Neue', fontSize:20, fontWeight:'bold'},
			  message: '  ' + L('loading'),
			  style:style,
			  height:'100%',
			  width:Ti.UI.SIZE,
			  backgroundColor: '#000',
			  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			  center: {y:'50%'},
			  fullscreen: false
			});
		
		var ventana = Titanium.UI.createWindow({
			title:"ventana", backgroundColor: '#000', 
			opacity: '0.8', width: '100%', height: '100%'
		});
		
		ventana.add(activityIndicator);
		activityIndicator.show();
		ventana.open();
		
		ventana.addEventListener('blur', function(e)
		{
			ventana.close();
		});
		//vntana-cargando

		//indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		var url = 'http://' + hostname + '/mobile_services/get_attendee_nip?attendee_id=' + id + '&nip=' + nip;

		network.open('GET', url);
		network.setRequestHeader("Content-Type", "application/json", "Accept", "application/json");
		network.send();

		network.setTimeout(15000);

		network.onerror = function(e) {
			//indicator.closeIndicator();
			ventana.close();
			showMessage(L('server_error'));
			callback(false);
		};

		network.onload = function() {
			var response = JSON.parse(this.responseText);
			//indicator.closeIndicator();
			ventana.close();
			if (response.access == "no") {
				showMessage(response.msg);
			}
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};

exports.getExhibitors = function(conOfertas, callback) {
	if (checkInternetConnection()) {
		indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		
		var parametros = '';
		if(conOfertas)
			parametros = '?with_offerts=1';
		
		var url = 'http://' + hostname + '/mobile_services/index_exhibitors' + parametros;

		network.open('GET', url);
		network.setRequestHeader("Content-Type", "application/json", "Accept", "application/json");
		network.send();

		network.setTimeout(20000);

		network.onerror = function(e) {
			indicator.closeIndicator();
			showMessage(L('server_error'));
			callback(false);
		};

		network.onload = function() {
			indicator.closeIndicator();
			var response = JSON.parse(this.responseText);

			var db = Ti.Database.open('anadicDB');
			db.execute('CREATE TABLE IF NOT EXISTS exhibitors(id INTEGER, name TEXT, mobile_logo_url TEXT, social_reason TEXT);');
			db.execute('DELETE FROM exhibitors;');

			for (var i = 0; i < response.length; i++) {
				db.execute("INSERT INTO exhibitors VALUES (" + response[i].id + ",'" + response[i].name + "','" + response[i].mobile_logo_url + "','" + response[i].social_reason + "');");
			}
			db.close();

			indicator.closeIndicator();
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};

exports.getOffers = function(exhibitor_id, callback) {
	if (checkInternetConnection()) {
		//indicator = indicatorWindow.CreateIndicatorWindow();
		indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		var url = 'http://' + hostname + '/mobile_services/index_offerts?exhibitor_id=' + exhibitor_id;

		network.open('GET', url);
		network.setRequestHeader("Content-Type", "application/json", "Accept", "application/json");
		network.send();

		network.setTimeout(15000);

		network.onerror = function(e) {
			indicator.closeIndicator();
			showMessage(L('server_error'));
			callback(false);
		};

		network.onload = function() {
			var response = JSON.parse(this.responseText);
			indicator.closeIndicator();
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};

exports.getAllOffers = function(callback) {
	if (checkInternetConnection()) {
		indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		var url = 'http://' + hostname + '/mobile_services/index_offerts';

		network.open('GET', url);
		network.setRequestHeader("Content-Type", "application/json", "Accept", "application/json");
		network.send();

		network.setTimeout(15000);

		network.onerror = function(e) {
			indicator.closeIndicator();
			showMessage(L('server_error'));
			callback(false);
		};

		network.onload = function() {
			var response = JSON.parse(this.responseText);
			indicator.closeIndicator();
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};

exports.getOffersDetail = function(offer_id, callback) {
	if (checkInternetConnection()) {
		//indicator = indicatorWindow.CreateIndicatorWindow();
		indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		var url = 'http://' + hostname + '/mobile_services/show_offert?offert_id=' + offer_id;

		network.open('GET', url);
		network.setRequestHeader("Content-Type", "application/json", "Accept", "application/json");
		network.send();

		network.setTimeout(15000);

		network.onerror = function(e) {
			indicator.closeIndicator();
			showMessage(L('server_error'));
			callback(false);
		};

		network.onload = function() {
			var response = JSON.parse(this.responseText);
			indicator.closeIndicator();
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};

exports.getSponsors = function(callback) {
	if (checkInternetConnection()) {
		
		//vntana-cargando
		var activityIndicator = Ti.UI.createActivityIndicator({
			  color: 'white',
			  font: {fontFamily:'Helvetica Neue', fontSize:20, fontWeight:'bold'},
			  message: '  ' + L('loading'),
			  style:style,
			  height:'100%',
			  width:Ti.UI.SIZE,
			  backgroundColor: '#000',
			  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			  center: {y:'50%'},
			  //fullscreen: false
			});
		
		var ventana = Titanium.UI.createWindow({
			title:"ventana", backgroundColor: '#000', 
			opacity: '0.8', width: '100%', height: '100%'
		});
		
		ventana.add(activityIndicator);
		activityIndicator.show();
		ventana.open();
		
		ventana.addEventListener('blur', function(e)
		{
			ventana.close();
		});
		//vntana-cargando
		
		//indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		var url = 'http://' + hostname + '/mobile_services/index_sponsors';

		network.open('GET', url);
		network.setRequestHeader("Content-Type", "application/json", "Accept", "application/json");
		network.send();

		network.setTimeout(15000);

		network.onerror = function(e) {
			//indicator.closeIndicator();
			ventana.close();
			showMessage(L('server_error'));
			callback(false);
		};

		network.onload = function() {
			var response = JSON.parse(this.responseText);
			var db = Ti.Database.open('anadicDB');
			db.execute('CREATE TABLE IF NOT EXISTS sponsors(id INTEGER, name TEXT, email TEXT, job TEXT, phone TEXT, social_network TEXT, social_reason TEXT, mobile_logo_url TEXT);');
			db.execute('DELETE FROM sponsors;');

			for (var i = 0; i < response.length; i++) {
				db.execute("INSERT INTO sponsors VALUES (" + response[i].id + ",'" + response[i].name + "','" + response[i].email + "','" + response[i].job + "','" + response[i].phone + "','" + response[i].social_network + "','" + response[i].social_reason + "','" + response[i].mobile_logo_url + "');");
			}

			db.close();
			//indicator.closeIndicator();
			ventana.close();
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};

exports.getSponsorDetail = function(sponsor_id, callback) {
	if (checkInternetConnection()) {
		//indicator = indicatorWindow.CreateIndicatorWindow();
		indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		var url = 'http://' + hostname + '/mobile_services/show_sponsor?sponsor_id=' + sponsor_id;

		network.open('GET', url);
		network.setRequestHeader("Content-Type", "application/json", "Accept", "application/json");
		network.send();

		network.setTimeout(15000);

		network.onerror = function(e) {
			indicator.closeIndicator();
			showMessage(L('server_error'));
			callback(false);
		};

		network.onload = function() {
			var response = JSON.parse(this.responseText);
			indicator.closeIndicator();
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};

exports.getExhibitorDetail = function(exhibitor_id, callback) {
	if (checkInternetConnection()) {
		//indicator = indicatorWindow.CreateIndicatorWindow();
		indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		var url = 'http://' + hostname + '/mobile_services/show_exhibitor?exhibitor_id=' + exhibitor_id;

		network.open('GET', url);
		network.setRequestHeader("Content-Type", "application/json", "Accept", "application/json");
		network.send();

		network.setTimeout(15000);

		network.onerror = function(e) {
			indicator.closeIndicator();
			showMessage(L('server_error'));
			callback(false);
		};

		network.onload = function() {
			var response = JSON.parse(this.responseText);
			indicator.closeIndicator();
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};



exports.getFaceToFaceDays = function(callback) {
	if (checkInternetConnection()) {
		//indicator = indicatorWindow.CreateIndicatorWindow();
		//callback(["12/10/2013"]);
		indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		var url = 'http://' + hostname + '/mobile_services/index_face_to_face_days';

		network.open('GET', url);
		network.setRequestHeader("Content-Type", "application/json", "Accept", "application/json");
		network.send();

		network.setTimeout(15000);

		network.onerror = function(e) {
			showMessage(L('server_error'));
			indicator.closeIndicator();
			callback(false);
		};

		network.onload = function() {
			var response = JSON.parse(this.responseText);
			indicator.closeIndicator();
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};

exports.getFacetoFace = function(day, callback) {
	if (checkInternetConnection()) {
		//indicator = indicatorWindow.CreateIndicatorWindow();
		//callback([{"app_email":"email","app_enterprise":"empresa uno","app_name":"nombre uno","app_phone":"614","created_at":"2013-10-11T22:24:19Z","end_date":"2013-10-12T17:20:00Z","id":1,"int_email":" email","int_enterprise":"empresa dos","int_name":"nombre dos","int_phone":"614","start_date":"2013-10-12T17:20:00Z","updated_at":"2013-10-11T22:24:19Z"}]);
		indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		var url = 'http://' + hostname + '/mobile_services/index_face_to_faces?day=' + day;

		network.open('GET', url);
		network.setRequestHeader("Content-Type", "application/json", "Accept", "application/json");
		network.send();

		network.setTimeout(15000);

		network.onerror = function(e) {
			showMessage(L('server_error'));
			indicator.closeIndicator();
			callback(false);
		};

		network.onload = function() {
			var response = JSON.parse(this.responseText);
			indicator.closeIndicator();
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};

exports.getFaceToFaceDetail = function(face_to_face_id, callback) {
	if (checkInternetConnection()) {
		//indicator = indicatorWindow.CreateIndicatorWindow();
		//callback({"app_email":"email","app_enterprise":"empresa uno","app_name":"nombre uno","app_phone":"614","created_at":"2013-10-11T22:24:19Z","end_date":"2013-10-12T17:20:00Z","id":1,"int_email":" email","int_enterprise":"empresa dos","int_name":"nombre dos","int_phone":"614","start_date":"2013-10-12T17:20:00Z","updated_at":"2013-10-11T22:24:19Z"});
		indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		var url = 'http://' + hostname + '/mobile_services/show_face_to_face?face_to_face_id=' + face_to_face_id;

		network.open('GET', url);
		network.setRequestHeader("Content-Type", "application/json", "Accept", "application/json");
		network.send();

		network.setTimeout(15000);

		network.onerror = function(e) {
			showMessage(L('server_error'));
			indicator.closeIndicator();
			callback(false);
		};

		network.onload = function() {
			var response = JSON.parse(this.responseText);
			indicator.closeIndicator();
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};

exports.getExpositionDays = function(callback) {
	if (checkInternetConnection()) {
		//indicator = indicatorWindow.CreateIndicatorWindow();
		indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		var url = 'http://' + hostname + '/mobile_services/index_exposition_days';

		network.open('GET', url);
		network.setRequestHeader("Content-Type", "application/json", "Accept", "application/json");
		network.send();

		network.setTimeout(15000);

		network.onerror = function(e) {
			showMessage(L('server_error'));
			indicator.closeIndicator();
			callback(false);
		};

		network.onload = function() {
			var response = JSON.parse(this.responseText);
			indicator.closeIndicator();
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};

exports.getExpositions = function(day, callback) {
	if (checkInternetConnection()) {
		//indicator = indicatorWindow.CreateIndicatorWindow();
		indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		var url = 'http://' + hostname + '/mobile_services/index_expositions?day=' + day;

		network.open('GET', url);
		network.setRequestHeader("Content-Type", "application/json", "Accept", "application/json");
		network.send();

		network.setTimeout(15000);

		network.onerror = function(e) {
			showMessage(L('server_error'));
			indicator.closeIndicator();
			callback(false);
		};

		network.onload = function() {
			var response = JSON.parse(this.responseText);
			indicator.closeIndicator();
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};

exports.getAllExpositions = function(callback) {
	if (checkInternetConnection()) {
		//indicator = indicatorWindow.CreateIndicatorWindow();
		indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		var url = 'http://' + hostname + '/mobile_services/index_expositions_names';

		network.open('GET', url);
		network.setRequestHeader("Content-Type", "application/json", "Accept", "application/json");
		network.send();

		network.setTimeout(15000);

		network.onerror = function(e) {
			showMessage(L('server_error'));
			indicator.closeIndicator();
			callback(false);
		};

		network.onload = function() {
			var response = JSON.parse(this.responseText);
			indicator.closeIndicator();
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};

exports.postVisitWorkshop = function(workshopKey, callback) {
	if (checkInternetConnection()) {
		//indicator = indicatorWindow.CreateIndicatorWindow();
		indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		var url = 'http://' + hostname + '/mobile_services/register_visit_to_workshop?key=' + workshopKey;

		network.open('GET', url);
		network.send();

		network.setTimeout(15000);

		network.onerror = function(e) {
			indicator.closeIndicator();
			showMessage(L('server_error'));
			callback(false);
		};

		network.onload = function() {
			var response = JSON.parse(this.responseText);
			indicator.closeIndicator();
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};

exports.postVisitExposition = function(standKey, callback) {
	if (checkInternetConnection()) {
		//indicator = indicatorWindow.CreateIndicatorWindow();
		indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		var url = 'http://' + hostname + '/mobile_services/register_visit_to_exposition?key=' + standKey;

		network.open('GET', url);
		network.send();

		network.setTimeout(15000);

		network.onerror = function(e) {
			indicator.closeIndicator();
			showMessage(L('server_error'));
			callback(false);
		};

		network.onload = function() {
			var response = JSON.parse(this.responseText);
			indicator.closeIndicator();
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};

exports.postSuggestions = function(rate, comments, callback) {
	if (checkInternetConnection()) {
		//indicator = indicatorWindow.CreateIndicatorWindow();
		indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		var url = 'http://' + hostname + '/mobile_services/rate?value=' + rate + '&comment="' + comments + '"';

		network.open('GET', url);
		network.send();

		network.setTimeout(15000);

		network.onerror = function(e) {
			indicator.closeIndicator();
			showMessage(L('server_error'));
			callback(false);
		};

		network.onload = function() {
			var response = JSON.parse(this.responseText);
			indicator.closeIndicator();
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};

exports.getDataParam = function(service, parameter, callback) {
	this.getData(service + parameter, callback);
};

exports.getData = function(service, callback) {
	if (checkInternetConnection()) {
		indicator.openIndicator();

		var network = Titanium.Network.createHTTPClient();
		var url = 'http://' + hostname + service;
		
		network.open('GET', url);
		network.setRequestHeader("Content-Type", "application/json", "Accept", "application/json");
		network.send();

		network.setTimeout(15000);

		network.onerror = function(e) {
			showMessage(L('server_error'));
			indicator.closeIndicator();
			callback(false);
		};

		network.onload = function() {
			var response = JSON.parse(this.responseText);
			indicator.closeIndicator();
			callback(response);
		};
	} else {
		showMessage(L('connectionerror'));
		callback(false);
	}
};

function checkInternetConnection() {
	return Ti.Network.online;
}