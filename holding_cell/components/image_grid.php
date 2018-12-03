<?php
	//Image Grid Component
// intro_textText Area
// 3
// Top Images
// imagesGallery
// 4
// Quote Text
// quote_textText Area
// 5
// Long Text
// long_textText Area
// 6
// Small Image
// small_image
	$images = $globalRow['images'];
?>

<div class="component component-image-grid component-fade">
	<div class="pure-g">
		<div class="column pure-u-lg-8-12 pure-u-md-8-12 pure-u-sm-12-12 background-black padding-mobile-20 padding-tablet-landscape-85 padding-tablet-landscape-top-40 padding-tablet-landscape-bottom-40">
			<h2 class="headline2 color-standard-white"><?= $globalRow['intro_text'];?></h2>
		</div>
	</div>
	<div class="pure-g component-alignment-stretch">
		<div class="column pure-u-lg-8-12 pure-u-md-8-12 pure-u-sm-12-12">
			<div class="large-image">
				<img src="<?= $images[0]['url'];?>" alt="<?= $images[0]['title'];?>" title="<?= $images[0]['title'];?>" />
			</div>
		</div>
		<div class="column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12">
			<div class="small-image">
				<img src="<?= $images[1]['url'];?>" alt="<?= $images[1]['title'];?>" title="<?= $images[1]['title'];?>" />
			</div>
			<div class="small-image">
				<img src="<?= $images[2]['url'];?>" alt="<?= $images[2]['title'];?>" title="<?= $images[2]['title'];?>" />
			</div>
		</div>
	</div>
	<div class="pure-g component-alignment-stretch">
		<div class="column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12">
			<div class="small-image background-black padding-mobile-20 padding-tablet-landscape-30 padding-tablet-landscape-top-50 padding-tablet-landscape-bottom-50 component-alignment-center">
				<blockquote class="headline3 color-standard-white"><?= $globalRow['quote_text'];?></blockquote>
			</div>
			<div class="small-image">
				<img src="<?= $globalRow['small_image']['url'];?>" alt="<?= $globalRow['small_image']['title'];?>" title="<?= $globalRow['small_image']['title'];?>" />
			</div>
		</div>
		<div class="column pure-u-lg-8-12 pure-u-md-8-12 pure-u-sm-12-12">
			<div class="background-white padding-mobile-20 padding-tablet-landscape-85 padding-tablet-landscape-top-40 padding-tablet-landscape-bottom-40">
				<p class="large-body">
					<?= $globalRow['long_text'];?>
				</p>
			</div>
		</div>
	</div>
</div>