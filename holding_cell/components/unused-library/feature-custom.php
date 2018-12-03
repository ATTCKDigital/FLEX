<!-- Custom Feature list component -->
<section class="component component-feature-list component-feature-custom">
	<div class="content-wrapper">
		<header>
			<h4 class="headline5 black-text"><?= get_sub_field('feature_custom_title');?></h4>
		</header>
		<ul class="featured-items">
			<?php
				$featuredItems = get_sub_field('feature_custom_items');
				foreach ($featuredItems as $featuredItem) {
					$link = '';
					$target = '';
					$internalLink = $featuredItem['internal_link'];
					$externalLink = $featuredItem['external_link'];

					if($internalLink) {
						if($internalLink->post_type == 'attachment') {
							$link = $internalLink->guid;
							$target = 'target="_blank"';
						} else {
							$link = get_permalink($internalLink->ID);
							$target = '';
						}
					} elseif($externalLink) {
						$link = $externalLink;
						$target = '';
					} else {
						$link = '';
						$target = '';
					}
			?>
			<?php
		
			?>
					<li class="featured-item">
						<div class="item-inner">
							<?php if($featuredItem['thumbnail']) { ?>
								<div class="responsive-wrapper">
									<a href="<?= $link;?>" <?= $target;?>>
										<img src="<?= $featuredItem['thumbnail']['url'];?>" alt="<?= $featuredItem['thumbnail']['title'];?>" title="<?= $featuredItem['thumbnail']['title'];?>" />
										<span class="sr-only"><?= $featuredItem['title'];?></span>
									</a>
								</div>
							<?php } ?>
							<div class="feature-item-info row-text-black align-left">
                                <span class="eyebrow"><?= $featuredItem['eyebrow_text']; ?></span>
								<p class="small-text"><a href="<?= $link;?>" <?= $target;?>><?= $featuredItem['title'];?></a></p>
							</div>
						</div>
					</li>
			<?php 	
					} //end foreach
			?>	
					
			
		</ul>

	</div>
</section>