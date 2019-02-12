<?php

/**** Enable Blocks ****/
// Set blocks that should be available for the project in child theme config/global-variables/blocks.php
// Available Blocks

add_filter( 'allowed_block_types', 'flexls_allowed_block_types' );
 
function flexls_allowed_block_types( $allowed_blocks ) {
 	
	$blocks = FLEXLS_BLOCKS;
	
	return $blocks;
 
}