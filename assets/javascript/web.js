var maxResultValue = 20;

$( document ).ready(function() {
    $("#txtSearch").keypress(function(e) {
    if(e.which == 13) {
        searchClick();
    }
    });
});


function searchClick(){
    var resultsOffSet = $("#results").offset().top;
    if ( $(document).scrollTop() < resultsOffSet ) {
        $(document).scrollTop( $("#results").offset().top );

}
else{

}
	
    var searchStr = null; // If user doesn't type a location then it will use Seattle
	searchStr = $('#txtSearch').val();
	if(searchStr=='null' || searchStr==''){
		searchStr = "Seattle";
	}
	var selectedVal = "";
	var searchQuery = null;
	var selected = $("input[name='search']:checked");
		
	if (selected.length > 0) {
		selectedVal = selected.val();
	}
	if (selectedVal == 0){
		//searchQuery = "events?location=" + searchStr+"&limit=" + maxResultValue;
		searchQuery = "search?location.address=" + searchStr ;//+"&limit=" + maxResultValue;
		    callEBAPI(searchQuery);
	}
	else{
		searchQuery = "businesses/search?term=&location=" + searchStr +"&limit=" + maxResultValue;
		    callYelpAPI(searchQuery);
	}
	
    

    console.log('Search Clicked');
	console.log(searchStr);
	console.log(searchQuery);
  };

 

function callYelpAPI(searchQuery){
    $('#resultsContainer').html('');
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/" + searchQuery; //+searchType+"location=" + searchStr;
	//var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events";
 $.ajax({
    url: myurl,
    headers: {
     'Authorization':'Bearer 4V6LSZr3MVNCXa9HoTVxqs-mj8y3URlF57Vio7wTF7g8aimwmPk_cM8faiKivtC9UOog9WZnv7ZFKqpy8j2xvQbb2ihQXoOBOx44GmwUmSWLdETmXrVRSFkNlCQuXXYx',
     'Access-Control-Allow-Origin' : '*'
     
 },
    method: 'GET',
    dataType: 'json',
    success: function(data){
        // Grab the results from the API JSON return
        var totalresults = data.total;
        // If our results are greater than 0, continue
        if (totalresults > 0){
            // Display a header on the page with the number of results
            //$('#results').append('<h5>We discovered ' + totalresults + ' results! Here are the top ' + maxResultValue +'! </h5>');
            // Itirate through the JSON array of 'businesses' which was returned by the API
            $.each(data.businesses, function(i, item) {
                // Store each business's object in a variable
                var id = item.id;
                var alias = item.alias;
                var phone = item.display_phone;
                var image = item.image_url;
                var name = item.name;
                var rating = item.rating;
                var reviewcount = item.review_count;
                var address = item.location.address1;
                var city = item.location.city;
                var state = item.location.state;
                var zipcode = item.location.zip_code;
                // Append our result into our page
                // $('#results').append('<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b> (' + alias + ')<br>Business ID: ' + id + '<br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.</div>');

                var resultContainer ='<div class=\"col-md-3 results-box wow fadeInUp\"><div class="row"><div class="col-md-3"></div><div class="col-md-12"><img src="' 
				+ image + '" style="width:100%;height:150px;"><h4>' 
				+ name + '</h4><p>Located at: ' 
				+ address + ' ' 
				+ city + ', ' 
				+ state + ' ' 
				+ zipcode + '<br>The phone number for this business is: ' 
				+ phone + '<br>This business has a rating of ' 
				+ rating + ' with ' 
				+ reviewcount + ' reviews.</div></p></div></div></div>';

              
                $('#resultsContainer').append(resultContainer);
          });
        } else {
            // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
            $('#results').append('<h5>We discovered no results!</h5>');
        }
    },
     error: function(XMLHttpRequest, textStatus, errorThrown) {
         alert("API ERROR");
    }	
 });
}     

function callEBAPI(searchQuery){
    $('#resultsContainer').html('');
    var queryURL = 'https://cors-anywhere.herokuapp.com/https://www.eventbriteapi.com/v3/events/' + searchQuery ;
    
    $.ajax({
        headers: {
            "Authorization": "Bearer WU7KU6HKP6T3INTQLZR2",
            'Access-Control-Allow-Origin' : '*'
        },
        url: queryURL,
        method: 'GET',
        dataType: 'json',
        success: function(data){
            // Grab the results from the API JSON return
            var totalresults = data.events.length;
            // If our results are greater than 0, continue
            if (totalresults > 0){
                // Display a header on the page with the number of results
                //$('#results').append('<h5>We discovered ' + totalresults + ' results! Here are the top ' + maxResultValue +'! </h5>');
                // Itirate through the JSON array of 'businesses' which was returned by the API
                $.each(data.events, function(i, item) {
                    // Store each business's object in a variable
                    var image = item.logo.url;
                    var name = item.name.text;
                    var date_start = item.start.local;
                    var date_end = item.end.local;
                    var weblink = item.vanity_url;
                    // var city = item.location.city;
                    // var state = item.location.state;
                    // var zipcode = item.location.zip_code;
                    // Append our result into our page
                    // $('#results').append('<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b> (' + alias + ')<br>Business ID: ' + id + '<br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.</div>');

                    //Prettify date and time for event
                    var dateStart = moment(date_start).format('MMMM Do YYYY, h:mm:ss A');
                    var dateEnd = moment(date_end).format('MMMM Do YYYY, h:mm:ss A');
    
                    var resultContainer ='<div class=\"col-md-3 results-box wow fadeInUp\"><div class="row"><div class="col-md-3"></div><div class="col-md-12"><img src="' 
                    + image + '" style="width:100%;height:150px;"><h4>' 
                    + '<a href="' + weblink + '">' + name + '</a></h4><p>'
                    + dateStart + ' to ' 
                    + dateEnd + '</div></p></div></div></div>';
                    
                    $('#resultsContainer').append(resultContainer);
              });
            } else {
                // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
                $('#results').append('<h5>We discovered no results!</h5>');
            }
        },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert("API ERROR");
        }	

    }); 
}