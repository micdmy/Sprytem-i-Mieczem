function Counter(args){
	var that = Parameter({
		id : args.stats.id,
		startValue : args.stats.startValue,
		canEdit : true,
		minValue : 0,
		maxValue : args.stats.max
		});
	return that;
}