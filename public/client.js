// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
  
  $('#form').submit(function(event) {
    event.preventDefault();
    var input = $('#file-input')[0];
    
    if ( input.files && input.files[0] || true) {
      let file = input.files[0];

      var fd = new FormData();    
      fd.append( 'data', input.files[0] );

      $.ajax({
        url: '/upload',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data) {
          console.log(data);
          $('div').html("<p><b>File Name: </b>"+data.filename+ "   <b>File Size: </b>"+data.size+"</p>");
        }
      });
		} else {
			// Handle errors here
			alert( "File not selected or browser incompatible." )
		}
    
  });

});
