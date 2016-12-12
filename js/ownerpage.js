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
	  $('#result1').remove();
  		getBookings();
  }
  else if(cityName == "Tokyo"){
	  $('#result1').remove();
	  $('#append-restaurant').remove();
	  getOwnerRestaurants();
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


if(localStorage.getItem("userExist") == "newUser"){
	tablinks = document.getElementsByClassName("tablink");
	tablinks[0].className = "w3-half tablink w3-bottombar w3-hover-light-grey w3-padding";
	tablinks[1].className += " w3-border-red";
	openFirst("Tokyo");
}
	
else{
	openFirst("Paris");
	getBookings();
}
	

//name of the restaurant
var resname;

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
var savemenu = document.getElementById("save-menu-restaurant");
savemenu.onclick = function() {
	modal.style.display = "none";
}

function createRestaurant(){
	// Get the values
	var type = $('#type-food').val();
	var pricerange = $('#price-range').val();
	resname = $('#rest-name').val();
	var address = $('#rest-address').val();
	var res = address.split(",");
	//var img = $('#rest-image').val().split('\\').pop();
	var img = $('#rest-image').val().replace(/C:\\fakepath\\/i, '');
	var ownerName = localStorage.getItem("name");
	var ownerEmail = localStorage.getItem("username");
	var starters = [$('#Starter1').val(),$('#Starter2').val()];
	var mains = [$('#Maindish1').val(),$('#Maindish2').val()];
	var desserts = [$('#Dessert1').val(),$('#Dessert2').val()];
	var drinks = [$('#Drink1').val(),$('#Drink2').val()];
	var list = document.getElementById('type-food');
	var list2 = document.getElementById('price-range');
	var INDEX = list.selectedIndex;
	var INDEX2 = list2.selectedIndex;
	var description = document.getElementById("rest-description").value;
	
	var typeoffood = list[INDEX].value;
	var price_range = list2[INDEX2].value;
	
	function getAddressElements() {
		var url = document.location.href, params = url.split('?')[1].split('&'), data = {}, tmp;
		for (var i = 0, l = params.length; i < l; i++) {
			tmp = params[i].split('=');
			data[tmp[i]] = tmp[i+1];
			console.log('data[tmp[i]] : ' + data[tmp[i]]);
			console.log('tmp[i+1] : ' + tmp[i+1]);
			document.getElementById('title_header').innerHTML = decodeURI(data[tmp[i]]);
		}
	}
	
	
	// I check the first time to not run the HTTP request
	// if I know my PHP will return an error
	var reqmenu = '"menu" : { "starters" : [{"starterItem" : "'+starters[0]+'"},{"starterItem" : "'+starters[1]+'"}],"main" : [{"mainItem" : "'+mains[0]+'"},{"mainItem" : "'+mains[1]+'"}],"dessert" : [{"dessertItem" : "'+desserts[0]+'"},{"dessertItem" : "'+desserts[1]+'"}],"drink" : [{"drinkItem" : "'+drinks[0]+'"},{"drinkItem" : "'+drinks[1]+'"}]}';

	var reqaddrest = '{"img":"C:/Users/Ammar/tableeat-app/icon.png","name" : "'+resname+'","type" : "'+typeoffood+'","description" : "'+description+'","priceRange" : "'+price_range+'","owner" : {"ownername" : "'+ownerName+'", "owneremail" : "'+ownerEmail+'"},'+reqmenu+',"address" : {"street" : "'+res[0]+'", "city" : "'+res[1]+'", "zipode" : "'+res[2]+'"}}';
	console.log(reqaddrest);
	
//remove non-printable and other non-valid JSON chars
	var obj = JSON.parse(reqaddrest);
	
	if (ownerEmail === '' || typeoffood === '' || resname === '') {
		alert('Fields must be completed');
	} else {
		// Sending the HTTP request in asynchronous mode
		$.ajax({
			url : "http://localhost:3000/api/restaurants", // The name of the file indicated in the form
			type : 'POST', // The method specified in the form (get or post)
			dataType : 'json', // JSON// I serialize the data (I send all the values ​​present in the form)
			data : obj,
			success : function(data) {
				alert("Thank you for adding restaurant.");
				window.location.href = "ownerpage.html";
				localStorage.setItem("userExist", "oldUser");
				localStorage.setItem("restname", resname);
				getBookings();
				
			},
			error: function(){
				alert('error');
			}
		});
	}
}

function getBookings(){
	var bookingtime = [];
	var starteritem = [];
	var mainitem = [];
	var dessertitem = [];
	var drinkitem = [];
	var numberOfpeople = [];
	var name = [];
	var email = [];
	var urll = 'http://localhost:3000/api/restaurants/' + localStorage.getItem("restname")+'/bookings';
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
				recursiveGetProperty(data, "bookingtime", function(obj) {
					bookingtime[bookingtime.length] = obj;

				});
				recursiveGetProperty(data, "numberOfpeople", function(obj) {
					numberOfpeople[numberOfpeople.length] = obj;

				});
				recursiveGetProperty(data, "starteritem", function(obj) {
					starteritem[starteritem.length] = obj;

				});
				recursiveGetProperty(data, "mainitem", function(obj) {
					mainitem[mainitem.length] = obj;

				});
				recursiveGetProperty(data, "dessertitem", function(obj) {
					dessertitem[dessertitem.length] = obj;

				});
				recursiveGetProperty(data, "drinkitem", function(obj) {
					drinkitem[drinkitem.length] = obj;

				});
				recursiveGetProperty(data, "name", function(obj) {
					name[name.length] = obj;

				});
				recursiveGetProperty(data, "email", function(obj) {
					email[email.length] = obj;

				});
				
				if(bookingtime == "" || bookingtime == null)
					$('#Paris').append('<div id="create-restaurant"><h1 id="register-restaurant">You dont have any order</h1></div>');
				else{
					$('#create-restaurant').remove();
					updateBooking();
				}
					
			
			}
		});
		function updateBooking(){
			for (i = 0; i < bookingtime.length; i++){
					$('#results').append('<div id="result1"><div class="order-item-line"><div class="customer-information"><img src="images/profile.png" ><p id="first-name">'+ name[i]+'</p><p>Rating : </p></div><div class="order-information"><h3 class="name" id ="order'+i+'">'+ bookingtime[i]+'</h3><p>Number of people : '+ numberOfpeople[i]+'</p><dl><dt>Starter :'+ starteritem[i]+'</dt><dt>Main : '+ mainitem[i]+'</dt><dt>Dessert : '+ dessertitem[i]+'</dt><dt>Drink : '+ drinkitem[i]+'</dt></dl></div></div><hr></div>');
				
				/*			    			<div class="order-item-line">
			    				<div class="customer-information">
			      					<img src="images/profile.png" >
			      					<p id="first-name">First Last</p>
			      					<p>Rating : </p>
			      				</div>
			      				<div class="order-information">
			      					<h3 class="name" id ="order0">Today 9 PM</h3>
			    					<p>Number of people : </p>
			    					<dl>
  										<dt>Starter : </dt>
  										<dt>Main : </dt>
  										<dt>Dessert : </dt>
  										<dt>Drink : </dt>
									</dl>
			    				</div>
			      			</div>*/
			}
			
		}
}

function getOwnerRestaurants(){
	var name = [];
	var type = [];
	var description = [];
	var priceRange = [];
	var urll = 'http://localhost:3000/api/restaurants/owner/' + localStorage.getItem("username");
	
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
					name[name.length] = obj;

				});
				recursiveGetProperty(data, "type", function(obj) {
					type[type.length] = obj;

				});
				recursiveGetProperty(data, "description", function(obj) {
					description[description.length] = obj;

				});
				recursiveGetProperty(data, "priceRange", function(obj) {
					priceRange[priceRange.length] = obj;

				});
				
				if(name == "" || name == null)
					$('#Tokyo').append('<div id="create-restaurant"><h1 id="register-restaurant">You dont have any registered restaurant</h1></div>');
				else{
					$('#create-restaurant').remove();
				}
				console.log('name.length : ' + name.length);
				if(name.length > 0){
					$('#create-restaurant').remove();
					updateRestaurantsList();
				}

			}
		});
		function updateRestaurantsList(){
			for (i = 0; i < name.length; i++){
				$('#Tokyo').append('<div id="append-restaurant"><li class="restaurant"><img src="images/logo.png"><h3 class="name" id="rest'+i+'">' + name[i] + '</h3><p>' + type[i] + '</p><p>' + description[i] + '</p><p>' + priceRange[i] + '</p></li><hr></div>');
			}
			
		}
}