$(document).ready(function(){
	$('#login').on('submit',function(e){
		var email =$('#email').val();
		var data;
		alert(email);
		var posts =$.getJSON("http://52.79.42.151:3001/api/users", function(result){
	        $.each(result, function(i, field){
	            data.append(i._id + " ");
	        });alret(data)
	    });
		
	});
});







