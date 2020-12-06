<?php 
/**** Enable Blocks ****/
// Select blocks that should be available for the project.
// Available Blocks
// Enable your acf created blocks by using acf/block_name
// Enable FLEX created blocks by using FLEX/block_name

$blocks = array(
	'FLEX/row', //REQUIRED
	'FLEX/column', //REQUIRED
	'FLEX/button',
	'FLEX/feed',
	'FLEX/heading',
	'FLEX/image',
	'FLEX/quote',
	'FLEX/shortcode',
	'FLEX/source',
	'FLEX/socialmedia',
	'FLEX/text',
	// 'FLEX/users',
	'FLEX/video',
);


define('FLEXLAYOUT_BLOCKS', $blocks);

//Add all of the acf blocks that should be registered. Only put the block name. The components must be named as described in the read me.
$registerBlocks = array(
);


define('FLEXLAYOUT_REGISTER_BLOCKS', $registerBlocks);
