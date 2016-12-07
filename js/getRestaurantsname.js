(function() {


	var nbr_rest = 0;
	var rest = [];
	var link = [];
	var updated_restaurants = [];
	var restaurantsnames = [];
	var restauranImageData = [];
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
					/////////////////////
				
					recursiveGetProperty(data, "img", function(obj) {
						// do something with it.
						recursiveGetProperty(obj, "data", function(obj) {
						restauranImageData[restauranImageData.length] = obj.data;
						});
					});
					console.log(restauranImageData[0]);
					
					////////////////////////
					
				
					
					
					
					nbr_rest = restaurantsnames.length;
					update_list(restaurantsnames);
					for (i = 0; i < restaurantsnames.length; i++) {
						rest[i] = document.getElementById('rest' + i);
						
						//console.log(restaurantsnames[i]);
						//updated_restaurants[updated_restaurants.length] = [restaurantsnames[i]];
						//rest[i].innerHTML = restaurantsnames[i];
						//rest[i] = restaurantsnames[i];
						console.log(rest[i]);
					}
					
					console.log(nbr_rest);
					
					//nbr_rest = restaurantsnames.length;
					/*
					 * function traverse_it(obj){ for(var prop in obj){
					 * if(typeof obj[prop]=='object'){ // object
					 * traverse_it(obj[prop[i]]); }else{ // something else
					 * alert('The value of '+prop+' is '+obj[prop]+'.'); } } }
					 * 
					 * traverse_it(data);
					 */
				}

				function handleElement(i) {
					link[i] = document
							.getElementById('rest' + i)
							.addEventListener(
									'click',
									function() {
										var b = document.getElementById('rest'
												+ i).innerHTML, url = 'restaurant2.html?rest'
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

	function update_list(updated_restaurants) {

		  // clear the existing list
		  //$('#list .results li').remove();
		//for(i=0; i < nbr_rest; i++){                                          <img src="data:image/jpeg;base64,{binary data}" />
			$.each(updated_restaurants, function(index,restaurantName) {
				$('#list .results').append('<li class="restaurant"><img src="data:image/jpeg;base64,{'+base64encode+'('+restauranImageData[0]+')'+'}"><h3 class="name" id="rest'+index+'">' + restaurantName + '</h3><p>Click the Restaurant name</p></li>')
				});
			//}
		};
}());
