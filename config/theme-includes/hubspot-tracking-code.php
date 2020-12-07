<?php // Hubspot tracking code 

	$hubspot_tracking_code = get_field('hubspot_tracking_code', 'options');
	if($hubspot_tracking_code) {
		echo $hubspot_tracking_code;
	}
?>
