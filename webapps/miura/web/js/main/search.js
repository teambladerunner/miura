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

    var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
    'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];

    $('#search .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
        },
        {
        name: 'states',
        displayKey: 'value',
        source: substringMatcher(states)
    });



function loadSearch(){
	//var data={};
	//callServer("GET",URL.getPrefs,data,function () {populateForm(data)})
}

 //loadSearch();




});

