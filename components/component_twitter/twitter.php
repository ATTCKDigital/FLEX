<?php 
	// Global Twitter 
	$twitterShortcode = get_field('twitter_shortcode', 'options');
?>

<div class="component-twitter component margin-bottom-1x">
	<h4 class="headline6 color-text-primary"><?php _e('Twitter Feed', '_flexlayout');?></h4>
	<div class="twitter-items">
		<?php echo do_shortcode($twitterShortcode);?>
	</div>	
</div>

