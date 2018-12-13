<?php
/**
 * Template: 404
 * Description: Wordpress template for the 404 page.
 *
**/
	get_header();
?>
	<section class="component component-error-404">
		<?php echo Utils::render_template('config/theme-includes/error-404.php'); ?>
	</section>
<?php
	get_footer();
?>