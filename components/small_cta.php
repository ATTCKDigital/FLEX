<?php
	//Small CTA component
	$header = $globalRow['header'];
	$ctaText = $globalRow['cta_text'];
	$ctaLink = $globalRow['cta_internal_link'];
	$ctaExternalLink = $globalRow['cta_external_link'];
	if($ctaLink) {
		$link = $ctaLink;
		$target = '';
	} else {
		$link = $ctaExternalLink;
		$target = ' target="_blank"';
	}

?>

<div class="component component-fade component-small-cta margin-mobile-bottom-40 margin-tablet-landscape-bottom-60">
	<div class="pure-g">
		<div class="column pure-u-lg-2-12 pure-u-md-2-12 pure-u-sm-4-12">
			<div class="header header-tab header-tab-small">
				<div class="header-tab-inner">
					<h2 class="headline2 color-standard-white"><?= $header;?></h2>
				</div>
			</div>
		</div>
		<div class="column pure-u-lg-10-12 pure-u-md-10-12 pure-u-sm-8-12"></div>
		<div class="column pure-u-lg-2-12 pure-u-md-2-12 pure-u-sm-4-12"></div>
		<div class="column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-8-12">
			<div class="header header-tab header-tab-small">
				<div class="cta-tab">
					<div class="cta-tab-inner align-left">
						<a href="<?= $link;?>" class="cta-link color-standard-white"<?= $target;?>><?= $ctaText;?></a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>