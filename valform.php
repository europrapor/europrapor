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

//$line= json_encode(array('ip' => $ip)) . ' '. date('Y-m-d h:i:s') . ' ' . $datetime->format('U') . ' ' . $_POST['resolution']  . ' ' .$_POST['slider'] . ' ' .$_POST['slider1'] . ' ' .$_POST['slider2'] . ' ' .$_POST['slider3'] . ' ' .$_POST['slider4'];
//echo $line; //
include ("bdconn.php");

header('Location:mapl1.php');
//exit();
?>