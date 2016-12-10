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
		var img = $('#rest-image').val();
		var ownerName = localStorage.getItem("name");
		var ownerEmail = localStorage.getItem("username");
		var starters = [];
		var mains = [];
		var desserts = [];
		var drinks = [];
		
		/*function getAddressElements() {
			var url = document.location.href, params = url.split('?')[1].split('&'), data = {}, tmp;
			for (var i = 0, l = params.length; i < l; i++) {
				tmp = params[i].split('=');
				data[tmp[i]] = tmp[i+1];
				console.log('data[tmp[i]] : ' + data[tmp[i]]);
				console.log('tmp[i+1] : ' + tmp[i+1]);
				document.getElementById('title_header').innerHTML = decodeURI(data[tmp[i]]);
			}
		}
		*/

		// I check the first time to not run the HTTP request
		// if I know my PHP will return an error

		if (username === '' || password === '' || firstname === '' || lastname === '') {
			alert('Fields must be completed');
		} else {
			// Sending the HTTP request in asynchronous mode
			$.ajax({
				url : $this.attr('action'), // The name of the file indicated in the form
				type : $this.attr('method'), // The method specified in the form (get or post)
				data : $this.serialize(),
				dataType : 'json', // JSON// I serialize the data (I send all the values ​​present in the form)
				success : function(data) {
					window.location.href = "ownerpage.html";
				},
				error: function(){
					alert('error');
				}
			});
		}
	});
});
