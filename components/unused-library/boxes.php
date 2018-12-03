<!-- Boxes component -->
<section class="component component-boxes">
	<div class="content-wrapper align-center">
		<?php
			$boxes = $globalColumn['boxes'];
			$showCTA = $globalColumn['show_cta'];
			$ctaColor = $globalColumn['cta_color'];
			$ctaText = $globalColumn['cta_text'];
			$internalCTA = $globalColumn['internal_link_cta'];
			$externalCTA = $globalColumn['external_link_cta'];
			$ctaLink = '';
			if($showCTA == 'internal') {
				$ctaLink = $internalCTA;
			} else {
				$ctaLink = $externalCTA;
			}

		?>
		<?php if($globalColumn['boxes_title']) { ?>
			<h2 class="sans-serif36 border-top-center align-center"><?= $globalColumn['boxes_title'];?></h2>
		<?php } ?>

		<?php if($globalColumn['boxes_description']) { ?>
			<div class="body-text align-center">
				<p style="text-align: center;"><?= $globalColumn['boxes_description'];?></p>
			</div>
		<?php } ?>

		<div class="boxes">
			<?php
				foreach ($boxes as $box) {
	                $title = $box['box_title'];
	                $text = $box['box_text'];
			?>
				<div class="box-item">
					<?php if($title){?><h4 class="sans-serif20 align-left"><?= $title;?></h4><?php } ?>
					<?php if($text){?><div class="body-text"><?= $text; ?></div><?php } ?>
				</div>

			<?php } ?>
		</div>

		<?php if($showCTA != 'none') { ?>
			<div class="ctas align-center">
				<a href="<?= $ctaLink;?>" class="button button-<?= $ctaColor;?>"<?php if($showCTA == 'external'){echo ' target="_blank"';}?>><?= $ctaText;?></a>
			</div>
		<?php } ?>
	</div>
</section>
