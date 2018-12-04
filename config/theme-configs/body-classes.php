<?php

//Page Slug Body Class. Creates a body class based on the page slug

function attck_add_slug_body_class($classes) {
	global $post;
	if (isset($post)) {
		$classes[] = $post->post_type . '-' . $post->post_name;
	}

	return $classes;
}
add_filter( 'body_class', 'attck_add_slug_body_class' );