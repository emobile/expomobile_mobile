function HorariosWindow(dias,Window) {
	var network = require('lib/network');

	var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();

	var sub_group = '';

	var db = Ti.Database.open('anadicDB');
	var id = db.execute('SELECT subgroup_name FROM users WHERE userId = 1;');
	
	if (id.isValidRow()) {
		sub_group = id.fieldByName('subgroup_name');
		id.close();
		if (sub_group === 'undefined' || sub_group == 'null') {
			sub_group = '';
		}
	} else {
		sub_group = '';
	}
	
	db.close();

	var infoWindow = require("ui/common/InfoWindow");
	var infoView = infoWindow.InfoWindow();

	var diasSemana = L('weekDays').split(',');
	var nomMeses = L('months').split(',');

	var tallHorWdw = Titanium.UI.createWindow({
		tabBarHidden : true,
		backgroundColor : "white",
		width : '100%',
		height : '100%',
		layout : 'vertical',
		fullscreen: pantallaCompleta,
		navBarHidden: true
	});

	var table = Ti.UI.createTableView({
		width : '90%',
		height : Ti.Platform.displayCaps.platformHeight,
		style : Titanium.UI.iPhone.TableViewStyle.GROUPED
	});

	scrollView_1 = Titanium.UI.createView({
		id : "scrollView_1",
		backgroundImage : '/images/background.png',
		height : '100%',
		width : '100%',
		layout : 'vertical'
	});

	imageViewBar = Titanium.UI.createView({
		id : "imageViewBar",
		backgroundColor : Ti.App.Properties.getString('viewcolor'),
		height : 80,
		left : 0,
		top : 0,
		width : '100%'
	});

	imageView = Titanium.UI.createImageView({
		id : "imageView",
		image : "/images/horarios_blanco.png",
		width : 60,
		height : 60,
		top : 10,
		left : 10
	});

	labelTitulo = Titanium.UI.createLabel({
		id : "labelTitulo",
		height : 'auto',
		text : L('my_schedule'),
		font : {
			fontSize : '22dp',
			fontWeight: 'bold'
		},
		color : 'white',
		center : {
			x : '50%'
		},
		top : 15
	});

	labelSubTitulo = Titanium.UI.createLabel({
		id : "labelSubtitulo",
		height : 'auto',
		text : sub_group,
		font : {
			fontSize : '18dp'
		},
		color : 'white',
		center : {
			x : '50%'
		},
		top : 40
	});

	buttonClose = Titanium.UI.createImageView({
		id : "buttonClose",
		image : "/images/close.png",
		width : 30,
		height : 30,
		top : 10,
		right : 10
	});

	scrollView_1.add(table);

	imageViewBar.add(imageView);
	imageViewBar.add(buttonClose);
	imageViewBar.add(labelTitulo);
	imageViewBar.add(labelSubTitulo);

	tallHorWdw.add(imageViewBar);
	tallHorWdw.add(scrollView_1);

	var dias;
	var eventosCargados = new Array();
	//cada propiedad es un dia que contiene un arreglo de eventos
	var eventosCargadosLabels = new Array();
	//cada propiedad es un dia que contiene un arreglo de eventos

	function populateTable() 
	{
		var data = [];

		dias.forEach(function(dia) {
			var fecha = dia.split("/");
			var formateada = new Date(fecha[2], fecha[1] - 1, fecha[0]);
			var titulo = diasSemana[formateada.getDay()] + " " + formateada.getDate() + " - " + nomMeses[formateada.getMonth()];

			var row = Titanium.UI.createTableViewRow({
				id : dia,
				title : titulo,
				//leftImage : '/images/directorio.png',
				isparent : true,
				opened : false,
				hasChild : true,
				sub : [],
				font : {
					fontSize : '20dp'
				},
				color : 'black'
			});

			eventosCargados[titulo.toString()] = new Array();
			data.push(row);
		});

		table.setData(data);
	}

	populateTable();

	table.addEventListener('click', function(e) {
		if (e.row.isparent) {
			if (e.row.opened) {
				for (var i = e.row.sub.length; i > 0; i = i - 1)
					table.deleteRow(e.index + i);
				e.row.opened = false;
			} else {
				//Si no se han cargado los eventos del dia, descargar solo los del dia seleccionado
				if (eventosCargados[e.rowData.title].length == 0) {
					network.getDataParam(network.SERVICES.WORKSHOPS, e.row.id, function(response) {
						var eventos = response;
						
						labelsEventos = new Array();

						for (var index = 0; index < eventos.length; index++) {
							var evento = {};

							evento.id = eventos[index].id.toString();
							evento.left = '15%';
							evento.title = eventos[index].name + " " + eventos[index].start_hour + " - " + eventos[index].end_hour;
							evento.font = {
								fontSize : '16dp'
							};
							evento.color = '#424242';
							labelsEventos.push(evento);
						}

						e.row.sub = labelsEventos;

						for (var i = 0; i < labelsEventos.length; i++) {
							table.insertRowAfter(e.index, labelsEventos[i], {
								animationStyle : Titanium.UI.iPhone.RowAnimationStyle.RIGHT
							});
						}

						eventosCargados[e.rowData.title] = eventos;
						eventosCargadosLabels[e.rowData.title] = labelsEventos;

						e.row.opened = true;
					});
				} else//Si ya estaban cargados los eventos solo insertarlos
				{
					//alert(e.rowData.title);
					for (var i = 0; i < eventosCargados[e.rowData.title].length; i++) {
						table.insertRowAfter(e.index, eventosCargadosLabels[e.rowData.title][i], {
							animationStyle : Titanium.UI.iPhone.RowAnimationStyle.RIGHT
						});
					}

					e.row.opened = true;
				}
			}
		} else {
			//Mostrar Detalles
			for (var eventosDelDia in eventosCargados) {
				eventosCargados[eventosDelDia].forEach(function(parEvento) 
				{
					if (e.rowData.id == parEvento.id) {
						var lblFecha = "";

						if (parEvento.start_date.length > 10) {
							var formateada = parEvento.start_date.substring(0, 10);
							var cadenas = formateada.split("-");
							lblFecha = cadenas[2] + "/" + nomMeses[cadenas[1] - 1] + "/" + cadenas[0];
						}

						var evento = new Object();
						evento[L('name')] = parEvento.name;
						evento[L('start_date')] = lblFecha;
						evento[L('start_hour')] = parEvento.start_hour;
						evento[L('end_hour')] = parEvento.end_hour;
						evento[L('teacher')] = parEvento.teacher_name;
						evento[L('room_name')] = parEvento.room_name;

						infoView.openView(evento);
					}
				});
			}
		}
	});

	buttonClose.addEventListener('click', function(e) {
		cerrar();
	});

	tallHorWdw.addEventListener('android:back', function(e) {
		cerrar();
	});

	function cerrar() {
		Ti.Media.vibrate();
		tallHorWdw.close();
	}

	return tallHorWdw;
}

module.exports = HorariosWindow;

