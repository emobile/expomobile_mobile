function HorariosWindow(dias, Window) 
{
	var network = require('lib/network');

	var infoWindow = require("ui/common/InfoWindow");
	var infoView = infoWindow.InfoWindow();

	var diasSemana = L('weekDays').split(',');
    var nomMeses   = L('months').split(',');
    
    var herramientas =  require('tools');
	var pantallaCompleta = herramientas.isiOS7Plus();
	  
	var actHorWdw = Titanium.UI.createWindow({
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
		height: Ti.Platform.displayCaps.platformHeight,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
	});

	scrollView_1 = Titanium.UI.createView({
		id : "scrollView_1",
		backgroundImage : '/images/background.png',
		height : '100%',
		width : '100%',
		layout : 'vertical'
	});

	function cerrarActHorWdw()
	{
		Ti.Media.vibrate();
		actHorWdw.close();
	}
	
	var templates = require('templates');
	var topBar = templates.getTopBar(L('activities'),'/images/horarios_blanco.png', cerrarActHorWdw);
	
	scrollView_1.add(table);
	actHorWdw.add(topBar);
	
	actHorWdw.add(scrollView_1);

	//var dias;
	var eventosCargados = new Array(); //cada propiedad es un dia que contiene un arreglo de eventos
	var eventosCargadosLabels = new Array(); //cada propiedad es un dia que contiene un arreglo de eventos

	function populateTable() 
	{
		var data = [];
		
		dias.forEach(function(dia) 
		{
			var fecha = dia.split("/");
			var formateada = new Date(fecha[2], fecha[1] - 1, fecha[0]);
			var titulo = diasSemana[formateada.getDay()] +" "+formateada.getDate() + " - "+ nomMeses[formateada.getMonth()];
			
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

	table.addEventListener('click', function(e) 
	{
		if (e.row.isparent) 
		{
			if (e.row.opened) 
			{
				for (var i = e.row.sub.length; i > 0; i = i - 1) 
					table.deleteRow(e.index + i);
				e.row.opened = false;
			} 
			else
			{
				//Si no se han cargado los eventos del dia, descargar solo los del dia seleccionado
				if(eventosCargados[e.rowData.title].length == 0)
				{
					network.getDataParam(network.SERVICES.ACTIVITIES, e.row.id, function(response) 
					{
						var eventos = response;
						
					    labelsEventos = new Array();	
						
						for (var index = 0; index < eventos.length; index++) 
						{
							var evento = {};
							
							evento.id = eventos[index].id.toString();
							evento.left = '15%';
							evento.title = eventos[index].name + " \r " + 
										   eventos[index].start_date.substring(11,16) + " - " + eventos[index].end_date.substring(11,16) + " \r " + 
										   eventos[index].place;
							evento.font = {
								fontSize : '14dp'
							};
							evento.color = '#424242';
							labelsEventos.push(evento);
						}
						
						e.row.sub = labelsEventos;
						
						for (var i = 0; i < labelsEventos.length; i++) 
						{
							table.insertRowAfter(e.index, labelsEventos[i], {animationStyle:Titanium.UI.iPhone.RowAnimationStyle.RIGHT});
						}
						
						eventosCargados[e.rowData.title] = eventos;
						eventosCargadosLabels[e.rowData.title] = labelsEventos;
						
						e.row.opened = true;
					});
				} 
				else //Si ya estaban cargados los eventos solo insertarlos
				{
					for (var i = 0; i < eventosCargados[e.rowData.title].length; i++) 
					{
						table.insertRowAfter(e.index, eventosCargadosLabels[e.rowData.title][i],{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.RIGHT});
					}
					
					e.row.opened = true;
				}
			} 
		}
		else 
		{
			//Mostrar Detalles
			for(var eventosDelDia in eventosCargados)
		    {
		      eventosCargados[eventosDelDia].forEach(function(parEvento)
		      {
		        if(e.rowData.id == parEvento.id)
				{
					var lblFecha = "";
					var lblHora = "";
					
					if(parEvento.start_date.length > 10)
				    {
				        var formateada  = parEvento.start_date.substring(0,10);
				        var cadenas 	= formateada.split("-");
				      	lblFecha 		= cadenas[2] +"/"+ nomMeses[cadenas[1]-1] +"/"+cadenas[0];
				      	lblHora 		= parEvento.start_date.substring(11,16) + " - " + parEvento.end_date.substring(11,16);
				    }
					
					var evento = new Object();
					evento[L('name')] = parEvento.name;
					evento[L('start_date')] = lblFecha;
					evento[L('place')] = parEvento.place;
					evento[L('hora')] = lblHora;
					if(parEvento.observations != null)
						evento[L('observations')] = parEvento.observations;
					
					infoView.openView(evento);
				}
		      });
		    }
		}
	});
	
	buttonClose.addEventListener('click', function(e){
		cerrar();
	});

	actHorWdw.addEventListener('android:back', function(e) 
	{
		cerrar();		
	});
	
	function cerrar()
	{
		Ti.Media.vibrate();
		actHorWdw.close();
	}

	return actHorWdw;
}

module.exports = HorariosWindow;

