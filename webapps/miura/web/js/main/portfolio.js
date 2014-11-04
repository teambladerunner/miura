jQuery(function($) {'use strict',
	$('#profileSettingsSubmit').click(function(event) {
		//alert('Start');
		var data = JSON.stringify(jQuery('#registrationForm').serializeArray())
		//var user = new Object();
		//user.name = "Jesper";
		//var data=JSON.-stringify(user);
		//var data=JSON.stringify({name: "Mozilla"});
		callServer("PUT",URL.putPrefs,data,function () {populateForm(data)})
		//alert('End');
	});	

	jQuery('#locale').change(function() {
		
		SESSION.locale = $('select[name=locale]').val();
		log(SESSION.locale);
		loadBundles(SESSION.locale);
	});

    //var a = [{"name":"first_name","value":"aaa"},{"name":"last_name","value":"aa"},{"name":"email","value":"a"},{"name":"password","value":"aa"},{"name":"password2","value":"a"},{"name":"locale","value":"en_us"}];
    //populateForm(a);

    function populatePortfolio(data){
        var data1=SESSION.response;
        data= data1.stocks;
        var table = $("#items");
            $.each(data, function(idx, elem){
                table.append("<tr class='portfoliotabletr'><td>"+elem.symbol+"</td><td>"+elem.totalUnits+"</td><td>"+elem.averageInvestedPrice+"</td><<td>"+elem.totalPurchasePrice+"</td><td>"+elem.currentMarketPrice+"</td><td>"+elem.currMarketValue+"</td><td>"+elem.realizedProfitAmount+"</td><td>"+elem.realizedProfitPercentage+"</td><td>"+createSellButton(elem.symbol,elem.totalUnits,elem.currentMarketPrice)+"</td></tr>");
            });

    }

    function createSellButton(quoteID,totalUnits,currentMarketPrice){
         return  "<a id='ee' href='trade.html' onclick='setTrade(\""+quoteID+"\")' class='btn btn-danger'>Sell</a>"

        // return  "<a id='ee' href='trade.html' onclick='dummy()' class='btn btn-danger' rel='like"+quoteID+"' data-para1='"+quoteID+"'  data-para2='"+totalUnits+"' data-para3='"+currentMarketPrice+"'>Sell</a>"
       //return  "<button type='button' class='btn btn-danger' id ="+quoteID +">Sell</button>"
    }


    function loadPortfolio(){
        var data={};
        callServer("GET",URL.getPort,data,function () {populatePortfolio(data)})
    }

     loadPortfolio();


});


   function setTrade(quoteID){
       log('aaa1'+quoteID);
       var para1 = quoteID;
       //var para2 = totalUnits;
       //var para3 = currentMarketPrice;
       SESSION.quoteID=para1;
       //SESSION.totalUnits=para2;
       //SESSION.currentMarketPrice=para3;
       //SESSION.transaction='SELL';
    }

