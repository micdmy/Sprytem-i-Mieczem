
function Stats(members) {
	var that = {};
	that.name = members.name;
	//that.imgPath = members.gui.img.src;
	return that;
}
function StatsClient(args) {
	var that = ParameterClient(args)
	that.statistics = args.stats;
	that.name = that.statistics.name;
	that.imgPath = that.statistics.gui.img.src;
	
	return that;
}