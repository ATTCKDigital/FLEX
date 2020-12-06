<?php
/*** Admin Environment Notice ***/

function admin_environment($wp_admin_bar) {
	// The 'WPENGINE_ACCOUNT' variable is provided by WPEngine and not something 
	// set by our app (i.e., via .env file).
	// WPE_PROD & WPE_STAGE are set in the child theme's functions.php file.
	$env = $_SERVER['WPENGINE_ACCOUNT'];

	if($env == WPE_PROD) {
		$noticeMessage = 'PRODUCTION';
	} else if($env == WPE_STAGE) {
		$noticeMessage = 'STAGING';
	} else {
		$noticeMessage = 'DEVELOPMENT';
	}

	$wp_admin_bar->add_node( array(
		'id'		=> 'environment',
		'title' 	=> $noticeMessage,
	) );
}
add_action('admin_bar_menu', 'admin_environment', 1);
