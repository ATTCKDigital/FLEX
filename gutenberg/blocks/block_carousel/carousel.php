<?php
// echo "\n<!-- FLEX/gutenberg/blocks/block_slides/slides.php -->\n"; 

namespace FLEX_LAYOUT_SYSTEM\Blocks\Image;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Border\BORDER_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;

add_action( 'init', __NAMESPACE__ . '\register_carousel_block' );

/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_carousel_block() {
	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/carousel', [
		'attributes' => array_merge(
			[
				'automate' => [
					'type' => 'boolean',
					'default' => true
				],
				'showDots' => [
					'type' => 'boolean',
					'default' => true
				],
				'showArrows' => [
					'type' => 'boolean',
					'default' => true
				],
				'className' => [
					'type' => 'string',
					'default' => ''
				],
				'dataComponentName' => [
					'type' => 'string',
				],
				'dataComponentOptions' => [
					'type' => 'string',
				],
				'mediaId' => [
					'type' => 'number'
				],
				'media' => [
					'type' => 'object'
				]
			],
			BORDER_OPTIONS_ATTRIBUTES,
			MARGIN_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_carousel_block',
	] );
}

function render_carousel_block($attributes) {
	$class = '';
	$class .= " {$attributes['className']}";
	$class .= margin_options_classes($attributes);
	$class .= padding_options_classes($attributes);
	$class .= border_options_classes($attributes);
	$class .= " block-align-{$attributes['align']}";

	$automate = '';
	if (array_key_exists('automate', $attributes)) {
		$automate = 'data-automate="' . $attributes['automate'] . '"';
	}

	$showArrows = '';
	if (array_key_exists('showDots', $attributes)) {
		$showArrows = 'data-showarrows="' . $attributes['showArrows'] . '"';
	}

	$showDots = '';
	if (array_key_exists('showArrows', $attributes)) {
		$showDots = 'data-showdots="' . $attributes['showDots'] . '"';
	}

	// FLEX JS components get initialized when a DOM element has 
	// a 'component' class attribute AND a data-component-name attribute
	// NOTE: data-component-options is optional but must be stringified JSON
	if (array_key_exists('dataComponentName', $attributes)) {
		$dataComponentNameLowercase = strtolower($attributes['dataComponentName']);
		$class .= ' component component-' . $dataComponentNameLowercase;
	}

	$output = '';

	echo "<!-- ";
	print_r($attributes);
	echo "-->\n";

	$output .= "<div class=\"component-image component {$class}\" {$automate} {$showDots} {$showArrows} data-component-name=\"{$dataComponentName}\" {$dataComponentOptions}>";;
	$output .= "";
	$output .= "CAROUSEL";
	$output .= "";
	$output .= "</div>";

	return $output;
}

