<?php
echo "\n<!-- FLEX/gutenberg/blocks/block_carousel/register_carousel.php -->\n"; 

// add_action('acf/init', 'register_block_carousel');

// function register_block_carousel() {
// 	echo "<!-- register_block_carousel -->\n";

// 	// check function exists
// 	if( function_exists('acf_register_block_type') ) {
// 		echo "<!-- register_block_carousel › function exists -->\n";

// 		// register a hero-slider block
// 		acf_register_block_type(array(
// 			'name'				=> 'carousel',
// 			'title'				=> __('Carousel'),
// 			'description'		=> __('A custom carousel block.'),
// 			'render_callback'	=> 'block_render_callback_carousel',
// 			'category'			=> 'formatting',
// 			'icon'				=> 'admin-comments',
// 			'keywords'			=> array( 'carousel', 'slide' ),
// 			'mode'				=> 'edit'
// 		));
// 	} else {
// 		echo "<!-- register_block_carousel › function doesn't exist -->\n";
// 	}
// }

// function block_render_callback_carousel( $block ) {
// 	echo "block_render_callback_carousel, block: ";

// 	print_r($block);

// 	// convert name ("acf/hero-slider") into path friendly slug ("hero-slider")
// 	$slug = str_replace('acf/', '', $block['name']);
	
// 	// include a template part from within the "template-parts/block" folder
// 	if( file_exists( locate_template("gutenberg/blocks/block_{$slug}/{$slug}.php") ) ) {
// 		echo "File exists";
// 		include( locate_template("gutenberg/blocks/block_{$slug}/{$slug}.php") );
// 	} else {
// 		echo "File doesn't exist";
// 	}
// }

// return;







add_action('init', 'register_carousel_block', 5);

function register_carousel_block() {
	echo "<!-- registering carousel block -->\n";

	$blockPath = __DIR__ . "/block.json";
	$blockType = register_block_type($blockPath);

	echo "<!-- ";
	echo "blockPath: ";
	echo $blockPath;
	// echo "\n";
	// echo "blockType:\n";
	// print_r($blockType);
	echo " -->\n";

	echo "<!-- carousel block registered -->\n";
}

function render_carousel_block($args) {
	echo "<!-- render_carousel_block, args: \n";
	print_r($args);
	echo "-->";
}

?>
