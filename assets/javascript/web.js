

function searchClick(){
    var searchStr = null;
    searchStr = $('#txtSearch').val();
    callYelpAPI(searchStr);
    console.log('Search Clicked');
  };

 

function callYelpAPI(searchStr){
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=&location=" + searchStr;
//var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=&location=seattle";

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
            $('#results').append('<h5>We discovered ' + totalresults + ' results!</h5>');
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

                var resultContainer ='<div class=\"col-md-4 results-box wow fadeInUp\"><div class="row"><div class="col-md-4"><img src="' + image + '" style="width:200px;height:150px;"><br></div><div class="col-md-8"><h3>' + name + '</h3><p><br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.</div></p></div></div></div>';

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