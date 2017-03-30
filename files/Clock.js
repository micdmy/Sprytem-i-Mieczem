function Clock(intervalTime, angularInterval, callback) {
	var that = {};
	var timeMs =intervalTime;
	var intervalInstance = angularInterval;
	var callback = callback;
	var promise;
	that.stop = function() {
		if(promise !=undefined) {
			intervalInstance.cancel(promise);
		}
	};
	that.start = function() {
		that.stop();
		promise = intervalInstance(callback,timeMs);	
	};
	
	return that;
}