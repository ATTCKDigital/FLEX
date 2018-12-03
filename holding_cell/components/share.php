<div class="component-share component" data-component-name="Share">
	<?php
			$url = get_permalink();
			$encoded = urlencode($url);
	?>
	<div class="post-share">
		<h3 class="padding-bottom-20"><small>Share this article</small></h3>
			<a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $encoded;?>" target="_blank" data-options="menubar=1,resizable=1,width=600,height=400" class="margin-right-10 share-button share-facebook sharelink"><i class="fab fa-facebook-f fa-2x"></i></a>
			<a href="https://twitter.com/home/?status=<?php the_title() ?>: <?php the_permalink() ?> via @" target="_blank" data-options="menubar=1,resizable=1,width=600,height=400" class="share-button share-twitter sharelink"><i class="fab fa-twitter fa-2x"></i></a>
	</div>
</div>
