$(document).ready(function() {
	// When I submit the form
	$('#signup-form').on('submit', function(e) {
		e.preventDefault(); // I prevent the default behavior of the browser, ie
		// submit the form

		var $this = $(this); // jQuery object of the form

		// Get the values
		var firstname = $('#firstname').val();
		var lastname = $('#lastname').val();
		var username = $('#username').val();
		var password = $('#password').val();

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
					localStorage.setItem("username", data.username);
					localStorage.setItem("name", data.firstname + " " + data.lastname);
					window.location.href = "search.html";
				},
				error: function(){
					alert('error');
				}
			});
		}
	});

	$('#login-form').on('submit', function(e) {
		e.preventDefault(); // I prevent the default behavior of the browser, ie submit the form

		var $this = $(this); // jQuery object of the form

		// Get the values
		var username = $('#usernamel').val();
		var password = $('#passwordl').val();

		// I check the first time to not run the HTTP request
		// if I know my PHP will return an error
		
		if (username === '' || password === '') {
			alert('Fields must be completed');
		} else {
			// Sending the HTTP request in asynchronous mode
			$.ajax({
				url : $this.attr('action'), // The name of the file indicated in the form
				type : $this.attr('method'), // The method specified in the // form (get or post)
				data : $this.serialize(),
				dataType : 'json', // JSON// I serialize the data (I send all
				// the values ​​present in the form)
				success : function(data) {
					localStorage.setItem("username", data.username);
					window.location.href = "search.html";
				},
				error: function(xhr,err){
					if(xhr.status == 404) alert("You didn't register");
				    //alert("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				    //alert("responseText: "+xhr.responseText);
				}
			});
		}
	});
});
