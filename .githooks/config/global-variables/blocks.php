<?php 
/**
 * Enable Blocks
 * Select blocks that should be available for the project.
 * Available Blocks
 * Enable your acf created blocks by using acf/block_name
 * Enable FLEX created blocks by using flexlayout/block_name
 */

$blocks = array(
	'flexlayout/row', //REQUIRED
	'flexlayout/column', //REQUIRED
	'flexlayout/animated-gif',
	'flexlayout/button',
	'flexlayout/heading',
	'flexlayout/image',
	'flexlayout/list',
	'flexlayout/paragraph',
	'flexlayout/quote',
	'flexlayout/shortcode',
	'flexlayout/source',
	'flexlayout/socialmedia',
	// 'flexlayout/text', DEPRECATED, replaced by List and Paragraph. If your project is already using this, leave it in the child theme.
	'flexlayout/users',
	'flexlayout/video',
	'flexlayout/share'
);

if ( !defined('FLEXLAYOUT_BLOCKS') ) {
	define('FLEXLAYOUT_BLOCKS', $blocks);
}

// Add all of the acf blocks that should be registered. Only put the block name. 
// The components must be named as described in the read me.
$registerBlocks = array(
);

if ( !defined('FLEXLAYOUT_REGISTER_BLOCKS') ) {
	define('FLEXLAYOUT_REGISTER_BLOCKS', $registerBlocks);
}
