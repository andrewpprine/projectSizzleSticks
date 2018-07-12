$('button').click(function (){
  var inputWhere = $('#travelWhere').val();
  var inputWhat = $('#travelWhat').val();

  var queryURL = 'https://api.foursquare.com/v2/venues/explore'


  $.ajax({
    url: queryURL,
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
    console.log(response.response.totalResults);      
    console.log(response.response.groups[0].items[0].venue.name);   
    console.log(response.response.groups[0].items[0].venue.location.formattedAddress);   
    $('#foursquarevenue').html(response.response.groups[0].items[0].venue.name+`<br>`+response.response.groups[0].items[0].venue.location.formattedAddress[0]+`<br>`+response.response.groups[0].items[0].venue.location.formattedAddress[1])
  });
});