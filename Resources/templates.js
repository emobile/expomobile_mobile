
exports.getTopBar = function(titulo, listener)
{
	labelTitulo = Titanium.UI.createLabel({
		id : "labelTitulo",
		height : 'auto',
		width : Ti.UI.SIZE,
		text : titulo,
		font : {
			fontSize : '22dp'
		},
		color : 'white',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		center:{
			x: '50%'
		},
		top: 5		
	});
	
	buttonClose = Titanium.UI.createImageView({
		id : "buttonClose",
		image : "/images/close.png",
		width : 30,
		height : 30,
		top : 5,
		right: 5
	});
	
	imageViewBar = Titanium.UI.createView({
		id : "imageViewBar",
		backgroundColor : Ti.App.Properties.getString('viewcolor'),
		height : 40,
		left : 0,
		top : 0,
		width : '100%',
		layout : 'composite'
	});
	
	
	buttonClose.addEventListener('click', listener);
	imageViewBar.add(labelTitulo);
	imageViewBar.add(buttonClose);
	
	return imageViewBar;
};
