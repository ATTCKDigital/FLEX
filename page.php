<?php
/**
 * Template: Default
 * Description: Wordpress template for a plain page.
 *
 */
    get_header();

        if (have_posts()) : while (have_posts()) : the_post();

			if ( has_blocks( $post->post_content ) ) {
				//If the using blocks
    			the_content();
			} else {
				//If using Classic Editor
				echo Utils::render_template('components/component_post/page.php');

			} // end Gutenberg check
        endwhile; // endwhile default loop
        else:
?>
        <p>Sorry, no pages matched your criteria.</p>
<?php
        endif; // endif default loop
get_footer();
?>
