function MessageClientStats(members) {
	var that = Stats(members);
	
	return that;
}
function MessageClient(args) {
	var that = StatsClient(args);
	
	var messageCore;
	var address = ["M"];
	var enableReceive = true;
	
	//have to be overwriten children, before that.send
	that.readMail = function(order) {
		
	}
	//should be used in children, before that.send
	that.setAddress = function(newAddress) {
		address.push(newAddress);
	}
	//should be used in children
	that.send = function(messages) {
		if(messageCore != undefined) {
			for(msg in messages) {
				enableReceive = false;
				messageCore.send(messages[msg]);
				enableReceive = true;
			}
		}
	}	
	//used in MessageCore, do not use it in children
	that.receive = function(order) {
		if(enableReceive) {
			that.readMail(order)
		}
	}
	//used in MessageCore, do not use it in children
	that.registerMessageCore = function(messageCoreRef) {
		messageCore = messageCoreRef;
	}
	//used in MessageCore, do not use it in children
	that.getAddress = function() {
		return address;
	} 
	return that;
}