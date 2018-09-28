<?php
	session_start();

	//$currDate = date("Y-m-d"); #initializes with today's day
	$slctdMonth = "1";
    if (isset($_GET['slctd_month'])) {$slctdMonth = $_GET['slctd_month'];}
    $slctdHeight = "1";
    if (isset($_GET['slctd_height'])) {$slctdHeight = $_GET['slctd_height'];}
    $slctdLocation = "lat_lon";
    if (isset($_GET['slctd_location'])) {$slctdLocation = $_GET['slctd_location'];}

	$currFolder = "images/" . $slctdLocation . "/". $slctdHeight . "/". $slctdMonth . "/";

	//echo $currFolder;

	$img_names = glob($currFolder. "*.png");
?>
