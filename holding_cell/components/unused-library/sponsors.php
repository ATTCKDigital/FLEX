<!-- Sponsors component -->

<section class="component component-event-sponsors">
	<?php
		$showCTA = get_sub_field('show_cta');
		$ctaColor = get_sub_field('cta_color');
		$ctaText = get_sub_field('cta_text');
		$internalCTA = get_sub_field('internal_link_cta');
		$externalCTA = get_sub_field('external_link_cta');
		$ctaLink = '';
		if($showCTA == 'internal') {
			$ctaLink = $internalCTA;
		} else {
			$ctaLink = $externalCTA;
		}

		$sponsors = get_sub_field('sponsor_rows')

	?>
	<div class="content-wrapper align-center">
		<?php if(get_sub_field('sponsors_title')) { ?>
			<h2 class="headline2 align-center"><?= get_sub_field('sponsors_title');?></h2>
		<?php } ?>
		<?php if(get_sub_field('sponsors_description')) { ?>
			<div class="body-text align-center">
				<?= get_sub_field('sponsors_description');?>
			</div>
		<?php } ?>
		<?php if($showCTA != 'none') { ?>
			<div class="ctas align-center">
				
					<a href="<?= $ctaLink;?>" class="button button-<?= $ctaColor;?>"<?php if($showCTA == 'external'){echo ' target="_blank"';}?>><?= $ctaText;?></a>
				
			</div>
		<?php } ?>
		<div class="sponsor-rows padding-top-small">
			<?php
				foreach ($sponsors as $sponsor) {
			?>
				<div class="sponsor-tier">
					<h2 class="headline5 align-center"><?= $sponsor['sponsor_tier'];?></h2>
					<ul class="logos">
						<?php 
							$sponsorLogos = $sponsor['sponsors'];
							foreach ($sponsorLogos as $sponsorLogo) {
						?>
							<li class="logo tier-<?= $sponsor['sponsor_size'];?><?php if($sponsorLogo['text_only_sponsor']) { ?> text-only<?php } ?>">
							<?php if($sponsorLogo['sponsor_url']) { ?>
								<a href="<?= $sponsorLogo['sponsor_url'];?>" target="_blank">
							<?php } ?>
									<?php if($sponsorLogo['logo_image']) { ?>
										<img src="<?= $sponsorLogo['logo_image']['url'];?>" />
									<?php } ?>
									<?php if($sponsorLogo['text_only_sponsor']) { ?>
										<p><?= $sponsorLogo['text_only_sponsor'];?></p>
									<?php } ?>
							<?php if($sponsorLogo['sponsor_url']) { ?>
								</a>
							<?php } ?>
							</li>
						<?php } ?>
					</ul>
				</div>
						
			<?php 		
					} //end foreach
				wp_reset_postdata();
			?>
		</div>
	</div>
</section>

