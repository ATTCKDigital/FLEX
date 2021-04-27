<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Column;

use const FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\BACKGROUND_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_classes;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_inline_styles;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_mobile_styles;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_desktop_styles;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_video_output;

use const FLEX_LAYOUT_SYSTEM\Components\Border\BORDER_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Columns\COLUMN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Columns\column_options_classes;


add_action( 'init', __NAMESPACE__ . '\register_column_block' );

/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_column_block() {
	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/column', [
		'attributes' => array_merge(
			[
				'anchor' => [
					'type' => 'string',
				],
				'className' => [
					'type' => 'string',
					'default' => '',
				],
				'dataComponentName' => [
					'type' => 'string',
				],
				'dataComponentOptions' => [
					'type' => 'string',
				],
				'verticalAlignment' => [
					'type' => 'string',
					'default' => 'top',
				],
			],
			BACKGROUND_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES,
			MARGIN_OPTIONS_ATTRIBUTES,
			BORDER_OPTIONS_ATTRIBUTES,
			COLUMN_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_column_block',
	] );
}

/** 
 * Server rendering for /blocks/column
 */
function render_column_block($attributes, $content) {
	$sectionDataId = mt_rand(10,1000);
	$class = 'component-column';
	$class .= ' ' . $attributes['className'] . ' ';
	$class .= background_options_classes($attributes);
	$class .= padding_options_classes($attributes);
	$class .= margin_options_classes($attributes);
	$class .= border_options_classes($attributes);
	$class .= column_options_classes($attributes);

	// Apply alignment setting
	$class .= array_key_exists('align', $attributes) ? " column-align-{$attributes['align']}" : "";

	// Apply vertical alignment setting
	$class .= array_key_exists('verticalAlignment', $attributes) ? " component-column-verticalAlignment-{$attributes['verticalAlignment']}" : "";

	// Apply relative link id (e.g., page.html#link)
	$id = array_key_exists('anchor', $attributes) ? " id=\"{$attributes['anchor']}\"" : "";

	// Apply data-component-name
	$dataComponentName = array_key_exists('dataComponentName', $attributes) ? " data-component-name=\"{$attributes['dataComponentName']}\"" : "";
	// $dataComponentOptions = array_key_exists('dataComponentOptions', $attributes) ? " data-component-options=\"{$attributes['dataComponentOptions']}\"" : "";

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

	// Apply background images
	$style = background_options_inline_styles($attributes);
	$mobileImage = background_options_mobile_styles($attributes);
	$desktopImage = background_options_desktop_styles($attributes);

	if ($mobileImage || $desktopImage) {
		$styleBlock = "<style>.component-background[data-section-id=\"section-{$sectionDataId}\"]{{$mobileImage}} @media only screen and (min-width: 768px){.component-background[data-section-id=\"section-{$sectionDataId}\"]{{$desktopImage}}}</style>";
	} else {
		$styleBlock = '';
	}

	// Video will only appear if the column has content
	$innerContent = background_options_video_output($attributes);

	$output = "<section{$id} class=\"{$class}\" data-section-id=\"section-{$sectionDataId}\" style=\"{$style}\" {$dataComponentName} {$dataComponentOptions}>{$styleBlock}{$content}{$innerContent}</section>";

	return $output;
}
