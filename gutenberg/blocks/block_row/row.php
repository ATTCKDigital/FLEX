<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Row;

use const FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\BACKGROUND_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_classes;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_inline_styles;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_mobile_styles;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_desktop_styles;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_video_output;

use const FLEX_LAYOUT_SYSTEM\Components\LogoColor\LOGO_COLOR_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\LogoColor\logo_color_options_data_attributes;

use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\RowHeight\ROW_HEIGHT_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\RowHeight\row_height_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Border\BORDER_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Scroller\SCROLLER_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Scroller\scroller_options_output;


add_action( 'init', __NAMESPACE__ . '\register_row_block' );
/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_row_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/row', [
		'attributes'      => array_merge(
			[
				'anchor' => [
					'type' => 'string',
				],
				'blockAlignment' => [
					'type' => 'string',
					'default' => 'wide',
				],
				'reverseMobile' => [
					'type' => 'boolean',
					'default' => false,
				],
				'verticalAligment' => [
					'type' => 'string',
					'default' => 'top',
				],
				'className' => [
					'type' => 'string',
					'default' => '',
				],

			],
			BACKGROUND_OPTIONS_ATTRIBUTES,
			LOGO_COLOR_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES,
			MARGIN_OPTIONS_ATTRIBUTES,
			ROW_HEIGHT_OPTIONS_ATTRIBUTES,
			SCROLLER_OPTIONS_ATTRIBUTES,
			BORDER_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_row_block',
	] );

}

/**
 * Server rendering for /blocks/row
 */
function render_row_block($attributes, $content) {
	$sectionDataId = mt_rand(10,1000);
	$class = 'component-row';
	$class .= ' '.$attributes['className'];
	$class .= $attributes['reverseMobile'] ? ' component-row-reverse-mobile' : '';
	$class .= background_options_classes($attributes);
	$class .= padding_options_classes($attributes);
	$class .= margin_options_classes($attributes);
	$class .= row_height_options_classes($attributes);
	$class .= border_options_classes($attributes);

	$id = array_key_exists('anchor', $attributes) ? " id=\"{$attributes['anchor']}\"" : "";

	$style = background_options_inline_styles($attributes);
	$mobileImage = background_options_mobile_styles($attributes);
	$desktopImage = background_options_desktop_styles($attributes);
	$dataLogoColor = logo_color_options_data_attributes($attributes);

	if($mobileImage || $desktopImage) {
		$styleBlock = "<style>.component-background[data-section-id=\"section-{$sectionDataId}\"]{{$mobileImage}} @media only screen and (min-width: 768px){.component-background[data-section-id=\"section-{$sectionDataId}\"]{{$desktopImage}}}</style>";
	} else {
		$styleBlock = '';
	}

	$innerContent = background_options_video_output($attributes);
	$innerContent .= scroller_options_output($attributes);
	$innerContent .= "<div class=\"flex-grid component-row-{$attributes['blockAlignment']} component-alignment-{$attributes['verticalAligment']}\">{$content}</div>";

	$output = "<section{$id} class=\"{$class}\" data-section-id=\"section-{$sectionDataId}\" data-logo-color=\"{$dataLogoColor}\" style=\"{$style}\">{$styleBlock}{$innerContent}</section>";

	return $output;
}
