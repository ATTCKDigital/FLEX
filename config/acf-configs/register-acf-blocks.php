<?php

/**** Register ACF Blocks ****/
//Registers ACF Blocks.


$registerBlocks = ATTCK_REGISTER_BLOCKS;

foreach ($registerBlocks as $registerBlock) {
	include_once(locate_template('components/component_'.$registerBlock.'/register_'.$registerBlock.'.php'));
}