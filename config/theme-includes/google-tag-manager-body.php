<?php 
	$GTM_ID = get_field('gtm_ID', 'options');
	$GA_type = get_field('select_analytics_type', 'options');
?>

<?php if($GTM_ID && $GA_type == 'gtm') { ?>
	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?= $GTM_ID;?>"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->
<?php } ?>

