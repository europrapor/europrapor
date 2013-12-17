<?
include("mysql_connect_conf.php");
if (!$link) {
    die('Could not connect: ' . mysql_error());
}

$ip = substr(json_encode(array('ip' => $ip)), 7, -2);

$sql = 'INSERT INTO alpha_rows '.
       'VALUES ( "Null", "'.$ip.'","'. date('Y-m-d h:i:s').'",'. $datetime->format('U').',"'.
	   $_POST['resolution'].'",'. $_POST['slider'].','. $_POST['slider1'].','.$_POST['slider2'].','.$_POST['slider3'].','.$_POST['slider4'].')';

mysql_select_db('europrapor');
$retval = mysql_query( $sql, $link );
if(! $retval )
{
  die('Could not enter data: ' . mysql_error());
}

mysql_close($link);
?>

