<?php
/*** Admin Robots Checkbox ***/
//Automatically unchecks the "hide from robots" box in production
function admin_robots() {
	$env = isset($_SERVER['WPENGINE_ACCOUNT']) ? $_SERVER['WPENGINE_ACCOUNT'] : null;

	if ($env == WPE_PROD) {
		update_option( 'blog_public', '1' );
	} else if($env == WPE_STAGE) {
		update_option( 'blog_public', '0' );
	} else {
		update_option( 'blog_public', '0' );
	}
}

add_action('after_setup_theme', 'admin_robots');