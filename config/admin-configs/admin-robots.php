<?php
/*** Admin Robots Checkbox ***/
//Automatically unchecks the "hide from robots" box in production
function admin_robots() {
	$env = $_SERVER['env'];

	if($env == 'prod') {
		update_option( 'blog_public', '1' );
	} else if($env == 'staging') {
		update_option( 'blog_public', '0' );
	} else {
		update_option( 'blog_public', '0' );
	}

	echo $env;

}
add_action('after_setup_theme', 'admin_robots');