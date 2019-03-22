<?php
/**
 * Template: 404
 * Description: Wordpress template for the 404 page.
 *
**/
	get_header();
?>
	<section class="component-row padding-small-top-3x padding-large-top-6x padding-small-bottom-3x padding-large-bottom-6x component">
		<div class="pure-g component-row-wide component-alignment-top">
			<div class="column flex-g-lg-2-12 flex-g-md-2-12 flex-g-sm-12-12"></div>
			<div class="column flex-g-lg-8-12 flex-g-md-8-12 flex-g-sm-12-12">
				<div class="component component-error-404">
					<?php echo Utils::render_template('config/theme-includes/error-404.php'); ?>
				</div>
			</div>
		</div>
	</section>
<?php
	get_footer();
?>