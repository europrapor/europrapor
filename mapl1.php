<!doctype html>
<html>
  <head>
    <title>OpenLayers Demo</title>
    <style type="text/css">
      html, body, #basicMapt {
          width: 100%;
          height: 100%;
          margin: 0;
      }
    </style>
	    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes">
	
       <script type="text/javascript" src="http://www.openlayers.org/api/OpenLayers.js"></script>
	<script type="text/javascript" src="http://maps.stamen.com/js/tile.stamen.js?v1.2.4"></script>
    <script type="text/javascript">
	type="text/javascript"
      function init() {
        map = new OpenLayers.Map("basicMapt");
		
		map.addLayer(layer = new OpenLayers.Layer.Stamen("toner"));
		//map.addLayer(new OpenLayers.Layer.OSM());

		var zoom = 4;
		   
		var defStyle = { pointRadius: "22",fillColor: "#fff000", strokeOpacity: "0.7", strokeWidth: 0, fillOpacity: 0.7};
        var sty = OpenLayers.Util.applyDefaults(defStyle, OpenLayers.Feature.Vector.style["default"]);
        var sm = new OpenLayers.StyleMap({ 'default': sty});


		var newLayer = new OpenLayers.Layer.Vector("Filtered by Zoom Level", {
				strategies: [new OpenLayers.Strategy.Fixed()],

				protocol: new OpenLayers.Protocol.HTTP({
						url: "./map1.php",
						format: new OpenLayers.Format.GeoJSON({
							externalProjection: new OpenLayers.Projection("EPSG:4326"),
							internalProject: new OpenLayers.Projection("EPSG:900913")
						})
					}),


				styleMap: sm,
				format: new OpenLayers.Format.GeoJSON({
						externalProjection: new OpenLayers.Projection("EPSG:4326"),
						internalProject: new OpenLayers.Projection("EPSG:900913")
					})

			});
			
		map.addLayer(newLayer);

	  epsg4326 = new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection
	 projectTo = map.getProjectionObject(); //The map projection (Spherical Mercator)

	 var lonLat = new OpenLayers.LonLat(30.55,50.47).transform(epsg4326, projectTo);
	 map.setCenter(lonLat, zoom);
	
	//	map.zoomToExtent(newLayer.getDataExtent());

	 } 
    </script>
  </head>
  <body onload="init();">
    <div id="basicMapt"></div>
  </body>
</html>