function Shop(args) {
	var that = Plant(args);
	that.afterResourcesBilansMsg = Message("c",["s"]); //inform orher shops, when resources taken to check if afordable
	if(that.name === "herobuy") {
	that.addMessageAfterTimeTaken(Message("z",["k"])); //zero the skills o hero
	}
	function canAffordToBuy() {
		var ret = true;
                for(r in that.getResourcesBilans()) {	
			if(that.getResourcesBilans()[r].resource.get() + that.getResourcesBilans()[r].bilans < 0) {
				ret = false;
			}
		}
		return ret;
	}
	var superTimeCondition = that.timeCondition;
	that.timeCondition = function() {
		return superTimeCondition() && canAffordToBuy();
	}
	return that;
}