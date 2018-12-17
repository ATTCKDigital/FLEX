<?php
/*** ACF Local JSON and Sync ***/
add_filter('acf/settings/save_json', 'attck_acf_json_save_point');

function attck_acf_json_save_point( $path ) {
	// update path
	$path = get_stylesheet_directory().'/config/acf-configs/acf-json';
	
	// return
	return $path;
}

add_filter('acf/settings/load_json', 'attck_acf_json_load_point');

function attck_acf_json_load_point( $paths ) {

	// remove original path (optional)
	unset($paths[0]);

	// append path
	$path = get_stylesheet_directory().'/config/acf-configs/acf-json';

	// return
	return $paths;

}

/**
 * Update ACF settings.
 */
function attck_acf_init() {
	// Save field changes to database (set to to 'false'). Only for Dev environment
	acf_update_setting('json', true);
}

add_action('acf/init', 'attck_acf_init');


/*** Sync Registered Blocks ***/

add_filter('aljm_save_json', function($folders) {
	//get the list of registered blocks and sync the json for each one into it's component folder
	$registerBlocks = ATTCK_REGISTER_BLOCKS;

	foreach ($registerBlocks as $registerBlock) {
		//find the block template file in the correct theme directory
		//locate_template only works with files, not folders, so to ensure we get the folder from correct location we are filtering the path.
		$path = locate_template('components/component_' .$registerBlock.'/'.$registerBlock.'.php');
		$path = str_replace('/'.$registerBlock.'.php', '', $path);
		
		$folders[$registerBlock] =  $path;
	}

	return $folders;
});