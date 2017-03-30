function Parameter(args) {		
	var that = {};
	
	var editable = args.canEdit;
	that.statistics = args.statistics; //przerob zeby bylo to pole zamiast id itd...
	that.id = args.id; //na rapublic ror ajs, potem zmien na private,
						//wtedy zmien tez getId
	that.value = args.startValue; //public for angularjs
	that.borders = {			  //public for angularjs
			max: args.maxValue,
			min: args.minValue			
	}	
	that.get = function() {
		return that.value;
	}
	that.set = function(newValue) {
		if(editable) {
			if(newValue > that.borders.max){
				//newValue too big
				that.value = that.borders.max;
			} 
			else {
				//newValue <= max or undefined max 
				if(newValue < that.borders.min) {
					//newValue too small
					that.value = that.borders.min;
				}
				else {
					//newValue >= min or undefined min
					that.value = newValue;
				}
			}
		}
	}
	that.increment = function(change) {
			that.set(that.value + change);
	}
	that.setEditable = function(canEdit) {
		editable = canEdit;
	}
	that.getMax = function() {
		return that.borders.max;
	}
	
	that.setMax = function(newMaxValue) {
		
		if(newMaxValue < that.value) {
			that.value = newMaxValue;
		}
		that.borders.max = newMaxValue;
	}
	that.setMin = function(newMinValue) {
		if(newMinValue > that.value) {
			that.value = newMinValue;
		}
		that.borders.min = newMinValue;
	}
	that.getId = function() {
		return that.id;
	}
	that.getPercentOfMax = function() {
		return 100 * that.value / that.borders.max;
	}
	return that;
}
