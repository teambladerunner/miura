//login stuff


jQuery(function($) {'use strict',
	$('#login_btn').click(function() {
			var data = JSON.stringify(jQuery('#login_form').serializeArray())
	        callServer("POST",URL.postLogin,data,function () {message()})

	});
});

function message(){
	alert("Hi")

}