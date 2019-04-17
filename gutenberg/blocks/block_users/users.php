<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Users;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;



add_action( 'init', __NAMESPACE__ . '\register_users_block' );
/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_users_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/users', [
		'attributes'      => array_merge(
			[
				'className' => [
                    'type' => 'string',
                    'default' => '',
                ],
			],
			MARGIN_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_users_block',
	] );

}

/**
 * Server rendering for /blocks/feed
 */
function render_users_block($attributes) {

	$class = $attributes['className'];
	$class .= margin_options_classes($attributes);
	$class .= padding_options_classes($attributes);



	$output = "<div class=\"component-archive-feed {$class}\"><div class=\"feed-items load-items padding-bottom-3x\"></div>";

	return $output;
}
