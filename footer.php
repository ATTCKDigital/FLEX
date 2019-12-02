	</main><!-- Close site <main> -->
</div> <!-- Close content-container div -->
<footer class="component-footer">
	<?php echo Utils::render_template('components/component_footer/footer.php'); ?>
</footer>
<?php
	if(get_field('show_gdpr', 'options')){
		//show the GDPR pop-up if the option is enabled
		echo Utils::render_template('components/component_footer/gdpr.php');
	}
?>
<?php wp_footer(); ?>
		<!-- Start Quantcast Tag -->
<script type="text/javascript">
	switch (true) {
		// (Development)
		case window.location.hostname === 'squatdev.wpengine.com':
			quantcastID = 'p-Lms367ytfWULU';

			break;

		// (Staging)
		case window.location.hostname === 'squatstaging.wpengine.com':
			quantcastID = 'p-Lms367ytfWULU';

		// (Production)
		default:
			// (Local)
			quantcastID = 'p-Lms367ytfWULU';
	}

	var _qevents = _qevents || [];

	(function() {
	  var elem = document.createElement('script');
	  elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
	  elem.async = true;
	  elem.type = "text/javascript";
	  var scpt = document.getElementsByTagName('script')[0];
	  scpt.parentNode.insertBefore(elem, scpt);
	 })();

	_qevents.push({qacct: quantcastID});

</script>
<noscript>
<img src="//pixel.quantserve.com/pixel/p-CODE.gif?labels" style="display: none;" border="0" height="1" width="1" alt="Quantcast"/>
</noscript>
<!-- End Quantcast tag -->
</body>
</html>
