function MessageCore() {
	var that = {};
	var messageClients = [];
	that.addReceiverAndSender = function(newClient) {
		messageClients.push(newClient);
		newClient.registerMessageCore(that);
	}
	that.addSender = function(newClient) {
		newClient.registerMessageCore(that);
	}
	that.send = function(message) {
		for(a in message.clientAddresses) {
			for(c in messageClients) {
				var cliAddresses = messageClients[c].getAddress();
				for(ca in cliAddresses) {
					if(cliAddresses[ca] === message.clientAddresses[a]) {
						messageClients[c].receive(message.order);
						break;
					}
				}
			}
		}
	}
	return that;
}