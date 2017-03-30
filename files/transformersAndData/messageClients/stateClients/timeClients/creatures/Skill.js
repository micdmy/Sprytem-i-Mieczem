function Skill(args) {
	var that = FatigueClient(args);
	that.setAddress("k");
	var superReadMail = that.readMail;
	that.readMail = function(order) {
		if(order === "z") { //zero
			that.counter.set(0);
		} else {
			superReadMail(order);
		}
	}
	return that;
}