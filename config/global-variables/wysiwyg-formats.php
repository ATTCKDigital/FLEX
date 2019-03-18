<?php

/**
 * WYSIWYG Formats dropdown styles 
 *
**/

$style_formats = array(
	array(  
			'title' => 'Body 2',  
			'block' => 'p',  
			'classes' => 'body2',
			'wrapper' => false,
		),  

		array(  
			'title' => 'Body 3',  
			'block' => 'p',  
			'classes' => 'body3',
			'wrapper' => false,
		),  

		array(  
			'title' => 'Button Primary',  
			'inline' => 'span',  
			'classes' => 'button',
			'wrapper' => false,
		),  

		array(  
			'title' => 'Button Secondary',  
			'inline' => 'span',  
			'classes' => 'button button-secondary',
			'wrapper' => false,
		),  

		array(  
			'title' => 'Button Tertiary',  
			'inline' => 'span',  
			'classes' => 'button button-tertiary',
			'wrapper' => false,
		),
);

if(!defined('FLEXLS_WYSIWYG')) {
	define('FLEXLS_WYSIWYG', $style_formats);
}
