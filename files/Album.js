function Album(args) {
	var geometry;
	var statistics;
	var folder = "";
	that = {};
	that.init = function(args){ //EXECUTES (args)
		geometry = args.geometry;
		statistics = args.statistics;
		switch(geometry.screenSize) {
		case "s" : folder  = "img/l/"; break;
		case "m" : folder  = "img/l/"; break;
		case "l" : folder  = "img/l/"; break;
 		}
	}(args);
	
	that.setProperImgPaths = function(clients) {
		for(j in clients) {
			var clientRow = clients[j];
			for(i in clientRow) {
				if(!(clientRow[i].empty === true)) {
					var filePath = clientRow[i].imgPath;
					clientRow[i].imgPath = folder  + filePath;
					
				}
			}
		}
	}
	return that;
}