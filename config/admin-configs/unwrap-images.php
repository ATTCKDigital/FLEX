<?php 
//Unwraps p/a tags around img
function attck_filter_tags_on_images($content) {
	return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
}
add_filter('the_content', 'attck_filter_tags_on_images');

// Adds a custom class to every image inserted into a post, customizes
// alignment modifier
function attck_post_img_add_class($class, $id, $align, $size) {
	$classes = ['post-img'];
	$classes[] = 'post-img-' . $align . ' ' . $id;

	return implode(' ', $classes);
}
add_filter('get_image_tag_class','attck_post_img_add_class', 0, 4);