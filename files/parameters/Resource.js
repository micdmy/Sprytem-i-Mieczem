/**
 * 
 */
function Resource(statistics) {	
	var that = Parameter({
		statistics : statistics, //zostaw tylko to pole, zobacz gdzie uzywane id i przerob
		id : statistics.id,
		startValue : statistics.startValue,
		canEdit : true,
		minValue : 0,
		maxValue : undefined,
		});
	return that;
}