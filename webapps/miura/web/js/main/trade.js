function loadTrade(stockSymbol){
	var data={};
	callServer("GET",URL.getTrade + stockSymbol,data,function () {showStockInfo(data)});
}

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
			var stockUnits = $(this).val();
			var currPrice = $('#rate').val();
			if(stockUnits > 0 && currPrice > 0) {
				document.getElementById('total').innerText = stockUnits * currPrice;
			}else{
				document.getElementById('total').innerText= 0.00;
			}

	});

	$('#rate').change(function() {
			var stockUnits = $(this).val();
			var currPrice = $('#units').val();
			if(stockUnits > 0 && currPrice > 0) {
				document.getElementById('total').innerText = stockUnits * currPrice;
			}else{
				document.getElementById('total').innerText= 0.00;
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