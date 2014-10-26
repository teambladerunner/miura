//Ajax Calls to server or third party

function callServer( type,  url,  data ){


 jQuery.ajax({
         type: type,
         url: url,
         data: data,
         contentType: "application/json",
         dataType: "json",
         success: function (data, status, jqXHR) {
              // do something
              log('call to server succeeded');
         },
    
         error: function (jqXHR, status) {           
              // error handler
               log('call to server did not succeed, Status : '+status+ ' Error Message : '+jqXHR.responseText);


         }

     });



}