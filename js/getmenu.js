	var quantities_starters = [];
	var quantities_mains = [];
	var quantities_desserts = [];
	var quantities_drinks = [];
	var selected_starters = [];
	var selected_mains = [];
	var selected_desserts = [];
	var selected_drinks = [];
	var resname;
	
function getTitleHeader() {

	var url = document.location.href, params = url.split('?')[1].split('&'), data = {}, tmp;
	for (var i = 0, l = params.length; i < l; i++) {
		tmp = params[i].split('=');
		data[tmp[i]] = tmp[i+1];
		console.log('data[tmp[i]] : ' + data[tmp[i]]);
		console.log('tmp[i+1] : ' + tmp[i+1]);
		document.getElementById('title_header').innerHTML = decodeURI(data[tmp[i]]);
		resname = document.getElementById('title_header').innerHTML;
	}
}


function openFirst(cityName) {
    var i;
    var x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none"; 
    }
    document.getElementById(cityName).style.display = "block";
}

openFirst("London");
getTitleHeader();
getRestaurantInformation();

$(document).ready(function() {
            $('#datetimepicker5').datetimepicker();
	  
        $('#savemenu').on('click',function(){
        });
   
 });

function initAutocomplete() {
	  var map = new google.maps.Map(document.getElementById('map'), {
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

	  var markers = [];
	  // [START region_getplaces]
	  // Listen for the event fired when the user selects a prediction and retrieve
	  // more details for that place.
	  searchBox.addListener('places_changed', function() {
	    var places = searchBox.getPlaces();

	    if (places.length == 0) {
	      return;
	    }

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
	    map.fitBounds(bounds);
	  });
	  // [END region_getplaces]
	};

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
  if(cityName == "London"){
	  initAutocomplete();
  }
	  
  if(cityName == "Paris"){
	  $('.menu-description').remove();
	  getMenu();
  }
  if(cityName == "Tokyo"){
	  $('.reviewtabapend').remove();
	//Get the modal
	  var modal = document.getElementById('myModal');

	  // Get the button that opens the modal
	  var btn = document.getElementById("myBtn");

	  // Get the <span> element that closes the modal
	  var span = document.getElementsByClassName("close")[0];

	  // When the user clicks on the button, open the modal 
	  btn.onclick = function() {
	      modal.style.display = "block";
	  }

	  // When the user clicks on <span> (x), close the modal
	  span.onclick = function() {
	      modal.style.display = "none";
	  }

	  // When the user clicks anywhere outside of the modal, close it
	  window.onclick = function(event) {
	      if (event.target == modal) {
	          modal.style.display = "none";
	      }
	  }
	  addReview();
	  getReviews();
  }
}
/////////////////////Start Review Tab/////////////////
function addReview(){
	var btnaddreviw = document.getElementById("save-reviw-restaurant");
	btnaddreviw.onclick = function() {
		
		
		var name = localStorage.getItem("name");
		var email = localStorage.getItem("username");
		
		var list = document.getElementById('number-stars');var INDEX = list.selectedIndex;

		var numofstars = list[INDEX].value;
		var reviwtext =  $('#reviewtext').val();
		var regsend = '{"reviewer" :{"reviewername" :"'+name+'", "revieweremail" :"'+email+'" },"reviewtext":"'+reviwtext+'","reviewstars" : "'+numofstars+'"}';
		var obj = JSON.parse(regsend);
		
		if (name === '' || email === '') {
			alert('Some informations are missing');
		} else {
			// Sending the HTTP request in asynchronous mode
			$.ajax({
				url : 'http://localhost:3000/api/restaurants/' + resname + '/reviews', // The name of the file indicated in the form
				type : 'POST', // The method specified in the // form (get or post)
				data : obj,
				dataType : 'json', // JSON// I serialize the data (I send all
				// the values ​​present in the form)
				success : function(data) {
					alert("Thank you");
					//window.location.href = "account.html";
				},
				error: function(xhr,err){
					if(xhr.status == 404) alert("You didn't register");
				}
			});
		}
		 var modal = document.getElementById('myModal');
		 modal.style.display = "none";
	  }
}
function getReviews(){
	resname = document.getElementById('title_header').innerHTML;
	var reviewer = [];
	var reviewstars = [];
	var reviewtext = [];
	var urll = 'http://localhost:3000/api/restaurants/' + resname+'/reviews';
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
				recursiveGetProperty(data, "reviewername", function(obj) {
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
				$('#reviewtab').append('<div class="reviewtabapend"><h2>Reviewer :'+ reviewer[i]+'</h2><h3>Stars :'+reviewstars[i]+'</h3><h5>Comment :'+reviewtext[i]+'</h5><hr>');
			}
			
		}
}

function getRestaurantInformation(){
	resname = document.getElementById('title_header').innerHTML;
	var street;
	var city;
	var zipcode;
	var description;
	var priceRange;
	var ownername;
	var owneremail;
	var type;
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
				recursiveGetProperty(data, "street", function(obj) {
					street = obj;
				});
				recursiveGetProperty(data, "city", function(obj) {
					city = obj;
				});
				recursiveGetProperty(data, "zipcode", function(obj) {
					zipcode = obj;
				});
				recursiveGetProperty(data, "description", function(obj) {
					description = obj;
				});
				recursiveGetProperty(data, "priceRange", function(obj) {
					priceRange = obj;
				});
				recursiveGetProperty(data, "ownername", function(obj) {
					ownername = obj;
				});
				recursiveGetProperty(data, "owneremail", function(obj) {
					owneremail = obj;
				});
				recursiveGetProperty(data, "typeOfFood", function(obj) {
					type = obj;
				});
				
				$('#owner').append(ownername + " - email : " + owneremail);
				$('#description').append(description);
				$('#price').append(priceRange);
				$('#type').append(type);
				document.getElementById('typeoffood').innerHTML = type;
				document.getElementById('address').innerHTML = street+","+city+","+zipcode;
			}
		});
}
/////////////////////End Review Tab/////////////////
function getMenu() {
	resname = document.getElementById('title_header').innerHTML;
	console.log(resname);
	nbr_starters = 0;
	nbr_main = 0;
	nbr_dessert = 0;
	nbr_drink = 0;
	var main = [];
	var starter = [];
	var dessert = [];
	var drink = [];
	var updated_starters = [];
	var updated_main = [];
	var updated_dessert = [];
	var updated_drink = [];
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
			recursiveGetProperty(data, "mainItem", function(obj) {
				main[main.length] = obj;

			});
			recursiveGetProperty(data, "starterItem", function(obj) {
				starter[starter.length] = obj;

			});
			recursiveGetProperty(data, "dessertItem", function(obj) {
				dessert[dessert.length] = obj;

			});
			recursiveGetProperty(data, "drinkItem", function(obj) {
				drink[drink.length] = obj;

			});

			nbr_starters = starter.length;
			nbr_main = main.length;
			nbr_dessert = dessert.length;
			nbr_drink = drink.length;
			update_list(starter,main,dessert,drink);
			addActions();
		
			function handleStarter(i) {
				document.getElementById('starter' + i).innerHTML = starter[i];
			}
			
			function handleMain(i) {
				document.getElementById('main' + i).innerHTML = main[i];
			}
			
			function handleDessert(i) {
				document.getElementById('dessert' + i).innerHTML = dessert[i];
			}
			
			function handleDrink(i) {
				document.getElementById('drink' + i).innerHTML = drink[i];
			}

			for (i = 0; i < nbr_starters; i++)
				handleStarter(i);
			
			for (i = 0; i < nbr_main; i++)
				handleMain(i);
			
			for (i = 0; i < nbr_dessert; i++)
				handleDessert(i);
			
			for (i = 0; i < nbr_drink; i++)
				handleDrink(i);

			console.log(urll);
		}
	});
	function update_list(updated_starters,updated_main,updated_dessert,updated_drink) {
		$.each(updated_starters, function(index,starterName) {
			$('#results-starters').append('<div class="menu-description"><li class="menu-item"><div class="menu-item-line"><input id="nbr-starter'+index+'" type="text" name="starter'+index+'" value="0" readonly><img class="update-menu" id="add-starter'+index+'" src="images/add.png" height="20" width="20"><img class="update-menu" id="remove-starter'+index+'" src="images/remove.png" height="20" width="20"><h4 class="name" id="starter'+index+'">' + starterName + '</h4></div></li><hr></div>')
			});
		$.each(updated_main, function(index,mainName) {
				$('#results-main').append('<div class="menu-description"><li class="menu-item"><div class="menu-item-line"><input id="nbr-main'+index+'" type="text" name="main'+index+'" value="0" readonly><img class="update-menu" id="add-main'+index+'" src="images/add.png" height="20" width="20"><img class="update-menu" id="remove-main'+index+'" src="images/remove.png" height="20" width="20"><h4 class="name" id="main'+index+'">' + mainName + '</h4></div></li><hr></div>')
			});
		$.each(updated_dessert, function(index,dessertName) {
				$('#results-dessert').append('<div class="menu-description"><li class="menu-item"><div class="menu-item-line"><input id="nbr-dessert'+index+'" type="text" name="dessert'+index+'" value="0" readonly><img class="update-menu" id="add-dessert'+index+'" src="images/add.png" height="20" width="20"><img class="update-menu" id="remove-dessert'+index+'" src="images/remove.png" height="20" width="20"><h4 class="name" id="dessert'+index+'">' + dessertName + '</h4></div></li><hr></div>')
			});
		$.each(updated_drink, function(index,drinkName) {
				$('#results-drink').append('<div class="menu-description"><li class="menu-item"><div class="menu-item-line"><input id="nbr-drink'+index+'" type="text" name="drink'+index+'" value="0" readonly><img class="update-menu" id="add-drink'+index+'" src="images/add.png" height="20" width="20"><img class="update-menu" id="remove-drink'+index+'" src="images/remove.png" height="20" width="20"><h4 class="drink" id="drink'+index+'">' + drinkName + '</h4></div></li><hr></div>')
		});
			
	};
	function addActions(){
		function handleStarterClick(i) {
			var start = "#add-starter"+i;
			var rstart = "#remove-starter"+i;
			var startt = "#nbr-starter"+i;
			var starteritem = "starter"+i;
			$(start).on('click',function(){
				console.log(nbr_starters);
	            $(startt).val(parseInt($(startt).val())+1);
	            selected_starters[i] = document.getElementById(starteritem).innerHTML;
	            console.log(selected_starters[i]);
	            quantities_starters[i] = $(startt).val();
	        });
			
			$(rstart).on('click',function(){
	        	if($(startt).val() <= 0) 
	        		$(startt).val("0");
	        	else
	        		$(startt).val(parseInt($(startt).val())-1);
	        	selected_starters[i] = document.getElementById(starteritem).innerHTML;
	        	quantities_starters[i] = $(startt).val();
	        });
		}
		
		function handleMainClick(i){
			var amain = "#add-main"+i;
			var nmain = "#nbr-main"+i;
			var rmain = "#remove-main"+i;
			var mainitem = "main"+i;
			$(amain).on('click',function(){
	            $(nmain).val(parseInt($(nmain).val())+1);
	            selected_mains[i] =document.getElementById(mainitem).innerHTML;
	            quantities_mains[i] = $(nmain).val();
	            console.log(quantities_mains[i]);
	        });
			
			$(rmain).on('click',function(){
	        	if($(nmain).val() <= 0) 
	        		$(nmain).val("0");
	        	else
	        		$(nmain).val(parseInt($(nmain).val())-1);
	        	    selected_mains[i] =document.getElementById(mainitem).innerHTML;
	        	    quantities_mains[i] = $(nmain).val();
	        });
		}
		
		function handleDessertClick(i){
			var adessert = "#add-dessert"+i;
			var ndessert = "#nbr-dessert"+i;
			var rdessert = "#remove-dessert"+i;
			var dessertitem = "dessert"+i;
			$(adessert).on('click',function(){
	            $(ndessert).val(parseInt($(ndessert).val())+1);
	            selected_desserts[i] = document.getElementById(dessertitem).innerHTML;
	            quantities_desserts[i] = $(ndessert).val();
	        });
			
			$(rdessert).on('click',function(){
	        	if($(ndessert).val() <= 0) 
	        		$(ndessert).val("0");
	        	else
	        		$(ndessert).val(parseInt($(ndessert).val())-1);
	        	selected_desserts[i] = document.getElementById(dessertitem).innerHTML;
	        	quantities_desserts[i] = $(ndessert).val();
	        });
		}
		
		function handleDrinkClick(i){
			var adrink = "#add-drink"+i;
			var ndrink = "#nbr-drink"+i;
			var rdrink = "#remove-drink"+i;
			var drinkitem = "drink"+i;
			$(adrink).on('click',function(){
	            $(ndrink).val(parseInt($(ndrink).val())+1);
	            selected_drinks[i] = document.getElementById(drinkitem).innerHTML;
	            quantities_drinks[i] = $(ndrink).val();
	        });
			
			$(rdrink).on('click',function(){
	        	if($(ndrink).val() <= 0) 
	        		$(ndrink).val("0");
	        	else
	        		$(ndrink).val(parseInt($(ndrink).val())-1);
	        	selected_drinks[i] = document.getElementById(drinkitem).innerHTML;
	        	quantities_drinks[i] = $(ndrink).val();
	        });
		}
		
		for(i=0; i < nbr_starters; i++){
			selected_starters[i] = 0;
            quantities_starters[i] = 0;
			handleStarterClick(i);
		}
		
		for(i = 0; i < nbr_main; i++){
			selected_mains[i] = 0;
            quantities_mains[i] = 0;
			handleMainClick(i);
		}
		
		for(i=0; i < nbr_dessert; i++){
			selected_desserts[i] = 0;
            quantities_desserts[i] = 0;
			handleDessertClick(i);
		}
			
		for(i=0; i < nbr_drink; i++){
			selected_drinks[i] = 0;
            quantities_drinks[i] = 0;
			handleDrinkClick(i);
		}
	};
	
	$('#book').on('click', function(e) {
		e.preventDefault(); // I prevent the default behavior of the browser, ie submit the form

		//var $this = $(this); // jQuery object of the form

		// Customer
		var name = localStorage.getItem("name");
		var email = localStorage.getItem("username");
		
		
		//Time and persons
		var nbr_people = $('#number-people').val();

		//Menu items
		for(i=0; i < nbr_starters; i++){
			console.log("starters[i] : " + starter[i]);
		}
		
		//Quantities of each item
		for(i=0; i < quantities_starters.length; i++){
			console.log("quantities_starters loo : "+i+" : " + quantities_starters[i]);
		}
		
		for(i=0; i < quantities_mains.length; i++){
			console.log("quantities_mains loo : "+i+" : " + quantities_mains[i]);
		}
		
		for(i=0; i < quantities_desserts.length; i++){
			console.log("quantities_desserts loo : "+i+" : " + quantities_desserts[i]);
		}
		
		for(i=0; i < quantities_drinks.length; i++){
			console.log("quantities_drinks loo : "+i+" : " + quantities_drinks[i]);
		}
		for(i=0; i < selected_starters.length; i++){
			console.log("selected_starters loo : "+i+" : " + selected_starters[i]);
		}
		
		for(i=0; i < selected_mains.length; i++){
			console.log("selected_mains loo : "+i+" : " + selected_mains[i]);
		}
	
		for(i=0; i < selected_desserts.length; i++){
			console.log("selected_desserts loo : "+i+" : " + selected_desserts[i]);
		}
	
		for(i=0; i < selected_drinks.length; i++){
			console.log("selected_drinks loo : "+i+" : " + selected_drinks[i]);
		}
		
		var reqStarter = '{"starters" :[{"starteritem" : "'+starter[0]+'", "quantity" : "'+quantities_starters[0]+'"}';
		for(i=1; i < starter.length; i++){
			if(i == starter.length-1)
				reqStarter = reqStarter + ',{"starteritem" : "'+starter[i]+'", "quantity" : "'+quantities_starters[i]+'"}],';
			else
				reqStarter = reqStarter + ',{"starteritem" : "'+starter[i]+'", "quantity" : "'+quantities_starters[i]+'"}';
		}
		var reqmain = '"main" :[{"mainitem" : "'+main[0]+'", "quantity" : "'+quantities_mains[0]+'"}';
		for(i=1; i < main.length; i++){
			if(i == main.length-1)
				reqmain = reqmain + ',{"mainitem" : "'+main[i]+'", "quantity" : "'+quantities_mains[i]+'"}],';
			else
				reqmain = reqmain + ',{"mainitem" : "'+main[i]+'", "quantity" : "'+quantities_mains[i]+'"}';
		}
		var reqdessert = '"dessert" :[{"dessertitem" : "'+dessert[0]+'", "quantity" : "'+quantities_desserts[0]+'"}';
		for(i=1; i < dessert.length; i++){
			if(i == dessert.length-1)
				reqdessert = reqdessert + ',{"mainitem" : "'+dessert[i]+'", "quantity" : "'+quantities_desserts[i]+'"}],';
			else
				reqdessert = reqdessert + ',{"mainitem" : "'+dessert[i]+'", "quantity" : "'+quantities_desserts[i]+'"}';
		}
		var reqdrink = '"drink" :[{"drinkitem" : "'+drink[0]+'", "quantity" : "'+quantities_drinks[0]+'"}';
		for(i=1; i < drink.length; i++){
			if(i == drink.length-1)
				reqdrink = reqdrink + ',{"drinkitem" : "'+drink[i]+'", "quantity" : "'+quantities_drinks[i]+'"}]},';
			else
				reqdrink = reqdrink + ',{"drinkitem" : "'+drink[i]+'", "quantity" : "'+quantities_drinks[i]+'"}';
		}
		var reguser = '{"bookUser": {"name" : "'+name+'", "email" : "'+email+'"},"bookmenu" :';
		
		var list = document.getElementById('number-people');var INDEX = list.selectedIndex;

		var numofpeople = list[INDEX].value;
    	var timedate = $('#date-time').val();
		var regtimeandnump = '"bookingtime" : "'+timedate+'","numberOfpeople" :"'+numofpeople+'","restaurantName" : "'+resname+'"}';
		console.log(reqStarter);
		console.log(reqmain);
		console.log(reqdessert);
		console.log(reqdrink);
		console.log(regtimeandnump);
		console.log(reguser+reqStarter+reqmain+reqdessert+reqdrink+regtimeandnump);
		var regsend = reguser+reqStarter+reqmain+reqdessert+reqdrink+regtimeandnump;
		
		var obj = JSON.parse(regsend);
		console.log('final JSON : ' + obj);
		
		// I check the first time to not run the HTTP request
		// if I know my PHP will return an error
		
		if (name === '' || email === '') {
			alert('Some informations are missing');
		} 
		else if(timedate == '' || timedate == null){
				alert('You must specify the date and time of the booking');
		}
		else {// Sending the HTTP request in asynchronous mode
			$.ajax({
				url : 'http://localhost:3000/api/restaurants/' + resname + '/bookings', // The name of the file indicated in the form
				type : 'POST', // The method specified in the // form (get or post)
				data : obj,
				dataType : 'json', // JSON// I serialize the data (I send all
				// the values ​​present in the form)
				success : function(data) {
					window.location.href = "account.html";
				},
				error: function(xhr,err){
					if(xhr.status == 404) alert("You didn't register");
				}
			});
		}
	});
};

