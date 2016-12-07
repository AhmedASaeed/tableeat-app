$('.nav-pills a').on('click', function (e) {
    e.preventDefault();

    /*if($(this).attr('href')=='#three'){
        $('#lorem-text').hide();
        $('#hidden-text div').removeClass('hidden')
    }
    else{
        $('#lorem-text').show();
        $('#hidden-text div').addClass('hidden')
    }
    $(this).tab('show');*/
    
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
});

$(document).ready(function(){
	var username = localStorage.getItem("username");
	var name = localStorage.getItem("name");
	var email = document.getElementById('email');
	var email_account = document.getElementById('email_header');
	var name_user = document.getElementById('name_header');
	email.innerHTML = username;
	email_account.innerHTML = username;
	name_user.innerHTML = name;
});

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});