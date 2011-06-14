/**
 * Created by .
 * User: michaeldeitcher
 * Date: 5/22/11
 * Time: 10:26 AM
 */
var Shadey = {
  client_unique_id: 'shadyclient1',

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
       url: "http://localhost:3000/users/" + Shadey.client_unique_id + "/spots",
       data: "&lat=" + position.coords.latitude + "&lng=" + position.coords.longitude,
       success: function(msg){
         Shadey.updateStatus('location saved');
       }
    });
  },

  retrieveRecents: function(){
    Shadey.updateStatus('retrieving your recents');
    $.ajax({
       type: "GET",
       url: "http://localhost:3000/users/" + Shadey.client_unique_id + "/spots",
	   dataType: 'json',
       success: function(data){
         Shadey.displayRecents(data);
       }
    });
  },

  loadMap: function(){
    var latlng = new google.maps.LatLng(35.6869444, -105.9372222);
    var myOptions = {
      zoom: 18,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    Shadey.map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);

    Shadey.fusionLayer = new google.maps.FusionTablesLayer( 136705 );
    Shadey.fusionLayer.setMap(Shadey.map);

    google.maps.event.addListener(Shadey.map, 'bounds_changed', function(event) {
      Shadey.retrieveMarkers();
    });

    Shadey.get_geo( Shadey.repositionMap );

  },

  repositionMap: function(position){
    Shadey.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
  },

  retrieveMarkers: function(){
    var latLngBounds = Shadey.map.getBounds();
    var northEast = latLngBounds.getNorthEast();
    var southWest = latLngBounds.getSouthWest();
    $.ajax({
       type: "GET",
       url: ("/spots?lat_b="+northEast.lat()+"&lng_b="+northEast.lng()+"&lat_a="+southWest.lat()+"&lng_a="+southWest.lng()),
	   dataType: 'json',
       success: function(data){
         Shadey.drawMarkers(data);
       }
    });


  },

  updateStatus: function( message ){
    $('p#status').text(message);
  },

  drawMarkers: function(data){
    for( var spot in data ){
      var loc = new String(data[spot]['location']);
      loc = loc.split(',');
      var latlng = new google.maps.LatLng(loc[0], loc[1]);
      var marker = new google.maps.Marker({
        position: latlng
      });
      marker.setMap(Shadey.map);
    }
  },

  displayRecents: function(data){
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        alert(key + " -> " + data[key]);
        for (var ikey in  data[key]) {
          alert(ikey + " -> " +  data[key][ikey]);
        }
      }
    }
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
  if( $('map_canvas').length > 0 ){
    Shadey.loadMap();
  }
});