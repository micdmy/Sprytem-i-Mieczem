
function Statistics(multiplier, jsonData) {	//TU ZMIEN
	var that = jsonData;
	multiplyTimeValues(multiplier);	
	
	that.get = function() {
		return that;
	}
	/*
	 * REMINDER
	 * structure of that:
	 * +that
	 * 	+gui
	 * 	+buildings
	 * 	 +plants
	 * 	 +shops
	 * 	+creatures
	 *  +skills
	 *  +parameters
	 *   +counters
	 *   +resources
	 */
	function multiplyTimeValues(times){
		multiply(that.buildings.plants,times);
		multiply(that.buildings.shops,times);
		multiply(that.creatures,times);
		multiply(that.skills,times);
		multiply(that.parameters.counters,times);
	};
	function multiply(elements,times) {
		for(i in elements) {
			if(elements[i].timeNormal != undefined) {
				elements[i].timeNormal *= times;
			}
			if(elements[i].timeFatigue != undefined) {
				elements[i].timeFatigue *= times;
			}
			if(elements[i].timeOffset != undefined) {
				elements[i].timeOffset *= times;
			}
			if(elements[i].timeRecover != undefined) {
				elements[i].timeRecover *= times;
			}
			if(elements[i].startValue != undefined) {
				elements[i].startValue *= times;
			}
			if(elements[i].max != undefined) {
				elements[i].max *= times;
			}
			
		}
	}
	
	
	return that;
}
