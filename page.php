<?php
	/**
	 * Template: Default
	 * Description: Wordpress template for a plain page.
	 */
	// echo '<!-- Template: FLEX/page.php -->';

	get_header();

	$postID = get_the_ID();
	
	// Add background image or color settings from page properties
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
					background-color: <?= $bodyBackgroundColor; ?>
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
	}

	if (have_posts()) : 
		while (have_posts()) : the_post();
			// If using Gutenberg blocks
			if ( has_blocks( $post->post_content ) ) {
				the_content();
			
			// If using Classic Editor
			} else {
				echo Utils::render_template('components/component_post/page.php');
			}
		endwhile;
	else:
		_e("Sorry, no pages matched your criteria.");
	endif;

	get_footer();
?>
