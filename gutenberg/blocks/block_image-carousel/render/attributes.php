<?php
/**
 * Carousel block: root attributes (classes, ratio, component options, label)
 * and the HTML attribute serializer.
 *
 * @package FLEX
 */

namespace FLEX_LAYOUT_SYSTEM\Blocks\ImageCarousel;

use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;

/**
 * Serialize attributes: `null` / `false` are left out, `true` is a bare
 * attribute, everything else is `name="esc_attr(value)"`.
 *
 * @param array $attrs Attribute name => value.
 * @return string Leading space included when not empty.
 */
function html_attrs( array $attrs ): string {
	$out = '';

	foreach ( $attrs as $name => $value ) {
		if ( null === $value || false === $value ) {
			continue;
		}

		$out .= true === $value
			? ' ' . $name
			: sprintf( ' %s="%s"', $name, esc_attr( (string) $value ) );
	}

	return $out;
}

/**
 * A string attribute, trimmed ('' when absent or not a string).
 *
 * @param array  $attributes Block attributes.
 * @param string $key        Attribute name.
 * @return string
 */
function string_attr( array $attributes, string $key ): string {
	return isset( $attributes[ $key ] ) && is_string( $attributes[ $key ] ) ? trim( $attributes[ $key ] ) : '';
}

/**
 * The editor's FLEX component name(s), without `Carousel` (the block adds it
 * once; a second token would start a second instance).
 *
 * @param array $attributes Block attributes.
 * @return string Space-separated names, or ''.
 */
function extra_component_names( array $attributes ): string {
	$names = preg_split( '/[\s,]+/', string_attr( $attributes, 'dataComponentName' ), -1, PREG_SPLIT_NO_EMPTY );
	$names = array_filter( $names, static fn( $name ) => 'Carousel' !== $name );

	return implode( ' ', array_unique( $names ) );
}

/**
 * Root classes: block base classes, `className`, the margin / padding /
 * border option classes and `component-{name}` for editor component names.
 *
 * @param array    $attributes Block attributes.
 * @param string[] $base       Leading classes.
 * @return string
 */
function root_classes( array $attributes, array $base ): string {
	$classes = implode(
		' ',
		[
			implode( ' ', $base ),
			string_attr( $attributes, 'className' ),
			margin_options_classes( $attributes ),
			padding_options_classes( $attributes ),
			border_options_classes( $attributes ),
		]
	);

	$extra = extra_component_names( $attributes );

	if ( '' !== $extra ) {
		foreach ( explode( ' ', $extra ) as $name ) {
			$classes .= ' component-' . strtolower( $name );
		}
	}

	$list = preg_split( '/\s+/', $classes, -1, PREG_SPLIT_NO_EMPTY );

	return implode( ' ', array_unique( $list ) );
}

/**
 * The stage ratio as "{w} / {h}": a valid `aspectRatio`, else the first
 * slide with known dimensions, else 16 / 9. Unknown values mean auto.
 *
 * @param array   $attributes Block attributes.
 * @param array[] $slides     Resolved slides.
 * @return string
 */
function stage_ratio( array $attributes, array $slides ): string {
	$fixed = [
		'16/9' => '16 / 9',
		'4/3'  => '4 / 3',
		'1/1'  => '1 / 1',
		'3/4'  => '3 / 4',
	];
	$ratio = str_replace( ' ', '', string_attr( $attributes, 'aspectRatio' ) );

	if ( isset( $fixed[ $ratio ] ) ) {
		return $fixed[ $ratio ];
	}

	foreach ( $slides as $slide ) {
		if ( $slide['width'] > 0 && $slide['height'] > 0 ) {
			return $slide['width'] . ' / ' . $slide['height'];
		}
	}

	return '16 / 9';
}

/**
 * `data-component-options` JSON: the block's keys merged over any valid JSON
 * object the editor set in `dataComponentOptions` (block keys win).
 *
 * @param array $attributes Block attributes.
 * @return string JSON (escape with esc_attr when printing).
 */
function component_options( array $attributes ): string {
	$editor = json_decode( string_attr( $attributes, 'dataComponentOptions' ), true );
	$editor = is_array( $editor ) && array_keys( $editor ) !== range( 0, count( $editor ) - 1 ) ? $editor : [];

	$block = [
		'layout'         => 'stage',
		'nav'            => 'thumbs',
		'arrows'         => ! empty( $attributes['showArrows'] ),
		'loop'           => ! isset( $attributes['loop'] ) || (bool) $attributes['loop'],
		'autoplay'       => false,
		'swipeThreshold' => 40,
	];

	return (string) wp_json_encode( array_merge( $editor, $block ) );
}

/**
 * The region's accessible name.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
function carousel_label( array $attributes ): string {
	$label = string_attr( $attributes, 'ariaLabel' );

	return '' !== $label ? $label : __( 'Image carousel', 'flexlayout' );
}
