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
				milkvalue = radios[i].value;
				milkvalue
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
				$("addnew").style.display = "none";
				$("items").style.display ="none";			
				break;
			default:
				return false;
		}
	}
	
	function storeData(key) {
		if(!key) {
			var id           = Math.floor(Math.random()*41345678);
		}else{
			id = key;		
		}		
		getSelectedRadio();
		var item		 = {};
			item.timeofday = ["Time of Day:", $("TimeofDay").value];
			item.date	 = ["Date:", $("Date").value];
			item.ounces  = ["How Many Ounces:", $("HowManyOunces").value];
			//item.milk    = ["Is It Breastmilk?", milkvalue];
			item.notes  = ["Notes:", $("Notes").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Milk bottle saved!");
	}
	
	function getData() {
		toggleControls("on")
		if(localStorage.length === 0) {
			alert("There are no bottles saved.");
		}
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for(var i = 0; i<localStorage.length; i++) {
			var makeli = document.createElement("li");
			var linksLi = document.createElement("li");
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
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);		
		}
	} 
	
	function makeItemLinks(key, linksLi) {
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Bottle";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Bottle";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);		
	}
	
	function editItem() {
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		toggleControls("off");
		
		$("TimeofDay").value = item.timeofday[1];
		$("Date").value = item.date[1];
		$("Notes").value = item.notes[1];
		//$("HowManyOunces").value = item.HowManyOunces[1];
		var radios = document.forms[0].milkvalue;
		for(var i = 0; i < radios.length; i++) {
			if(radios[i].value == "Yes" && obj.milk[1] == "No") {
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "No" && obj.milk[1] == "No") {
			radios[i].setAttribute("checked", "checked");
			}
		}
		save.removeEventListener("click", storeData);
		$("Submit").value = "Edit Bottle";
		var editSubmit = $("Submit");
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;	
	}
	
	function deleteItem() {
		var ask = confirm("Are you sure you want to delete this bottle?");
		if(ask) {
			localStorage.removeItem(this.key);
			alert("Bottle was removed");
			window.location.reload();
		}else{
			alert("Bottle was not removed");
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
	
	function validate(e) {
		var getNotes = $("Notes");
		var messageAry = [];
		if(getNotes.value === 0) {
			var notesError = "Please enter some notes about your baby";
			getNotes.style.border = "3px dashed purple";
			messageAry.push(notesError);
		}
		
		if(messageAry.length >= 1) {
			for(var i = 0; i < messageAry.length; i++) {
				var txt = document.createElement("li");
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			storeData(this.key);
		}
	}
	
	//Variable Defaults
	var formtime = ["Morning", "Noon", "Night"];
		makeCats();
		errMsg = $("errors");
	
	var displayLink = $("displaylink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var save = $("Submit");
	save.addEventListener("click", storeData);
	
});