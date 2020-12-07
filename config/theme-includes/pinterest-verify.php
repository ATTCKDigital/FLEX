<?php $pinterest_ID = get_field('pinterest_business_id', 'options');?>

<?php if($pinterest_ID) { ?>
	<meta name="p:domain_verify" content="<?= $pinterest_ID;?>"/>
<?php } ?>