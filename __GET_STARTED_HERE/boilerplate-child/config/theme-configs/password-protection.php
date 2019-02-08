<?php 
// Removes "private" or "protected" from title when using get_the_title() or the_title()
function flexls_title_trim($title) {
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
add_filter('the_title', 'flexls_title_trim');

//Exclude password protected posts from loops
function flexls_password_post_filter($where = '') {
	// Make sure this only applies to loops / feeds on the frontend
	if (!is_single() && !is_admin() && !is_page()) {
		// exclude password protected
		$where .= " AND post_password = ''";
	}
	return $where;
}
add_filter( 'posts_where', 'flexls_password_post_filter' );


// Custom markup for password protected form
function flexls_password_form() {
	global $post;
	$label = 'pwbox-' . (empty($post->ID) ? rand() : $post->ID);
	
	$form = '<div class="post-password-form"><form action="' . esc_url(site_url('wp-login.php?action=postpass', 'login_post')) . '" method="post">
	' . __('<header class="form-header"><p class="margin-mobile-bottom-40">To view content, please enter password.</p>') . '
	<div class="form-inner"><input name="post_password" id="' . $label . '" type="password" /><input type="submit" name="Submit" class="button" value="' . esc_attr__("Submit") . '" /></div>
	</form></div>
	';

	return $form;
}
add_filter('the_password_form', 'flexls_password_form');