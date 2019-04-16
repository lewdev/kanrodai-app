var kanrodaiLoc = {lat: 34.60119673714936, lng: 135.84321758174895};
var map;
var currentLoc;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: kanrodaiLoc,
      mapTypeId: 'terrain'
    });
    var kanrodai = new google.maps.Marker({
        position: kanrodaiLoc,
        map: map,
        title: 'The Kanrodai!'
    });

    var myLatLng = {lat: -25.363, lng: 131.044};
    var marker1 = new google.maps.Marker({
        position: myLatLng,
        map: map,
        draggable:true,
        title: 'Hello World!'
    });
    google.maps.event.addListener(marker1, "dragend", function(event) { 
        var lat = event.latLng.lat(); 
        var lng = event.latLng.lng();
        var latSpan = document.getElementById("lat");
        var lngSpan = document.getElementById("lng");
        latSpan.innerHTML = lat;
        lngSpan.innerHTML = lng;
    }); 
    getLocation();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    currentLoc = {lat: position.coords.latitude, lng: position.coords.longitude};

    //set map center and zoom.
    map.setCenter(currentLoc);
    map.setZoom(9);

    var pathCoordinates = [
      currentLoc,
      kanrodaiLoc
    ];

    var kanrodaiPath = new google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    kanrodaiPath.setMap(map);

    var currentLocMarker = new google.maps.Marker({
        position: currentLoc,
        map: map,
        title: 'You are here!'
    });
    currentLocMarker.setMap(map);
}

function goToKanrodai() {
    map.setCenter(kanrodaiLoc);
    return false;
}
function goToCurrentLoc() {
    map.setCenter(currentLoc);
    return false;
}
function viewPath() {
    
}