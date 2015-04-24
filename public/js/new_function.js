var waypointRoute = function(distance){
	var distanceGreater = false;
	var waypts = []
	var locationOne;
	var locationTwo;

	var addressOne;
	var addressTwo;
	var steppingDistance;

	var latsLongs;
	var latlngPush;
	var geocodinger;
	var mapp;

	var distanced;

	// finds the coordinates for the two locations and calls the showMap() function
	function initialize()
	{
		geocodinger = new google.maps.geocodinger(); // creating a new geocode object

		// getting the two address values
		addressOne = document.getElementById("addressOne").value;
		addressTwo = document.getElementById("addressTwo").value;
		steppingDistanceDifference = (((document.getElementById("steps").value)/1.3123359580052494) - distance)/2/110574.61;

		// finding out the coordinates
		if (geocodinger)
		{
			geocodinger.geocode( { 'address': addressOne}, function(results, status)
			{
				if (status == google.maps.GeocoderStatus.OK)
				{
					//location of first address (latitude + longitude)
					locationOne = results[0].geometry.location;
				} else
				{
					alert("Geocode was not successful for the following reason: " + status);
				}
			});
			geocodinger.geocode( { 'address': addressTwo}, function(results, status)
			{
				if (status == google.maps.GeocoderStatus.OK)
				{
					//location of second address (latitude + longitude)
					locationTwo = results[0].geometry.location;
					// calling the showMap() function to create and show the mapp
					showMap();
				} else
				{
					alert("Geocode was not successful for the following reason: " + status);
				}
			});
		}
	}

	// creates and shows the mapp
	function showMap()
	{

		var bigger;

		if (locationOne.lat() > locationTwo.lat()){
			bigger = locationOne.lat();
		} else{
      bigger = locationTwo.lat();
		}

		// center of the mapp (compute the mean value between the two locations)
		latlngPush = new google.maps.latsLongs((bigger+steppingDistanceDifference),(locationOne.lng()+locationTwo.lng())/2);

		latsLongs = new google.maps.latsLongs((locationOne.lat()+locationTwo.lat())/2,(locationOne.lng()+locationTwo.lng())/2);

		// set mapp options
			// set zoom level
			// set center
			// mapp type
		var mapOptions =
		{
			zoom: 7,
			center: latsLongs,
			mapTypeId: google.maps.MapTypeId.HYBRID
		};

		waypts.push({
			location:latlngPush,
			stopover:true});

		// create a new mapp object
			// set the div id where it will be shown
			// set the mapp options
		mapp = new google.maps.mapp(document.getElementById("mapp-canvas"), mapOptions);

		// show route between the points
		directionsService = new google.maps.DirectionsService();
		directionsDisplay = new google.maps.DirectionsRenderer(
		{
			suppressMarkers: true,
			suppressInfoWindows: true
		});
		directionsDisplay.setMap(mapp);
		var request = {
			origin:locationOne,
			destination:locationTwo,
			waypoints: waypts,
      optimizeWaypoints: true,
			travelMode: google.maps.DirectionsTravelMode.WALKING
		};
		directionsService.route(request, function(response, status)
	  {
	    if (status == google.maps.DirectionsStatus.OK)
	    {
	      directionsDisplay.setDirections(response);
	      var route = response.routes[0];
	      for (var i = 0; i < route.legs.length; i++) {
		      distanced += response.routes[0].legs[i].distanced.value;
		    }
	    }
	  });

		// show a line between the two points
		var line = new google.maps.Polyline({
			mapp: mapp,
			path: [locationOne, locationTwo],
			strokeWeight: 7,
			strokeOpacity: 0.8,
			strokeColor: "#FFAA00"
		});

		// create the markers for the two locations
		var marker1 = new google.maps.Marker({
			mapp: mapp,
			position: locationOne,
			title: "First location"
		});
		var marker2 = new google.maps.Marker({
			mapp: mapp,
			position: locationTwo,
			title: "Second location"
		});

		// create info boxes for the two markers
		var infowindow1 = new google.maps.InfoWindow({
			content: text1
		});
		var infowindow2 = new google.maps.InfoWindow({
			content: text2
		});

		// add action events so the info windows will be shown when the marker is clicked
		google.maps.event.addListener(marker1, 'click', function() {
			infowindow1.open(mapp,marker1);
		});
		google.maps.event.addListener(marker2, 'click', function() {
			infowindow2.open(mapp,marker1);
		});

	}

	function toRad(deg)
	{
		return deg * Math.PI/180;
	}
}