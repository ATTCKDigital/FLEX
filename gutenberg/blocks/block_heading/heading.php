<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Heading;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Border\BORDER_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\TextColors\TEXT_COLOR_ATTRIBUTES;

use const FLEX_LAYOUT_SYSTEM\Components\BackgroundColorOptions\BACKGROUND_COLOR_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundColorOptions\background_color_options_inline_styles;

add_action( 'init', __NAMESPACE__ . '\register_heading_block' );

/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_heading_block() {
	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/heading', [
		'attributes' => array_merge(
			[
				'content' => [
					'type' => 'string',
					'default' => '',
				],
				'level' => [
					'type' => 'number',
					'default' => 2,
				],
				'align' => [
					'type' => 'string',
					'default' => 'left'
				],
				'placeholder' => [
					'type' => 'string',
				],
				'url' => [
					'type' => 'string',
				],
				'className' => [
					'type' => 'string',
					'default' => '',
				],
				'imgURL' => [
					'type' => 'string',
				],
				'imgID' => [
					'type' => 'number',
				],
			],
			MARGIN_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES,
			BORDER_OPTIONS_ATTRIBUTES,
			TEXT_COLOR_ATTRIBUTES,
			BACKGROUND_COLOR_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_heading_block',
	] );
}

/**
 * Server rendering for /blocks/heading
 */
function render_heading_block($attributes) {
	$tagName = "h{$attributes['level']}";

	if ($attributes['level'] > 6) {
		$tagName = "h4";
	}

	$className = $attributes['className'];

	// Fall back to support older versions where styles were not used.
	if (strpos($className, 'is-style') !== false) {
		$headlineClass = '';
	} else {
		$headlineClass =  " headline{$attributes['level']}";
	}

	$bgColor = array_key_exists('backgroundColor', $attributes) ? $attributes['backgroundColor'] : null;	
	$textColor = array_key_exists('textColor', $attributes) ? $attributes['textColor'] : null;
	$url = array_key_exists('url', $attributes) ? $attributes['url'] : null;
	$image = array_key_exists('imgID', $attributes) ? $attributes['imgID'] : null;

	// Build component classes
	$componentName = 'heading';
	$class = 'component-' . $componentName . ' component ';
	$class .= $attributes['className'];
	$class .= $headlineClass;
	$class .= " align-{$attributes['align']}";
	
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
		$link = '<a href="'.$url.'">';
		$linkClose = '</a>';
	} else {
		$link = '';
		$linkClose = '';
	}

	// Parse images
	if ($image) {
		$image = wp_get_attachment_image($attributes['imgID'], 'full');
		$class .= ' has-image';
	} else {
		$image = '';
	}

	$output  = "<div class=\"{$wrapperClass}\" {$style}>";
	$output .= 		"{$link}{$image}{$linkClose}";
	$output .= 		"<{$tagName} class=\"{$class}\">";
	$output .= 			"{$link}{$attributes['content']}{$linkClose}";
	$output .= 		"</{$tagName}>";
	$output .= "</div>";

	return $output;
}
