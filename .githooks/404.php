<?php
/**
 * Template: 404
 * Description: Wordpress template for the 404 page.
 *
**/
	get_header();
?>
	<section class="component-row padding-top-3x padding-tablet-landscape-top-6x padding-bottom-3x padding-tablet-landscape-bottom-6x component">
		<div class="flex-grid component-row-wide component-alignment-top">
			<div class="column flex-tablet-landscape-2-12 flex-tablet-portrait-2-12 flex-12-12"></div>
			<div class="column flex-tablet-landscape-8-12 flex-tablet-portrait-8-12 flex-12-12">
				<div class="component component-error-404">
					<?php echo Utils::render_template('config/theme-includes/error-404.php'); ?>
				</div>
			</div>
		</div>
	</section>
<?php
	get_footer();
?>