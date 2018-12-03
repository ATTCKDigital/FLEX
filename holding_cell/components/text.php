<?php
	//Text component
	$text = $globalRow['text'];
	$additionalHeader = $globalRow['additional_link_header'];
	$additionalLinks = $globalRow['additional_links'];

?>

<div class="component component-text component-fade<?php if(is_page('contact')){ ?>margin-mobile-bottom-40 margin-mobile-bottom-60<?php } ?>">
	<div class="pure-g">
		<?php if(is_page('contact')){ ?>
			<div class="column pure-u-lg-5-12 pure-u-md-5-12 mobile-hidden"></div>
		<?php } ?>
		<div class="column pure-u-lg-7-12 pure-u-md-7-12 pure-u-sm-12-12 padding-mobile-20 padding-mobile-top-40 padding-mobile-bottom-40 padding-tablet-landscape-85 padding-tablet-landscape-top-70 padding-tablet-landscape-bottom-30 background-white">
			<div class="text padding-mobile-bottom-30">
				<p><?= $text;?></p>
			</div>
			<?php if($additionalLinks){ ?>
				<div class="additional-links-wrapper padding-mobile-top-30">
					<p class="margin-mobile-bottom-30"><strong><?= $additionalHeader;?></strong></p>
					<div class="additional-links">
						<?php 
							foreach ($additionalLinks as $additionalLink) {
								$linkText = $additionalLink['additional_link_text'];
								$link = $additionalLink['additional_link_internal'];
								$externalLink = $additionalLink['additional_link_external'];
								$target = '';

								if($externalLink) {
									$target = ' target="_blank"';
									$link = $externalLink;
								}
						?>
							<a href="<?= $link;?>" class="display-block margin-mobile-bottom-5 cta-link-small-bold cta-link" title="<?= $linkText;?>" alt="<?= $linkText;?>"><?= $linkText;?></a>
						<?php } ?>
					</div>
				</div>
			<?php } ?>
		</div>
	</div>
</div>