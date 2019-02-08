<?php 
//Unwraps p/a tags around img
function flexls_filter_tags_on_images($content) {
	return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
}
add_filter('the_content', 'flexls_filter_tags_on_images');

// Adds a custom class to every image inserted into a post, customizes
// alignment modifier
function flexls_post_img_add_class($class, $id, $align, $size) {
	$classes = ['post-img'];
	$classes[] = $align;

	return implode(' ', $classes);
}
add_filter('get_image_tag_class','flexls_post_img_add_class', 0, 4);