function BuildingStats(members) {
	var that = TimeClientStats(members)
	
	return that;
}
function Building(args) {
	var that = TimeClient(args);
	that.usunNAME = that.statistics.name;
	that.setAddress("bu");
	that.superReadMail = that.readMail;
	that.readMail = function(order) {
		that.superReadMail(order);
	}
	return that;
}