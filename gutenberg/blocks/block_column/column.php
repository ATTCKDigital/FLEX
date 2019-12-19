<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Column;

use const FLEX_LAYOUT_SYSTEM\Components\Columns\COLUMN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Columns\column_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Border\BORDER_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\BACKGROUND_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_classes;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_inline_styles;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_mobile_styles;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_desktop_styles;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_video_output;


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
		'attributes'      => array_merge(
			[
				'className' => [
                	'type' => 'string',
                	'default' => '',
            	],
        	],
			COLUMN_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES,
			BORDER_OPTIONS_ATTRIBUTES,
			BACKGROUND_OPTIONS_ATTRIBUTES
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
	$class .= ' '.$attributes['className'];
	$class .= column_options_classes($attributes);
	$class .= padding_options_classes($attributes);
	$class .= border_options_classes($attributes);
	$class .= background_options_classes($attributes);
	$id = array_key_exists('anchor', $attributes) ? " id=\"{$attributes['anchor']}\"" : "";

	$style = background_options_inline_styles($attributes);
	$mobileImage = background_options_mobile_styles($attributes);
	$desktopImage = background_options_desktop_styles($attributes);

	if($mobileImage || $desktopImage) {

		$styleBlock = "<style>.component-background[data-section-id=\"section-{$sectionDataId}\"]{{$mobileImage}} @media only screen and (min-width: 768px){.component-background[data-section-id=\"section-{$sectionDataId}\"]{{$desktopImage}}}</style>";
	} else {
		$styleBlock = '';
	}

	//video will only appear if the column has content
	$innerContent = background_options_video_output($attributes);

	$output = "<section{$id} class=\"{$class}\" data-section-id=\"section-{$sectionDataId}\" style=\"{$style}\">{$styleBlock}{$content}{$innerContent}</section>";

	return $output;
}
