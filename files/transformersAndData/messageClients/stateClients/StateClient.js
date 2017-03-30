function StateClientStats(members) {
	var that = MessageClientStats(members);
	 
	return that;
}
function StateClient(args) {
	var that = MessageClient(args);
	that.onFirstClickMsg = Message("",[]);
	that.onSecondClickMsg = Message("",[]);
	var states = [];
	var onStateChangeCallback = function(state){};
	var updateGuiFunction;
	var cancelButtonResize;
	that.setUpdateGuiFunction = function(f) {
		updateGuiFunction = f;
	}

	that.isTwoClick = that.statistics.twoClick;
	that.secondClick = false;
	that.currentStateName ="";
	that.setOnStateChangeCallback = function(callback) {
		onStateChangeCallback = callback;
	}
	that.addOrEditState = function(newState) {
		var pushNew =true;
		for(s in states) {
			if(newState.name === states[s].name) {
				states[s].stateFunction = newState.stateFunction;
				pushNew= false;
				break;
			}
		}
		if(pushNew) {
			states.push(newState);
		}
	}
	that.execute = function() {
		for(s in states) {
			if(that.currentStateName === states[s].name) {
				states[s].stateFunction();
				break;
			}
		}
	}
	that.editImage = function() {
		if(updateGuiFunction != undefined) {
				if((that.isTwoClick === true) && (that.secondClick === true)) {
					updateGuiFunction("#"+that.name+" img","saturate","1000");
				} else {
					if(that.currentStateName === "e") {
						updateGuiFunction("#"+that.name+" img","grayscale","0");
					} else {
						updateGuiFunction("#"+that.name+" img","grayscale","95");
					}
				}
		}
	}
	// checks if it was second click or client is one click only
	// used in timer, in enable state do determine if go to action
	that.isClickValid = function() { 
		if(that.isTwoClick === true) {
			if(that.secondClick === true) {
				that.secondClick = false;
				//that.editImage();
				that.send([that.onSecondClickMsg]);
				return true;
			} else {
				that.secondClick = true;
				//that.editImage();
				that.send([that.onFirstClickMsg]);
				return false;
			}
		} else {
			return true;
		}
	}
	that.cancelClick = function() { //used in angular
		that.secondClick = false;
		//that.editImage();
		that.send([that.onSecondClickMsg]);
	}
	that.setState = function(name) {
		that.currentStateName = name;
		//that.editImage();
		//onStateChangeCallback(name);
	}
	that.stateIs = function(stateToCheck) {
		return stateToCheck === that.currentStateName;
	}
	that.addOrEditState(State("e",function(){})); //e-enable
	that.setState("e");
	
	
	return that;
}

function State(name, stateFunction) {
	var that = {
		stateFunction : stateFunction,
		name : name
	};
	return that;
}