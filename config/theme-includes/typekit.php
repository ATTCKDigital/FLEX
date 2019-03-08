<?php //TypeKit 

	$typekitURL = get_field('typekit_url', 'options');

	if($typekitURL) {
		echo '<link rel="stylesheet" href="'.$typekitURL.'">';
	}