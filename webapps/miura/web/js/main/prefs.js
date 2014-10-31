jQuery(function($) {'use strict',
	$('#profileSettingsSubmit').click(function(event) {
		//alert('Start');
		var data = JSON.stringify(jQuery('#registrationForm').serializeArray())
		//var user = new Object();
		//user.name = "Jesper";
		//var data=JSON.stringify(user);
		//var data=JSON.stringify({name: "Mozilla"});
		callServer("PUT","http://192.168.1.5:9000/user",data,function () {populateForm1(data)})
		//alert('End');
	});	

	jQuery('#locale').change(function() {
		
		SESSION.locale = $('select[name=locale]').val();
		log(SESSION.locale);
		loadBundles(SESSION.locale);
	});

var a = [{"name":"first_name","value":"aaa"},{"name":"last_name","value":"aa"},{"name":"email","value":"a"},{"name":"password","value":"aa"},{"name":"password2","value":"a"},{"name":"locale","value":"en_us"}];
populateForm(a);









});

