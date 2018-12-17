<?php $GTM_ID = get_field('gtm_ID', 'options');?>

<?php if($GTM_ID) { ?>
	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?= get_field('gtm_ID', 'options');?>"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->
<?php } ?>