function TimeCore() {
	var that = MessageCore();
	var timeClients = [];
	that.counters = []
	that.addTimeClient = function(timer) {
		timeClients.push(timer);
	}
	that.addCounter = function(counter) {
		that.counters.push(counter);
		
	}
	that.getCounters = function() {
		return that.counters;
	}
	
	that.tickAll = function(){
		//first change time:
		for(c in that.counters) {
			that.counters[c].increment(1);
		}
		//then inform timeClients:
		for(t in timeClients) {
			timeClients[t].tick();
		}
	}
	return that;
}