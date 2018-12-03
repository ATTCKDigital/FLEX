<?php 
	$textPosition = $globalColumn['grid_text_position'];

?>
<section class="component component-grid flex-<?= $textPosition;?>">
	<div class="grid-item<?php if($textPosition == 'left') { echo ' grid-text-left';}?>">
		<?php if($globalColumn['grid_image_left']){ ?>
			<div class="grid-image">
				<img src="<?= $globalColumn['grid_image_left']['url'];?>" />
			</div>
		<?php } ?>
		<?php if($textPosition == 'left') { ?>
			<div class="grid-text">
				<?php if($globalColumn['grid_link']){?><a href="<?= $globalColumn['grid_link'];?>" class="grid-link"></a><?php } ?>
				<div class="grid-text-inner">
					<div class="grid-text-positioning">
						<h2 class="headline2 bottom-border bottom-border-small"><?= $globalColumn['grid_text_title'];?></h2>
						<p class="paragraph-large"><?= $globalColumn['grid_text'];?></p>
					</div>
				</div>
			</div>
		<?php } ?>
	</div>
	<div class="grid-item<?php if($textPosition == 'right') { echo ' grid-text-right';}?>">
		<?php if($globalColumn['grid_image_right']){ ?>
			<div class="grid-image">
				<img src="<?= $globalColumn['grid_image_right']['url'];?>" />
			</div>
		<?php } ?>
		<?php if($textPosition == 'right') { ?>
			<div class="grid-text">
				<?php if($globalColumn['grid_link']){?><a href="<?= $globalColumn['grid_link'];?>" class="grid-link"></a><?php } ?>
				<div class="grid-text-inner">
					<div class="grid-text-positioning">
						<h2 class="headline2 bottom-border bottom-border-small"><?= $globalColumn['grid_text_title'];?></h2>
						<p class="paragraph-large"><?= $globalColumn['grid_text'];?></p>
					</div>
				</div>
			</div>
		<?php } ?>
	</div>
</section>
