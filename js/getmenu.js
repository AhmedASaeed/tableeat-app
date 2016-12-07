(function() {
	var url = document.location.href, params = url.split('?')[1].split('&'), data = {}, tmp;
	for (var i = 0, l = params.length; i < l; i++) {
		tmp = params[i].split('=');
		data[tmp[i]] = tmp[i+1];
		document.getElementById('title_header').innerHTML = decodeURI(data[tmp[i]]);
	}
}());

(function() {
	var resname = document.getElementById('title_header').innerHTML;
	console.log(resname);
	var main = [];
	var starter = [];
	var desert = [];
	var drink = [];
	var urll = 'http://localhost:3000/api/restaurants/' + resname;
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
	getJSON(urll, function(data) {
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
						recursiveGetProperty(obj[property], lookup, callback);
					}
				}
			}
			recursiveGetProperty(data, "main", function(obj) {
				// do something with it.
				main[main.length] = obj;

			});
			recursiveGetProperty(data, "starters", function(obj) {
				// do something with it.
				starter[starter.length] = obj;

			});
			recursiveGetProperty(data, "dessert", function(obj) {
				// do something with it.
				desert[desert.length] = obj;

			});
			recursiveGetProperty(data, "drink", function(obj) {
				// do something with it.
				drink[drink.length] = obj;

			});

			document.getElementById('starters').innerHTML = starter[0];
			document.getElementById('main').innerHTML = main[0];
			document.getElementById('dessert').innerHTML = desert[0];
			document.getElementById('drink').innerHTML = drink[0];
			console.log(urll);

			// ///

			/*
			 * function traverse_it(obj){ for(var prop in obj){ if(typeof
			 * obj[prop]=='object'){ // object traverse_it(obj[prop[i]]); }else{ //
			 * something else alert('The value of '+prop+' is '+obj[prop]+'.'); } } }
			 * 
			 * traverse_it(data);
			 */

		}

	});
}());