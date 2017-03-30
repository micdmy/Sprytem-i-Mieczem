function Geometry(args) {
	var that = {};
	var window;
	var statistics;
	that.getGui = function(element) {
		if (that.screenWidthPx >= that.screenHeightPx ) {
			return element.gui.landscape;
		} else {
			return element.gui.portrait;
		}
	};
	//to reload use function init
	that.init = function(args) { //EXECUTES (args)
		var statistics = args.statistics;
		var window = args.window;
		var controllerElement = args.controller;
		var document = args.document;
		//base values:
		that.screenWidthPx = controllerElement.clientWidth;
		
		that.screenHeightPx = window.innerHeight;

		//two passibilities: VOptionBar and HOptionBar
		var tableWidthWithVOptionBar = that.getGui(statistics).percentfortable/100*that.screenWidthPx;
		var tableHeightWithHOptionBar = that.getGui(statistics).percentfortable/100*that.screenHeightPx;
		function bestSize(tableW, tableH, cellsX, cellsY) {
			var cellW = tableW / cellsX;
			var cellH = tableH / cellsY;
			return cellW <= cellH ? cellW : cellH;
		}
		that.cellsX = that.getGui(statistics).elementsX;
		that.cellsY = that.getGui(statistics).elementsY;
		//with VOptionBar:
		var imgSizePx0 = bestSize(tableWidthWithVOptionBar,that.screenHeightPx,
				that.cellsX, that.cellsY);
		//with HOptionBar:
		var imgSizePx1 = bestSize(that.screenWidthPx,tableHeightWithHOptionBar ,
				that.cellsX, that.cellsY);
		if(imgSizePx0 > imgSizePx1) {
			//with VOptionBar:
			that.imgSize = imgSizePx0;
			that.isOptionBarVertical = true;
		} else {
			//with HOptionBar:
			that.imgSize = imgSizePx1;
			that.isOptionBarVertical = false;
		}
		that.tableWidthPx = that.imgSize*that.cellsX;
		that.tableHeightPx = that.imgSize*that.cellsY;
		if(that.isOptionBarVertical) {
			that.cancelSize = that.screenWidthPx - that.tableWidthPx;
			that.cancelSize = that.cancelSize < that.screenHeightPx/10 ? that.cancelSize : that.screenHeightPx/10;
		} else {
			that.cancelSize = that.screenHeightPx - that.tableHeightPx;
			that.cancelSize = that.cancelSize < that.screenWidthPx/10 ? that.cancelSize : that.screenWidthPx/10;
		}
		//that.progressSize = (100-that.getGui(statistics).percentforimg)/100*that.imgSize;	
		that.screenSize = setScreenSize(that.screenWidth);
	}(args);
	
	function setScreenSize(width) {
		if(width < 480) {
			return "s"
		} else if(width < 1200) {
			return "m";
		} else {
			return "l"
		}
	}
	return that;
}