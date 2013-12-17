<?php
/*
 * Title:   MySQL Points to GeoJSON
 * Notes:   Query a MySQL table or view of points with x and y columns and return the results in GeoJSON format, suitable for use in OpenLayers, Leaflet, etc.
 * Author:  Bryan R. McBride, GISP
 * Contact: bryanmcbride.com
 * GitHub:  https://github.com/bmcbride/PHP-Database-GeoJSON
 */

# Connect to MySQL database
$conn = new PDO('mysql:host=localhost;dbname=369165','369165','thomas79');

# Build SQL SELECT statement including x and y columns
#$sql = 'SELECT *, x AS x, y AS y FROM alpha_rows';
$sql = 'SELECT rep1 AS x,count(*) as eff FROM alpha_rows group by rep1';
/*
* If bbox variable is set, only return records that are within the bounding box
* bbox should be a string in the form of 'southwest_lng,southwest_lat,northeast_lng,northeast_lat'
* Leaflet: map.getBounds().pad(0.05).toBBoxString()
*/
if (isset($_GET['bbox']) || isset($_POST['bbox'])) {
    $bbox = explode(',', $_GET['bbox']);
    $sql = $sql . ' WHERE x <= ' . $bbox[2] . ' AND x >= ' . $bbox[0] . ' AND y <= ' . $bbox[3] . ' AND y >= ' . $bbox[1];
}

# Try query or error
$rs = $conn->query($sql);
if (!$rs) {
    echo 'An SQL error occured.\n';
    exit;
}

# Build GeoJSON feature collection array
$geojson = array(
   max      => 46,
   data  => array()
);

# Loop through rows to build feature arrays
while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
    $properties = $row;
    $iparr = split ("=", $row['x']); 
    $xx= split ("&", $iparr[1]);
    $x=$xx[0];
    $y=  $iparr[2];
    $c=  $row['eff'];

    
    # Remove x and y fields from properties (optional)
    unset($properties['x']);
    unset($properties['eff']);
    $feature = array(

                lat=>$y,
                'lon'=>$x,
				'count'=>$c
            
        
     
    );
    # Add feature arrays to feature collection array
    array_push($geojson['data'], $feature);
}

header('Content-type: application/json');
#echo json_encode($geojson, JSON_NUMERIC_CHECK);
echo $_GET['callback'] . '('.json_encode($geojson).')';exit;
$conn = NULL;
?>
