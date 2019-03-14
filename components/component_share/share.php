<?php 
	// Share

	$url = get_permalink();
	$encoded = urlencode($url);
?>

<div class="component-share component" data-component-name="Share">
	<?php if($this->displayTitle){ ?>
		<h4 class="caption2 color-text-primary uppercase display-block margin-small-bottom-1x"><?= $this->displayTitle;?></h4>
	<?php } ?>
	<div class="share-tools">
		<a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $encoded;?>" target="_blank" data-options="menubar=1,resizable=1,width=600,height=400" class="margin-right-10 share-button share-facebook sharelink"><i class="fab fa-facebook-f fa-2x"></i></a>
		<a href="https://twitter.com/home/?status=<?php the_title() ?>: <?php the_permalink() ?> via @<?= get_field('twitter_username', 'options');?>" target="_blank" data-options="menubar=1,resizable=1,width=600,height=400" class="share-button share-twitter sharelink"><i class="fab fa-twitter fa-2x"></i></a>
	</div>
</div>

