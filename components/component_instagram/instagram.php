<?php 
	// Global Instagram 
	global $instagram;
	$instagramFeed = get_field('instagram_feed', 'options');
?>


<div class="component-instagram">
	<h4 class="<?= $this->displayTitleClass;?> align-center margin-small-bottom-2x"><a href="<?= $instagram;?>" target="_blank"><i class="fab fa-instagram"></i>Instagram</a></h4>
	<span class="display-block caption2 align-center uppercase margin-small-bottom-0x color-text-black"><a href="<?= $instagram;?>" target="_blank">@<?= get_field('instagram_username', 'options');?></a></span>
	<div class="instagram-feed">
		<?php echo do_shortcode('[instagram-feed]');?>
	</div>
	<?php if($this->ctaText){ ?>
		<div class="ctas align-center margin-small-top-3x">
			<a href="<?= $instagram;?>" target="_blank" class="button"><?= $this->ctaText;?></a>
		</div>
	<?php } ?>
</div>

