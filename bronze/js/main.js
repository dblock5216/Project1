var parsebottleform = function(data) {
	console.log(data);
};

$(document).ready(function() {
	
	var formcheck = $("#newbottleform")
	
	formcheck.validate({
		invalidHandler: function(form, validator) {},
		submitHandler: function() {
			var data = formcheck.serializeArray();
			parsebottleform(data);			
		},		
	}
})

$('#addToStorage').click(function(e) {
    localStorage.setItem(localStorageKey, $('#babyname').val());
    localStorage.setItem(localStorageKey, $('#babysex').val());
    localStorage.setItem(localStorageKey, $('#timeofday').val());
    localStorage.setItem(localStorageKey, $('#babylbs').val());
    localStorage.setItem(localStorageKey, $('#milkounces').val());
    localStorage.setItem(localStorageKey, $('#notes').val());
    showStoreValue();
    e.preventDefault();
});