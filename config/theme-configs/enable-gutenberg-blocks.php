<?php

/**** Enable Blocks ****/
// Set blocks that should be available for the project in child theme config/global-variables/blocks.php
// Available Blocks

add_filter( 'allowed_block_types', 'attck_allowed_block_types' );
 
function attck_allowed_block_types( $allowed_blocks ) {
 	
	$blocks = ATTCK_BLOCKS;
	
	return $blocks;
 
}