$(document).ready(function() {   

    var userType = $('#userType').val();
    

    if(userType == undefined)
    {
        $('#navLogin').html("Login");
        $('#navLogin').attr("onclick","location.href='/login'");
        console.log('in');
    }
    else
    {
        console.log('out');
        $('#navLogin').html("Logout");
        $('#navLogin').attr("onclick","location.href='/logout'");
        
    }

})