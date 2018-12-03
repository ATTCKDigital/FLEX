</main>
</div>
<?= get_global_option('hubspot_global_js_includes', 'options');?>
<footer class="page-footer component-theme-black row-text-white dont-fade-me-in">
	<div class="footer-wrapper">
		<?php include 'inc/templates/footer-inner.php'; ?>
	</div>
</footer>
<div class="search-popup dont-fade-me-in">
	<?php 
        echo Utils::render_template("inc/templates/search-form.php", array(
            "searchTerm" => ''
        ));
    ?>
</div>

<?php wp_footer(); ?>
</body>
</html>
