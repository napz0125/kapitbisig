
$(function () { 
  $('#datetimepickerfrom,#datetimepickerfromto').datetimepicker(); 
});

$(document).ready(function() {
    var userType = $('#usertype').attr("value");
    if(userType !=1 )
    {
      $('#usertype').hide(); 
    }
    else
    {
      $('#usertype').show(); 
    }
});

$(function () { 
    let dropdown = $('#txtCountry');
    dropdown.empty();
    dropdown.append('<option selected="true" disabled>Choose Country</option>');
    dropdown.prop('selectedIndex', 0);

    const countries = 'http://localhost:4000/api/getcountry';

    // Populate dropdown with list of provinces
    $.getJSON(countries, function (data) {
      $.each(data, function (key, entry) {
        dropdown.append($('<option></option>').attr('value', entry.name).text(entry.name));
      })
    });
});
