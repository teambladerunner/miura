

jQuery(function($) {'use strict',

	$('#profileSettingsSubmit').click(function(event) {
		//alert('Start');
		//var data = JSON.stringify(jQuery('#registrationForm').serializeArray())
		//var user = new Object();
		//user.name = "Jesper";
		//var data=JSON.stringify(user);
		var data=JSON.stringify({name: "Mozilla"});
		callServer("PUT","http://10.240.240.113:9000/user",data)
		//alert('End');
	});	

	jQuery('#locale').change(function() {
		
		SESSION.locale = $('select[name=locale]').val();
		log(SESSION.locale);
		loadBundles(SESSION.locale);
	});



});

