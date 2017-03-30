function PlantStats(members) {
	var that = BuildingStats(members);
	that.resourcesList = members.resourcesList;
	return that;
}
function Plant(args) {
	var that = Building(args);
	var resources = args.resources;
	var resourcesBilans = []; //array with resources referensec and its values to increment/decrement
	that.getResourcesBilans = function() { //for shop
		return resourcesBilans;
	}
	that.afterResourcesBilansMsg = Message("",[]);
	var position;
	//resourceBilans initialisation:
	for(pos in that.statistics.resourcesList) {
		position = that.statistics.resourcesList[pos];
		for(i=0;i<resources.length;i++) {
			if(position.resourceId === resources[i].getId()) {
				resourcesBilans.push({
					resource : resources[i],
					bilans : position.value
				})
			}
		}
	}
	//overwrite from TimeClient:
	//onEnableAction() loops through all resourceBilances and adds or takes value from proper resources
	//called in TimeClient, on enable state, when TimeClient clicked
	that.onEnableAction = function() {	
		for(r in resourcesBilans) {	
			//increments or decrements value from resourcesBilans to one resource from resourcesBilans
			resourcesBilans[r].resource.increment(resourcesBilans[r].bilans);
			that.send([that.afterResourcesBilansMsg]);
		}	
	}
	return that;
}
