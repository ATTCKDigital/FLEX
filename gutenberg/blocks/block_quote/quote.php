<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Quote;

use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_classes;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_inline_styles;

add_action( 'init', __NAMESPACE__ . '\register_quote_block' );

/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_quote_block() {
	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Register from block.json (name + attributes); keep the server render callback.
	register_block_type( __DIR__ . '/block.json', [
		'render_callback' => __NAMESPACE__ . '\render_quote_block',
	] );
}

/**
 * Server rendering for /blocks/quote
 */
function render_quote_block($attributes) {
	$class = 'component-quote component';
	$class .= ' '.$attributes['className'];
	$class .= margin_options_classes($attributes);
	$class .= padding_options_classes($attributes);
	$class .= border_options_classes($attributes);
	$class .= background_options_classes($attributes);

	$textColor = array_key_exists('textColor', $attributes) ? $attributes['textColor'] : null;

	$imgID = array_key_exists('imgID', $attributes) ? $attributes['imgID'] : null;
	$contentCompany = array_key_exists('contentCompany', $attributes) ? $attributes['contentCompany'] : null;
	$contentSource = array_key_exists('contentSource', $attributes) ? $attributes['contentSource'] : null;

	if ($imgID) {
		$image = '<div class="image-wrapper">'.wp_get_attachment_image($attributes['imgID'], 'full').'</div>';
	} else {
		$image = '';
	}

	if ($textColor) {
		$textStyle = ' style="color:'.$textColor.';"';
	} else {
		$textStyle = '';
	}

	if ($contentSource) {
		$contentSource = '<div class="quote-source"'.$textStyle.'>'.$attributes['contentSource'].'</div>';
	} else {
		$contentSource = '';
	}

	if ($contentCompany) {
		$contentCompany = '<div class="quote-company"'.$textStyle.'>'.$attributes['contentCompany'].'</div>';
	} else {
		$contentCompany = '';
	}

	$style = background_options_inline_styles($attributes);

	$output = "<div class=\"{$class}\" style=\"{$style}\" data-component-name=\"Parallax\"><p class=\"quote-text\"{$textStyle}>{$attributes['content']}</p>{$image}{$contentSource}{$contentCompany}</div>";

	return $output;
}
