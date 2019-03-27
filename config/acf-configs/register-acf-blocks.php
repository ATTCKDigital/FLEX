<?php

/**** Register ACF Blocks ****/
//Registers ACF Blocks.


$registerBlocks = FLEXLS_REGISTER_BLOCKS;

foreach ($registerBlocks as $registerBlock) {
	include_once(locate_template('gutenberg/blocks/block_'.$registerBlock.'/register_'.$registerBlock.'.php'));
}