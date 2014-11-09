/*
jQuery(function($) {'use strict',











});*/

    function populateAccount(data){
        var data1=SESSION.response;
        data= data1.userTrades;
        var table = $("#items");
            $.each(data, function(idx, elem){
                table.append("<tr class='portfoliotabletr'><td>"+elem.stockSymbol+"</td><td>"+elem.units+"</td><td>"+elem.rate+"</td><<td>"+elem.buySell+"</td><td>"+elem.dateTime+"</td></tr>");
            });

        }

    function loadAccount(){
        checkLoggedIn();
        var data={};
        callServer("GET",URL.getAccount,data,function () {populateAccount(data)})
    }

     loadAccount();



