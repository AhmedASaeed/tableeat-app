(function() {


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
			'http://localhost:3000/api/restaurants',
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
					
					var arrayBuffer = restauranImageData[0];
					   var bytes = new Uint8Array(arrayBuffer);
					   var blob        = new Blob([bytes.buffer]);

					   var image = document.getElementById('image');

					   var reader = new FileReader();
					   reader.onload = function(e) {
					       image.src = e.target.result;
					   };
					   reader.readAsDataURL(blob);
					   
					
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
		for (i = 0; i < nbr_rest; i++){
			$('#list .results').append('<div id="list-restaurants"><li class="restaurant"><img id="image" src="images/logo.png"><h3 class="name" id="rest'+i+'">' + restaurantsnames[i] + '</h3><p>' + type[i] + '</p><p>' + description[i] + '</p><p>' + priceRange[i] + '</p></li><hr></div>');
		}
	}
}());