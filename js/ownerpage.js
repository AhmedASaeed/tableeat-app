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

/*var registerRestaurant = document.getElementById("register-restaurant");
registerRestaurant.onclick = function() {
	var type = $('#type-food').val();
	var name = $('#rest-name').val();
	var address = $('#rest-address').val();
	var img = $('#rest-image').val();
	var ownerName = localStorage.getItem("name");
	var ownerEmail = localStorage.getItem("username");
	var starters = [$('#Starter1').val(),$('#Starter2').val()];
	var mains = [$('#Maindish1').val(),$('#Maindish2').val()];
	var desserts = [$('#Dessert1').val(),$('#Dessert2').val()];
	var drinks = [$('#Drink1').val(),$('#Drink2').val()];
	var list = document.getElementById('type-food');var INDEX = list.selectedIndex;

	var typeoffood = list[INDEX].value;
	
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

	var reqaddrest = '{"img":"'+ img+',"name" : "'+name+'","type" : "'+typeoffood+'","owner" : {"ownername" : "'+ownerName+'", owneremail : "'+ownerEmail+'"},'+reqmenu+',"address" : {"street" : "'+address+'", "city" : "'+address+'", "zipode" : "+'+Number+'"}}';
	console.log(reqaddrest);
	var obj = JSON.parse(reqaddrest);
	
	if (ownerName === '' || ownerEmail === '' || typeoffood === '' || name === '') {
		alert('Fields must be completed');
	} else {
		// Sending the HTTP request in asynchronous mode
		$.ajax({
			url : 'http://localhost:3000/api/restaurants', // The name of the file indicated in the form
			type : 'POST', // The method specified in the form (get or post)
			dataType : 'json', // JSON// I serialize the data (I send all the values ​​present in the form)
			data : obj,
			success : function(data) {
				alert("Thank you for adding restaurant.");
				window.location.href = "ownerpage.html";
			},
			error: function(){
				alert('error');
			}
		});
	}
}
*/
$(document).ready(function() {
	// When I submit the form
	$('#register-restaurant-form').on('submit', function(e) {
		e.preventDefault(); // I prevent the default behavior of the browser, ie
		// submit the form

		var $this = $(this); // jQuery object of the form

		// Get the values
		var type = $('#type-food').val();
		var name = $('#rest-name').val();
		var address = $('#rest-address').val();
		//var img = $('#rest-image').val().split('\\').pop();
		var img = $('#rest-image').val().replace(/C:\\fakepath\\/i, '');
		var ownerName = localStorage.getItem("name");
		var ownerEmail = localStorage.getItem("username");
		var starters = [$('#Starter1').val(),$('#Starter2').val()];
		var mains = [$('#Maindish1').val(),$('#Maindish2').val()];
		var desserts = [$('#Dessert1').val(),$('#Dessert2').val()];
		var drinks = [$('#Drink1').val(),$('#Drink2').val()];
		var list = document.getElementById('type-food');var INDEX = list.selectedIndex;

		var typeoffood = list[INDEX].value;
		
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
	
		var reqaddrest = '{"img":"C:/Users/Ahmed/Desktop/ping.png","name" : "'+name+'","type" : "'+typeoffood+'","owner" : {"ownername" : "'+ownerName+'", "owneremail" : "'+ownerEmail+'"},'+reqmenu+',"address" : {"street" : "'+address+'", "city" : "'+address+'", "zipode" : "'+address+'"}}';
		console.log(reqaddrest);
		
//remove non-printable and other non-valid JSON chars
		var obj = JSON.parse(reqaddrest);
		
		if (ownerEmail === '' || typeoffood === '' || name === '') {
			alert('Fields must be completed');
		} else {
			// Sending the HTTP request in asynchronous mode
			$.ajax({
				url : $this.attr('action'), // The name of the file indicated in the form
				type : $this.attr('method'), // The method specified in the form (get or post)
				dataType : 'json', // JSON// I serialize the data (I send all the values ​​present in the form)
				data : obj,
				success : function(data) {
					alert("Thank you for adding restaurant.");
					window.location.href = "ownerpage.html";
				},
				error: function(){
					alert('error');
				}
			});
		}
	});
});
