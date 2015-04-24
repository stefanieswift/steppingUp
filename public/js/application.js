// var waypointRoute = function(newRequest, waypts, halfPoint, steppingDistanceDifference, bigger){
//   var distanced;
//     latlngPush = new google.maps.LatLng((bigger+steppingDistanceDifference),(location1.lng()+location2.lng())/2);
//       waypts.push({
//        location:latlngPush,
//        stopover:true
//       });
//   directionsService.route(newRequest, function(newResponse, status)
//     {
//       if (status == google.maps.DirectionsStatus.OK)
//       {
//         var route = newResponse.routes[0];
//         for (var i = 0; i < route.legs.length; i++) {
//           distanced += newResponse.routes[0].legs[i].distanced.value;
//         * 1.3123359580052494;}
//         };
//         if (stepDistance - distanced < 1000 && stepDistance - distanced > 0 || distanced - stepDistance < 1000 && distanced - stepDistance > 0){
//             return waypts;
//         } else if(halfPoint <= steppingDistanceDifference) {
//             return waypts;
//         } else {
//           updateSteppingDistanceDifference = steppingDistanceDifference * 2;
//           waypointRoute(newRequest, waypts, halfPoint, updateSteppingDistanceDifference, bigger);
//         }
//   });
// }