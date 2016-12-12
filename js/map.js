var placeName;
var map;
var markers = [];
function initAutocomplete() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.2787948, lng: 126.9908305},
    zoom: 13,
    mapTypeControl: false, 
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  //var markers = [];
  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    
    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];
    
    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      placeName = place.name;
      console.log("name : " + place.name);
      getRestaurantsByPlace();
      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    if (places.length == 0) {
      return;
    }
    map.fitBounds(bounds);
  });
  // [END region_getplaces]
}

//Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
	  setMapOnAll(null);
	  window.location.href = "search.html";
	}

function getRestaurantsByPlace() {
	var nbr_rest = 0;
	var rest = [];
	var link = [];
	var updated_restaurants = [];
	var restaurantsnames = [];
	var restauranImageData = [];
	var priceRange = [];
	var description = [];
	var type = [];
	var notSupported = function() {
		element.innerHTML = 'Your browser doesn’t seem to support <code>xhr.responseType="json"</code> yet. :(';
		element.className = 'fail';
	};

	var getJSON = function(url, successHandler, errorHandler) {
		if (typeof XMLHttpRequest == 'undefined') {
			return notSupported();
		}
		var xhr = new XMLHttpRequest();
		xhr.open('get', url, true);
		xhr.responseType = 'json';
		xhr.onload = function() {
			var status = xhr.status;
			if (status == 200) {
				successHandler && successHandler(xhr.response);
			} else {
				errorHandler && errorHandler(status);
			}
		};
		xhr.send();
	};

	// load a non-JSON resource
	getJSON(
			'http://localhost:3000/api/restaurants/search/' + placeName+'',
			 
			function(data) {
				if (typeof data == 'string') {
					notSupported();
				} else {

					// alert('Your public IP address is: ' + data);
					// /function that works

					function recursiveGetProperty(obj, lookup, callback) {
						for (property in obj) {
							if (property == lookup) {
								callback(obj[property]);
							} else if (obj[property] instanceof Object) {
								recursiveGetProperty(obj[property], lookup,
										callback);
							}
						}
					}
					recursiveGetProperty(data, "name", function(obj) {
						// do something with it.
						restaurantsnames[restaurantsnames.length] = obj;
					});
					recursiveGetProperty(data, "priceRange", function(obj) {
						// do something with it.
						priceRange[priceRange.length] = obj;
					});
					recursiveGetProperty(data, "description", function(obj) {
						// do something with it.
						description[description.length] = obj;
					});
					recursiveGetProperty(data, "type", function(obj) {
						// do something with it.
						type[type.length] = obj;
					});
					
					recursiveGetProperty(data, "img", function(obj) {
						// do something with it.
						recursiveGetProperty(obj, "data", function(obj) {
						restauranImageData[restauranImageData.length] = obj.data;
						});
					});
					console.log(restauranImageData[0]);
					
					nbr_rest = restaurantsnames.length;
					updateRestaurants();
					for (i = 0; i < restaurantsnames.length; i++) {
						rest[i] = document.getElementById('rest' + i);
						console.log(rest[i]);
					}
				}

				function handleElement(i) {
					link[i] = document
							.getElementById('rest' + i)
							.addEventListener(
									'click',
									function() {
										var b = document.getElementById('rest'
												+ i).innerHTML, url = 'restaurant.html?rest'
												+ i
												+ '='
												+ encodeURIComponent(b);
										document.location.href = url;
									});
				}

				for (i = 0; i < nbr_rest; i++)
					handleElement(i);
			});
	
	function base64encode(binary) {
        return btoa(unescape(encodeURIComponent(binary)));
    }
	
	function updateRestaurants(){
		if(nbr_rest == 0){
			$('.restaurant').remove();
			$('#list .results').append('<li class="restaurant"><h1>There are no restaurants in ' + placeName +'</h1></li>');
		}
		else{
			for (i = 0; i < nbr_rest; i++){
				$('#list .results').append('<div id="list-restaurants-name"><li class="restaurant"><img src="images/logo.png"><h3 class="name" id="rest'+i+'">' + restaurantsnames[i] + '</h3><p>' + type[i] + '</p><p>' + description[i] + '</p><p>' + priceRange[i] + '</p></li><hr></div>');
			}
		}
	}
}
