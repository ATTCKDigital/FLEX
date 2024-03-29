<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Image;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Border\BORDER_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;

add_action( 'init', __NAMESPACE__ . '\register_image_block' );

/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_image_block() {
	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/image', [
		'attributes' => array_merge(
			[
				'align' => [
					'type' => 'string',
					'default' => 'center'
				],
				'caption' => [
					'type' => 'string',
				],
				'className' => [
					'type' => 'string',
					'default' => ''
				],
				'CSSWidth' => [
					'type' => 'string',
					'default' => ''
				],
				'dataComponentName' => [
					'type' => 'string',
				],
				'dataComponentOptions' => [
					'type' => 'string',
				],
				'imgURL' => [
					'type' => 'string',
				],
				'imgID' => [
					'type' => 'number',
				],
				'opensNewWindow' => [
					'type' => 'boolean',
					'default' => false
				],
				'url' => [
					'type' => 'string',
				]
			],
			BORDER_OPTIONS_ATTRIBUTES,
			MARGIN_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_image_block',
	] );
}

// Server rendering for /blocks/image
function render_image_block($attributes) {
	$class = '';
	$class .= " {$attributes['className']}";
	$class .= margin_options_classes($attributes);
	$class .= padding_options_classes($attributes);
	$class .= border_options_classes($attributes);
	$class .= " block-align-{$attributes['align']}";

	// CSS width property
	if (array_key_exists('CSSWidth', $attributes)) {
		$CSSWidth = 'style="width:' . $attributes['CSSWidth'] . '"';
	} else {
		$CSSWidth = '';
	}

	// External image link checkbox option
	$target = '';

	if ($attributes['opensNewWindow']) {
		$target .= ' target="_new"';
	}

	$url = array_key_exists('url', $attributes) ? $attributes['url'] : null;
	$caption = array_key_exists('caption', $attributes) ? $attributes['caption'] : null;
	$imageID = array_key_exists('imgID', $attributes) ? $attributes['imgID'] : null;
	$imageURL = wp_get_attachment_image($imageID, 'full', $CSSWidth);

	if ($url) {
		$image = '<a href="' . $url . '"' . $target . '>' . $imageURL . '</a>';
	} else {
		$image = $imageURL;
	}

	if ($caption) {
		$caption = '<figcaption class="caption">' . $caption . '</figcaption>';
	} else {
		$caption = '';
	}

	// Apply data-component-name
	$dataComponentName = array_key_exists('dataComponentName', $attributes) ? "{$attributes['dataComponentName']}" : "";
	$dataComponentOptions = "";

	if (array_key_exists('dataComponentOptions', $attributes)) {
		$dataOptions = htmlspecialchars($attributes['dataComponentOptions']);
		$dataComponentOptions = " data-component-options=\"{$dataOptions}\"";
	}
	
	// FLEX JS components get initialized when a DOM element has 
	// a 'component' class attribute AND a data-component-name attribute
	// NOTE: data-component-options is optional but must be stringified JSON
	if (array_key_exists('dataComponentName', $attributes)) {
		$dataComponentNameLowercase = strtolower($attributes['dataComponentName']);
		$class .= ' component component-' . $dataComponentNameLowercase;
	}

	$output = "<div class=\"component-image component {$class}\" {$CSSWidth} data-component-name=\"{$dataComponentName}\" {$dataComponentOptions}>";
	$output .= 		"<div class=\"image-wrapper\">";
	$output .= 			"{$image}";
	$output .=			"{$caption}";
	$output .= 		"</div>";
	$output .= "</div>";

	return $output;
}
