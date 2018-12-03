<?php
	//Slider component
	$mainTitle = $globalRow['main_title'];
	$sliderImages = $globalRow['slider_images'];
?>

<div class="component component-slider component-fade" data-component-name="Slider">
	<?php if($mainTitle){ ?>
		<div class="pure-g">
			<div class="column pure-u-lg-6-12 pure-u-md-6-12 pure-u-sm-12-12 padding-mobile-20 padding-tablet-landscape-top-40 padding-tablet-landscape-bottom-40 padding-tablet-landscape-left-85 padding-tablet-landscape-right-85 background-black">
				<div class="text">
					<h2 class="headline2 color-standard-white"><?= $mainTitle;?></h2>
				</div>
			</div>
		</div>
	<?php } ?>
	<div class="pure-g">
		<div class="column pure-u-lg-3-12 pure-u-md-3-12 mobile-hidden"></div>
		<div class="column pure-u-lg-9-12 pure-u-md-9-12 pure-u-sm-12-12">
			<div class="slider">
				<div class="slider-items">
					<?php
						$i = 0;
						foreach ($sliderImages as $sliderImage) {
							$i++;
							$slide = $sliderImage['slider_image'];
					?>
						<div class="slider-item<?php if($i == 1){echo ' activeSlide';}?>" data-slide-id="slide-<?= $i;?>">
							<img src="<?= $slide['url'];?>" alt="<?= $slide['title'];?>" title="<?= $slide['title'];?>" />
						</div>
					<?php } ?>
					
				</div>
				<div class="caption-wrapper background-black">
					<mark class="arrow arrow-next"></mark>
					<mark class="arrow arrow-prev"></mark>
					<div class="captions">
						<?php
							$i = 0;
							foreach ($sliderImages as $sliderImage) {
								$i++;
								$slide = $sliderImage['slider_image'];
						?>
								<div class="slide-caption<?php if($i == 1){echo ' activeSlide';}?>"  data-slide-id="slide-<?= $i;?>">
									<p class="caption color-standard-white"><?= $slide['caption'];?></p>
								</div>
						<?php } ?>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>