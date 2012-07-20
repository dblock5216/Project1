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
		}

		function storeData(key){
			if(!key){
				var id 			= Math.floor(Math.random()*1000045);
				}else{
					id = key;
				}
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
						var linksLi = document.createElement("li");
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
						var optSubText = obj[n] [0]+" "+obj[n][1];
						makeSubli.innerHTML = optSubText;
						makeSubList.appendChild(linksLi);			
					}
				
					makeItemLinks(localstorage.key(i, linksLi));
				
				}	
			}	
			
			//Create edit and delete links for items
			function makeItemLinks(key, linksLi){
					//add edit single item link
					var editLink = document.createElement("a");
					editLink.href = "#";
					editLink.key = key;
					var editText = "Edit Cigarette";
					editLink.addEventListener("click", editItem); 
					editLink.innerHTML = editText; 
					linksLi.appendChild(editLink);
				
					//add line break
					var breakTag = document.createElement("br");
						linksLi.appendChld(breakTag);
				
				
					//add delete single item link
					var deleteLink = document.createElement("a");
					deleteLink.href = "#";
					deleteLink.key = key;
					var deleteText = "Delete cigarette";
					deleteLink.addEventListener("click", deleteItem);
					deleteLink.innerHTML = deleteText;
					linksLi.appendChild(deleteLink);	
			}
		
			function editItem(){
				//grab data from local storage
				var value = localStorage.getItem(this.key);
				var obj = JSON.parse(value);
			
				//Show the form 
				toggleControls("off");
			
				//populate form fields with current local storage values
				snatchelement("groups").value = item.group[1];
				snatchelement("TimeofDay").value = item.tday[1];
				snatchelement("ReasonForSmoking").value = item.reason[1];
				var radios = document.forms[0].AreThereChildrenAroundYou;
					for(var i = 0; i<radios.length; i++){
						if(radios[i].value == "Yes" && obj.AreThereChildrenAroundYou[1] == "Yes"){
							radios[i].setAttribute("checked", "checked");
						}else{ if(radios[i].value == "No" && obj.AreThereChildrenAroundYou[1] == "No"){
							radios[i].setAttribute("checked", "checked");
						}
				}
			
		}
	
				snatchelement("HowFarIsTheClosestPerson").value = obj.distance[1];
				snatchelement("Date").value = obj.date[1];
			}
		
			//Remove listener from save contact
			save.removeEventListener("click", storeData);
			//Change submit button to say edit button
			snatchelement("Submit").value = "Edit Contact";
			var editSubmit = snatchelement("Submit");
			//Save key value established as property of edit submit event
			//so we can save that value with the info we edit
			editSubmit.addEventListener("click", validate);
			editSubmit.key = this.key;
			
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this cigarette?");
			if(ask){
				localStorage.removeItem(this.key);
				window.location.reload();
			}else{
				alert("Cigarette remains smoked!")
			}
		}
		
	function clearData(){
		if(localStorage.length === 0){
			alert("There is no cigarette to clear.")
		}else{
			localStorage.clear();
			alert("All cigarettes are deleted!")
			window.location.reload();
			return false;
			
			}
		}
		
	function validate(e){
		var getGroup = snatchelement("groups");
		var getDate = snatchelement("Date");
		var getWhen = snatchelement("TimeofDay");
		var getWherechild = snatchelement("AreTheirChildrenAroundYou");
		var getReason = snatchelement("ReasonForSmoking");
		
		//reset error messages
		errormessage.innerHTML = "";
		getGroup.style.border = "2px solid black";
		dateError.style.border = "2px solid black";
		whenError.style.border = "2px solid black";
		reasonError.style.border = "2px solid black";
		
		//Get error messages
		var messageArry = [];
		
		//Group validation
		if(getGroup.value === "--Choose a Group--"){
			var groupError = "!!Please choose a group.!!";
			getGroup.style.border = "2px dashed red";
			messageArry.push(groupError);
			
			}
		
		if(getDate.value === ""){
			var dateError = "!!Please choose a date!!";
			dateError.style.border = "2px dashed red";
			messageArry.push(dateError);
		
			}
	
		if(getWhen.value === ""){
			var whenError = "!!Please tell us when!!";
			whenError.style.border = "2px dashed red";
			messageArry.push(whenError);
		
			}
		
		if(getReason.value === ""){
			var reasonError = "!!What is your reason for smoking?!!";
			reasonError.style.border = "2px dashed red";
			messageArry.push(reasonError);
		
			}
		
		//error message display
		if(messageArry.length >= 1){
			for(var i = o; j = messageArry.length; i < j; i++){
			var txt = document.createElement("li");
			txt.innerHTML = messageArry[i];
			snatchelement("errors").appendChild(txt);
			}
		}
			e.preventDefault();
			return false;
		}else{
		//Sends key value from editData function
			storeData(this.key);
		}
	}
	
	//Variable defaults
			var timeofday = ["Morning", "Noon", "Night"];
			var pickday = snatchelement("Date");
			var pickwhen = snatchelement("TimeofDay");
			var setdistance = snatchelement("HowFarIsTheClosestPersonToYou");
			var wherechild = snatchelement("AreTheirChildrenAroundYou");
			var	givereason = snatchelement("ReasonForSmoking");
			var errormessage = snatchelement("errors");
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
	
	};