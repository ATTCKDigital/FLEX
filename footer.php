	</main><!-- Close site <main> -->
</div> <!-- Close content-container div -->
<footer class="component-footer body-padding" role="contentinfo">
	<?php echo Utils::render_template('components/component_footer/footer.php'); ?>
</footer>
<?php
	if ( get_field('show_gdpr', 'options') ) {
		// Show the GDPR pop-up if the option is enabled
		echo Utils::render_template('components/component_gdpr/gdpr.php');
	}
?>
<?php wp_footer(); ?>
</body>
</html>
