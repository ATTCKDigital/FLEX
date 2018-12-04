<?php


/**
 * Custom size for title column
 */
// function my_column_width() {
// 	echo '<style type="text/css">';
// 	echo '.column-title { width:200px !important;}';
// 	echo '</style>';
// }
// add_action('admin_head', 'my_column_width');


/**
 * Disable comments column
 * https://wordpress.stackexchange.com/questions/232802/remove-comment-column-in-all-post-types
 */


/**
 * Remove pingbacks from comment count
 */
add_filter('get_comments_number', 'comment_count', 0);
function comment_count($count) {
	global $id;
	$comments = get_approved_comments($id);
	$comment_count = 0;

	foreach($comments as $comment){
		if ($comment->comment_type == '') {
			$comment_count++;
		}
	}

	return $comment_count;
}

/**
 * Allow upload of svg
 */


/**
 * Adds a custom class to every image inserted into a post, customizes
 * alignment modifier
 */
function post_img_add_class($class, $id, $align, $size) {
	$classes = ['post-img'];
	$classes[] = 'post-img-' . $align . ' ' . $id;

	return implode(' ', $classes);
}
add_filter('get_image_tag_class','post_img_add_class', 0, 4);



/**
 * Creates an excerpt function that allows for customized lengths per location it is used
 * usage: <?= excerpt(20);?> where 20 is the number of words and can be changed as needed
 */
function excerpt($limit) {
	  $excerpt = explode(' ', get_the_excerpt(), $limit);
	  if (count($excerpt) >= $limit) {
		array_pop($excerpt);
		$excerpt = implode(' ', $excerpt) . '...';
	  } else {
		$excerpt = implode(' ', $excerpt);
	  }
	  $excerpt = preg_replace('`\[[^\]]*\]`', '', $excerpt);
	  return $excerpt;
}





/*** Remove Buddypress scripts that slow things down ****/
function dequeue_buddypress() {
	if (!is_admin()) {
		wp_dequeue_style('bp-nouveau');
		wp_deregister_script('bp-jquery-query');
		wp_deregister_script('bp-confirm');
	}
}
add_action('wp_enqueue_scripts', 'dequeue_buddypress');

/**
 * Remove cf7 styles
 */
add_action('wp_print_styles', 'wps_deregister_styles', 100);
function wps_deregister_styles() {
	wp_deregister_style( 'contact-form-7' );
}

/**
 * Echoes out the current year
 */
function year_shortcode() {
	$year = date('Y');

	return $year;
}
add_shortcode('year', 'year_shortcode');

/**
 * Echoes out responsive-friendly shortcodes
 */
function br_shortcode() {
	$br = '<br class="break"/>';

	return $br;
}
add_shortcode('br', 'br_shortcode');




/**
 * Page Slug Body Class
 */
function add_slug_body_class($classes) {
	global $post;
	if (isset($post)) {
		$classes[] = $post->post_type . '-' . $post->post_name;
	}

	return $classes;
}
add_filter( 'body_class', 'add_slug_body_class' );

/**
 * Move Yoast Meta Box to bottom
 */
function yoasttobottom() {
	return 'low';
}

add_filter( 'wpseo_metabox_prio', 'yoasttobottom');
