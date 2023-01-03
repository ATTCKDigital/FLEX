<?php
/** 
 * Registers ACF Blocks.
 */
// echo "<!-- FLEX/config/acf-configs/register-acf-blocks.php -->\n";

$registerBlocks = FLEXLAYOUT_REGISTER_BLOCKS;

// echo "<!-- registerBlocks: " . count($registerBlocks) . " -->\n";

foreach ($registerBlocks as $registerBlock) {
	$blockPath = 'gutenberg/blocks/block_' . $registerBlock . '/register_' . $registerBlock . '.php';
	// echo "<!-- blockPath: $blockPath -->";
	
	include_once(locate_template($blockPath));
}
