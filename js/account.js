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
  
  if(cityName == "Paris"){
	  $('.book').remove();
	  getUserBookings();
  }
  if(cityName == "Tokyo"){
	  $('.reviewtabapend').remove();
	  //getReviews();
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

openFirst("Paris");

function getUserBookings(){
	//var resname = document.getElementById('title_header').innerHTML;
	var nbr_bookings = 0;
	var bookings = [];
	var bookmenu = [];
	var starters = [];
	var main = [];
	var dessert = [];
	var drink = [];
	var nbr_bookings = 0;
	nbr_starters = 0;
	nbr_main = 0;
	nbr_dessert = 0;
	nbr_drink = 0;
	var urll = 'http://localhost:3000/api/bookings/' + localStorage.getItem("username");
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
				recursiveGetProperty(data, "restaurantName", function(obj) {
					bookmenu[bookmenu.length] = obj;
				});
			
				recursiveGetProperty(data, "starteritem", function(obj) {
					starters[starters.length] = obj;
				});
				recursiveGetProperty(data, "mainitem", function(obj) {
					main[main.length] = obj;
				});
				recursiveGetProperty(data, "dessertitem", function(obj) {
					dessert[dessert.length] = obj;
				});
				recursiveGetProperty(data, "drinkitem", function(obj) {
					drink[drink.length] = obj;
				});
				
				nbr_bookings = bookmenu.length;
				updateListBooking();
				nbr_starters = starters.length;
				nbr_main = main.length;
				nbr_dessert = dessert.length;
				nbr_drink = drink.length;
				console.log("nbr_bookings : " + nbr_bookings);
				console.log("nbr_starters : " + nbr_starters);
				console.log("nbr_main : " + nbr_main);
				console.log("nbr_dessert : " + nbr_dessert);
				console.log("nbr_drink : " + nbr_drink);
				
				for (i = 0; i < nbr_bookings; i++){
					console.log(nbr_bookings+":nbr_drink : " + bookmenu[i]);
					}
				
				for (i = 0; i < nbr_bookings; i++){
					handleElementBooking(i);
					}
				
				
				function handleElementBooking(i) {
					document.getElementById('booking' + i).innerHTML = bookmenu[i];
				}
				
				function handleStarter(i) {
					document.getElementById('starter' + i).innerHTML = starters[i];
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
				
				for (i = 0; i < nbr_bookings; i++){
					handleElementBooking(i);
					}

				for (i = 0; i < nbr_starters; i++)
					handleStarter(i);
				
				for (i = 0; i < nbr_main; i++)
					handleMain(i);
				
				for (i = 0; i < nbr_dessert; i++)
					handleDessert(i);
				
				for (i = 0; i < nbr_drink; i++)
					handleDrink(i);
				
				for (i = 0; i < nbr_drink; i++)
					console.log("starter : " + starters[i]);
			}

	});
		
		function updateListBooking(){
			var indexx;
			for(indexx = 0; indexx < bookmenu.length/2; indexx++){
				$('#results').append('<li class="book"><h3 class="name" id ="booking'+indexx+'">'+bookmenu[indexx]+'</h3><p id="booktime'+indexx+'">Date and time</p><dl id="menu-description'+indexx+'"></dl><hr></li>');
			}
			
			for(index = 0; index < starters.length/2; index++){
				$('#menu-description0').append('<dt id="starter'+index+'">'+ index +' : </dt>');
			}
			
			for(index = 0; index < main.length/2; index++){
				$('#menu-description0').append('<dt id="main'+index+'">' +index+ ' : </dt>');
			}
			
			for(index = 0; index < dessert.length/2; index++){
				$('#menu-description0').append('<dt id="dessert'+index+'">' +index +' : </dt>');
			}
			
			for(index = 0; index < drink.length/2; index++){
				$('#menu-description0').append('<dt id="drink'+index+'">'+index+ ' : </dt>');
			}
			for(index = bookmenu.length/2; index < bookmenu.length; index++){
				$('#results').append('<li class="book"><h3 class="name" id ="booking'+index+'">'+bookmenu[index]+'</h3><p id="booktime'+index+'">Date and time</p><dl id="menu-description"></dl><hr></li>');
			}
			
			for(index = starters.length/2; index < starters.length; index++){
				$('#menu-description').append('<dt id="starter'+index+'">'+ index +' : </dt>');
			}
			
			for(index = main.length/2; index < main.length; index++){
				$('#menu-description').append('<dt id="main'+index+'">' +index+ ' : </dt>');
			}
			
			for(index = dessert.length/2; index < dessert.length; index++){
				$('#menu-description').append('<dt id="dessert'+index+'">' +index +' : </dt>');
			}
			
			for(index = drink.length/2; index < drink.length; index++){
				$('#menu-description').append('<dt id="drink'+index+'">'+index+ ' : </dt>');
			}
			
		}
					
}