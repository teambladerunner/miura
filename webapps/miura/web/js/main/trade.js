function loadTrade(stockSymbol){
    
	var data={};
	callServer("GET",URL.getTrade + stockSymbol,data,function () {showStockInfo(data)});
}
checkLoggedIn();

jQuery(function($) {'use strict',
	$('#symbol').bind('keyup', function(e) {
	    if ( e.keyCode === 13 &&  $(this).val() ){ // 13 is enter key
	        loadTrade($(this).val());
	    }    
	});

	$('#trade_btn').click(function() {
			var data = JSON.stringify(jQuery('#tradeForm').serializeArray())
	        callServer("POST",URL.putTrade,data,function () {populateMessage(data)})

	});

	$('#units').change(function() {
			var stockUnits = parseInt($(this).val());
			var currPrice = parseInt($('#rate').val());
			if(isNaN(stockUnits) || isNaN(currPrice) ){
				$('#total').text(0.00);
			} else if(stockUnits > 0 && currPrice > 0) {
				$('#total').text(stockUnits * currPrice);
			}else{
				$('#total').text(0.00);
			}

	});

	$('#rate').change(function() {
			var stockUnits = parseInt($(this).val());
			var currPrice = parseInt($('#units').val());
			if(isNaN(stockUnits) || isNaN(currPrice) ){
				$('#total').text(0.00);
			} else if(stockUnits > 0 && currPrice > 0) {
				$('#total').text(stockUnits * currPrice);
			}else{
				$('#total').text(0.00);
			}

	});
});

$(function() {

 $( "#symbol" ).autocomplete({
     source: STOCK_SYMBOLS,
     messages: {
        noResults: '',
        results: function() {}
    }
     });

});

function showStockInfo (data) {
	var data= SESSION.response;
	var htmlText = '';
	//document.getElementById('legend').innerHTML = '';
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
 	document.getElementById('current-stock').innerHTML = htmlText;

    }

function populateMessage(data) {
	var data= SESSION.response;
	var htmlText = '';
	$.each(data, function(name, val){
	});
	document.getElementById('success-msg').innerHTML = htmlText;

}