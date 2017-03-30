var gameApp = angular.module('game', []);
gameApp.controller('gameCtrl', function($scope, $window, $document, $timeout, $interval, $http) {	
	$scope.beginOfGame = true;
	$http.get("RACES.json")
	.then(function(json){
		$scope.raceNames = json.data.RACES;
		$scope.userChoice = {
				race : $scope.raceNames[0],
				gameSpeed : $scope.gameSpeeds[2].value
		}
	});
	$scope.gameSpeeds = [
	{name : "bardzo szybko",value : 10},
	{name : "szybko",value : 20},
	{name : "normalnie",value : 30},
	{name : "wolno",value : 40},
	{name : "bardzo wolno",value : 50},
	]
	var clock;
	var geometry;
	var album;
	
	$scope.initApplication = function() {
		$http.get("race_"+$scope.userChoice.race+".json")
	    .then(function(json){      
	    	$scope.beginOfGame = false;
	    	$scope.gameStarted = false;
	       	$scope.st =Statistics($scope.userChoice.gameSpeed,json.data);
	   		$scope.core = new GameCore($scope.st);
	   		$scope.core.initClients(isLandscape());
	   		$scope.cancelClients = initCancelClients($scope.core.clients)
	   		
	       
	   		clock = Clock(100,$interval,onTick);
	   		geometry = Geometry({
	   			window : $window,
	   			controller : $document[0].querySelector("#gamecontroller"),
	   			statistics : $scope.core.getStatistics(),
	   			document : $document[0]
	   			
	   		});
	   		$scope.geometry = geometry;
	   		album = Album({
	   			geometry : geometry,
	   			statistics : $scope.core.getStatistics()
	   		});
	   		
	   		//adds folder to imgPath of client, according to screen dismensions	
	   		album.setProperImgPaths($scope.core.clients); 
	   		$scope.adjustTableSize();
	   		$scope.startGame();
	     });
	}
	
	function onTick(){
		$scope.core.tickAll();
		for(j in $scope.core.clients) {
			var clientRow = $scope.core.clients[j];
			for(i in clientRow) {
				if(!(clientRow[i].empty === true)) {
					var bar = $document[0].querySelector("#"+clientRow[i].name+" #progress #bar");
					var takenBar =$document[0].querySelector("#"+clientRow[i].name+" #takenbar");
					bar.style.width = clientRow[i].counter.getPercentOfMax()+"%";
					var a= (100*clientRow[i].timeTaken / clientRow[i].counter.getMax())-1;
					takenBar.style.left =a +"%"; 
				}
			}
		}
	};
	
	
	
	
	
	$scope.clickCell = function(cell) {		
		cell.execute();
	};
	$scope.adjustTableSize = function() {
		 $timeout(function(){
			 
			var tableGui =  $document[0].querySelector("#tableGui");
			tableGui.style.width = geometry.tableWidthPx+"px";
			tableGui.style.height = geometry.tableHeightPx+"px";

			var cells = $document[0].querySelectorAll(".cell"); 
			for (var i = 0; i < cells.length; i++) {
				cells[i].style.width = geometry.imgSize+"px";
				cells[i].style.minWidth = geometry.imgSize+"px";
				cells[i].style.margin = "0 !important";
				cells[i].style.border = "0 !important";
				cells[i].style.padding = "0 !important";	
				cells[i].style.position = "relative";
			}
			var cellImgs = $document[0].querySelectorAll(".cellImg"); 
				for (var i = 0; i < cellImgs.length; i++) {
					cellImgs[i].style.width = geometry.imgSize+"px";
					//cellImgs[i].style.minWidth = geometry.imgSize+"px";
					cellImgs[i].style.margin = "0 !important";
					cellImgs[i].style.border = "0 !important";
					cellImgs[i].style.padding = "0 !important";	
					cellImgs[i].style.position = "relative";
				}	
			var progress = $document[0].querySelectorAll(".progress"); 
			for (var i = 0; i < progress.length; i++) {
				progress[i].style.width = geometry.imgSize+"px";
			}		
			var tableCancel = $document[0].querySelector("#tableCancel"); 
			tableCancel.style.height = geometry.cancelSize+"px";	

			//addClientsToWatch($scope.core.clients);	
			for (r in $scope.core.resources) {
				var resource = $document[0].querySelector("#"+$scope.core.resources[r].id);
				resource.style.color = $scope.core.resources[r].statistics.gui.textcolor;
				resource.style.backgroundColor = $scope.core.resources[r].statistics.gui.backgroundcolor;
				if(geometry.isOptionBarVertical) {
					resource.style.fontSize = geometry.cancelSize+"px";
				} else {
					resource.style.fontSize = (geometry.cancelSize*0.6)+"px";
				}
			}
	        }, 0);
		 
		
	};
	$scope.afterCancelAdded= function(selector) {
		$timeout(function(){ 
			//var cancels = $document[0].querySelectorAll(".cancel");
			/*for(var i=0; i < cancels.length; i++) {
				cancels[i].style.width = geometry.cancelSize + "px";
				
				cancels[i].style.position = "relative";
			}*/
			var cancels = $document[0].querySelectorAll(".cancelimg");
			for(var i=0; i < cancels.length; i++) {
				cancels[i].style.width = geometry.cancelSize + "px";
				
				//cancels[i].style.position = "relative";
			}
			/*var cancelsigns = $document[0].querySelectorAll(".cancelsign");
			for(var i=0; i < cancelsigns.length; i++) { 
				cancelsigns[i].style.width = geometry.cancelSize + "px";
	
				cancelsigns[i].style.position = "absolute";
				cancelsigns[i].style.top = "0%";
				cancelsigns[i].style.left = "0%";
			}*/

		}, 0);
	};
	$scope.effectCallback  = function(selector, effect, percent) {
		var image = $document[0].querySelector(selector); 
		image.style.filter = effect+"("+percent+"%)";
		image.setAttribute("style", "-webkit-filter:"+ effect+"("+percent+"%)"+";");
		
	};
	
	
	function isLandscape() {
		return $window.innerWidth >= $window.innerHeight;
	}
	function addClientsToWatch(clients) {
		for(j in clients) {
			var clientRow = clients[j];
			for(i in clientRow) {
				if(!(clientRow[i].empty === true)) {
					clientRow[i].setUpdateGuiFunction($scope.effectCallback);
					clientRow[i].editImage();
				}
			}
		}
	}
	function initCancelClients(clients) {
		var cancelClients = [];
		for(j in clients) {
			var clientRow = clients[j];
			for(i in clientRow) {
				if(!(clientRow[i].empty === true)) {
					if(clientRow[i].isTwoClick === true) {
						cancelClients.push(clientRow[i]);	
					}
				}
			}
		}
		return cancelClients;
	}
	$scope.startGame =function() {
		clock.start();
		$scope.gameStarted = true;
	};
	$scope.stopGame =function() {
		clock.stop();
		$scope.gameStarted = false;
	};
	
	
});