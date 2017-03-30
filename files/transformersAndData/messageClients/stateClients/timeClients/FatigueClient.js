function FatigueClientStats(members) {
	var that = TimeClientStats(members);
	that.timeFatigue = members.timeFatigue;
	that.timeRecover = members.timeRecover;
	return that;
}
function FatigueClient(args) {
//private:
	var that=TimeClient(args);
	var maxTimeRecover = 
//executes on create:	
	//uses the same addres what TimerClient do
	that.fatigue = 0;
	that.timeFromLastAction = that.statistics.timeRecover;
	that.recovered = true;
//overwrite from TimerClient, execute:
	that.timeTaken = that.statistics.timeNormal; 
//overwriten from TimerClient:	
	that.takeTime = function() {
		that.counter.increment(-that.timeTaken);
		if(!that.recovered) {
			that.fatigue += that.statistics.timeFatigue;
		}
		that.timeFromLastAction = 0;
		updateRecovered();
		updateTimeTaken();
	}
//callback overwriten from TimerClient:
	var superTick = that.tick; //old callback
	that.tick = function() {
		if(that.fatigue > 0) {
			that.fatigue --;
		}
		if(!that.recovered) {//there is no sense incrementing timeFromLastAction, if recovered
			that.timeFromLastAction++;
		}	
		updateRecovered();
		updateTimeTaken();
		superTick(); //call old callback
	}
//public functions:
	function updateRecovered() {
		if(that.statistics.timeRecover > 0 ) {
			that.recovered = (that.timeFromLastAction >= (that.statistics.timeRecover
					+ Math.floor(that.fatigue/that.statistics.timeRecover) ));
		} else {
			that.recovered = true;
		}
	}
//private function:
	function updateTimeTaken() {
		that.timeTaken = that.statistics.timeNormal + that.fatigue;
	}
	return that;

}