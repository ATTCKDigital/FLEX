<?php
/**
 * Template: Single
 * Description: Wordpress template for a single post page. 
 * Copy template and rename single-customposttype.php to create 
 * different templates for Custom Post Types (CPTs).
 */
	get_header();

	$postID = get_the_ID();
	
	if (post_password_required()) {
		// If post is password protected, get the password form.
		// Edit form markup in child theme: config/theme-configs/password-protection.php
		echo get_the_password_form(); 
	} else {
		if (have_posts()) : while (have_posts()) : the_post();
				echo Utils::render_template('components/component_post/post-header.php');

				// If using Gutenberg blocks
				if (has_blocks($post->post_content)) {
					the_content();


				// If using Classic Editor
				} else {
					echo Utils::render_template('components/component_post/post-content.php');
				}

				echo Utils::render_template('components/component_post/post-footer.php');
				endwhile;
		else:
			//show the 404 error message if there is no content for this page
			echo Utils::render_template('config/theme-includes/error-404.php');

		endif;

		// Reset the query after we are done outputting the page
		wp_reset_query();
	}
	
	get_footer();
?>
