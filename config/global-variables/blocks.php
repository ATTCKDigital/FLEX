<?php 
/**
 * Select blocks that should be available for the project.
 * — Enable your ACF created blocks by using acf/block_name
 * — Enable FLEX created blocks by using flexlayout/block_name
 */
$blocks = array(
	'flexlayout/column', // REQUIRED
	'flexlayout/row', // REQUIRED
	'flexlayout/animated-gif',
	'flexlayout/button',
	'flexlayout/feed',
	'flexlayout/heading',
	'flexlayout/hr',
	'flexlayout/image',
	'flexlayout/list',
	'flexlayout/paragraph',
	'flexlayout/popup',
	'flexlayout/posts',
	'flexlayout/quote',
	'flexlayout/share',
	'flexlayout/shortcode',
	'flexlayout/source',
	'flexlayout/socialmedia',
	'flexlayout/users',
	'flexlayout/video',
	'core/buttons',
	'core/classic',
	'core/embed',
	'core/list',
	'core/more',
	'core/separator',
	'core/table'
);

if ( !defined('FLEXLAYOUT_BLOCKS') ) {
	define('FLEXLAYOUT_BLOCKS', $blocks);
}

// Add all of the ACF blocks that should be registered. Only put the block name. 
// The components must be named as described in the read me.
$registerBlocks = array(
	// 'acf/blockname'
);

if ( !defined('FLEXLAYOUT_REGISTER_BLOCKS') ) {
	define('FLEXLAYOUT_REGISTER_BLOCKS', $registerBlocks);
}
