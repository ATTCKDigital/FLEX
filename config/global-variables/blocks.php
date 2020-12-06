<?php 
/**** Enable Blocks ****/
// Select blocks that should be available for the project.
// Available Blocks
// Enable your acf created blocks by using acf/block_name
// Enable FLEX created blocks by using FLEX/block_name

$blocks = array(
	'FLEX/row', //REQUIRED
	'FLEX/column', //REQUIRED
	'FLEX/animated-gif',
	'FLEX/button',
	'FLEX/heading',
	'FLEX/image',
	'FLEX/list',
	'FLEX/paragraph',
	'FLEX/quote',
	'FLEX/shortcode',
	'FLEX/source',
	'FLEX/socialmedia',
	// 'FLEX/text', DEPRECATED, replaced by List and Paragraph. If your project is already using this, leave it in the child theme.
	'FLEX/users',
	'FLEX/video',
	'FLEX/share'
);


if(!defined('FLEXLAYOUT_BLOCKS')) {
	define('FLEXLAYOUT_BLOCKS', $blocks);
}

//Add all of the acf blocks that should be registered. Only put the block name. The components must be named as described in the read me.
$registerBlocks = array(
);


if(!defined('FLEXLAYOUT_REGISTER_BLOCKS')) {
	define('FLEXLAYOUT_REGISTER_BLOCKS', $registerBlocks);
}