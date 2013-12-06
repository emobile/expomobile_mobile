function PatrocinadoresInfoWindow(indexClick, idPatrocinador, patrocinadores) 
{
	var network = require('lib/network');

	var width = '100%', height = '100%';

	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();

	patrocHorWdw = Titanium.UI.createWindow({
		backgroundColor : 'transparent',
		fullscreen : pantallaCompleta,
		navBarHidden : true,
		opacity: 1.0,
		height: '100%'
	});

	var blackWdw = Titanium.UI.createView({
		height : Ti.UI.SIZE,
		width : '86%',
		borderRadius : 10,
		backgroundColor : '#000',
		opacity : 0.9,
		bottom: '20',
		center: { y: '50%' }
	});

	viewLinea = Titanium.UI.createView({
		width : '90%',
		height : 1,
		backgroundColor : 'white',
		bottom : 2,
		left : '5%'
	});

	labelTwitter = Titanium.UI.createLabel({
		height : Ti.UI.SIZE,
		left : 10,
		width : '80%',
		font : {
			fontSize : '18dp'
		},
		color : 'white'
	});

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
		//left : 10,
		center: {x :'50%'},
		width : Ti.UI.SIZE,
		font : {
			fontSize : '18dp',
			fontWeight: 'bold'
		},
		color : 'white'
	});
	
	labelPuesto = Titanium.UI.createLabel({
		height : Ti.UI.SIZE,
		//left : 10,
		center: {x :'50%'},
		width : Ti.UI.SIZE,
		font : {
			fontSize : '16dp',
			fontWeight: 'bold'
		},
		color : 'white'
	});

	labelRazonSocial = Titanium.UI.createLabel({
		height : Ti.UI.SIZE,
		// left : 30,
		width : '100%',
		font : {
			fontSize : '18dp'
		},
		color : 'white',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	labelMail = Titanium.UI.createLabel({
		height : Ti.UI.SIZE,
		left : 10,
		width : '80%',
		font : {
			fontSize : '18dp'
		},
		color : 'white'
	});

	btnIzquierda = Titanium.UI.createImageView({
		height : 21,
		width : 18,
		left : 2,
		center: { y: '50%' },
		image : "/images/btnizquierda.png",
		opacity : 0.9
	});

	btnDerecha = Titanium.UI.createImageView({
		height : 21,
		width : 18,
		right : 2,
		center: { y: '50%' },
		image : "/images/btnderecha.png",
		opacity : 0.9
	});

	imageViewTwitter = Titanium.UI.createImageView({
		height : 20,
		left : 10,
		width : 24,
		image : "/images/twitter.png"
	});

	imageViewFacebook = Titanium.UI.createImageView({
		height : 25,
		left : 10,
		width : 25,
		image : "/images/facebook.png"
	});

	imageViewTelefono = Titanium.UI.createImageView({
		height : 20,
		left : 10,
		width : 29,
		image : "/images/phone.png"
	});

	imageViewWeb = Titanium.UI.createImageView({
		height : 20,
		left : 10,
		width : 19,
		image : "/images/web.png"
	});

	imageViewUbicacion = Titanium.UI.createImageView({
		height : 25,
		left : 10,
		width : 20,
		image : "/images/ubicacion.png"
	});

	imageViewContacto = Titanium.UI.createImageView({
		height : 25,
		//left : 10,
		//center: { x: '50%'},
		//right: 0,
		width : 20,
		image : "/images/contacto.png"
	});

	imageViewMail = Titanium.UI.createImageView({
		height : 20,
		left : 10,
		width : 26,
		image : "/images/mail.png"
	});

	imageViewPatrocinador = Titanium.UI.createImageView({
		height : Ti.UI.SIZE,
		center : {
			x : '50%'
		},
		top : '50',
		width : Ti.UI.SIZE,
		opacity: 1.0,
		backgroundColor: '#000'		
	});

	btnCerrar = Titanium.UI.createImageView({
		id : "btnCerrar",
		image : "/images/close.png",
		width : 30,
		height : 30,
		right : '10',
		top : '10'
	});

	scrollView = Titanium.UI.createScrollView({
		width : '100%',
		height : Ti.UI.SIZE,//'100%',
		backgroundColor : 'transparent',
		layout : 'vertical',
		bottom: '5'
	});

	view1 = Titanium.UI.createView({
		width : '100%',
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent',
		layout : 'composite'
	});

	view2 = Titanium.UI.createView({
		width : '100%',
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent',
		layout : 'vertical'
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

	viewCabecera = Ti.UI.createView({
		width: Ti.UI.SIZE,
		center: { x: '50%'},
		layout: 'vertical',
		height: Ti.UI.SIZE
	});

	view1.add(imageViewPatrocinador);
	view1.add(btnCerrar);
	//viewOtro.add(imageViewContacto);
	viewCabecera.add(labelContacto);
	viewCabecera.add(labelPuesto);
	view2.add(viewCabecera);
	view2.add(labelRazonSocial);
	view3.add(imageViewUbicacion);
	view3.add(labelUbicacion);
	view4.add(imageViewWeb);
	view4.add(labelWeb);
	view5.add(imageViewTelefono);
	view5.add(labelTelefono);
	view7.add(imageViewTwitter);
	view7.add(labelTwitter);
	view8.add(imageViewMail);
	view8.add(labelMail);

	scrollView.add(view1);
	scrollView.add(view2);
	scrollView.add(viewLinea);
	scrollView.add(view3);
	scrollView.add(view4);
	scrollView.add(view5);
	scrollView.add(view7);
	scrollView.add(view8);

	blackWdw.add(scrollView);
	patrocHorWdw.add(blackWdw);
	patrocHorWdw.add(btnDerecha);
	patrocHorWdw.add(btnIzquierda);

	function openView() {
		patrocHorWdw.open();
	}

	patrocHorWdw.openView = openView;

	function closeView() {
		patrocHorWdw.close();
	}

	patrocHorWdw.closeView = closeView;

	function populateView() {
		network
				.getSponsorDetail(
						idPatrocinador,
						function(response) {
							if (response != false) {
								if (response.length == 0) {
									labelsNoDisponibles();
								} else {
									labelTwitter.text = response.twitter;
									labelTelefono.text = response.phone;
									labelWeb.text = response.web_page;
									labelMail.text = response.email;
									labelContacto.text = response.social_reason;
									labelPuesto.text = response.contact;
									labelRazonSocial.text = response.job;
									labelUbicacion.text = response.work_street + " " 
											+ response.work_street_number + "\n" 
											+ response.work_colony;
									if (response.mobile_logo_url != false) 
									{
										imageViewPatrocinador.image = 'http://'
												+ Ti.App.Properties
														.getString('hostname')
												+ response.mobile_logo_url;
									} else {
										imageViewPatrocinador.image = "/images/unavailable.jpg";
									}
								}
							} else {
								labelsNoDisponibles();
							}
						});

	}

	function labelsNoDisponibles() 
	{
		labelTwitter.text = L('unavailable');
		labelFacebook.text = L('unavailable');
		labelTelefono.text = L('unavailable');
		labelWeb.text = L('unavailable');
		labelUbicacion.text = L('unavailable');
		labelContacto.text = L('unavailable');
		labelRazonSocial.text = L('unavailable');
		imageViewPatrocinador.image = "/images/unavailable.jpg";
	}

	populateView();

	btnCerrar.addEventListener('click', function(e){
		cerrar();
	});

	function cerrar() {
		Ti.Media.vibrate();
		closeView();
	}

	patrocHorWdw.addEventListener('androidback', function(e) {
		e.source.removeEventListener('androidback', arguments.callee);
		cerrar();
	});

	btnIzquierda.addEventListener('click', function(e){
		if(indexClick > 0)
		{
			indexClick--;
			idPatrocinador = patrocinadores[indexClick].id;
			populateView();
		}	
	});
	
	btnDerecha.addEventListener('click', function(e){
		if(indexClick < patrocinadores.length-1)
		{
			indexClick++;
			idPatrocinador = patrocinadores[indexClick].id;
			populateView();
		}
	});


	return patrocHorWdw;
}

exports.PatrocinadoresInfoWindow = PatrocinadoresInfoWindow;
