<?php 
/**** Enable Blocks ****/
// Select blocks that should be available for the project.
// Available Blocks
// Enable your acf created blocks by using acf/block_name
// Enable flexls created blocks by using flexls/block_name

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


if(!defined('FLEXLS_BLOCKS')) {
	define('FLEXLS_BLOCKS', $blocks);
}

//Add all of the acf blocks that should be registered. Only put the block name. The components must be named as described in the read me.
$registerBlocks = array(
	'template',
);


if(!defined('FLEXLS_REGISTER_BLOCKS')) {
	define('FLEXLS_REGISTER_BLOCKS', $registerBlocks);
}