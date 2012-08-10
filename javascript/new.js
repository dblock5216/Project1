//-- Dorian Lane -->
//-- VFW 0812 -->
//-- August 8, 2012 -->

window.addEventListener("DOMContentLoaded", function() {

	function $(x) {
		var theElement = document.getElementById(x);
		return theElement;
		
	}
	
	function makeCats() {
		var formTag = document.getElementsByTagName("form"),
			selectLi = $("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "TimeofDay");
	for(var i = 0, j = formtime.length; i < j; i++) {
		var makeOption = document.createElement("option");
		var optText = formtime[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
	    }
	selectLi.appendChild(makeSelect);
	}
	
	function getSelectedRadio() {
		var radios = document.forms[0].milk;
		for (var i = 0; i < radios.length; i++) {
			if (radios[i].checked) {
				milk = radios[i].value;
			}
		}	
	}
	
	function toggleControls(n) {
		switch(n) {
			case "on":
				$("myContent").style.display = "none";
				$("clear").style.display = "inline";
				$("displaylink").style.display = "none";
				$("addnew").style.display = "inline";
				break;
			case "off":
				$("myContent").style.display = "block";
				$("clear").style.display = "inline";
				$("displaylink").style.display = "inline";
				$("addnew").style.display = "display";
				$("items").style.display ="none";			
				break;
			default:
				return false;
		}
	}
	
	function storeData() {
		var id           = Math.floor(Math.random()*41345678);
		getSelectedRadio();
		var item		 = {};
			item.timeofday = ["Time of Day:", $("TimeofDay").value];
			item.date	 = ["Date:", $("Date")];
			item.ounces  = ["How Many Ounces:", $("HowManyOunces").value];
			item.milk    = ["Is It Breastmilk?", milk];
			item.notes  = ["Notes:", $("Notes").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Milk bottle saved!");
	}
	
	function getData() {
		toggleControls("on")
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for(var i = 0; i<localStorage.length; i++) {
			var makeli = document.createElement("li");
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeli.appendChild(makeSubList);
			for(var n in obj) {
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n] [0] + " " + obj[n] [1];
				makeSubli.innerHTML = optSubText;
			}		
		}
	} 
	
	function clearLocal() {
		if(localStorage.length === 0) {
			alert("No Bottles Stored");	
		}else{
			localStorage.clear();
			alert("All Bottles Are Deleted.");
			window.location.reload();
			return;false
		}
	}
	
	//Variable Defaults
	var formtime = ["Morning", "Noon", "Night"];
		makeCats()
		;
	
	var displayLink = $("displaylink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var save = $("Submit");
	save.addEventListener("click", storeData);
	
});