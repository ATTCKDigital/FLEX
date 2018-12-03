<!-- Feature Card component -->
<section class="component component-feature-card">
	<div class="content-wrapper">
		<?php
			$featureCardTitle = get_sub_field('feature_card_title');
			$featureCardLinkText = get_sub_field('feature_card_link_text');
			$featureCardLinkType = get_sub_field('feature_card_link_type');
			$featureCardExternalLink = get_sub_field('feature_card_external_link');
			$featureCardInternalLink = get_sub_field('feature_card_internal_link');
			$featureCardDownloadLink = get_sub_field('feature_card_download')['url'];
			$featureCardText = get_sub_field('feature_card_text');
			var_dump($featureCardDownloadLink);

		?>

		<div class="feature-card-cta row-text-black align-center">
			<h5 class="headline6"><?= $featureCardTitle;?></h5>
			<?php if($featureCardLinkType != 'none') { ?>
				<?php if($featureCardExternalLink != '') { ?>
					<a href="<?= $featureCardExternalLink;?>" target="_blank" class="button">
				<?php } elseif($featureCardInternalLink != '') { ?>
					<a href="<?= $featureCardInternalLink;?>" class="button">
				<?php } elseif($featureCardDownloadLink != '') { ?>
					<a href="<?= $featureCardDownloadLink;?>"  target="_blank" class="button">
				<?php } ?>
					<?= $featureCardLinkText;?></a>
			<?php } ?>
		</div>


			

		<?php if($featureCardText) { ?>
			<div class="body-text row-text-white">
				<p><?= $featureCardText;?></p>
			</div>
		<?php } ?>
	</div>
</section>