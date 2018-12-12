<?php
	$menus = array(
		'primary' => __('Primary Navigation', '_attck'),
		'footer' => __('Footer Navigation', '_attck'),
	);


	if(!defined('ATTCK_MENUS')) {
	  define('ATTCK_MENUS', $menus);
	}
