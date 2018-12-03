<section class="component component-gallery" data-component-name="Gallery">
	<?php
		$galleryItems = $globalColumn['gallery_items'];
		$galleryCounts = count($galleryItems);
	?>
	<div class="gallery-container">
		<div class="gallery-items">
			<?php
				$i = 1;
				foreach ($galleryItems as $galleryItem) {
					
					$galleryItemImage = $galleryItem['sizes']['square'];
					$galleryItemTitle = $galleryItem['title'];

					if($i % 9 == 6){
						$wideClass = ' gallery-group-small-wide';
					} else {
						$wideClass = '';
					}
			?>
				<?php if($i % 9 == 1){echo '<div class="gallery-group gallery-group-5">';}?>
				<?php if($i % 9 == 6){echo '<div class="gallery-group gallery-group-4">';}?>
					<?php if(($i % 9 == 5 && $i % 2 == 1) || ($i % 9 == 1 && $i % 2 == 0)){echo '<div class="gallery-group-inner-large">';}?>
					<?php if($i % 2 == 1 && ($i % 3 == 1 || $i % 3 == 2) && ($i % 9 == 2 || $i % 9 == 1)){echo '<div class="gallery-group-inner-4">';}?>
					<div class="gallery-item" data-slide-id="slide-<?= $i;?>">
						<img src="<?= $galleryItemImage;?>" alt="<?= $galleryItemTitle; ?>" title="<?= $galleryItemTitle; ?>" />
					</div>
					<?php if(($i % 9 == 5 && $i % 2 == 1) || ($i % 9 == 1 && $i % 2 == 0)){echo '</div>';} //close large?>
					<?php if($i % 2 == 0 && ($i % 3 == 1 || $i % 3 == 2) && ($i % 9 == 4 || $i % 9 == 5)){echo '</div>';} //close inner group 4?>
				<?php if($i % 9 == 0){echo '</div>';} //close group 4?>
				<?php if($i % 9 == 5){echo '</div>';} //close group 5?>
			<?php 
				$i++;

				} 
			?>
		</div>
	</div>

	<div class="gallery-popup">
		<mark class="close close-black" id="closeGallery"></mark>
		<mark class="arrow arrow-prev">
			<?php
				echo Utils::render_template("inc/templates/svg.php", array(
					"id" => "long-arrow",
					"classes" => "long-arrow",
					"data" => ""
				));
			?>
		</mark>
		<mark class="arrow arrow-next">
			<?php
				echo Utils::render_template("inc/templates/svg.php", array(
					"id" => "long-arrow",
					"classes" => "long-arrow",
					"data" => ""
				));
			?>
		</mark>
		<div class="gallery-popup-inner">
			<div class="gallery-popup-items">
				<?php
					$i = 1;
					foreach ($galleryItems as $galleryItem) {
						$galleryItemImage = $galleryItem['url'];
						$galleryItemTitle = $galleryItem['title'];

				?>
					<div class="gallery-popup-item<?php if($i == 1){echo ' activeSlide';}?>" id="slide-<?= $i;?>">
						<img src="<?= $galleryItemImage;?>" alt="<?= $galleryItemTitle; ?>" title="<?= $galleryItemTitle; ?>" />
					</div>
				<?php 
					$i++;
					} 
				?>
			</div>
		</div>
	</div>
</section>
