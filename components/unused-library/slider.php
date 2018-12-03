<section class="component component-slider" data-component-name="Slider">
	<?php
		$sliderItems = $globalColumn['slider_items'];
	?>
	<div class="slider-container">
		<div class="slider-items">
			<?php
				foreach ($sliderItems as $sliderItem) {
					
					$sliderItemImage = $sliderItem['url'];
					$sliderItemTitle = $sliderItem['title'];

			?>
					<div class="slider-item">
						<img src="<?= $sliderItemImage;?>" alt="<?= $sliderItemTitle; ?>" title="<?= $sliderItemTitle; ?>" />
					</div>
			<?php 

				} 
			?>
		</div>
	</div>
</section>
