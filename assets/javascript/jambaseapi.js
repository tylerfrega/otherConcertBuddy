var apiKey2 = "4m2rz2nkdrswe7wcvg2vyr8p";
var apiKey = 'vxsue68jub4ahrcxdfaqq57x';
var zip;
var counter = 0;
var display = 10;

var jambase = JSON.parse(localStorage.getItem("jambase"));
var apiReturn;


$(document).ready(function(){
	$('#searchBtn').on('click', searchJamBase);
	$('#loadMore').on('click', function(){
		counter = (counter + 10);
		display = (display + 10);
		searchJamBase();
	});
});

function displayEvents(response){
	for(i=counter; i<display; i++){
		var row = $("<tr>");
		var artist = $("<td>").html(response.Events[i].Artists[0].Name);
		var venue = $("<td>").html(response.Events[i].Venue.Name);
		var date = $("<td>").html(moment(response.Events[i].Date).format("dddd, MMMM Do YYYY, h:mm:ss a"));
		var eventId = response.Events[i].Id;
		var goingBtn =  $("<button>").addClass("going")
									 .attr("event-data", eventId)
									 .text("Find Buddy");
		var going = $("<td>").append(goingBtn);
		row.append(artist, venue, date, going);
		$('#concertDisplay').append(row);
	}
}

function searchJamBase(){
	event.preventDefault();
	console.log('something');

	zip = $('#zip').val().trim();

	var queryURL = "http://api.jambase.com/events?zipCode=" + zip + "&radius=50&page=0&api_key=" + apiKey2;

	$.ajax({
		url: queryURL,
		method: 'GET',

	}).done(function(response){
		//localStorage.setItem("jambase", JSON.stringify(response));
		apiReturn = response; //We'll probably need to parse through the return object
							  //again after the user selects a concert to get more details.
		console.log(zip);
		console.log(queryURL);
		console.log(response);
		displayEvents(response);
	});
}

