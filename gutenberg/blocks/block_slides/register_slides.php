<?php
echo "\n<!-- FLEX/gutenberg/blocks/block_slides/register_slides.php -->\n"; 

add_action('acf/init', 'register_block_slides');

function register_block_slides() {
	// check function exists
	if( function_exists('acf_register_block') ) {
		
		// register a hero-slider block
		acf_register_block_type(array(
			'name'				=> 'slides',
			'title'				=> __('Slides'),
			'description'		=> __('A custom slides block.'),
			'render_callback'	=> 'block_render_callback_slides',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'carousel', 'slide' ),
			'mode'				=> 'edit'
		));
	}
}

function block_render_callback_slides( $block ) {
	echo "block_render_callback_slides, block: ";
	
	print_r($block);

	// convert name ("acf/hero-slider") into path friendly slug ("hero-slider")
	$slug = str_replace('acf/', '', $block['name']);
	
	// include a template part from within the "template-parts/block" folder
	if( file_exists( locate_template("gutenberg/blocks/block_{$slug}/{$slug}.php") ) ) {
		echo "File exists";
		include( locate_template("gutenberg/blocks/block_{$slug}/{$slug}.php") );
	} else {
		echo "File doesn't exist";
	}

}

return;





add_action( 'init', 'register_slides_block', 5 );

function register_slides_block() {
	echo "<!-- registering slides block -->\n";

	$blockPath = __DIR__ . "/block.json";
	$blockType = register_block_type(
		$blockPath,
		array(
			'render_callback' => 'render_slides_block'
		)
	);

	echo "<!-- \n";
	echo "blockPath: ";
	echo $blockPath;
	// echo "blockType:\n";
	// print_r($blockType);
	echo " -->\n";

	echo "<!-- slides block registered -->\n";
}

function render_slides_block($args) {
	echo "<!-- render_slides_block, args: -->\n";
	print_r($args);
}

?>