//common stuff

function log(message){
 	if (window.console && DEBUG.isDebugEnabled) {
	    console.log(message);
	    if (DEBUG.isDebugAlertEnabled){}
	    	alert(message);
	}
}

function showMessage(message,type){
        //showNoty(message,type);
        if (type==="ERROR"){
          growl(message,"danger");
        }
        if (type==="WARNING"){
            growl(message,"danger");
        }
        if (type==="INFORMATION"){
           growl(message,"info");
        }
       if (type==="SUCCESS"){
           growl(message,"success");
        }

       // growl(message,type);
}


function loadBundles(lang) {
	jQuery.i18n.properties({
	    name:'Messages', 
	    path:'../../miuraclient/web/conf/',
	    mode:'both',
	    language:lang, 
	    callback: function() {
			prefLocalization();
	       
	    }
	});
}

function populateForm () {
		var data= SESSION.response;
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


function setCookie(data){
	var cookieStr = JSON.stringify(data);
	var date = new Date();
	//expire in 5 mins
	date.setTime(date.getTime() + (5 * 60 * 1000));
	SESSION.authID=data.authid;
	$.cookie("miura", cookieStr, { expires: date, path: '/' });
}

function getCookie(authid){
	var cookieDataStr = $.cookie(authid);
	var cookieData = JSON.parse(cookieDataStr);
	return cookieData;
}

function getAuthIDFromCookie(){
	var data = getCookie("miura");
	var authID = data.authid;
	return authID;
}

function checkLoggedIn(){
    if (SESSION.mode==="secure"){
        SESSION.authID = getAuthIDFromCookie();
        if (SESSION.authID){
            log("Login Successful");
        }else{
            alert("No");
            showMessage("No Session, Please login again");
            window.location.href = URL.login;
        }
    }
}

  jQuery('#logoff').click(function () {
        showMessage("Logging Off","WARNING");
        $.removeCookie('name');
        SESSION.authID=null;
        window.location.href = URL.login;
    });




function growl(message,type1){
    $.bootstrapGrowl(message, {
      ele: 'body', // which element to append to
      type: type1, // (null, 'info', 'danger', 'success')
      offset: {from: 'bottom', amount: 20}, // 'top', or 'bottom'
      align: 'center', // ('left', 'right', or 'center')
      width: 250, // (integer, or 'auto')
      delay: 4000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
      allow_dismiss: true, // If true then will display a cross to close the popup.
      stackup_spacing: 10 // spacing between consecutively stacked growls.
    });

}

function showNoty(message,type1){



    noty({
        layout: 'topCenter',
        theme: 'bootstrapTheme',
        type: type1,
        text: message,
        dismissQueue: true,
        animation: {
            open: {height: 'toggle'},
            close: {height: 'toggle'},
            easing: 'swing',
            speed: 500
            },
        timeout: 0
        });

}

function initNoty(){

    $.noty.defaults = {
        layout: 'bottom',
        theme: 'bootstrapTheme',
        type: 'alert',
        text: '', // can be html or string
        dismissQueue: true, // If you want to use queue feature set this true
        template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
        animation: {
            open: {height: 'toggle'},
            close: {height: 'toggle'},
            easing: 'swing',
            speed: 500 // opening & closing animation speed
        },
        timeout: false, // delay for closing event. Set false for sticky notifications
        force: false, // adds notification to the beginning of queue when set to true
        modal: false,
        maxVisible: 5, // you can set max visible notification for dismissQueue true option,
        killer: false, // for close all notifications before show
        closeWith: ['click'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all open notifications
        callback: {
            onShow: function() {},
            afterShow: function() {},
            onClose: function() {},
            afterClose: function() {}
        },
        buttons: false // an array of buttons
    };

}

//initNoty();




