//Ajax Calls to server or third party

function callServer( type,  url,  data, functionSuccess,functionError ){

jQuery.support.cors = true;

 jQuery.ajax({
         type: type,
         url: url,
         data: data,
         contentType: "application/json",
         dataType: "json",
         //headers: {'authid': 'k@d'},
         beforeSend : function (jqXHR, opts){

             var authid = SESSION.authID;
             jqXHR.setRequestHeader("authid", authid);
             console.log("Before Sending");
         },
         success: function (dataReturned, status, jqXHR) {
              // do something
              SESSION.response = dataReturned;
              log('call to server succeeded');

            //  var ret = JSON.parse(dataReturned);
              functionSuccess();
         },
         error: function (jqXHR, status, errorThrown) {           
              // error handler
              log('call to server did not succeed, Status : '+status+ ' Error Message : '+jqXHR.responseText+' Error Thrown : '+errorThrown);
              //showMessage("Server Error, Check Logs for more information","ERROR");
			  if (typeof functionError != 'undefined'){
				functionError();
			  }
         },
         timeout: 5000,
         crossDomain: true 

     });



}