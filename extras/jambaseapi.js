var apiKey = 'vxsue68jub4ahrcxdfaqq57x';
var zip;


$('#searchBtn').on('click', searchJamBase);


function searchJamBase(){
	event.preventDefault();

	zip = $('#zip').val().trim();

	var queryURL = "https://api.jambase.com/events?zipCode=" + zip + "&radius=50&page=0&api_key=" + apiKey;


		$.ajax({
			url: queryURL,
			method: 'GET'
		}).done(function(response){
			console.log(zip);
			console.log(queryURL);
			console.log(response);
	

for(i=0; i<10; i++){

	var artist = '<div>' + response.Events[i].Artists[0].Name + '</div>';
	var venue = '<div>' + response.Events[i].Venue.Name + '</div>';
	var date = '<div>' + response.Events[i].Date + '</div>';

	$('#display').append('<div class="concertInfo">' + artist + venue + date + '</div>');
	
	}

		});

	};

