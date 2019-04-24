<?php 
	// Global Instagram 
	global $instagram;
	$instagramFeed = get_field('instagram_feed', 'options');
?>


<div class="component-instagram">
	<h4 class="<?= $this->displayTitleClass;?> align-center margin-bottom-2x"><a href="<?= $instagram;?>" target="_blank"><i class="fab fa-instagram"></i><?php _e( 'Instagram', '_flexlayout' );?></a></h4>
	<span class="display-block caption2 align-center uppercase margin-bottom-0x color-text-body"><a href="<?= $instagram;?>" target="_blank">@<?= get_field('instagram_username', 'options');?></a></span>
	<div class="instagram-feed">
		<?php echo do_shortcode('[instagram-feed]');?>
	</div>
	<?php if($this->ctaText){ ?>
		<div class="ctas align-center margin-top-3x">
			<a href="<?= $instagram;?>" target="_blank" class="cta"><?= $this->ctaText;?></a>
		</div>
	<?php } ?>
</div>

