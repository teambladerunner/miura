jQuery(function($) {'use strict',
	$('#profileSettingsSubmit').click(function(event) {
		//alert('Start');
		var data = JSON.stringify(jQuery('#registrationForm').serializeArray())
		//var user = new Object();
		//user.name = "Jesper";
		//var data=JSON.stringify(user);
		//var data=JSON.stringify({name: "Mozilla"});
		callServer("PUT",URL.putPrefs,data,function () {populateForm(data)})
		//alert('End');
	});

	$('#symbolsearch').bind('keyup', function(e) {
    	    if ( e.keyCode === 13 &&  $(this).val() ){ // 13 is enter key
    	        loadTrade($(this).val());
    	    }
    	});


	jQuery('#locale').change(function() {
		
		SESSION.locale = $('select[name=locale]').val();
		log(SESSION.locale);
		loadBundles(SESSION.locale);
	});

    var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
        var matches, substrRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
            // the typeahead jQuery plugin expects suggestions to a
            // JavaScript object, refer to typeahead docs for more info
             matches.push({ value: str });
            }
        });

        cb(matches);
        };
    };

    var states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
    'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];

      $( "#search2" ).autocomplete({
     source: STOCK_SYMBOLS
     });

    $('#search1 .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
        },
        {
        name: 'states',
        displayKey: 'value',
        source: substringMatcher(states)
    });



    function populateSearchForm(data){
        var data= SESSION.response;

        $("#current").val(data.stock_summary.current_price);
        $("#open").val(data.stock_summary.open_price);
        $("#close").val(data.stock_summary.open_price);
        $("#marketCap").val(data.stock_summary.market_cap);
        $("#currentChangeAmt").val(data.stock_summary.day_change_amount);
        $("#currentChangePercent").val(data.stock_summary.day_change_percent);

       // $("#trend1").val(data.stock_sentiment.probability.neg);
       // $("#trend2").val( data.stock_sentiment.probability.neutral);
       // $("#trend3").val( data.stock_sentiment.probability.pos);
        data.stock_sentiment.neutral;
    }


    function loadSearch(){
        checkLoggedIn();
        showChart();
        var data={};
		if (SESSION.search)
		{
			var quoteID = SESSION.search;
			callServer("GET",URL.getSearch+quoteID,data,function () {populateSearchForm(data)})
		}
    }

    loadSearch();

    function loadTrade(stockSymbol){

    	SESSION.search=stockSymbol;
    	loadSearch();
    	//callServer("GET",URL.getTrade + stockSymbol,data,function () {showStockInfo(data)});
    }


});

$(function() {

 $( "#symbolsearch" ).autocomplete({
     source: STOCK_SYMBOLS,
     messages: {
        noResults: '',
        results: function() {}
    }
     });

});


        function showChart () {


  			if(typeof(EventSource) !== "undefined") {
  				var source = new EventSource(URL.getChart+SESSION.search);
  				source.onmessage = function(event) {
  					var obj = JSON.parse(event.data);
  					obj.symbol=SESSION.search;
  					if(obj.type === "stockupdate" /* && obj.symbol === "GOOGL" */){
  						update(parseFloat(obj.price, 10));
  					}
  				};
  			} else {
  				document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
  			}

  			}

              var ypt = [], totalPoints = 25;

              function initData() {
                  for (var i = 0; i < totalPoints; ++i)
                      ypt.push(0);
                  return getPoints();

              }
              function getData(data) {
                  if (ypt.length > 0)
                      ypt = ypt.slice(1);
                  ypt.push(data);
                  return getPoints();
              }
              function getPoints() {
                  var ret = [];
                  for (var i = 0; i < ypt.length; ++i)
                      ret.push([i, ypt[i]]);
                  return ret;
              }

              // setup plot
              var options = {
                  series: { shadowSize: 0, bars: {
                      show: true,
                      barWidth: 0.75,
                      fill: 1
                  }
                  }, // drawing is faster without shadows
                  yaxis: { min: 0, max: 1000,
                      tickFormatter: function (val, axis) {
                          return '$' + val;
                      }
                  },
                  xaxis: { show: false }
              };

              var plot = $.plot($("#placeholder"), [initData()], options);
              function update(data) {
                  $('#priceHolder').text('$' + data);
                  plot.setData([getData(data)]);
                  plot.draw();
              }


