<?php 
	// Share

	$url = $this->url;
	$encoded = urlencode($url);
	$title = $this->socialTitle;
	$search = array(
      	'&#8220;',
		'&#8221;',
		'&#8216;',
		'&#8217;',
		'&#8211;',
		'#'
	);

	$replace = array(
		'\"',
		'\"',
		"\'",
		"\'",
		"-",
		"%23"
	);

	$newtitle = str_replace($search, $replace, $title);
?>

<div class="component-share component" data-component-name="Share">
	<?php if($this->displayTitle){ ?>
		<h3 class="caption2 color-text-primary uppercase display-block margin-right-1x"><?= $this->displayTitle;?></h3>
	<?php } ?>
	<div class="share-tools">
		<a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $encoded;?>" target="_blank" data-options="menubar=1,resizable=1,width=600,height=400" class="share-button share-facebook sharelink"><i class="fab fa-facebook-f fa-2x" aria-label="Share this on Facebook"></i></a>
		<a href="https://twitter.com/home/?status=<?= $newtitle ?>: <?= $encoded; ?> via @<?= get_field('twitter_username', 'options');?>" target="_blank" data-options="menubar=1,resizable=1,width=600,height=400" class="share-button share-twitter sharelink" aria-label="Share this on Twitter"><i class="fab fa-twitter fa-2x"></i></a>
		<a href="mailto:?subject=I thought you might be interested in <?= $newtitle ?>&body=<?= $newtitle ?> <?= $encoded; ?>" data-options="menubar=1,resizable=1,width=600,height=400" aria-label="Share this via email" class="share-button share-email sharelink"><i class="far fa-envelope"></i></a>
	</div>
</div>

