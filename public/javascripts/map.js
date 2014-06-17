var map;
var infowindow;
var loc = new google.maps.LatLng(18.9750,72.8258);
function initialize() {


  map = new google.maps.Map(document.getElementById('googlemap'), {
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
        loc = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        map.setCenter(loc);
        search(loc);
        });
  }
  else
    map.setCenter(loc);
  
}

function search(pos){
  var request = {
    location: pos,
    radius: 10000,
    types: ['hospital']
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status, pagination) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
    pagination.nextPage();
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  
  
  
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
