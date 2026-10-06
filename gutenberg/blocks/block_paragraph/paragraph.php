<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Paragraph;

use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;

add_action( 'init', __NAMESPACE__ . '\register_paragraph_block' );

/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_paragraph_block() {
	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Register from block.json (name + attributes); keep the server render callback.
	register_block_type( __DIR__ . '/block.json', [
		'render_callback' => __NAMESPACE__ . '\render_paragraph_block',
	] );
}

/**
 * Server rendering for /blocks/paragraph
 */
function render_paragraph_block($attributes) {
	$className = $attributes['className'];

	$bgColor = array_key_exists('backgroundColor', $attributes) ? $attributes['backgroundColor'] : null;
	$textColor = array_key_exists('textColor', $attributes) ? $attributes['textColor'] : null;
	$url = array_key_exists('url', $attributes) ? $attributes['url'] : null;

	// Build component classes
	$componentName = 'paragraph';
	$class = 'component-' . $componentName . ' component ';
	$class .= $attributes['className'];
	$class .= " text-align-{$attributes['align']}";

	// Build wrapper classes
	$wrapperClass = 'component-' . $componentName . '-wrapper ';
	$wrapperClass .= margin_options_classes($attributes);
	$wrapperClass .= padding_options_classes($attributes);
	$wrapperClass .= border_options_classes($attributes);

	// Build inline style values
	$style = '';

	if ($bgColor || $textColor) {
		$style .= 'style="';

		// — background color
		if ($bgColor) {
			$style .= 'background-color:' . $bgColor . ';';
		}

		// — text color
		if ($textColor) {
			$style .= 'color:' . $textColor . ';';
		}

		// End inline style attribute block
		$style .= '"';
	}

	// Parse links
	if ($url) {
		$link = '<a href="' . $url . '">';
		$linkClose = '</a>';
	} else {
		$link = '';
		$linkClose = '';
	}

	$output  = "<div class=\"{$wrapperClass} {$class}\" {$style}>";
	$output .= 			"{$link}{$attributes['content']}{$linkClose}";
	$output .= "</div>";

	return $output;
}
