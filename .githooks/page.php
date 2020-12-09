<?php
	/**
	 * Template: Default
	 * Description: Wordpress template for a plain page.
	 */
	get_header();

	$postID = get_the_ID();
	
	$bodyBackground = get_field('body_background_desktop', $postID);
	$bodyBackgroundMobile = get_field('body_background_mobile', $postID);
	$bodyBackgroundColor = get_field('body_background_color', $postID);

	if ($bodyBackground || $bodyBackgroundMobile || $bodyBackgroundColor) {
		?>
			<style type="text/css">
				body {
					background-image: url('<?= wp_get_attachment_image_url( $bodyBackground, 'full' );?>');
					background-repeat: no-repeat;
					background-position: top center;
					background-size: 100% auto;
					background-color: <?= $bodyBackgroundColor;?>
				}

				@media only screen and (max-width: 1099px) {
					body {
						background-size: cover;
					}
				}

				@media only screen and (max-width: 1023px) {
					body {
						background-image: url('<?= wp_get_attachment_image_url( $bodyBackgroundMobile, 'full' );?>');
						background-size: cover;
					}
				}
			</style>
		<?php
	} //endif body background 

	if (have_posts()) : while (have_posts()) : the_post();
			if ( has_blocks( $post->post_content ) ) {
				// If the using blocks
				the_content();
			} else {
				// If using Classic Editor
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
