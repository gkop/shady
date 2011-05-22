/**
 * Created by .
 * User: michaeldeitcher
 * Date: 5/22/11
 * Time: 10:26 AM
 */
var Shadey = {
  initialize: function(){
    
  },

  mark: function(){

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

  drawMarkers: function(){
  }
};

$(function(){
  Shady.initialize();
});