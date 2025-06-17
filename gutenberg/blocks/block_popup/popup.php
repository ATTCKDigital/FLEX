<?php
// TODO: 
// - ADD OPTION FOR OPEN POPUP ON INIT
// - ADD OPTION FOR ALIGN (TOP RIGHT BOTTOM LEFT)

namespace FLEX_LAYOUT_SYSTEM\Blocks\Popup;

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


add_action( 'init', __NAMESPACE__ . '\register_popup_block' );

/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_popup_block() {
	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/popup', [
		'attributes' => array_merge(
			[
				'className' => [
					'type' => 'string',
					'default' => '',
				],
				'popupName' => [
					'type' => 'string',
					'default' => '',
				],
				'backgroundOpacity' => [
					'type' => 'Number',
					'default' => 100,
				],
				'dataComponentName' => [
					'type' => 'string',
				],
				'dataComponentOptions' => [
					'type' => 'string',
				],
			],
			BACKGROUND_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES,
			MARGIN_OPTIONS_ATTRIBUTES,
			BORDER_OPTIONS_ATTRIBUTES,
			COLUMN_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_popup_block',
	] );
}

/** 
 * Server rendering for /blocks/popup
 */
function render_popup_block($attributes, $content) {
	$sectionDataId = mt_rand(10,1000);
	$class = 'component-popup';
	$class .= ' ' . $attributes['className'];
	$class .= background_options_classes($attributes);
	$class .= padding_options_classes($attributes);
	$class .= margin_options_classes($attributes);
	$class .= border_options_classes($attributes);
	$class .= column_options_classes($attributes);

	// Popup Name
	$popupName = $attributes['popupName'];


	// Apply relative link id (e.g., page.html#link)
	$id = array_key_exists('anchor', $attributes) ? " id=\"{$attributes['anchor']}\"" : "";

	// Apply data-component-name
	$dataComponentName = array_key_exists('dataComponentName', $attributes) ? " data-component-name=\"{$attributes['dataComponentName']}\"" : "";
	$dataComponentOptions = array_key_exists('dataComponentOptions', $attributes) ? " data-component-options=\"{$attributes['dataComponentOptions']}\"" : "";

	// FLEX JS components get initialized when a DOM element has 
	// a 'component' class attribute AND a data-component-name attribute
	// NOTE: data-component-options is optional but must be stringified JSON
	if (array_key_exists('dataComponentName', $attributes)) {
		$dataComponentNameLowercase = strtolower($attributes['dataComponentName']);
		$class .= ' component component-' . $dataComponentNameLowercase;
	}

	// Apply background images
	$style = background_options_inline_styles($attributes);
	$overlay = '';
	
	if (!empty($style)) {
		$style .= ' opacity:' . $attributes['backgroundOpacity'];
		$overlay = "<div class=\"popup-background-overlay\" style=\"{$style}\"></div>";
	}

	$mobileImage = background_options_mobile_styles($attributes);
	$desktopImage = background_options_desktop_styles($attributes);

	if ($mobileImage || $desktopImage) {
		$styleBlock = "<style>.component-background[data-section-id=\"section-{$sectionDataId}\"]{{$mobileImage}} @media only screen and (min-width: 768px){.component-background[data-section-id=\"section-{$sectionDataId}\"]{{$desktopImage}}}</style>";
	} else {
		$styleBlock = '';
	}

	// Video will only appear if the popup has content
	$innerContent = background_options_video_output($attributes);

	$output = "
	<script type=\"text/template\" data-popup-tpl=\"{$popupName}\">
		<div {$id} class=\"{$class}\" data-section-id=\"section-{$sectionDataId}\" {$dataComponentName} {$dataComponentOptions}>
			{$overlay}
			<div class=\"popup\">
				<button class=\"close-button\" aria-label=\"close popup\"></button>
				<div class=\"popup-content-container\">
					{$styleBlock}{$content}{$innerContent}
				</div>
			</div>
		</div>
	</script>";

	return $output;
}
