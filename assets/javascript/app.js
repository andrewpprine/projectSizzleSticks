$(document).ready(function(){

  var inputWhere; 
  var inputWhat; 

  $('#resultsButton').click(function (){
    inputWhere = $('#travelWhere').val();
    inputWhat = $('#travelWhat').val();
    var queryURLFoursquare = 'https://api.foursquare.com/v2/venues/explore'

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
      for(x=0;x<10;x++){
        console.log(response.response.groups[0].items[x].venue.name); 
      }
    });
  }); 

  $(document).on('click','#resultsButton', function(){
    var APIKey = "8b2d45874149dd9daa82ef8b500f490d";

      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputWhere + "&appid=" + APIKey;
      var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputWhere + "&units=imperial&appid=" + APIKey;
  
      console.log(inputWhere);

      $.ajax({
          url: forecastURL,
          method: "GET"
      }).then(function(response){

          console.log(response)
          
      });
  });
});
