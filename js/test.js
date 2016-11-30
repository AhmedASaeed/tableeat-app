$(document).ready(function(){
	$('#login').on('submit',function(e){
		var email =$('#email').val();
		var password =$('#pass').val();
		var data;
		alert(email);
		$.ajax({
		    type: "POST",
		    url: "http://52.79.42.151:3000/api/login",
		    // The key needs to match your method's input parameter (case-sensitive).
		    data: JSON.stringify({ "username": email,"password":password}),
		    contentType: "application/json; charset=utf-8",
		    dataType: "text",
		    success: function(data){alert(data);},
		    failure: function(errMsg) {
		        alert(errMsg);
		    }
		});
		
	});
});







