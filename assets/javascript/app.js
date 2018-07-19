var city;

// Master function to call all APIs and display results
$('button').on('click', function(){
  $('#showAfterClick').show();
  event.preventDefault();
  city = $('#travelWhere').val();
  //need to convert first letter to uppercase
  var cityUpper = city[0].toUpperCase();
  var cityLower = city.slice(1, city.length);
  $('#destinationBanner').text(` `+cityUpper+cityLower+`!`)


  // this is the section for adding ticketmaster events to the web page
  var ticketMasterURL = 'https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=afo4Ma9VAh5dmYQLIfzmuB2zOS0PQXVK&city=' + city;
  $.ajax({
    url: ticketMasterURL
      }).then(function(res) {
        console.log(response);
            for (var i=0; i<10; i++){
      //note this is a placeholder selector until HTML is final
      var selector = '#ticketmaster' + i.toString();
      $(selector).append(res._embedded.events[i].name)
            }
      });

  // this is the section for adding a google map to the web page
  var googleMapsURL = 'https://www.google.com/maps/embed/v1/search?key=AIzaSyAXGParj76SrKimNk9-iiALLFLiQ0StCB4&q=' + city;
    $('iframe').attr('src', googleMapsURL);

  // this is the section for adding weather to the web page
  // this is the section for adding something else to thoe web page
  // this is the section for adding sothing else

  var APIKey = "8b2d45874149dd9daa82ef8b500f490d";
  var openweathercurrentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
  var openweatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;

  //current weather from openweather API
  $.ajax({
  url: openweathercurrentURL,
  method: "GET"
  }).then(function(response){
console.log(response);
    var plusZero = $("<div>").text(response.weather[0].description);

    $("#weather1").text(response.main.temp).append(plusZero);  

  });
//forecast weather from openweather API
  $.ajax({
      url: openweatherURL,
      method: "GET"
    }).then(function(response){
console.log(response);
      var responseList = response.list;
      var plusOne = $("<div>").text(responseList[2].weather[0].description);
      var plusTwo= $("<div>").text(responseList[10].weather[0].description);
      var plusThree= $("<div>").text(responseList[18].weather[0].description);

      $("#weather2").text(responseList[2].main.temp).append(plusOne);
        
      $("#weather3").text(responseList[10].main.temp).append(plusTwo);
        
      $("#weather4").text(responseList[18].main.temp).append(plusThree);
      
    });
    
  //Most popular spots from foursquare API
  var queryURLFoursquare = 'https://api.foursquare.com/v2/venues/explore';

  var inputWhere = $('#travelWhere').val();
  var inputWhat = $('#travelWhat').val();

  $.ajax({
    url: queryURLFoursquare,
    method: 'GET',
    data: {
      client_id: 'HV0FT1JGQAZQQ1EJTJK5SHJDAP0HR4IWNPVCRMSLKX4K5EGO',
      client_secret: 'OW5SHJKGWED3MJ4ZV4BWVF5JHWNUI0FHMISHJX4Z3UTKU3YZ',
      near: inputWhere,
      query: inputWhat,
      v: '20180323',
      limit: 10
      // time: any,
      // day: any,
    }
  }, function(err, res, body) {
    if (err) {
      console.error(err);
    } else {
      console.log(body);
    }
  }).then(function(response) {
    console.log(response);

    for(x=0;x<10;x++){
      var selector = '#foursquare' + x.toString();      
      var newList = $("<li>").text(response.response.groups[0].items[x].venue.name);
      $(selector).html(newList);
      
    }
  });
});