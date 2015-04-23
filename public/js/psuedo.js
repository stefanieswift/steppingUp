// 1. convert desired steps to distance value
// 2. if desired steps < add modal and give distance
// 3. if not add a hundreth of the distance in latitude/longitude points
// 4. Continue to add waypoints until the distance > desired steps distance
// 5. display directions on map

  steps = Number(document.getElementById('steps'))/1320;
