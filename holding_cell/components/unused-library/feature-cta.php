<!-- Feature CTA component -->
<section class="component component-feature-cta">
	<div class="content-wrapper">
		<?php
			$featureBanner = get_sub_field('feature_cta_banner');
			$externalLink = get_sub_field('feature_cta_external_link');
			$internalLink = get_sub_field('feature_cta_internal_link');
			$featureText = get_sub_field('feature_cta_text');
			$featureImageTitle = get_sub_field('feature_cta_image')['title']
			
			$linkdPostID = url_to_postid($internalLink);
			$featureImage = get_the_post_thumbnail_url($linkdPostID, 'full');

			if($featureImage) {
				$featureImage = $featureImage;
			} else {
				$featureImage = get_field('home_feature_cta_image')['url'];
			}

			if($featureImageTitle) {
				$featureImageTitle = $featureImageTitle;
			} else {
				$featureImageTitle = $featureBanner.' thumbnail';
			}
		?>


		<div class="image-banner" style="background-image: url(<?=$featureImage;?>);">
			<?php if($externalLink != '') { ?>
				<a href="<?= $externalLink;?>" target="_blank" class="feature-link" alt="<?= $featureImageTitle;?>" title="<?= $featureImageTitle;?>"></a>
			<?php } elseif($internalLink != '') { ?>
				<a href="<?= $internalLink;?>" class="feature-link" alt="<?= $featureImageTitle;?>" title="<?= $featureImageTitle;?>"></a>
			<?php } ?>

			<?php if($externalLink != '') { ?>
				<span class="banner" target="_blank"><?= $featureBanner;?></span>
			<?php } ?>
			<?php if($internalLink != '') { ?>
				<span class="banner"><?= $featureBanner;?></span>
			<?php } ?>
		</div>
		<?php if($featureText) { ?>
			<div class="body-text">
				<p><?= $featureText;?></p>
			</div>
		<?php } ?>
	</div>
</section>