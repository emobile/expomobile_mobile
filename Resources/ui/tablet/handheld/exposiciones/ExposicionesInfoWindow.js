function ExposicionesInfoWindow(id) {
	var network = require('lib/network');

	var width = '100%', height = '90%';
	var top = '10%';

	expoInfWdw = Titanium.UI.createWindow({
		//touchEnabled : false,
		backgroundColor : 'transparent',
		fullscreen : false
	});
	
	var blackWdw = Titanium.UI.createView({
		height : height,
		width : width,
		borderRadius : 1,
		//touchEnabled : false,
		backgroundColor : '#000',
		opacity : 0.8,
		top: '80'
	});

	viewLinea = Titanium.UI.createView({
		width : '90%',
		height : 1,
		backgroundColor : 'white',
		bottom : 2,
		left : '5%'
	});

	/*labelTwitter = Titanium.UI.createLabel({
		height : Ti.UI.SIZE,
		left : 10,
		width : '80%',
		font : {
			fontSize : '18dp'
		},
		color : 'white'
	});*/

	labelFacebook = Titanium.UI.createLabel({
		height : Ti.UI.SIZE,
		left : 10,
		width : '80%',
		font : {
			left : 60,
			fontSize : '18dp'
		},
		color : 'white'
	});

	labelTelefono = Titanium.UI.createLabel({
		height : Ti.UI.SIZE,
		left : 10,
		width : '80%',
		font : {
			fontSize : '18dp'
		},
		color : 'white'
	});

	labelWeb = Titanium.UI.createLabel({
		height : Ti.UI.SIZE,
		left : 10,
		width : '80%',
		font : {
			fontSize : '18dp'
		},
		color : 'white'
	});

	labelUbicacion = Titanium.UI.createLabel({
		height : Ti.UI.SIZE,
		left : 10,
		width : '80%',
		font : {
			fontSize : '18dp'
		},
		color : 'white'
	});

	labelContacto = Titanium.UI.createLabel({
		height : Ti.UI.SIZE,
		left : 10,
		width : '80%',
		font : {
			fontSize : '24dp'
		},
		color : 'white'
	});

	labelRazonSocial = Titanium.UI.createLabel({
		height : Ti.UI.SIZE,
		width : '100%',
		font : {
			fontSize : '18dp'
		},
		color : 'white',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	/*labelMail = Titanium.UI.createLabel({
		height : Ti.UI.SIZE,
		left : 10,
		width : '80%',
		font : {
			fontSize : '18dp'
		},
		color : 'white'
	});*/

	/*imageViewTwitter = Titanium.UI.createImageView({
		height : 25,
		left : 10,
		width : 20,
		image : "/images/twitter.png"
	})*/;

	imageViewFacebook = Titanium.UI.createImageView({
		height : 25,
		left : 10,
		width : 20,
		image : "/images/facebook.png"
	});

	/*imageViewTelefono = Titanium.UI.createImageView({
		height : 25,
		left : 10,
		width : 20,
		image : "/images/phone.png"
	});*/

	imageViewWeb = Titanium.UI.createImageView({
		height : 25,
		left : 10,
		width : 20,
		image : "/images/ubicacion.png"
	});

	imageViewUbicacion = Titanium.UI.createImageView({
		height : 25,
		left : 10,
		width : 20,
		image : "/images/ubicacion.png"
	});

	imageViewContacto = Titanium.UI.createImageView({
		height : 25,
		left : 10,
		width : 20,
		image : "/images/contacto.png"
	});

	/*imageViewMail = Titanium.UI.createImageView({
		height : 25,
		left : 10,
		width : 20,
		image : "/images/mail.png"
	});*/

	imageViewPatrocinador = Titanium.UI.createImageView({
		height : 'auto',
		center: {x: '50%'},	
		top : 10,
		width : 'auto'
	});

	buttonClose = Titanium.UI.createImageView({
		id : "buttonClose",
		image : "/images/close.png",
		width : 30,
		height : 30,
		right : '0',
		top : '10'
	});

	scrollView = Titanium.UI.createScrollView({
		width : '100%',
		height : '100%',
		backgroundColor : 'transparent',
		layout : 'vertical'
	});

	view1 = Titanium.UI.createView({
		width : '90%',
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent',
		layout : 'composite'
	});

	view2 = Titanium.UI.createView({
		width : '100%',
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent',
		layout : 'horizontal'
	});

	view3 = Titanium.UI.createView({
		width : '100%',
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent',
		layout : 'horizontal'
	});

	view4 = Titanium.UI.createView({
		width : '100%',
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent',
		layout : 'horizontal'
	});

	view5 = Titanium.UI.createView({
		width : '100%',
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent',
		layout : 'horizontal'
	});

	view6 = Titanium.UI.createView({
		width : '100%',
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent',
		layout : 'horizontal'
	});

	view7 = Titanium.UI.createView({
		width : '100%',
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent',
		layout : 'horizontal'
	});

	view8 = Titanium.UI.createView({
		width : '100%',
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent',
		layout : 'horizontal'
	});

	view1.add(imageViewPatrocinador);
	view1.add(buttonClose);
	view2.add(imageViewContacto);
	view2.add(labelContacto);
	view2.add(labelRazonSocial);
	//view3.add(imageViewUbicacion);
	//view3.add(labelUbicacion);
	view4.add(imageViewWeb);
	view4.add(labelWeb);
	//view5.add(imageViewTelefono);
	//view5.add(labelTelefono);
	//view6.add(imageViewFacebook);
	//view6.add(labelFacebook);
	//view7.add(imageViewTwitter);
	//view7.add(labelTwitter);
	//view8.add(imageViewMail);
	//view8.add(labelMail);

	scrollView.add(view1);
	scrollView.add(view2);
	scrollView.add(viewLinea);
	scrollView.add(view3);
	scrollView.add(view4);
	scrollView.add(view5);
	scrollView.add(view6);
	scrollView.add(view7);
	scrollView.add(view8);

	
	blackWdw.add(scrollView);
	expoInfWdw.add(blackWdw);
	
	function openView() {
		expoInfWdw.open();
	}

	expoInfWdw.openView = openView;

	function closeView() {
		expoInfWdw.close();
	}

	expoInfWdw.closeView = closeView;

	function populateView() {
		network.getExhibitorDetail(id, function(response) {
			if (response != false) {
				if (response.length == 0) {
					labelsNoDisponibles();
				} else {
					//labelTwitter.text = response.twitter;
					//labelFacebook.text = response.facebook;
					//labelTelefono.text = response.phone;
					labelWeb.text = response.social_reason;
					//labelMail.text = response.email;
					labelContacto.text = response.social_reason + "\n\t" + response.contact;
					labelRazonSocial.text = response.job;
					//labelUbicacion.text = response.work_address;
					if (response.mobile_logo_url != false) {
						imageViewPatrocinador.image = 'http://' + Ti.App.Properties.getString('hostname') + response.mobile_logo_url;
						//imageViewPatrocinador.image.width = 32;
						//imageViewPatrocinador.image.height = 32;
					} else {
						imageViewPatrocinador.image = "/images/unavailable.jpg";
					}
				}
			} else {
				labelsNoDisponibles();
			}
		});

	}

	function labelsNoDisponibles() {
		labelTwitter.text = L('unavailable');
		//labelFacebook.text = L('unavailable');
		labelTelefono.text = L('unavailable');
		labelWeb.text = L('unavailable');
		//labelUbicacion.text = L('unavailable');
		labelContacto.text = L('unavailable');
		labelRazonSocial.text = L('unavailable');
		imageViewPatrocinador.image = "/images/unavailable.jpg";
	}

	populateView();
	
	
	buttonClose.addEventListener('click', cerrar);
	
	function cerrar()
	{
		Ti.Media.vibrate();
		closeView();
	}
	
	expoInfWdw.addEventListener('androidback',function(e){
	    e.source.removeEventListener('androidback', arguments.callee);
	    cerrar();
	});

	return expoInfWdw;
}

exports.ExposicionesInfoWindow = ExposicionesInfoWindow;
