( function () {
    window.addEventListener( 'tizenhwkey', function( ev ) {
        if( ev.keyName === "back" ) {
            var activePopup = document.querySelector( '.ui-popup-active' ),
                page = document.getElementsByClassName( 'ui-page-active' )[0],
                pageid = page ? page.id : "";

            if( pageid === "main" && !activePopup ) {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (ignore) {
                }
            } else {
                window.history.back();
            }
        }
    } );
} () );
function checkPass()
{
    //Store the password field objects into variables ...
    var pass1 = document.getElementById('pass1');
    var pass2 = document.getElementById('pass2');
    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessage');
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field 
    //and the confirmation field
    if(pass1.value === pass2.value){
        //The passwords match. 
        //Set the color to the good color and inform
        //the user that they have entered the correct password 
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Passwords Match!";
    }else{
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Passwords Do Not Match!";
    }
} 
