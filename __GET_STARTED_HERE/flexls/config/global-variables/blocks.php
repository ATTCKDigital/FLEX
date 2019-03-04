<?php
/**** Enable Blocks ****/
// Select blocks that should be available for the project.
// Available Blocks
// Enable your acf created blocks by using acf/block_name
// Enable core acf created blocks by using core/block_name

$blocks = array(
	'flexls/row', //REQUIRED
	'flexls/column', //REQUIRED
	'flexls/button',
	'flexls/heading',
	'flexls/image',
	'flexls/quote',
	'flexls/shortcode',
	'flexls/source',
	'flexls/text',
);



define('FLEXLS_BLOCKS', $blocks);

//Add all of the acf blocks that should be registered.
$registerBlocks = array(
	'testimonial'
);


define('FLEXLS_REGISTER_BLOCKS', $registerBlocks);
