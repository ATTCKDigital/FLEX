<?php
/**
 * Template: Single
 * Description: Wordpress template for a single post page. 
 * Copy template and rename single-customposttype.php to create different templates for CPTs.
 *
**/
	get_header();

	$postID = get_the_ID();
	
	if (post_password_required()) {
		// If post is password protected, get the password form.
		// Edit form markup in child theme: config/theme-configs/password-protection.php
		echo get_the_password_form(); 
	} else {
		if (have_posts()) : while (have_posts()) : the_post();
				echo Utils::render_template('components/component_post/post-header.php');

				if (has_blocks($post->post_content)) {
					the_content();
				} else {
					// If using Classic Editor
					echo Utils::render_template('components/component_post/post-content.php');
				} // end Gutenberg check

				echo Utils::render_template('components/component_post/post-footer.php');
				endwhile;
		else:
			//show the 404 error message if there is no content for this page
			echo Utils::render_template('config/theme-includes/error-404.php');

		endif; // endif default loop
		wp_reset_query();  // reset the query after we are done outputting the page
	} //end password
	
	get_footer();
?>
