$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
  
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });
})

function compress(){
  if ($("#shannon-form")[0].checkValidity()){
    var text = $( "#msg" ).val();
    var request = $.ajax({
                  method: "POST",
                  url: "controller.php",
                  data: { "msg": text }
                });
    request.done(function( msg ) {
      var code = msg['code'];
      // alert (JSON.stringify(msg));
      $( "#result" ).text(code);
      var book = msg['codebook'];
      var head = '<thead><tr>';
      var body ='    <tbody><tr>';
      $.each(book, function (key, data) {
        head+=' <th>'+key+'</th>';
        body+= ' <td>'+data+'</td>';
      })
      body+= '</tr></tbody>';
      head+= '</tr></thead>';
      var html = head + " " + body;
      $('#book').html(html);
      $('#shannon-result').show();
    });
  }
  else
    $("#shannon-form")[0].reportValidity();
}