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
		var list = document.getElementById('type');var INDEX = list.selectedIndex;
		var type = list[INDEX].value;
		
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
					localStorage.setItem("userExist", "newUser");
					if(type == "Customer")
						window.location.href = "search.html";
					else
						window.location.href = "ownerpage.html";
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
					localStorage.setItem("userExist", "oldUser");
					if(data.type == "Customer")
						window.location.href = "search.html";
					else
						window.location.href = "ownerpage.html";
				},
				error: function(xhr,err){
					if(xhr.status == 404) alert("You have to register first");
				}
			});
		}
	});
});
$('.form').find('input, textarea').on('keyup blur focus', function (e) {
	  
	  var $this = $(this),
	      label = $this.prev('label');

		  if (e.type === 'keyup') {
				if ($this.val() === '') {
	          label.removeClass('active highlight');
	        } else {
	          label.addClass('active highlight');
	        }
	    } else if (e.type === 'blur') {
	    	if( $this.val() === '' ) {
	    		label.removeClass('active highlight'); 
				} else {
			    label.removeClass('highlight');   
				}   
	    } else if (e.type === 'focus') {
	      
	      if( $this.val() === '' ) {
	    		label.removeClass('highlight'); 
				} 
	      else if( $this.val() !== '' ) {
			    label.addClass('highlight');
				}
	    }

	});

	$('.tab a').on('click', function (e) {
	  
	  e.preventDefault();
	  
	  $(this).parent().addClass('active');
	  $(this).parent().siblings().removeClass('active');
	  
	  target = $(this).attr('href');

	  $('.tab-content > div').not(target).hide();
	  
	  $(target).fadeIn(600);
	  
	});
