function openCity(evt, cityName, map) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.firstElementChild.className += " w3-border-red";
}

function openFirst(cityName) {
    var i;
    var x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none"; 
    }
    document.getElementById(cityName).style.display = "block";
}

openFirst("Paris");

function getUserInfo(){
	var resname = document.getElementById('title_header').innerHTML;
	var reviewer = [];
	var reviewstars = [];
	var reviewtext = [];
	var urll = 'http://localhost:3000/api/users/' + localStorage.getItem("username") +'/b';
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
				function recursiveGetProperty(obj, lookup, callback)
				{
					for (property in obj)
					{
						if (property == lookup) 
						{
							callback(obj[property]);
						} else if (obj[property] instanceof Object) {
							recursiveGetProperty(obj[property], lookup, callback);
						}
					}
				}
				/////Start lookup////// 
				recursiveGetProperty(data, "name", function(obj) {
					reviewer[reviewer.length] = obj;

				});
				recursiveGetProperty(data, "reviewtext", function(obj) {
					reviewtext[reviewtext.length] = obj;

				});
				recursiveGetProperty(data, "reviewstars", function(obj) {
					reviewstars[reviewstars.length] = obj;

				});
				
				updateReview();
			
			}
		});
		function updateReview(){
			for (i = 0; i < reviewer.length; i++){
				$('#reviewtab').append('<div class="reviewtabapend"><h2>'+ reviewer[i]+'</h2><h3>'+reviewstars[i]+'</h3><h5>'+reviewtext[i]+'</h5><hr>');
			}
		}	
}