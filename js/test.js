/*$(document).ready(function(){
	$('#login').on('submit',function(e){
		var email =$('#email').val();
		var data;
		alert(email);
		var posts =$.getJSON("http://52.79.42.151:3000/api/login", function(result){
	        $.each(result, function(i, field){
	            data.append(i._id + " ");
	        });alret(data)
	    });
		
	});
});
*/
var email = $('#email').val();
var password = $('#pass').val();
var params = { "username": email, "password": password };

$.ajax({
    type: "POST",
    url: "http://52.79.42.151:3000/api/login",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify({ Markers: markers }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){alert(data);},
    failure: function(errMsg) {
        alert(errMsg);
    }
});