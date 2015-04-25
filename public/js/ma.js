$(document).ready(function(){
  $("#form").hide();
  $("#show_form").on("click", function(){
    $(this).hide();
    $("#form").show().modal();
  });

  var myOptions = {
          zoom: 10,
          center: new google.maps.LatLng(40.84, 14.25),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        // Draw the map
        var mapObject = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
      });


// testing the location between the two points
var location1,
    location2,
    from,
    to,
    latlng,
    geocoder;
    map,
    distance,
    stepDistance,
    distanced,
    steppingDistanceDifference,
    waypts = [],
    latlngPush;

// finds the coordinates for the two locations and calls the showMap() function
function initialize()
{
  geocoder = new google.maps.Geocoder(); // creating a new geocode object

  // getting the two address values
  from = document.getElementById("from").value;
  to = document.getElementById("to").value;
  stepDistance = (document.getElementById("steps").value)/1.3123359580052494;


  // finding out the coordinates
  if (geocoder)
  {
    geocoder.geocode( { 'address': from}, function(results, status)
    {
      if (status == google.maps.GeocoderStatus.OK)
      {
        //location of first address (latitude + longitude)
        location1 = results[0].geometry.location;
      } else
      {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
    geocoder.geocode( { 'address': to}, function(results, status)
    {
      if (status == google.maps.GeocoderStatus.OK)
      {
        //location of second address (latitude + longitude)
        location2 = results[0].geometry.location;
        // calling the showMap() function to create and show the map
        showMap();
      } else
      {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
}

// creates and shows the map
function showMap()
{
  var bigger,
      smaller,
      biggerLng,
      smallerLng;
  // center of the map (compute the mean value between the two locations)
  latlng = new google.maps.LatLng((location1.lat()+location2.lat())/2,(location1.lng()+location2.lng())/2);
  if (location1.lat() > location2.lat()){
    bigger = location1.lat();
    smaller = location2.lat();
  } else{
    bigger = location2.lat();
    smaller = location2.lat();
  }
  var biggerLng;
  if (location1.lng() > location2.lng()){
    biggerLng = location1.lng();
    smallerLng = location2.lng();
  } else{
    biggerLng = location2.lng();
    smallerLng = location2.lng();
  }

  // set map options
    // set zoom level
    // set center
    // map type
  var mapOptions =
  {
    zoom: 7,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.HYBRID
  };

  // create a new map object
    // set the div id where it will be shown
    // set the map options
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

  // show route between the points
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer(
  {
    suppressMarkers: true,
    suppressInfoWindows: true
  });
  directionsDisplay.setMap(map);
   directionsDisplay.setPanel(document.getElementById('directions-panel'))
  var request = {
    origin:location1,
    destination:location2,
    travelMode: google.maps.DirectionsTravelMode.WALKING,
    avoidHighways: true,
    avoidTolls: true,
    avoidFerries: true,
  };


  directionsService.route(request, function(response, status)
  {
    if (status == google.maps.DirectionsStatus.OK)
    {
      // directionsDisplay.setDirections(response);
      distance = response.routes[0].legs[0].distance.value;
    }
    if(distance > stepDistance){
      directionsDisplay.setDirections(response);
      alert("Your step count is smaller than the fastest route")
    } else {
      steppingDistanceDifference = (stepDistance - distance)/2.2/110574.61;
      latlngPush1 = new google.maps.LatLng((bigger+(steppingDistanceDifference/2)),(location1.lng()+location2.lng())/2);
      latlngPush2 = new google.maps.LatLng((location1.lat()+location2.lat())/2),(biggerLng+(steppingDistanceDifference/2));
      waypts.push({
       location:latlngPush1,
       stopover:true
      });
      waypts.push({
       location:latlngPush2,
       stopover:true
      });
      var newRequest = {
        origin:location1,
        destination:location2,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.DirectionsTravelMode.WALKING,
        avoidHighways: true,
        avoidTolls: true,
        avoidFerries: true,
      };
      directionsService.route(newRequest, function(newResponse, status)
    {
      if (status == google.maps.DirectionsStatus.OK)
      {
        directionsDisplay.setDirections(newResponse);
        distanced = (newResponse.routes[0].legs[0].distance.value + newResponse.routes[0].legs[1].distance.value) * 1.3123359580052494;
        alert(distanced);
      }
    });

    }; //closing else
  });

  // show a line between the two points
  var line = new google.maps.Polyline({
    map: map,
    path: [location1, location2],
    strokeWeight: 7,
    strokeOpacity: 0.8,
    strokeColor: "#FFAA00"
  });

  // create the markers for the two locations
  var marker1 = new google.maps.Marker({
    map: map,
    position: location1,
    title: "First location"
  });
  var marker2 = new google.maps.Marker({
    map: map,
    position: location2,
    title: "Second location"
  });

  // create the text to be shown in the infowindows
  var text1 = '<div id="content">'+
      '<h1 id="firstHeading">First location</h1>'+
      '<div id="bodyContent">'+
      '<p>Coordinates: '+location1+'</p>'+
      '<p>Address: '+from+'</p>'+
      '</div>'+
      '</div>';

  var text2 = '<div id="content">'+
    '<h1 id="firstHeading">Second location</h1>'+
    '<div id="bodyContent">'+
    '<p>Coordinates: '+location2+'</p>'+
    '<p>Address: '+to+'</p>'+
    '</div>'+
    '</div>';

  // create info boxes for the two markers
  var infowindow1 = new google.maps.InfoWindow({
    content: text1
  });
  var infowindow2 = new google.maps.InfoWindow({
    content: text2
  });


  // add action events so the info windows will be shown when the marker is clicked
  google.maps.event.addListener(marker1, 'click', function() {
    infowindow1.open(map,marker1);
  });
  google.maps.event.addListener(marker2, 'click', function() {
    infowindow2.open(map,marker1);
  });
}

function toRad(deg)
{
  return deg * Math.PI/180;
}


// funcion to test added



// If the browser supports the Geolocation API
if (typeof navigator.geolocation == "undefined") {
  $("#error").text("Your browser doesn't support the Geolocation API");
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
});
