
<?php
	//Images and Text component

	$header = $globalRow['header'];
	$introText = $globalRow['intro_text'];
	$longText = $globalRow['long_text'];
	$images = $globalRow['images'];
	$introBackground = $globalRow['intro_background_color'];

	$imageCount = count($images);
	$imageCount = (100 / $imageCount);
	$id = 'imageText-'.rand();

	if($images) {
		$introGrid = 'pure-u-lg-12-12 pure-u-md-12-12 pure-u-sm-12-12';
		$textGrid = 'pure-u-lg-7-12 pure-u-md-7-12 pure-u-sm-12-12';
		$textOffset = '';

	} else {
		$introGrid = 'pure-u-lg-9-12 pure-u-md-9-12 pure-u-sm-12-12';
		$textGrid = 'pure-u-lg-9-12 pure-u-md-9-12 pure-u-sm-12-12';
		$textOffset = '<div class="column pure-u-lg-3-12 pure-u-md-3-12 mobile-hidden"></div>';
	}
?>

<div class="component component-image-text component-fade" id="<?= $id;?>">
	<div class="pure-g">
		<div class="column pure-u-lg-3-12 pure-u-md-3-12 pure-u-sm-12-12">
			<div class="header header-tab header-tab-small">
				<div class="header-tab-inner">
					<h2 class="headline2 color-standard-white"><?= $header;?></h2>
				</div>
			</div>
		</div>
	</div>
	<?php if($introText){ ?>
		<div class="pure-g">
			<?= $textOffset;?>
			<div class="column <?= $introGrid;?> component-theme-<?= $introBackground;?> padding-mobile-40 padding-tablet-landscape-85 padding-tablet-landscape-top-60 padding-tablet-landscape-bottom-60">
				<div class="main-content-item">
					<h2 class="headline2 color-standard-<?php if($introBackground == 'black'){echo 'white';} else {echo 'black';}?>"><?= $introText;?></h2>
				</div>
			</div>
		</div>	
	<?php } ?>
	<div class="pure-g">
		<?= $textOffset;?>
		<div class="column <?= $textGrid;?>">
			<div class="body-text padding-mobile-40 padding-tablet-landscape-85 padding-tablet-landscape-top-60 padding-tablet-landscape-bottom-60 background-white">
				<?= $longText;?>
			</div>
		</div>
		<?php if($images){ ?>
			<div class="column pure-u-lg-5-12 pure-u-md-5-12 pure-u-sm-12-12">
				<div class="images">
					<style>
						@media only screen and (min-width: 1024px) {

							#<?= $id;?> .image-wrapper {
								height: <?= $imageCount;?>%;
							}
						}
					</style>
					<?php foreach ($images as $image) { ?>
						<div class="image-wrapper">
							<img src="<?= $image['url'];?>" alt="<?= $image['title'];?>" title="<?= $image['title'];?>" />
						</div>
					<?php } ?>
				</div>
			</div>
		<?php } ?>
	</div>	
</div>