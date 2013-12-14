<script>
$(document).bind("mobileinit", function(){
        $.mobile.ajaxenabled = false;
    });
	</script>
	
<?php

if (!empty($_SERVER['HTTP_CLIENT_IP']))
{
  $ip=$_SERVER['HTTP_CLIENT_IP'];
}
elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
{
  $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
}
else
{
  $ip=$_SERVER['REMOTE_ADDR'];
}

$datetime = new DateTime();



$line= json_encode(array('ip' => $ip)) . ' '. date('Y-m-d h:i:s') . ' ' . $datetime->format('U') . ' ' . $_POST['resolution']  . ' ' .$_POST['slider'] . ' ' .$_POST['slider1'] . ' ' .$_POST['slider2'] . ' ' .$_POST['slider3'] . ' ' .$_POST['slider4'];
//echo $line; //
include ("bdconn.php");
//exit();
?>

<!DOCTYPE html>
<html>
  <head>
    <title>Google Maps JavaScript API v3 Fullscreen Background</title>
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta charset="UTF-8">
    <style type="text/css">
 
		iframe { 
			vertical-align: top;
		}
 
		#canvas_holder{
			position: fixed;
			top: 0px;
			left: 0px;
			width:100%; 
			height:100%;
			z-index: 0;
		}
 
		#map_canvas{
			width:100%;
			height:100%; 
			position: "absolute"; 
			top: 0px; 
			left: 0px; 
			overflow: "hidden";
		}
 
		#holder{
			width: 300px;
			background: rgba(0,0,0,0.8);
			z-index: 1000;
			position: absolute;
			color: white;
			padding: 10px;
			border-radius: 10px;
			-moz-border-radius: 10px;
			-o-border-radius: 10px;
			-webkit-border-radius: 10px;
			-ms-border-radius: 10px;
		}
 
		a{
			color: white;
		}
      }
    </style>
 
	<script language="Javascript" type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=true"></script>
 
	<script type="text/javascript">
 
		/*
		Global
		*/
		var map;
 
		function initialize() {
 
			/*
			Basic Setup
			*/
 
			var latLng = new google.maps.LatLng(50.4501, 30.523);
 
	    	var myOptions = {
				panControl: false,
				zoomControl: true,
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false,
				overviewMapControl: false,
				draggable: true,
				disableDoubleClickZoom: true,     //disable zooming
				scrollwheel: false,
	      		zoom: 12,
	      		center: latLng,
	      		mapTypeId: google.maps.MapTypeId.ROADMAP //   ROADMAP; SATELLITE; HYBRID; TERRAIN;
			};
 
			map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
 
			/*
			MARKER
			*/
 
			/*
			//for custom image
			var image = 'yourflag.png';
			icon: image 
 
			//for animation marker drop
			animation: google.maps.Animation.DROP
 
			*/
			var markerlatlng = new google.maps.LatLng(50.4501, 30.523);
 
			var marker = new google.maps.Marker({
			    position: markerlatlng,
			    title:"my dominant emotion is Joy :)"
			});
 
			marker.setMap(map);
 
			/*
			INFO Bubble
			*/
 
			myInfoWindowOptions = {
				content: '<div class="info-window-content"><h4>my dominant emotion is Joy</h4></div>',
				maxWidth: 275
			};
 
			infoWindow = new google.maps.InfoWindow(myInfoWindowOptions);
 
			google.maps.event.addListener(marker, 'click', function() {
				infoWindow.open(map,marker);
			});
 
			google.maps.event.addListener(marker, 'dragstart', function(){
				infoWindow.close();
			});
 
			infoWindow.open(map,marker);
 
 
		}//end initialize
 
 
		/*
		onLoad
		*/
		$(function(){
			initialize();
 
			$("#zo").click(function(event){
				event.preventDefault(); 
				map.setZoom( map.getZoom()-1 );
				//map.setCenter(new google.maps.LatLng(9.825183,15.1975769));
			});
 
			$("#zi").click(function(event){
				event.preventDefault(); 
				map.setZoom( map.getZoom()+1 );
			});
 
			$("#gt").click(function(event){
				event.preventDefault(); 
				var lt1 = new google.maps.LatLng(50.4501, 30.523);
				//map.setZoom( 16 );
				map.panTo(lt1);
			});
 
		});
 
	</script>
 
  </head>
  <body>
 
	<div id="holder">
		<a href="#" id="zi">Zoom In</a>
		<a href="#" id="zo">Zoom Out</a>
		<a href="#" id="gt">GoTo</a>
	</div>	
 
	<!--Google Maps APIv3 Background-->
	<div id="canvas_holder">
		<div id="map_canvas"></div>
	</div><!-- End Google Maps Background -->
 
</body>
</html>