<?php
/*** Admin Environment Notice ***/

function admin_environment($wp_admin_bar) {
	$env = $_SERVER['env'];

	if($env == 'prod') {
		$noticeMessage = 'PRODUCTION';
	} else if($env == 'staging') {
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
