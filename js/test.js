/*$(document).ready(function(){
	$('#login').on('submit',function(e){
		var email =$('#email').val();
		var password =$('#pass').val();
		var data;
		alert(email);
<<<<<<< HEAD
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
=======
		var posts =$.getJSON("http://52.79.42.151:3000/api/login", function(result){
	        $.each(result, function(i, field){
	            data.append(i._id + " ");
	        });alret(data)
	    });
>>>>>>> e6352704344c7f9d236b74fabf4ee574e9a48f92
		
	});
});
*/
/*
var email = $('#email').val();
var password = $('#pass').val();
var params = { "username": email, "password": password };

$.ajax({
    type: "POST",
    url: "http://52.79.42.151:3000/api/login",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify(params),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){alert(data);},
    failure: function(errMsg) {
        alert(errMsg);
    }
});
*/
$(document).ready(function() {
    // Lorsque je soumets le formulaire
    $('#signup-form').on('submit', function(e) {
        e.preventDefault(); // J'empêche le comportement par défaut du navigateur, c-à-d de soumettre le formulaire
 
        var $this = $(this); // L'objet jQuery du formulaire
 
        // Je récupère les valeurs
        var firstname = $('#firstname').val();
        var lastname = $('#lastname').val();
        var username = $('#username').val();
        var password = $('#password').val();
 
        // Je vérifie une première fois pour ne pas lancer la requête HTTP
        // si je sais que mon PHP renverra une erreur
        if(username === '' || password === '') {
            alert('Fields must be completed');
        } else {
            // Envoi de la requête HTTP en mode asynchrone
            $.ajax({
                url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
                type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
                data: $this.serialize(),
                dataType: 'json', // JSON// Je sérialise les données (j'envoie toutes les valeurs présentes dans le formulaire)
                success: function(json) {
                    if(json.reponse === 'ok') {
                        alert('Tout est bon');
                    } else {
                        alert('Erreur : '+ json.reponse);
                    }
            });
        }
    });
});
