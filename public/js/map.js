var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var mapOptions = {
    zoom: 6,
    center: california
  } // closing map options
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
} //closing initialize

// create a distance variable
var totaldistance=0;

function calcRoute() {
  var start = document.getElementById('from').value;
  var end = document.getElementById('to').value;
  var waypts = [];
  var checkboxArray = document.getElementById('waypoints');
  for (var i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected == true) {
      waypts.push({
          location:checkboxArray[i].value,
          stopover:true});
    } //closing if
  } // closing for

  var request = {
      origin: start,
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.WALKING
  }; //closing request



  // create route

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      // directionsDisplay.setDirections(response);
      var route = response.routes[0];
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
         totaldistance = totaldistance + route.legs[i].distance.value;
      } // closing for
    } // closing if
  }); // closing directions function

  // after the while loop is over
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
         totaldistance = totaldistance + route.legs[i].distance.value;
      } // closing for
    } // closing if
  }); // closing directions
} // closing calc route

// use geolocation to get address of user

$("#from-link, #to-link").click(function(event) {
          event.preventDefault();
          var addressId = this.id.substring(0, this.id.indexOf("-"));

          navigator.geolocation.getCurrentPosition(function(position) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
              "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            },
            function(results, status) {
              if (status == google.maps.GeocoderStatus.OK)
                $("#" + addressId).val(results[0].formatted_address);
              else
                $("#error").append("Unable to retrieve your address<br />");
            });
          },
          function(positionError){
            $("#error").append("Error: " + positionError.message + "<br />");
          },
          {
            enableHighAccuracy: true,
            timeout: 10 * 1000 // 10 seconds
          });
        });

// load map

google.maps.event.addDomListener(window, 'load', initialize);