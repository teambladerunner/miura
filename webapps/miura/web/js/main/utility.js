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