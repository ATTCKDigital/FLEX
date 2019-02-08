<?php
	$menus = array(
		'primary' => __('Primary Navigation', '_flexls'),
		'footer' => __('Footer Navigation', '_flexls'),
	);


	if(!defined('FLEXLS_MENUS')) {
	  define('FLEXLS_MENUS', $menus);
	}
