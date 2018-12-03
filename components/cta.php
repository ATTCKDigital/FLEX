<?php
	/**
	 * CTA module
	 */
	$showCTA = $this->globalColumn['show_cta'];
	$ctaColor = $this->globalColumn['cta_color'];
	$ctaText = $this->globalColumn['cta_text'];
	$internalCTA = $this->globalColumn['internal_link_cta'];
	$externalCTA = $this->globalColumn['external_link_cta'];
	$ctaLink = '';

	if ($showCTA == 'internal') {
		$ctaLink = $internalCTA;
	} else {
		$ctaLink = $externalCTA;
	}

	$showCTA2 = $this->globalColumn['show_cta_2'];
	$ctaColor2 = $this->globalColumn['cta_color_2'];
	$ctaText2 = $this->globalColumn['cta_text_2'];
	$internalCTA2 = $this->globalColumn['internal_link_cta_2'];
	$externalCTA2 = $this->globalColumn['external_link_cta_2'];
	$ctaLink2 = '';

	if ($showCTA2 == 'internal') {
		$ctaLink2 = $internalCTA2;
	} else {
		$ctaLink2 = $externalCTA2;
	}
?>
<?php if ($showCTA != 'none' || $showCTA2 != 'none') { ?>
	<div class="ctas align-<?= $this->textAlignment; ?>">
		<?php if ($showCTA != 'none') { ?>
			<?php
				/* Disabling target="_blank" for now. TODO: (DP) Add new ACF checkbox for enabling new window on links
				<a href="<?= $ctaLink;?>" class="button button-<?= $ctaColor;?>"<?php if ($showCTA == 'external') { echo ' target="_blank"'; } ?>><?= $ctaText; ?></a>
				*/
			?>
			<a href="<?= $ctaLink; ?>" class="button button-<?= $ctaColor; ?>"><?= $ctaText; ?></a>
		<?php } ?>
		<?php if ($showCTA2 != 'none') { ?>
			<?php
				/* <a href="<?= $ctaLink2;?>" class="button button-<?= $ctaColor2;?>"<?php if ($showCTA2 == 'external') { echo ' target="_blank"'; } ?>><?= $ctaText2; ?></a> */
			?>
			<a href="<?= $ctaLink2; ?>" class="button button-<?= $ctaColor2; ?>"><?= $ctaText2; ?></a>
		<?php } ?>
	</div>
<?php } ?>
