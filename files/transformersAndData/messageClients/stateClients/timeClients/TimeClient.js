function TimeClientStats(members) {
	var that = StateClientStats(members);
	that.timeNormal = members.timeNormal;
	that.timeOffset = members.timeOffset;
	that.counterId = members.counterId;
	return that;
}
function TimeClient(args) {
//private:
	var that = StateClient(args);
	var timeOffsetLeft = that.statistics.timeOffset;
	var msgsBeforeTimeTaken =[];
	var msgsAfterTimeTaken =[];
	//TODO: add mesages
//public :
	that.counter = undefined;	
	that.timeTaken = that.statistics.timeNormal;
//public functions:	
	that.getTime = function() {
		return that.counter.get();
	}
	that.takeTime = function() {
		that.counter.increment(-that.timeTaken);
	}
	that.timeCondition = function() {
		return (that.getTime() >= that.timeTaken);
	}
	that.addMessageBeforeTimeTaken = function(msg) {
		msgsBeforeTimeTaken.push(msg);
	}
	that.addMessageAfterTimeTaken = function(msg) {
		msgsAfterTimeTaken.push(msg);
	}
	
//executes on create:
	if(that.statistics.disableAddresses != undefined) {
		that.onFirstClickMsg = Message("d",that.statistics.disableAddresses);
		that.onSecondClickMsg = Message("e",that.statistics.disableAddresses);
	}
	if(that.statistics.offsetAddresses.a1 != undefined) {
			that.addMessageAfterTimeTaken(Message("o",that.statistics.offsetAddresses));
	}
	
	if(that.statistics.address != undefined) {
		that.setAddress(that.statistics.address);
	}
	that.setState("w");
	that.setAddress("T");
	var counters = args.counters;
	for(c in counters) {
		if(that.statistics.counterId === counters[c].getId()) {
			that.counter = counters[c];
			break;
		}
	}
	that.addMessageAfterTimeTaken(Message("c",["T"]));
	//should be overdefined in children:
	that.onEnableAction = function() {};
	that.addOrEditState(State("d",function(){ // d-disable
		//dont react on execute
	}));
	that.addOrEditState(State("e",function(){ // e-enable
		if(that.isClickValid()) {
			that.send(msgsBeforeTimeTaken);
			that.takeTime();
			that.send(msgsAfterTimeTaken);
			//that.send(Message("c",["T"])); //inform other timers, that counter value has changed
			that.onEnableAction();
			if(that.statistics.timeOffset > 0) {
				timeOffsetLeft = that.statistics.timeOffset;
				that.setState("o"); 
			}
			else {
				if(!that.timeCondition()) {	
					that.setState("w"); 
				}
			}
	}
	}));
	that.addOrEditState(State("w",function(){ // w-waiting
		//dont react on execute
	}));
	that.addOrEditState(State("o",function(){ // o-offset time
		//dont react on execute
	}));
//callbacks:	
	that.readMail = function(order) {
		switch(order) {
		case "d" : { //disable
			that.setState("d");
			break;
			}
		case "e" : { //enable
			setStateWEOnTimeCondition();
			break;
		}
		case "o" : { //offset
			if(that.statistics.timeOffset > 0) {
				timeOffsetLeft = that.statistics.timeOffset;
				that.setState("o");
			}
			break;
		}
		case "c" : { //check, counter value changed (i.e by other client)
			performCheck();
			break;
		}
		}
	}
	that.tick = function() {		
		switch(that.currentStateName) {
		case "w" : {
			if(that.timeCondition()) {
				that.setState("e");
			}
			break;
		}
		case "o" : {
			timeOffsetLeft--;
			if(offsetCondition()) {
				setStateWEOnTimeCondition()
			}
			break;
		}			
		}
	}

//private functions:	
	function offsetCondition() {
		return timeOffsetLeft <= 0;
	}
	function performCheck() {
		switch(that.currentStateName) {
		case "d" : {
			break;
		}
		case "o" : {
			break;
		}
		case "w" : {
			setStateWEOnTimeCondition();
			break;
		}
		case "e" : {
			setStateWEOnTimeCondition();
			break;
		}
	}
	}
	function setStateWEOnTimeCondition() {
		if(that.timeCondition()) {
			that.setState("e");
		} else {
			that.setState("w");
		}
	}

	return that;
}
