var city = '';
// this is the master function that should call from all API's when run
$('#btn btn-success').on('click', function(){
 event.preventDefault();
 city = ('#travelWhere').val();

 // this is the section for adding ticketmaster events to the web page
 var ticketMasterURL = 'https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=afo4Ma9VAh5dmYQLIfzmuB2zOS0PQXVK&city=' + city;
 $.ajax({
   url: ticketMasterURL
     }).then(function(res) {
          for (var i=0; i< 5; i++){
     //note this is a placeholder selector until HTML is final
    var selector = '#activity' + i.toString();
    $(selector).append(res._embedded.events[i].name)
          }
     });

 // this is the section for adding a google map to the web page
 var googleMapsURL = 'https://www.google.com/maps/embed/v1/search?key=AIzaSyAXGParj76SrKimNk9-iiALLFLiQ0StCB4&q=dallas' + city;
   $('iframe').attr('src', googleMapsURL);

 // this is the section for adding weather to the web page
 // this is the section for adding something else to thoe web page
 // this is the section for adding sothing else


});