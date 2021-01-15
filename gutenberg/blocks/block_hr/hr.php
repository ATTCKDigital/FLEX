<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\HR;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\BackgroundColorOptions\BACKGROUND_COLOR_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundColorOptions\background_color_options_inline_styles;

add_action( 'init', __NAMESPACE__ . '\register_hr_block' );

/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_hr_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/hr', [
		'attributes' => array_merge(
			[
				'HRWidth' => [
					'type' => 'string',
					'default' => '100%'
				],
				'color' => [
					'type' => 'number',
				],
				'align' => [
					'type' => 'string',
					'default' => 'center'
				],
			],
			MARGIN_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES,
			BACKGROUND_COLOR_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_hr_block',
	] );
}

// Server rendering for /blocks/image
function render_hr_block($attributes) {
	$class = " {$attributes['className']}";
	$class .= margin_options_classes($attributes);
	$class .= padding_options_classes($attributes);

	$classInner = " align-{$attributes['align']}";

	$bgColor = array_key_exists('backgroundColor', $attributes) ? $attributes['backgroundColor'] : null;

	$style = 'style="';

	// — background color
	if ($bgColor) {
		$style .= 'background-color:' . $bgColor . ';';
	}

	// — CSS width
	if (array_key_exists('HRWidth', $attributes)) {
		$style .= 'width:' . $attributes['HRWidth'] . ';';
	}

	$style .= '"';

	$output = '<hr class="component component-hr ' . $class . ' ' . $classInner . '" ' . $style . '/>';

	return $output;
}
