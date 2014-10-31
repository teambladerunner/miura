//common stuff

function log(message){
	if (window.console && DEBUG.isDebugEnabled) {
	    console.log(message);
	    if (DEBUG.isDebugAlertEnabled){}
	    	alert(message);
	}
}


function loadBundles(lang) {
	jQuery.i18n.properties({
	    name:'Messages', 
	    path:'../../miura/conf/', 
	    mode:'both',
	    language:lang, 
	    callback: function() {
			prefLocalization();
	       
	    }
	});
}

function populateForm (data) {

	 		$.each(data, function(name, val){
   			 //var $el = $('[name="'+name+'"]'),
       		 var $el = $('[name="'+val.name+'"]'),

       		 type =  $el.attr('type');

		    switch(type){
		        case 'checkbox':
		            $el.attr('checked', 'checked');
		            break;
		        case 'radio':
		            $el.filter('[value="'+val+'"]').attr('checked', 'checked');
		            break;
		        default:
		            $el.val(val.value);
    		}
		});

    }

function populateForm1(data) {
    log("Populate Form");


    var a,b;
    for (i = 0, len = data.length, text = ""; i < len; i++) {
        a = data[i] ;
        b=data[i];
    }

}

function prefLocalization(){
	$("#lfirst_name").text($.i18n.prop('lfirst_name'));
	$("#llast_name").text($.i18n.prop('llast_name'));
	$("#lphone1").text($.i18n.prop('lphone1'));
	$("#lmobile").text($.i18n.prop('lmobile'));
	$("#lemail").text($.i18n.prop('lemail'));
	$("#llocation").text($.i18n.prop('llocation'));
	$("#lpassword").text($.i18n.prop('lpassword'));
	$("#lpassword2").text($.i18n.prop('lpassword2'));		
	$("#llocale").text($.i18n.prop('llocale'));
}