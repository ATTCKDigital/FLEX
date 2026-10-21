<?php
/**
 * Carousel block: resolve the `slides` attribute into a render model.
 *
 * The block stores only attachment IDs plus optional alt / caption overrides,
 * and WordPress does not validate nested attribute items, so this is the
 * validator: invalid, missing and non-image attachments are skipped silently
 * and the remaining slides are renumbered.
 *
 * @package FLEX
 */

namespace FLEX_LAYOUT_SYSTEM\Blocks\ImageCarousel;

/**
 * A plain-text override from a slide item, trimmed ('' when absent or not text).
 *
 * @param array  $item Slide item.
 * @param string $key  `alt` or `caption`.
 * @return string
 */
function slide_text( array $item, string $key ): string {
	if ( ! isset( $item[ $key ] ) || ! is_scalar( $item[ $key ] ) || is_bool( $item[ $key ] ) ) {
		return '';
	}

	return trim( (string) $item[ $key ] );
}

/**
 * The attachment ID of a slide item, or 0 when it is not a positive integer.
 *
 * @param mixed $item Slide item.
 * @return int
 */
function slide_id( $item ): int {
	if ( ! is_array( $item ) || ! isset( $item['id'] ) || ! is_numeric( $item['id'] ) ) {
		return 0;
	}

	$id = (int) $item['id'];

	return $id > 0 ? absint( $id ) : 0;
}

/**
 * Intrinsic width and height: attachment metadata, else the `full` rendition.
 * SVGs without metadata give 0 × 0 (excluded from the ratio, no width/height).
 *
 * @param int   $id   Attachment ID.
 * @param array $full `wp_get_attachment_image_src( $id, 'full' )`.
 * @return int[] [ width, height ].
 */
function slide_dimensions( int $id, array $full ): array {
	$meta   = wp_get_attachment_metadata( $id );
	$width  = is_array( $meta ) && isset( $meta['width'] ) ? (int) $meta['width'] : 0;
	$height = is_array( $meta ) && isset( $meta['height'] ) ? (int) $meta['height'] : 0;

	if ( $width < 1 || $height < 1 ) {
		$width  = isset( $full[1] ) ? (int) $full[1] : 0;
		$height = isset( $full[2] ) ? (int) $full[2] : 0;
	}

	if ( $width < 1 || $height < 1 ) {
		return [ 0, 0 ];
	}

	return [ $width, $height ];
}

/**
 * `src`, `srcset` and `sizes` for one rendition ('' when core has none).
 *
 * @param int    $id   Attachment ID.
 * @param string $size Image size name.
 * @param array  $src  `wp_get_attachment_image_src( $id, $size )`.
 * @return array{src:string,srcset:string,sizes:string,width:int,height:int}
 */
function rendition( int $id, string $size, array $src ): array {
	$srcset = wp_get_attachment_image_srcset( $id, $size );
	$sizes  = wp_get_attachment_image_sizes( $id, $size );

	return [
		'src'    => isset( $src[0] ) ? (string) $src[0] : '',
		'srcset' => is_string( $srcset ) ? $srcset : '',
		'sizes'  => is_string( $sizes ) ? $sizes : '',
		'width'  => isset( $src[1] ) ? (int) $src[1] : 0,
		'height' => isset( $src[2] ) ? (int) $src[2] : 0,
	];
}

/**
 * Resolve one valid slide, or null to skip it.
 *
 * @param mixed $item Slide item from the attribute.
 * @return array|null
 */
function resolve_slide( $item ): ?array {
	$id = slide_id( $item );

	if ( 0 === $id || ! wp_attachment_is_image( $id ) ) {
		return null;
	}

	$full = wp_get_attachment_image_src( $id, 'full' );

	if ( ! is_array( $full ) || empty( $full[0] ) ) {
		return null;
	}

	$thumb = wp_get_attachment_image_src( $id, 'medium' );
	list( $width, $height ) = slide_dimensions( $id, $full );

	$alt = slide_text( $item, 'alt' );

	if ( '' === $alt ) {
		$media_alt = get_post_meta( $id, '_wp_attachment_image_alt', true );
		$alt       = is_string( $media_alt ) ? trim( $media_alt ) : '';
	}

	return [
		'id'      => $id,
		'width'   => $width,
		'height'  => $height,
		'alt'     => $alt,
		// Plain text; no fallback to the media-library caption (R-13).
		'caption' => slide_text( $item, 'caption' ),
		'full'    => rendition( $id, 'full', $full ),
		'thumb'   => rendition( $id, 'medium', is_array( $thumb ) ? $thumb : $full ),
	];
}

/**
 * Resolve the block's slides, in order, numbered from 1 after invalid ones
 * are removed.
 *
 * @param array $attributes Block attributes.
 * @return array[] Resolved slides.
 */
function resolve_slides( array $attributes ): array {
	$items  = isset( $attributes['slides'] ) && is_array( $attributes['slides'] ) ? $attributes['slides'] : [];
	$slides = [];
	$ids    = array_values( array_filter( array_map( __NAMESPACE__ . '\slide_id', $items ) ) );

	// One query for the posts and one for their meta, instead of two per slide.
	if ( $ids && function_exists( '_prime_post_caches' ) ) {
		_prime_post_caches( $ids, false, true );
	}

	foreach ( $items as $item ) {
		$slide = resolve_slide( $item );

		if ( null !== $slide ) {
			$slide['position'] = count( $slides ) + 1;
			$slides[]          = $slide;
		}
	}

	return $slides;
}
