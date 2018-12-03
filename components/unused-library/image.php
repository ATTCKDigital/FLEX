<!-- Image component -->
<?php
	$image = $globalColumn['image'];
	$imageLink = $globalColumn['image_link'];
	$imageLinkExternal = $globalColumn['image_link_external'];

	if($imageLink) {
		$imageLink = $imageLink;
	} else if($imageLinkExternal) {
		$imageLink = $imageLinkExternal;
	} else {
		$imageLink = '';
	}
?>
<section class="component-image">
	<div class="content-wrapper">
		<?php if($imageLink){?><a href="<?= $imageLink;?>"<?php if($imageLinkExternal){ echo ' target="_blank"';}?>><?php } ?><img src="<?= $image['url'];?>" alt="<?= $image['title'];?>" title="<?= $image['title'];?>" /><?php if($imageLink){?></a><?php } ?>
	</div>
</section>