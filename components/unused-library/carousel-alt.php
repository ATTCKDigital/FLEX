<!-- Alternate Carousel component -->
<?php
	$slides = get_sub_field("carousel_alt_slides");
?>

<section
	class="component component-carousel component-carousel-alt"
	data-component-name="Carousel"
	data-component-options='{"dots": true, "arrows": true}'
>
	<div class="slides-container">
		<?php
			$i = 0;
			foreach ($slides as $slide) {
				$slideImage = $slide["carousel_alt_image"]["url"];
				$i++;
		?>
			<div class="slide <?php if($i == 0){echo ' active';}?>" id="slide-<?= $i;?>">
				<?php if ( $slideImage ) { ?>
					<img src="<?= $slideImage; ?>" alt="<?= $slideTitle = $slide["carousel_alt_heading"];?>" title="<?= $slideTitle = $slide["carousel_alt_heading"];?>" />
				<?php } ?>
			</div>
		<?php
			$i++;
			}
		?>
	</div>
	<div class="content-pane">
		<div class="content-slides-container">
			<?php
				$i = 0;
				foreach ($slides as $slide) {
					$slideTitle = $slide["carousel_alt_heading"];
					$slideText  = $slide["carousel_alt_text"];
					$slideLink  = $slide["carousel_alt_post_link"];
					$slideLinkText  = $slide["carousel_alt_link_text"];
			?>

			<div class="content-slide <?php if($i == 0){echo ' active';}?>" id="content-slide-<?= $i;?>">
				<?php if ($slideTitle) { ?>
					<h2 class="headline2"><?php if($slideLink){ ?><a href="<?php $slideLink;?>"><?php } ?><?php echo $slideTitle; ?><?php if($slideLink){ ?></a><?php } ?></h2>
				<?php } ?>
				<?php if ($slideText) { ?>
					<p><?php echo wp_trim_words($slideText, 40); ?></p>
				<?php } ?>

				<?php if ($slideLink && $slideLinkText) { ?>
					<div class="buttons">
						<a href="<?php echo $slideLink; ?>" class="button btn-read-more"><?php echo $slideLinkText; ?></a>
					</div>
				<?php } ?>
			</div>
			<?php
				$i++;
				}
			?>
		</div>
	</div>
</section>
