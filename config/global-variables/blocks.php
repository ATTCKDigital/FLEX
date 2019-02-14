<?php 
/**** Enable Blocks ****/
// Select blocks that should be available for the project.
// Available Blocks
// Enable your acf created blocks by using acf/block_name
// Enable core acf created blocks by using core/block_name
// Paragraph and heading have been removed because they do not have wrapper divs.


$blocks = array(

	'flexls/row',
	'flexls/column',
	'flexls/heading',

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