<?php
/*** ACF Local JSON and Sync ***/
// ACF syncs fields based on field group json files. 
// ACF blocks will save their json to the block folder when using ACF Local JSON Manager Plugin.  Prior to creating new ACF block fields, select the correct block from the "Local JSON" menu in the admin toolbar. This will save the file to the correct location.

// https://www.advancedcustomfields.com/resources/local-json/
// https://www.advancedcustomfields.com/resources/synchronized-json/


/** ACF Save Point **/
add_filter('acf/settings/save_json', 'flexlayout_acf_json_save_point');
function flexlayout_acf_json_save_point( $path = '' ) {
	// Update to custom path - fields will always save to the current active theme.  If a change is made to a parent theme field, it will be saved to the child theme and only be applicable to the child.
	$path = THEME_DIR . '/config/acf-configs/acf-json';

	if ( is_child_theme() ) {
		$path = CHILD_THEME_DIR . '/config/acf-configs/acf-json';
	}

	return $path;
}

/** ACF Load Point **/
// Any changes made to a parent theme json file from the child theme will save to the parent theme save point.
// https://support.advancedcustomfields.com/forums/topic/acf-json-fields-not-loading-from-parent-theme/
add_filter('acf/settings/load_json', 'flexlayout_acf_json_load_point');
function flexlayout_acf_json_load_point( $paths ) {
	// Append custom paths
	$paths = array(THEME_DIR.'/config/acf-configs/acf-json');

	if(is_child_theme()) {
		//If we are in the child theme, check for child theme specific json files
		$paths[] = CHILD_THEME_DIR.'/config/acf-configs/acf-json';
	}

	// return
	return $paths;
}



/** Update ACF settings. **/
function flexlayout_acf_init() {
	// Save field changes to database (set to to 'false'). Only for Dev environment
	acf_update_setting('json', true);
}

add_action('acf/init', 'flexlayout_acf_init');


/** Sync Registered Blocks **/
// Using Local JSON plugin

add_filter('aljm_save_json', function($folders) {
	// Get the list of registered blocks and sync the json for each one into it's component folder
	$registerBlocks = FLEXLAYOUT_REGISTER_BLOCKS;


	foreach ($registerBlocks as $registerBlock) {
		// Find the block template file in the correct theme directory
		// locate_template only works with files, not folders, so to ensure we get the folder from correct location we are filtering the path.
		$path = locate_template('gutenberg/blocks/block_' .$registerBlock.'/'.$registerBlock.'.php');
		$path = str_replace('/'.$registerBlock.'.php', '', $path);
		
		$folders[$registerBlock] =  $path;
	}

	return $folders;
});