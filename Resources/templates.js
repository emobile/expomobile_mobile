
exports.getTopBar = function(titulo, pathIcono, listener)
{
	labelTitulo = Titanium.UI.createLabel({
		id : "labelTitulo",
		height : '100%',
		width : Ti.UI.SIZE,
		text : titulo,
		font : {
			fontSize : '24dp',
			fontWeight: 'bold'
		},
		color : 'white',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		center:{
			x: '50%',
			y: '50%'
		}
	});
	
	buttonClose = Titanium.UI.createImageView({
		id : "buttonClose",
		image : "/images/close.png",
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		top : 10,
		right: 10
	});
	
	imageView = Titanium.UI.createImageView({
		id : "imageView",
		image : pathIcono,
		width : 60,
		height : 60,
		center: { y: '50%' },
		left : '10'
	});
	
	topBar = Titanium.UI.createView({
		id : "imageViewBar",
		backgroundColor : Ti.App.Properties.getString('viewcolor'),
		height : 80,
		left : 0,
		top : 0,
		width : '100%',
		layout : 'composite'
	});
	
	buttonClose.addEventListener('click', listener);
	topBar.add(labelTitulo);
	topBar.add(buttonClose);
	topBar.add(imageView);
	
	return topBar;
};
