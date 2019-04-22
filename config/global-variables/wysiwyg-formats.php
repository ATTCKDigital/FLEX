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
			'classes' => 'cta',
			'wrapper' => false,
		),  

		array(  
			'title' => 'Button Secondary',  
			'inline' => 'span',  
			'classes' => 'cta cta-secondary',
			'wrapper' => false,
		),  

		array(  
			'title' => 'Button Tertiary',  
			'inline' => 'span',  
			'classes' => 'cta cta-tertiary',
			'wrapper' => false,
		),
);

if(!defined('FLEXLAYOUT_WYSIWYG')) {
	define('FLEXLAYOUT_WYSIWYG', $style_formats);
}
