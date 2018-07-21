var config = {
  apiKey: "AIzaSyCRAI-cE-9zuAVQGV9R4I3H7Bh4O95gEps",
  authDomain: "sizzlesticks-11ea4.firebaseapp.com",
  databaseURL: "https://sizzlesticks-11ea4.firebaseio.com",
  projectId: "sizzlesticks-11ea4",
  storageBucket: "",
  messagingSenderId: "846634235529"
};
firebase.initializeApp(config);

var database = firebase.database();
var city;
var inputWhat;
var inputWhere;
var searched =[];

// Master function to call all APIs and display results
$('button').on('click', function(){
  $('#showAfterClick').show();
  event.preventDefault();
  inputWhat = $('#travelWhat').val();
  city = $('#travelWhere').val();

  //shitty firebase - uploading
  database.ref(city).push({
    search: $('#travelWhat').val().trim()
  });

  //Saves search in location child in the shitty firebase and appends the save to the firebase-data div.

  database.ref().on("value", function(snapshot){
    var str = snapshot.val();
    $("#firebase-data").html("");

    for (var key in str) {
      if (str.hasOwnProperty(key)) {
        var newDiv= $("<div>").text(key);
        $("#firebase-data").append(newDiv);
      }
    }
    
  });

  // this is the section for adding ticketmaster events to the web page
  var ticketMasterURL = 'https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=afo4Ma9VAh5dmYQLIfzmuB2zOS0PQXVK&city=' + city + '&classificationName='+ inputWhat;
  $.ajax({
    url: ticketMasterURL
    }).then(function(res) {
      for (var i=0; i<10; i++){   
      var selector = '#ticketmaster' + i.toString();
      $(selector).html(res._embedded.events[i].name+`<br>`+res._embedded.events[i].dates.start.localDate+`<br>`+res._embedded.events[i].dates.start.localTime+`<br><a href="`+res._embedded.events[i].url+`">Tickets</a><hr>`)
      }
    });

  // this is the section for adding a google map to the web page
  var googleMapsURL = 'https://www.google.com/maps/embed/v1/search?key=AIzaSyAXGParj76SrKimNk9-iiALLFLiQ0StCB4&q=' + city;
    $('iframe').attr('src', googleMapsURL);

  //weather api setup
  var APIKey = "8b2d45874149dd9daa82ef8b500f490d";
  var openweathercurrentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
  var openweatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;

  //current weather from openweather API
  $.ajax({
  url: openweathercurrentURL,
  method: "GET"
  }).then(function(response){
    var plusZero = $("<div>").text(response.weather[0].description);

    $("#weather1").text(response.main.temp).append(plusZero);  

    //forecast weather icons for current day
    var check = $("#weather1" + " div").text();

    if(check == "clear sky"){
      var icon = $("<i>").attr("class","wi wi-day-sunny");
      
      $("#weather1").append(icon);
      }
      else if((check == "light rain")||(check == "shower rain")||(check == "moderate rain")){
      var icon = $("<i>").attr("class","wi wi-day-rain");
    
      $("#weather1").append(icon);
      }
      else if(check == "mist"){
      var icon = $("<i>").attr("class","wi wi-day-haze");
  
      $("#weather1").append(icon);
      }
      else if((check == "broken clouds")||(check == "scattered clouds")||(check == "overcast clouds")||(check == "few clouds")){
      var icon = $("<i>").attr("class","wi wi-day-cloudy");

      $("#weather1").append(icon);
      }
      else if(check == "snow"){
      var icon = $("<i>").attr("class","wi wi-day-snow");

      $("#weather1").append(icon);
      }
      else if(check == "thunderstorm"){
        var icon = $("<i>").attr("class","wi wi-day-thunderstorm");

        $("#weather1").append(icon);
        }

  });
//forecast weather from openweather API
  $.ajax({
      url: openweatherURL,
      method: "GET"
    }).then(function(response){

      var responseList = response.list;
      var strTwo =responseList[5].weather[0].description.toString();
      var strThree =responseList[13].weather[0].description.toString();
      var strFour =responseList[21].weather[0].description.toString();

      var plusOne = $("<div>").text(strTwo);
      var plusTwo= $("<div>").text(strThree);
      var plusThree= $("<div>").text(strFour);

      $("#weather2").text(responseList[5].main.temp).append(plusOne);
        
      $("#weather3").text(responseList[13].main.temp).append(plusTwo);
        
      $("#weather4").text(responseList[21].main.temp).append(plusThree);

      //displays weather icons for forecasted days 
      for(x=2; x<5; x++){
        var check = $("#weather"+ x + " div").text();

        if(check == "clear sky"){
        var icon = $("<i>").attr("class","wi wi-day-sunny");
        
        $("#weather"+ x).append(icon);
        }
        else if((check == "light rain")||(check == "shower rain")||(check == "moderate rain")){
        var icon = $("<i>").attr("class","wi wi-day-rain");
      
        $("#weather"+ x).append(icon);
        }
        else if(check == "mist"){
        var icon = $("<i>").attr("class","wi wi-day-haze");
    
        $("#weather"+ x).append(icon);
        }
        else if((check == "broken clouds")||(check == "scattered clouds")||(check == "overcast clouds")||(check == "few clouds")){
        var icon = $("<i>").attr("class","wi wi-day-cloudy");
  
        $("#weather"+ x).append(icon);
        }
        else if(check == "snow"){
        var icon = $("<i>").attr("class","wi wi-day-snow");

        $("#weather"+ x).append(icon);
        }
        else if(check == "thunderstorm"){
          var icon = $("<i>").attr("class","wi wi-day-thunderstorm");
  
          $("#weather"+ x).append(icon);
          }
        
      }
  
      
    });
    
  //Most popular spots from foursquare API
  var queryURLFoursquare = 'https://api.foursquare.com/v2/venues/explore';

  inputWhere = $('#travelWhere').val();

  $.ajax({
    url: queryURLFoursquare,
    method: 'GET',
    data: {
      client_id: 'HV0FT1JGQAZQQ1EJTJK5SHJDAP0HR4IWNPVCRMSLKX4K5EGO',
      client_secret: 'OW5SHJKGWED3MJ4ZV4BWVF5JHWNUI0FHMISHJX4Z3UTKU3YZ',
      near: city,
      query: inputWhat,
      v: '20180323',
      limit: 10
    }
  }, function(err, res, body) {
    if (err) {
      console.error(err);
    } else {
      console.log(body);
    }
  }).then(function(response) {
    console.log(response);
    $('#destinationBanner').text(` `+response.response.headerFullLocation+`!`)
    for(x=0;x<10;x++){
      var selector = '#foursquare' + x.toString();      
      var newList = $("<li>").html(response.response.groups[0].items[x].venue.name+`<br>`+response.response.groups[0].items[x].venue.location.address+`<br>`+response.response.groups[0].items[x].venue.location.formattedAddress[1]+`<br><a href="https://www.yelp.com/search?find_desc=`+response.response.groups[0].items[x].venue.name+`&find_loc=`+response.response.groups[0].items[x].venue.location.address+` `+response.response.headerFullLocation+`" target="_blank">Reviews</a><hr>`);
      $(selector).html(newList);
    }
  });
});