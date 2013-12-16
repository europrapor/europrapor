<!doctype html>
<html>
<script>
$(document).bind("mobileinit", function(){
        $.mobile.ajaxenabled = false;
    });
	</script>
	
<head>
    <title>Europrapor</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css">
    <script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
    <script src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>
	 <script src="//ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js"></script>
</head>



 
 
<body>
<div data-role="page">
 <div data-role="header">  <h1>Europrapor</h1></div>
 <div data-role="content">

<button onclick="getLocation()">Press to map your flag </button>

<a id='myField'></a>

<script>
var x=document.getElementById("myField");

function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{x.innerHTML="Geolocation is not supported by this browser.";}
  }
function showPosition(position)
  {
var lat = position.coords.latitude;
  var lon = position.coords.longitude;
   
   //document.location = "test1.php?lat=" + lat + "&lon=" +  lon;
    var lats =  lat.toPrecision(5);
	var longs =  lon.toPrecision(5);
	//x.innerHTML= "lat=" + lats + "&lon=" +  longs;
	document.getElementById('resolution').value= "lat=" + lats + "&lon=" +  longs;
}
</script>
 
 
 
 
  <!-- jQuery Form Validation code -->
  <script>
  
  // When the browser is ready...
  $(function() {
  
    // Setup form validation on the #register-form element
    $("#register-form").validate({
    
        // Specify the validation rules
        rules: {
            slider: "required",
            
        },
        
        // Specify the validation error messages
        messages: {
            slider: "Please enter your name",
           
        },
        
        submitHandler: function(form) {
            form.submit();
        }
    });

  });
  
  </script>
  
   <form method="POST" action="./valform.php" id="register-form">
		<input type="text" name="resolution" id="resolution"  value=""  readonly="readonly">
	
		<input  type="hidden" name="slider" id="slider" value="-1" min="0" max="100">
		
	<fieldset data-role="fieldcontain"> 
		<label for="slider1">Joy</label>
		<div data-role="fieldcontain">
		<input type="range" name="slider1" id="slider-1" value="-1" min="0" max="5" />
		</div>
		</fieldset>
	<fieldset data-role="fieldcontain"> 	
		<label for="slider2">Fear</label>
		<div data-role="fieldcontain">
		<input type="range" name="slider2" id="slider-2" value="-1" min="0" max="5" />
		</div>
</fieldset>
	<fieldset data-role="fieldcontain"> 		
		<label for="slider3">Determination</label>
		<div data-role="fieldcontain">
		<input type="range" name="slider3" id="slider-3" value="-1" min="0" max="5" />
		</div>
		</fieldset>
	<fieldset data-role="fieldcontain"> 
		<label for="slider4">Anger</label>
		<div data-role="fieldcontain">
		<input type="range" name="slider4" id="slider-4" value="-1" min="0" max="5" />
		</div>
</fieldset>
		<input type="submit"  value="submit">

	</form>
  </div>
 </div><!-- /content --> 
<div data-role="footer">
	<h4>Euromaidan open services </h4>
</div><!-- /footer -->
 
  

  </div><!-- /page -->
	</body>
</html>
