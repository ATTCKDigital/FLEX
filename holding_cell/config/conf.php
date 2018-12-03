<?php
/**
 * Take out comments, links, and other things (in the future) from the admin
 * menu. We're not interested in them
 */
function remove_admin_menu_items() {
	$remove_menu_items = array(__('Links'));
	global $menu;
	end ($menu);

	while (prev($menu)) {
		$item = explode(' ', $menu[key($menu)][0]);

		if (in_array($item[0] != NULL?$item[0]: '', $remove_menu_items)) {
			unset($menu[key($menu)]);
		}
	}

	remove_menu_page('edit-comments.php');
}
add_action('admin_menu', 'remove_admin_menu_items');

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
function disable_comments() {
	$post_types = get_post_types();
	foreach ($post_types as $post_type) {
		if (post_type_supports($post_type,'comments')) {
			remove_post_type_support($post_type,'comments');
			remove_post_type_support($post_type,'trackbacks');
		}
	}
}
add_action('admin_init','disable_comments');

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
function cc_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

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
 * Adds a custom class to every youtube or vimeo video inserted into a post using just a url, to allow for responsive video
 */
function wrap_embed_with_div($html, $url, $attr) {
		if (strpos($url, 'youtube') !== false) {
			return '<div class="video-wrapper">' . $html . '</div>';
		} elseif (strpos($url, 'vimeo') !== false) {
			return '<div class="video-wrapper">' . $html . '</div>';
		} else {
			return $html;
		}
}
add_filter('embed_oembed_html', 'wrap_embed_with_div', 10, 3);

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

/**
 *
 * Unwraps p/a tags around img
 */
function filter_tags_on_images($content) {
	return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
}
add_filter('the_content', 'filter_tags_on_images');

/**
 *
 * Enqueues our scripts
 */
function _scripts() {
	if (!is_admin()) {
		wp_deregister_script('jquery');
		wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js', '', '2.2.4', true);
	}

	wp_enqueue_script("afp_script", get_template_directory_uri() . "/dist/js/main.js", array(), null, true);

	//remove default bbpress and buddypress styles
	wp_dequeue_style( 'bp_enqueue_scripts' );
	wp_deregister_style( 'bbp-default' );


	// Load more vars
	wp_localize_script('afp_script', 'afp_vars', array(
			// Create nonce which we later will use to verify AJAX request
			'afp_nonce' => wp_create_nonce( 'afp_nonce' ),
			'afp_ajax_url' => admin_url( 'admin-ajax.php' ),
		)
	);
}
add_action('wp_enqueue_scripts', '_scripts', PHP_INT_MAX);

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
 * Removes "private" or "protected" from title
 */
function the_title_trim($title) {
	$title = ESC_ATTR($title);

	$findthese = array(
		'#Protected:#',
		'#Private:#'
	);

	$replacewith = array(
		'', // What to replace "Protected:" with
		'' // What to replace "Private:" with
	);

	$title = preg_replace($findthese, $replacewith, $title);

	return $title;
}
add_filter('the_title', 'the_title_trim');

/**
 * Exclude password protected posts from loops
 */
function my_password_post_filter($where = '') {
	// Make sure this only applies to loops / feeds on the frontend
	if (!is_single() && !is_admin() && !is_page()) {
		// exclude password protected
		$where .= " AND post_password = ''";
	}
	return $where;
}
add_filter( 'posts_where', 'my_password_post_filter' );


/**
 * Change markup for form
 */
function password_form() {
	global $post;
	$label = 'pwbox-' . (empty($post->ID) ? rand() : $post->ID);
	$o = '<div class="post-password-form"><form action="' . esc_url(site_url('wp-login.php?action=postpass', 'login_post')) . '" method="post">
	' . __('<header class="form-header"><p class="margin-mobile-bottom-40">To view content, please enter password.</p>') . '
	<div class="form-inner"><input name="post_password" id="' . $label . '" type="password" /><input type="submit" name="Submit" class="button" value="' . esc_attr__("Submit") . '" /></div>
	</form></div>
	';

	return $o;
}
add_filter('the_password_form', 'password_form');

/**
 * Add excerpts on pages
 */
add_action('init', 'my_add_excerpts_to_pages');
function my_add_excerpts_to_pages() {
	 add_post_type_support('page', 'excerpt');
}

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
