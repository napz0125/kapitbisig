$(document).ready(function() {     
   
    $('#btnUpdate').hide(); 
    $('#btnDelete').hide(); 
    $('#btnIWilHelp').hide(); 
    $('#btnApprove').hide(); 

    var uType = $('#userType').val();   
    if(uType ==1)
    {
        $('#btnUpdate').show();  
        $('#btnDelete').show();  
    }
    else if(uType==2)
    {
        $('#btnIWilHelp').show();  
    }
    else if(uType==3)
    {
        $('#btnApprove').show();  
    }          

  
});

$(function () { 
    $('#btnSave').on('click', function (event) { 
        console.log(this.formAction);
        var urlSaveListingToDonor = 'http://localhost:4000/savelistingtodonor/'
        var listingid=$('#listingid').val();
        var userid = $('#usrid').val();
        var posting = $.post( urlSaveListingToDonor, { listing_id: listingid,donor_id : userid } );    
        posting.done(function( data ) {           
            var content = data.result;
            $('#result').empty().append( content + '. This listing is matched to you. We thank you for your generousity.' );     
            $('#modalWillHelp').modal('hide');  
            console.log($('#result'));      
            $('#btnIWilHelp').hide(); 
            $('#btnCancel').hide();      
            $('.alert').toggle()
        });  
        event.preventDefault();
        return;
     })
});