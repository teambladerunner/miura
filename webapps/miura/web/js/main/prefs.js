jQuery(function($) {'use strict',

	$('#profileSettingsSubmit').click(function(event) {
		//alert('Start');
		//var data = JSON.stringify(jQuery('#registrationForm').serializeArray())
		//var user = new Object();
		//user.name = "Jesper";
		//var data=JSON.stringify(user);
		var data=JSON.stringify({name: "Mozilla"});
		callServer("PUT","http://10.240.240.113:9000/user",data,function () {populateForm1(data)})
		//alert('End');
	});	

	jQuery('#locale').change(function() {
		
		SESSION.locale = $('select[name=locale]').val();
		log(SESSION.locale);
		loadBundles(SESSION.locale);
	});


	function populateForm1(data) {
		log("Populate Form");
    
    }

	function populateForm (data) {
  		$.each(data, function(name, val){
   			 var $el = $('[name="'+name+'"]'),
       		 type = $el.attr('type');

		    switch(type){
		        case 'checkbox':
		            $el.attr('checked', 'checked');
		            break;
		        case 'radio':
		            $el.filter('[value="'+val+'"]').attr('checked', 'checked');
		            break;
		        default:
		            $el.val(val);
    		}
		});
    
    }


});

