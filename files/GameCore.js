function GameCore(st) {
//inherits from:
	var that = TimeCore(); //and TimeCore inherits from MessageCore
//private:	
	/*
	switch(rasa) {
	case "elfy" : {
		that.statistics = StatisticsElfy(mnoznik); // contains stats data for clients
		break; 
		}
	case "krasnoludy" : {
		that.statistics = StatisticsKrasnoludy(mnoznik); // contains stats data for clients
		break; 
		}
	case "orki" : {
		that.statistics = StatisticsOrki(mnoznik); // contains stats data for clients
		break; 
		}
	case "ludzie" : {
		that.statistics = StatisticsLudzie(mnoznik); // contains stats data for clients
		break; 
		}
	}*/
	that.statistics =st;
	that.resources = [];
	that.clients = [];
	
	that.initClients = function(isLandscape) {	
		initArray(that.clients, getGui(that.statistics.get(),isLandscape).elementsX, getGui(that.statistics.get(),isLandscape).elementsY);
		//initPlants(that.clients,that.statistics.get().buildings.plants,isLandscape);
		//initShops(that.clients,that.statistics.get().buildings.shops,isLandscape);
		//initCreatures(that.clients,that.statistics.get().creatures,isLandscape);		
		createClientsFromGroups(that.getCounters(), that.resources, that.clients, isLandscape,
				{ 
					group0 : that.statistics.get().buildings.plants,
					group1 : that.statistics.get().buildings.shops,
					group2 : that.statistics.get().creatures,
					group3 : that.statistics.get().skills
				});
	}
	//for gameApp to allow access tothat.statistics
	that.getStatistics = function() {
		return that.statistics.get();
	}
	function initialise() { //executes on create
		
		initCounters(that.statistics.parameters.counters);
		initResources(that.statistics.parameters.resources);

		function initCounters(countersStats) {
			for(var i in countersStats) {
				that.addCounter(Counter({
					stats : countersStats[i]
				}));
			}
		}
		function initResources(resourcesStats) {
			for(var i in resourcesStats) {
				that.resources.push(Resource(resourcesStats[i]));
			}
		}		
		
		
	}
	
 	function getGui(element, isLandscape) {
		if(isLandscape) {
			return element.gui.landscape;
		} else {
			return element.gui.portrait;
		}
	}
	function initArray(array,innerSize,outerSize){
		for(i=0;i<outerSize;i++) {
			var tempInnerArray = [];
			for(j=0;j<innerSize;j++) {
				tempInnerArray.push({empty : true});
			}
			array.push(tempInnerArray);
		}
		return array
	}
	function initPlants(clientsArray,plantsStats,isLandscape) {
		for(var p in plantsStats) {
			var newPlant = Plant({
								stats : plantsStats[p],
								resources : that.resources,
								counters : that.getCounters()
							});
			clientsArray[getGui(plantsStats[p],isLandscape).posY]
						[getGui(plantsStats[p],isLandscape).posX] = newPlant;  
			that.addTimeClient(newPlant);
			that.addReceiverAndSender(newPlant);
		}
	}
	function initShops(clientsArray,shopsStats,isLandscape) {
		for(var p in shopsStats) {
			var newShop = Shop({
								stats : shopsStats[p],
								resources : that.resources,
								counters : that.getCounters()
							});
			clientsArray[getGui(shopsStats[p],isLandscape).posY]
						[getGui(shopsStats[p],isLandscape).posX] = newShop;  
			that.addTimeClient(newShop);
			that.addReceiverAndSender(newShop);
		}
	}
	function initCreatures(clientsArray,creaturesStats,isLandscape) {
		for(var i in creaturesStats) {
			var newCreature = Creature({
				stats : creaturesStats[i],
				counters : that.getCounters()
			});
			clientsArray[getGui(creaturesStats[i],isLandscape).posY]
						[getGui(creaturesStats[i],isLandscape).posX] = newCreature;  
			that.addTimeClient(newCreature);
			that.addReceiverAndSender(newCreature);
		}
	}
	function createClient(type,stats,counters,resources) {
		var ret;
		switch(type) {
		case "plant": {
			ret = Plant({stats : stats,
				counters : counters, resources : resources});
			break;
		}
		case "shop": {
			ret = Shop({stats : stats,
				counters : counters, resources : resources});
			break;
		}
		case "creature": {
			ret = Creature({stats : stats,
				counters : counters});
			break;
		}
		case "skill": {
			ret = Skill({stats : stats,
				counters : counters});
			break;
		}
		}
		return ret;
	}
	function createClientsFromGroups(counters, resources, clientsArray, isLandscape, groups) {
		for(i in groups) {
			var group = groups[i];
			for(j in group) {
				var newClient = createClient(group[j].typeOfClient, group[j], counters, resources)
				clientsArray[getGui(group[j],isLandscape).posY]
							[getGui(group[j],isLandscape).posX] = newClient;  
				that.addTimeClient(newClient);
				that.addReceiverAndSender(newClient);
			}
		}
	}
	
	initialise();
	return that;
}