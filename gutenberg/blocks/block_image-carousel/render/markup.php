<?php
/**
 * Carousel block: markup (contracts/rendered-markup.md C-M1 / C-M2).
 *
 * The full UI uses the component_carousel vocabulary (`.component-carousel`,
 * `.slides` > `.slide`, `.nav`, `.dots-component` > `li.dot`). Controls are
 * `inert` until the component initialises. No inline scripts, no enqueues.
 *
 * @package FLEX
 */

namespace FLEX_LAYOUT_SYSTEM\Blocks\ImageCarousel;

// Thumbnail heights in px (SCSS: 64 px, 80 px from tablet-landscape, 1024 px).
const THUMB_HEIGHT       = 64;
const THUMB_HEIGHT_LARGE = 80;
const THUMB_BREAKPOINT   = 1024;

/**
 * A caption, or '' when it is empty.
 *
 * @param string $caption Plain text.
 * @return string
 */
function render_caption( string $caption ): string {
	if ( '' === $caption ) {
		return '';
	}

	return '<figcaption class="component-image-carousel__caption">' . esc_html( $caption ) . '</figcaption>';
}

/**
 * The first (or only) slide image: real `src`, eager.
 *
 * @param array $slide Resolved slide.
 * @return string
 */
function render_eager_image( array $slide ): string {
	return wp_get_attachment_image(
		$slide['id'],
		'full',
		false,
		[
			'class'    => 'component-image-carousel__image',
			'alt'      => $slide['alt'],
			'loading'  => 'eager',
			'decoding' => 'async',
		]
	);
}

/**
 * A deferred slide image: `data-src` / `data-srcset` / `data-sizes`, no `src`.
 *
 * @param array $slide Resolved slide.
 * @return string
 */
function render_deferred_image( array $slide ): string {
	$full = $slide['full'];

	return '<img' . html_attrs(
		[
			'class'       => 'component-image-carousel__image',
			'data-src'    => $full['src'],
			'data-srcset' => '' !== $full['srcset'] ? $full['srcset'] : null,
			'data-sizes'  => '' !== $full['srcset'] && '' !== $full['sizes'] ? $full['sizes'] : null,
			'width'       => $slide['width'] > 0 ? $slide['width'] : null,
			'height'      => $slide['height'] > 0 ? $slide['height'] : null,
			'alt'         => $slide['alt'],
			'decoding'    => 'async',
		]
	) . '>';
}

/**
 * One slide.
 *
 * @param array  $slide Resolved slide.
 * @param int    $count Number of slides.
 * @param string $uid   Instance ID prefix.
 * @return string
 */
function render_slide( array $slide, int $count, string $uid ): string {
	$first = 1 === $slide['position'];
	$attrs = html_attrs(
		[
			'class'                => $first ? 'slide active' : 'slide',
			'id'                   => "{$uid}-slide-{$slide['position']}",
			'role'                 => 'group',
			'aria-roledescription' => __( 'slide', 'flexlayout' ),
			/* translators: 1: slide number, 2: number of slides. */
			'aria-label'           => sprintf( __( '%1$d of %2$d', 'flexlayout' ), $slide['position'], $count ),
			'data-index'           => $slide['position'] - 1,
			'hidden'               => ! $first,
		]
	);
	$image = $first ? render_eager_image( $slide ) : render_deferred_image( $slide );

	return "<figure{$attrs}>{$image}" . render_caption( $slide['caption'] ) . '</figure>';
}

/**
 * The thumbnail `sizes`, from the thumbnail heights and the stage ratio.
 *
 * @param array $slide Resolved slide.
 * @return string
 */
function thumb_sizes( array $slide ): string {
	$thumb = $slide['thumb'];
	$ratio = $thumb['width'] > 0 && $thumb['height'] > 0 ? $thumb['width'] / $thumb['height'] : 16 / 9;

	return sprintf(
		'(min-width: %dpx) %dpx, %dpx',
		THUMB_BREAKPOINT,
		(int) ceil( THUMB_HEIGHT_LARGE * $ratio ),
		(int) ceil( THUMB_HEIGHT * $ratio )
	);
}

/**
 * One thumbnail button.
 *
 * @param array  $slide Resolved slide.
 * @param int    $count Number of slides.
 * @param string $uid   Instance ID prefix.
 * @return string
 */
function render_thumb( array $slide, int $count, string $uid ): string {
	$thumb = $slide['thumb'];
	/* translators: 1: slide number, 2: number of slides. */
	$label = sprintf( __( 'Show slide %1$d of %2$d', 'flexlayout' ), $slide['position'], $count );

	if ( '' !== $slide['caption'] ) {
		$label .= ': ' . $slide['caption'];
	}

	$first  = 1 === $slide['position'];
	$button = html_attrs(
		[
			'type'          => 'button',
			'class'         => 'dot__thumb',
			'data-index'    => $slide['position'] - 1,
			'aria-controls' => "{$uid}-slide-{$slide['position']}",
			'aria-current'  => $first ? 'true' : null,
			'aria-label'    => $label,
		]
	);
	$img    = html_attrs(
		[
			'src'      => $thumb['src'],
			'srcset'   => '' !== $thumb['srcset'] ? $thumb['srcset'] : null,
			'sizes'    => '' !== $thumb['srcset'] ? thumb_sizes( $slide ) : null,
			'width'    => $thumb['width'] > 0 ? $thumb['width'] : null,
			'height'   => $thumb['height'] > 0 ? $thumb['height'] : null,
			'alt'      => '',
			'loading'  => 'lazy',
			'decoding' => 'async',
		]
	);
	$class  = $first ? 'dot active' : 'dot';

	return "<li class=\"{$class}\"><button{$button}><img{$img}></button></li>";
}

/**
 * The thumbnail row (the component's dots in `nav: "thumbs"` mode).
 *
 * @param array[] $slides Resolved slides.
 * @param string  $uid    Instance ID prefix.
 * @return string
 */
function render_thumbs( array $slides, string $uid ): string {
	$count = count( $slides );
	$items = '';

	foreach ( $slides as $slide ) {
		$items .= render_thumb( $slide, $count, $uid );
	}

	return '<ul class="dots-component dots-component--thumbs" role="list" inert>' . $items . '</ul>';
}

/**
 * Previous / next buttons (only when `showArrows`).
 *
 * @param string $uid Instance ID prefix.
 * @return string
 */
function render_arrows( string $uid ): string {
	$out = '';

	foreach ( [
		'prev' => __( 'Previous slide', 'flexlayout' ),
		'next' => __( 'Next slide', 'flexlayout' ),
	] as $side => $label ) {
		$out .= '<button' . html_attrs(
			[
				'type'          => 'button',
				'class'         => "nav {$side}",
				'aria-label'    => $label,
				'aria-controls' => "{$uid}-stage",
				'inert'         => true,
			]
		) . '></button>';
	}

	return $out;
}

/**
 * The polite live region, empty on the server.
 *
 * @param string $uid Instance ID prefix.
 * @return string
 */
function render_status( string $uid ): string {
	return '<p class="component-image-carousel__status screen-reader-text" id="' . esc_attr( "{$uid}-status" ) . '" aria-live="polite" aria-atomic="true"></p>';
}

/**
 * The stage and its slides.
 *
 * @param array[] $slides Resolved slides.
 * @param string  $uid    Instance ID prefix.
 * @return string
 */
function render_stage( array $slides, string $uid ): string {
	$count = count( $slides );
	$out   = '<div class="slides" id="' . esc_attr( "{$uid}-stage" ) . '">';

	foreach ( $slides as $slide ) {
		$out .= render_slide( $slide, $count, $uid );
	}

	return $out . '</div>';
}

/**
 * C-M1: two or more slides, the full component markup.
 *
 * @param array   $attributes Block attributes.
 * @param array[] $slides     Resolved slides.
 * @return string
 */
function render_carousel( array $attributes, array $slides ): string {
	$uid   = wp_unique_id( 'image-carousel-' );
	$extra = extra_component_names( $attributes );
	$root  = html_attrs(
		[
			'class'                  => root_classes( $attributes, [ 'component-image-carousel', 'component' ] ),
			'data-component-name'    => trim( 'Carousel ' . $extra ),
			'data-component-options' => component_options( $attributes ),
			'data-slide-count'       => count( $slides ),
			'aria-roledescription'   => __( 'carousel', 'flexlayout' ),
			'aria-label'             => carousel_label( $attributes ),
			'style'                  => '--image-carousel-ratio: ' . stage_ratio( $attributes, $slides ),
		]
	);

	$out  = "<section{$root}><div class=\"component-carousel\">";
	$out .= render_stage( $slides, $uid );
	$out .= ! empty( $attributes['showArrows'] ) ? render_arrows( $uid ) : '';
	$out .= render_thumbs( $slides, $uid );
	$out .= '</div>' . render_status( $uid ) . '</section>';

	return $out;
}

/**
 * C-M2: exactly one slide, a static figure. No Carousel component, controls
 * or live region; an editor-set component name still applies.
 *
 * @param array $attributes Block attributes.
 * @param array $slide      The resolved slide.
 * @return string
 */
function render_single( array $attributes, array $slide ): string {
	$extra   = extra_component_names( $attributes );
	$base    = [ 'component-image-carousel', 'component-image-carousel--single' ];
	$options = string_attr( $attributes, 'dataComponentOptions' );

	if ( '' !== $extra ) {
		$base[] = 'component';
	}

	$root = html_attrs(
		[
			'class'                  => root_classes( $attributes, $base ),
			'data-component-name'    => '' !== $extra ? $extra : null,
			'data-component-options' => '' !== $extra && '' !== $options ? $options : null,
			'aria-label'             => carousel_label( $attributes ),
			'style'                  => '--image-carousel-ratio: ' . stage_ratio( $attributes, [ $slide ] ),
		]
	);

	return "<section{$root}><div class=\"component-image-carousel__stage\">"
		. '<figure class="component-image-carousel__slide">' . render_eager_image( $slide ) . render_caption( $slide['caption'] ) . '</figure>'
		. '</div></section>';
}
