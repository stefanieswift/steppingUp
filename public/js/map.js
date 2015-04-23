$(document).ready(function() {
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;

  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
      zoom:7,
      center: chicago
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
  }

 $("#calculate-route").on("submit", function(e) {
    e.preventDefault();
    var start = document.getElementById('from').value;
    var end = document.getElementById('to').value;
    var stepDistance = (Number(document.getElementById('steps').value)/1320);
    var difference;
    var waypts = [];
    var totalDistance;
    var geocoder = new google.maps.Geocoder();
    debugger
    var start_latitude;
    var start_longitude;
    var end_latitude;
    var end_longitude;
    var starting = document.getElementById('from').value;
    var ending = document.getElementById('to').value;

    geocoder.geocode({'address' : starting}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        start_latitude = results[0].geometry.location.lat();
        start_longitude = results[0].geometry.location.lng();
        };

    });
    geocoder.geocode({'address' : ending}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        end_latitude = results[0].geometry.location.lat();
        end_longitude = results[0].geometry.location.lng();
        }
    });

    if (waypts.length > 0) {
      var request = {
          origin: start,
          destination: end,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.WALKING
      }
    } else {
      var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING
      }
    }

    var i = 99;

    do {
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        // For each route, display summary information.
        for (var i = 0; i < route.legs.length; i++) {
           totalDistance = totalDistance + route.legs[i].distance.value;
          console.log(totalDistance - stepDistance)
        } // closing for
      } // closing if
    }); // closing directions function
    debugger
    if (waypts.length < 1){
       var latitude = (start_latitude - (start_latitude - end_latitude)/100);
       var longitude = (start_longitude - (start_longitude - end_longitude)/100);
       var new_point = latitude + "," + longitude;
       waypts.push(new_point);
       i--;
    } else {
       var latitude = (start_latitude - (start_latitude - end_latitude)/i);
       var longitude = (start_longitude - (start_longitude - end_longitude)/i);
       var new_point = latitude + "," + longitude;
       waypts.push(new_point);
       i--;
    }; // closing else
  } // closing do loop
  while (totalDistance < stepDistance );


  // after the while loop is over
  // this is working
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
         totalDistance = totalDistance + route.legs[i].distance.value;
      } // closing for
    } // closing if
  }); // closing directions
}) // closing calc route













  google.maps.event.addDomListener(window, 'load', initialize);


        // If the browser supports the Geolocation API
        // finding the geolocation of the user
        if (typeof navigator.geolocation == "undefined") {
          $("#error").text("Your browser doesn't support the Geolocation API");
          return;
        }

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
        }); // end of geolocation function







      }); // end of document ready function
