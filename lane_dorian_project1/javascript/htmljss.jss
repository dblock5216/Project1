//Dorian Lane
//Activity 2
//Visual Frameworks (VFW)
//July 10, 2012

//Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){
	
//getelementById Function	
	function snatchelement(x){
		var theElement = document.getElementById(x)
		return theElement;
	}


//Create select field element and populate it
 	function makeCats(){
		var formtag = document.getElementsByTagName("form");
		selectLi = snatchelement("select");
		makeSelect = document.createElement("select");
		makeSelect.setAttribute("id", "groups");
	for(var i=0; j=timeofday.length; i<j, i++){
		var maketime = document.createElement("option");
		var optText = timeofday[i];
		maketime.setAttribute("value", optText);
		maketime.innerHTML = optText;
		makeSelect.appendChild(maketime);
	}
	selectLi.appendChild(makeSelect);
}
	function getSelectedRadio(){
		var radio = document.forms[0].AreTheirChildrenAroundYou;
		for (var i=0; i<radio.length; i++){
		if(radio[i].checked){
			kidvalue = radio[i].value;
		}
	}
}
	function toggleControls(n){
		switch(n){
			case "on":
				snatchelement("fieldset").style.display = "none";
				snatchelement("clear").style.display = "inline";
				snatchelement("datadisplay").style.display = "none";
				break;
			case "off":
				snatchelement("fieldset").style.display = "block";
				snatchelement("clear").style.display = "inline";
				snatchelement("datadisplay").style.display = "inline";
				snatchelement("items").style.display = "none";  
				break;
			default:
				return false;
				
				
				
				
				
	}

	function storeData(){
		var id 			= Math.floor(Math.random()*1000045);
		getSelectedRadio();
		var item		= {};
			item.group	= ["Smoked", snatchelement("groups").value];
			item.tday	= ["Time of Day", snatchelement("TimeOfDay").value];
			item.date	= ["Date", datevalue];
			item.distance = ["Distance", snatchelement("HowFarIsTheClosestPersonToYou").value];
			item.childvalue = ["Children", kidvalue];
			item.reason = ["Reason", snatchelement("ReasonForSmoking").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Begin Smoking");
		
	}
		
	function getData(){
			toggleControls("on");
			var makeDiv = document.createElement("div");
			makeDiv.setAttribute("id", "items");
			var makeList = document.createElement("ul");
			makeDiv.appendChild(makeList);
			document.body.appendChild(makeDiv);
				snatchelement("items").style.display = "display"; 
			for(var i=0, len=localStorage.length; i<len; i++){
				var makeli= document.createElement("li");
				makeList.appendChild(makeli);
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				//Convert String from local storage back to object
				var obj = JSON.parse(value);
				var makeSubList = document.createElement("ul");
				makeli.appendChild(makeSubList);
				for(var n in obj){
					var makeSubli = document.createElement("li");
					makeSubList.appendChild(makeSubli);
					var optSubText = obj[n] [0]+" "+obj [n] [1];
					makeSubli.innerHTML = optSubText;				
				}
			}	
		}
		
		
function clearData(){
	if(localStorage.length === 0){
		alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("All contacts are deleted!")
			window.location.reload();
			return false;
		}
}


//Variable defaults
		var timeofday = ["Morning", "Noon", "Night"];
		var pickday = snatchelement("Date");
		var pickwhen = snatchelement("TimeofDay");
		var setdistance = snatchelement("HowFarIsTheClosestPersonToYou");
		var wherechild = snatchelement("AreTheirChildrenAroundYou");
		var	givereason = snatchelement("ReasonForSmoking");
			kidvalue;	
			makeCats();
	
			alert("Tobacco Smoke Increases The Risk Of Lung Cancer And Heart Disease, Even In Nonsmokers.");
		 
	
//Set Link & Submit Listeners	
		var displaylink = snatchelement("datadisplay");
		displaylink.addEventListener("click", getData);
		var clearlink = snatchelement("clear");
		clearlink.addEventListener("click", clearData);
		var save = snatchelement("Submit");
		save.addEventListener("click", storeData);
	
});






