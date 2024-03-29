<?php
namespace FLEX_LAYOUT_SYSTEM;

/**
 * Registering meta fields for block attributes that use meta storage
 */
function register_meta_fields() {
	register_meta(
		'post',
		'flexlayout_gb_metabox',
		[
			'type'         => 'string',
			'single'       => true,
			'show_in_rest' => true,
		] );
}

add_action( 'init', __NAMESPACE__ . '\register_meta_fields' );
