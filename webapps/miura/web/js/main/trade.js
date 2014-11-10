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
			var data = JSON.stringify(jQuery('#tradeForm').serializeArray());
	        callServer("POST",URL.putTrade,data,function () {populateSuccess(data)}, function () { populateError(data)});

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
	if(data.stock_summary != null) {
		$('#rate').val(data.stock_summary.current_price);
		$('#units').val(0);
		htmlText = '<div class="quote stock-summary"> <div class="symbol-name"> <a href="#" style="cursor: default;"> <div class="symbol">' + data.symbol + '</div> </a> </div> <div class="data"> <div class="price"> $ ' + Math.floor(data.stock_summary.current_price * 100)/100 + '/Share  </div> <div class="change up"> <span class="dollar"> $ ' + Math.floor(data.stock_summary.day_change_amount * 100)/100 + '</span> <span class="percent">(' + Math.floor(data.stock_summary.day_change_percent * 100)/100 + '%)</span> </div> </div> </div>';	
		$('#current-stock').html(htmlText);
	}else{
		$('#current-stock').text(htmlText);
	}	
}

function reset(){
	$('#rate').val(0);
	$('#units').val(0);
	$('#current-stock').html('');
	$('#symbol').val('');
}

function populateSuccess(data) {
	var data= SESSION.response;	
	var htmlText = 'Congratulations! You just placed a ' + $('#buy_sell option:selected').text() + 'market order for ' + $('#units').val() + ' stocks of ' + $('#symbol').val() + ' for $ ' + + $('#rate').val();	
	showMessage(htmlText, "INFORMATION");
	reset();
}

function populateError(data) {
	var data= SESSION.response;	
	var htmlText = 'Error: ';	
	//TODO: Get error message syntax
	showMessage(htmlText, "ERROR");	
}