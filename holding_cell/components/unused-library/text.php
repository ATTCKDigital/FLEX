<?php
	/**
	 * Text component
	 */
?>
<section class="component-text fade-me-in faded-in">
	<div class="content-wrapper">
		<?php
			$pageHeader = $globalColumn['page_header'];
			$textHeadline = $globalColumn['text_headline'];
			$textAlignment= $globalColumn['text_alignment'];
			$textStyle = $globalColumn['text_headline_style'];
			$textCopy = $globalColumn['text_copy'];
			$showCTA = $globalColumn['show_cta'];
			$icon = $globalColumn['icon'];
		?>

		<?php if ($textHeadline) { ?>
			<div class="component-text-header fade-me-in">
				<?php
					if($icon){
				?>
					<img src="<?= $icon['url'];?>" class="text-icon" />
				<?php
					}

					if ($pageHeader) {
						if ($textHeadline) {
							?>
							<h1 class="<?= $textStyle;?> align-<?= $textAlignment; ?>"><?= $textHeadline; ?></h1>
							<?php
						}
					} else {
						if ($textHeadline) {
							?>
							<h2 class="<?= $textStyle;?> align-<?= $textAlignment; ?>"><?= $textHeadline; ?></h2>
							<?php
						}
					}
				?>
			</div>
		<?php } ?>

		<?php if ($textCopy) { ?>
			<div class="component-text-copy fade-me-in">
				<div class="body-text align-<?= $textAlignment; ?>">
					<?= $textCopy; ?>
				</div>
			</div>
		<?php } ?>
		<?php 
			if ($showCTA != 'none') {
				echo Utils::render_template("inc/templates/cta.php", array(
					"globalColumn" => $globalColumn,
					"textAlignment" => $textAlignment,
				));
			} 
		?>
	</div>
</section>
