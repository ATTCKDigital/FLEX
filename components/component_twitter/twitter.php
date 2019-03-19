<?php 
	// Global Twitter 
	$twitterShortcode = get_field('twitter_shortcode', 'options');
?>

<div class="component-twitter component margin-small-bottom-1x">
	<h4 class="headline6 color-text-primary">Twitter Feed</h4>
	<div class="twitter-items">
		<?php echo do_shortcode($twitterShortcode);?>
	</div>	
</div>

