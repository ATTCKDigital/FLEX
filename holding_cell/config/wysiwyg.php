<?php
// Creating the style selector stayed the same
function my_mce_buttons($buttons) {
	array_unshift($buttons, 'styleselect');
	array_push($buttons, 'hr');
	return $buttons;
}
add_filter('mce_buttons', 'my_mce_buttons');

function mce_mod($init) {
	// $init['style_formats']	doesn't work - instead you have to use tinymce style selectors
	$style_formats = array(

		array(
			'title' => 'Big Paragraph',
			'block' => 'p',
			'classes' => 'large-body',
			'wrapper' => false,
		),

		array(
			'title' => 'Large Extended Bold',
			'block' => 'p',
			'classes' => 'large-body extended-bold',
			'wrapper' => false,
		),

		array(
			'title' => 'button-black',
			'block' => 'button',
			'classes' => 'button',
			'wrapper' => false,
		),



		/*
		array(
			'title' => 'Underline',
			'block' => 'span',
			'classes' => 'underline',
			'wrapper' => false,
		),

		array(
			'title' => 'Eyebrow',
			'block' => 'span',
			'classes' => 'eyebrow',
			'wrapper' => false,
		),

		array(
			'title' => 'Paragraph Small Text',
			'block' => 'p',
			'classes' => 'small-text',
			'wrapper' => false,
		),	

		array(
			'title' => 'Paragraph Medium Text',
			'block' => 'p',
			'classes' => 'regular-text',
			'wrapper' => false,
		),	

		array(
			'title' => 'Button',
			'block' => 'span',
			'classes' => 'button',
			'wrapper' => false,
		), 

		array(
			'title' => 'Button White',
			'block' => 'span',
			'classes' => 'button button-secondary',
			'wrapper' => false,
		), 

		array(
			'title' => 'Button White Outline',
			'block' => 'span',
			'classes' => 'button button-tertiary',
			'wrapper' => false,
		), 

		array(
			'title' => 'Green Highlight Box',
			'block' => 'div',
			'classes' => 'green-highlight',
			'wrapper' => true,
		),
		*/
	);

	$init['style_formats_merge'] = true;
	$init['style_formats'] = json_encode($style_formats);

	return $init;
}
add_filter('tiny_mce_before_init', 'mce_mod');

function my_mce4_options($init) {
	$custom_colours =	'"231f20", "Black",
						"ac574d", "Brick Red",
						"777777", "Dark Gray",
						"e5e5e5", "Gray",
						"ededed", "Light Gray",
						"616161", "Medium Gray",';

	// build colour grid default+custom colors
	$init['textcolor_map'] = '[' . $custom_colours . ']';

	// enable 6th row for custom colours in grid
	$init['textcolor_rows'] = 3;

	return $init;
}
add_filter('tiny_mce_before_init', 'my_mce4_options');
