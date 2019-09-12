<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Button;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;


add_action( 'init', __NAMESPACE__ . '\register_button_block' );
/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_button_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/button', [
		'attributes'      => array_merge(
			[
				'content' => [
					'type' => 'string',
				],
				'content2' => [
					'type' => 'string',
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
				'url2' => [
					'type' => 'string',
				],
				'target' => [
					'type' => 'boolean',
					'default' => 'false',
				],
				'className' => [
					'type' => 'string',
					'default' => ''
				],
			],
			MARGIN_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_button_block',
	] );

}

/**
 * Server rendering for /blocks/heading
 */
function render_button_block($attributes) {
	$buttonClass = $attributes['className'];
	$class = " align-{$attributes['align']}";
	$class .= margin_options_classes($attributes);

	$content1 = array_key_exists('content', $attributes) ? $attributes['content'] : null;
	$url1 = array_key_exists('url', $attributes) ? $attributes['url'] : null;
	$content2 = array_key_exists('content2', $attributes) ? $attributes['content2'] : null;
	$url2 = array_key_exists('url2', $attributes) ? $attributes['url2'] : null;

	$targetAttr = null;
	if($attributes['target'] == 'true') {
		$targetAttr = ' target="_blank"';
	}

	$button1 = null;
	if ($content1 && $url1) {
		$button1 = "<a href=\"{$url1}\" {$targetAttr} class=\"cta {$buttonClass}\">{$content1}</a>";
	}

	$button2 = null;
	if($content2 && $url2) {
		$button2 = "<a href=\"{$url2}\" {$targetAttr} class=\"cta {$buttonClass}\">{$content2}</a>";
	}

	$output = '';
	if ($button1 || $button2) {
		$output = "<div class=\"component-button component {$class}\">{$button1}{$button2}</div>";
	}

	return $output;
}
