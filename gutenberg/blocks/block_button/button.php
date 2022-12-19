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
		echo "function register_block_type ! exists";
		return;
	}

	// Hook server side rendering into render callback
	register_block_type(
		'flexlayout/button', 
		[
		'attributes' => array_merge(
			[
				'align' => [
					'type' => 'string',
					'default' => 'left'
				],
				'className' => [
					'type' => 'string',
					'default' => ''
				],
				'content' => [
					'type' => 'string',
				],
				'dataComponentName' => [
					'type' => 'string',
				],
				'dataComponentOptions' => [
					'type' => 'string',
				],
				'placeholder' => [
					'type' => 'string',
				],
				'target' => [
					'type' => 'boolean',
					'default' => false,
				],
				'url' => [
					'type' => 'string',
				],
			],
			MARGIN_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_button_block',
	] );
}

// Server rendering for /blocks/heading
function render_button_block($attributes) {
	$buttonClass = $attributes['className'];

	$class = " text-align-{$attributes['align']} ";
	$class .= $attributes['className'];
	$class .= margin_options_classes($attributes);

	$content = array_key_exists('content', $attributes) ? $attributes['content'] : null;
	$url = array_key_exists('url', $attributes) ? $attributes['url'] : null;
	
	$targetAttr = null;

	if ($attributes['target'] == true) {
		$targetAttr = ' target="_blank"';
	}

	// Apply data-component-name
	$dataComponentName = array_key_exists('dataComponentName', $attributes) ? " data-component-name=\"{$attributes['dataComponentName']}\"" : "";
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

	$button = null;
	
	if (!$url) {
		// Set default URL to site root
		$url = "/";
	}

	if ($content) {
		$button = "<a href=\"{$url}\" {$targetAttr} class=\"cta {$buttonClass}\">{$content}</a>";
	} else {
		$button = "<a href=\"{$url}\" {$targetAttr} class=\"cta {$buttonClass}\">Click me</a>";
	}

	$output = '';

	if ($button) {
		$output  = "<div class=\"component-button component {$class}\" {$dataComponentName} {$dataComponentOptions}>";
		$output .= 		"{$button}";
		$output .= "</div>";
	}

	if (!$output) {
		$output = "Button is missing required fields";
	}

	return $output;
}
