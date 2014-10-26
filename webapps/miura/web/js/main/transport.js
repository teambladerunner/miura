//Ajax Calls to server or third party

function callServer( type,  url,  data, functionSuccess ){

jQuery.support.cors = true;

 jQuery.ajax({
         type: type,
         url: url,
         data: data,
         contentType: "application/json",
         dataType: "json",
         beforeSend : function (jqXHR, opts){
              console.log("Before Sending");
         },
         success: function (data, status, jqXHR) {
              // do something
              log('call to server succeeded');
              functionSuccess(data);
         },
         error: function (jqXHR, status, errorThrown) {           
              // error handler
              log('call to server did not succeed, Status : '+status+ ' Error Message : '+jqXHR.responseText+' Error Thrown : '+errorThrown);
         },
         timeout: 1000,
         crossDomain: true 

     });



}