<?php
	$menus = array(
		'primary' => __('Primary Navigation', '_flexlayout'),
		'footer' => __('Footer Navigation', '_flexlayout'),
	);


	if(!defined('FLEXLAYOUT_MENUS')) {
	  define('FLEXLAYOUT_MENUS', $menus);
	}
