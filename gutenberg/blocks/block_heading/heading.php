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
				'align' => [
					'type' => 'string',
					'default' => 'left'
				],
				'className' => [
					'type' => 'string',
					'default' => '',
				],
				'content' => [
					'type' => 'string',
					'default' => '',
				],
				'dataComponentName' => [
					'type' => 'string',
				],
				'dataComponentOptions' => [
					'type' => 'string',
				],
				'hangingQuoteClass' => [
					'type' => 'string',
					'default' => ''
				],
				'imgID' => [
					'type' => 'number',
				],
				'imgURL' => [
					'type' => 'string',
				],
				'isSelected' => [
					'type' => 'boolean',
				],
				'level' => [
					'type' => 'number',
					'default' => 2,
				],
				'placeholder' => [
					'type' => 'string',
				],
				'url' => [
					'type' => 'string',
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
	$class .= " text-align-{$attributes['align']}";
	
	// Build wrapper classes
	$wrapperClass = 'component-' . $componentName . '-wrapper ';
	$wrapperClass .= margin_options_classes($attributes);
	$wrapperClass .= padding_options_classes($attributes);
	$wrapperClass .= border_options_classes($attributes);

	// Hanging quote option
	$wrapperClass .= ' ' . $attributes['hangingQuoteClass'];
	
	// $hangingQuote = array_key_exists('hangingQuote', $attributes) ? $attributes['hangingQuote'] : null;

	// if ($hangingQuote) {
	// 	$wrapperClass .= ' show-hanging-quote hanging-quote-' . $hangingQuote;
	// } else {
	// 	$wrapperClass .= ' hide-hanging-quote hanging-quote-' . $hangingQuote;
	// }

	// Apply data-component-name
	$dataComponentName = array_key_exists('dataComponentName', $attributes) ? " data-component-name=\"{$attributes['dataComponentName']}\"" : "";
	$dataComponentOptions = "";

	if (array_key_exists('dataComponentOptions', $attributes)) {
		$dataOptions = htmlspecialchars($attributes['dataComponentOptions']);
		$dataComponentOptions = " data-component-options=\"{$dataOptions}\"";
	}
	
	// FLEX JS components get initialized when a DOM element has 
	// a `component` class attribute AND a `data-component-name` attribute
	// NOTE: data-component-options is optional but must be stringified JSON
	if (array_key_exists('dataComponentName', $attributes)) {
		$dataComponentNameLowercase = strtolower($attributes['dataComponentName']);
		$class .= ' component component-' . $dataComponentNameLowercase;
	}

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

	// Parse images
	if ($image) {
		$image = wp_get_attachment_image($attributes['imgID'], 'full');
		$class .= ' has-image';
	} else {
		$image = '';
	}

	$output  = "<div class=\"{$wrapperClass}\" {$style}>";
	$output .= 		"{$link}{$image}{$linkClose}";
	$output .= 		"<{$tagName} class=\"{$class}\" {$dataComponentName} {$dataComponentOptions}>";
	$output .= 			"{$link}{$attributes['content']}{$linkClose}";
	$output .= 		"</{$tagName}>";
	$output .= "</div>";

	// $output = $attributes['content'];

	return $output;
}
