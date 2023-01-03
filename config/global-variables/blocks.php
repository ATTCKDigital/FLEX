<?php
echo "\n<!-- FLEX/config/global-variables/blocks.php -->\n"; 

/** Enable Blocks
 * Select blocks that should be available for the project.
 * Available Blocks
 * Enable your ACF created blocks by using acf/block_name
 * Enable FLEX created blocks by using flexlayout/block_name
 */
$blocks = array(
	'flexlayout/column', // REQUIRED
	'flexlayout/row', // REQUIRED
	'flexlayout/animated-gif',
	'flexlayout/button',
	// 'flexlayout/carousel',
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
	// 'flexlayout/slides',
	'flexlayout/source',
	'flexlayout/socialmedia',
	'flexlayout/text',
	'flexlayout/users',
	'flexlayout/video',
	
	'core/buttons',
	'core/classic',
	'core/embed',
	// 'core/gallery',
	'core/list',
	'core/more',
	'core/separator',
	'core/table'
);

if ( !defined('FLEXLAYOUT_BLOCKS') ) {
	define('FLEXLAYOUT_BLOCKS', $blocks);
}

// Add all of the acf blocks that should be registered. 
// Only put the block name (i.e., carousel, not acf/carousel)
// The components must be named as described in the read me.
$registerBlocks = array(
	// 'carousel'
	// 'acf/blockname'
);

if ( !defined('FLEXLAYOUT_REGISTER_BLOCKS') ) {
	define('FLEXLAYOUT_REGISTER_BLOCKS', $registerBlocks);
}
