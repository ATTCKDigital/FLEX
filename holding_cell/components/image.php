<?php
	//Image component
	$image = $globalRow['image'];
	$columns = $globalRow['image_width'];

	if(!$columns) {
		$offset = '3';
		$columns = '9';
	} else {
		$columns = intval($columns);
		$offset = 12 - $columns;	
	}
?>

<div class="component component-large-text component-fade">
	<div class="pure-g">
		<div class="column pure-u-lg-<?= $offset;?>-12 pure-u-md-<?= $offset;?>-12 mobile-hidden"></div>
		<div class="column pure-u-lg-<?= $columns;?>-12 pure-u-md-<?= $columns;?>-12 pure-u-sm-12-12">
			<div class="image">
				<img src="<?= $image['url'];?>" alt="<?= $image['title'];?>" title="<?= $image['title'];?>" />
			</div>
		</div>
	</div>
</div>