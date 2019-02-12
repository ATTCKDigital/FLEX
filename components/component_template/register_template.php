<?php
//Template for creating and registering an acf block.
//Additional details: https://www.advancedcustomfields.com/blog/acf-5-8-introducing-acf-blocks-for-gutenberg/
//Namespace function names "register_block_blockname" & "block_render_callback_template"

add_action('acf/init', 'register_block_child');
function register_block_child() {
	
	// check function exists
	if( function_exists('acf_register_block') ) {
		
		// register a testimonial block
		acf_register_block(array(
			'name'				=> 'template',
			'title'				=> __('Template'),
			'description'		=> __('A custom template block.'),
			'render_callback'	=> 'block_render_callback_template',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'template', 'quote' ),
			'parent'			=> ['flexls/row'], 
		));
	}
}

function block_render_callback_template( $block ) {
	
	// convert name ("acf/template") into path friendly slug ("template")
	$slug = str_replace('acf/', '', $block['name']);
	
	// include a template part from within the "template-parts/block" folder
	if( file_exists( locate_template("components/component_{$slug}/{$slug}.php") ) ) {
		include( locate_template("components/component_{$slug}/{$slug}.php") );
	}

}