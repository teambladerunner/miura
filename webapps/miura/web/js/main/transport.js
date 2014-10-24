//Ajax Calls to server or third party

function callServer( type,  url,  data ){

	alert('inside transaport');

 jQuery.ajax({
         type: type,
         url: url,
         data: data,
         contentType: "application/json",
         dataType: "json",
         success: function (data, status, jqXHR) {
              // do something
              alert ('call to server succeeded')
         },
    
         error: function (jqXHR, status) {           
              // error handler
               alert ('call to server did not succeed')

         }

     });



}