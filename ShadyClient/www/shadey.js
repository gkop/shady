/**
 * Created by .
 * User: michaeldeitcher
 * Date: 5/22/11
 * Time: 10:26 AM
 */
var Shadey = {
  client_unique_id: 'shady_client_1',

  initialize: function(){
    $('a#mark').click(function(e){
      e.preventDefault();
      Shadey.mark();
    });
    $('a#recents').click(function(e){
      e.preventDefault();
      Shadey.retrieveRecents();
    });
  },

  mark: function(){
    Shadey.get_geo( Shadey.send_mark_request );
  },

  send_mark_request: function( position ){
    Shadey.updateStatus('saving your location');
    $.ajax({
       type: "POST",
       url: "http://192.168.1.167:4567/spots/mark",
       data: "client_id=" + Shadey.client_unique_id + "&lat=" + position.coords.latitude + "&lng=" + position.coords.latitude,
       success: function(msg){
         Shadey.updateStatus('location saved');
       }
    });
  },

  retrieveRecents: function(){
    Shadey.updateStatus('retrieving your recents');
    $.ajax({
       type: "GET",
       url: "http://192.168.1.167:4567/users/" + Shadey.client_unique_id + "/spots",
       success: function(data){
         Shadey.displayRecents(data);
       }
    });
  },

  loadMap: function(){
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    Shadey.map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);

    google.maps.event.addListener(Shadey.map, 'bounds_changed', function(event) {
      Shadey.retrieveMarkers();
    });

  },

  retrieveMarkers: function(){
    console.log(Shadey.map.getBounds());
    var latLngBounds = Shadey.map.getBounds();
    var northEast = latLngBounds.getNorthEast();
    var southWest = latLngBounds.getSouthWest();
    console.log('NorthEast: lat: ' + northEast.lat() + 'lng:' + northEast.lng());
    console.log('SouthWest: lat: ' + southWest.lat() + 'lng:' + southWest.lng());

  },

  updateStatus: function( message ){
    $('p#status').text(message);
  },

  drawMarkers: function(){
  },

  displayRecents: function(data){
    console.log(data);
  },

  get_geo: function( success_function ) {
     Shadey.updateStatus('Requesting your location');
     navigator.geolocation.getCurrentPosition(success_function,Shadey.geo_errors);
  },

  geo_errors: function(error)
  {
     switch(error.code)
     {
         case error.PERMISSION_DENIED: Shadey.updateStatus("user did not share geolocation data");
         break;

         case error.POSITION_UNAVAILABLE: Shadey.updateStatus("could not detect current position");
         break;

         case error.TIMEOUT: Shadey.updateStatus("retrieving position timed out");
         break;

         default: Shadey.updateStatus("unknown error");
         break;
     }
  }

};

$(function(){
  Shadey.initialize();
});