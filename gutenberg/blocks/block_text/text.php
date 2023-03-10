<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Text;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Border\BORDER_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\TextColors\TEXT_COLOR_ATTRIBUTES;

use const FLEX_LAYOUT_SYSTEM\Components\BackgroundColorOptions\BACKGROUND_COLOR_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundColorOptions\background_color_options_inline_styles;

add_action( 'init', __NAMESPACE__ . '\register_text_block' );

/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_text_block() {
	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/text', [
		'attributes' => array_merge(
			[
				'content' => [
					'type' => 'string',
					'default' => '',
				],
				'className' => [
					'type' => 'string',
					'default' => '',
				],
				'align' => [
					'type' => 'string',
					'default' => 'left'
				],
			],
			MARGIN_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES,
			BORDER_OPTIONS_ATTRIBUTES,
			TEXT_COLOR_ATTRIBUTES,
			BACKGROUND_COLOR_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_text_block',
	] );
}

/**
 * Server rendering for /blocks/text
 */
function render_text_block($attributes) {
	return "text block here";
	
	$className = $attributes['className'];

	$bgColor = array_key_exists('backgroundColor', $attributes) ? $attributes['backgroundColor'] : null;
	$textColor = array_key_exists('textColor', $attributes) ? $attributes['textColor'] : null;

	// Build component classes
	$componentName = 'text';
	$class = 'xcomponent-' . $componentName . ' component ';
	$class .= ' ' . $attributes['className'];
	$class .= " text-align-{$attributes['align']}";
	// $class .= " align-{$attributes['align']}";

	// Build wrapper classes
	$wrapperClass = 'ycomponent-' . $componentName . '-wrapper ';
	$wrapperClass .= margin_options_classes($attributes);
	$wrapperClass .= padding_options_classes($attributes);
	$wrapperClass .= border_options_classes($attributes);

	// Build inline style values
	$style = '';
	// $style = background_color_options_inline_styles($attributes);

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

	// $style .= $textStyle;

	$output  = "<div class=\"{$class}\" style=\"{$style}\">";
	$output .= 		"<div class=\"body-text\">{$attributes['content']}</div>";
	$output .= "</div>";

	return $output;
}
