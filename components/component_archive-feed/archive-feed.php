<?php 
	//Archive Feed 
?>
<section class="component-row padding-small-top-7x padding-small-bottom-7x component" data-component-name="LoadMore">
	<div class="pure-g component-row-wide component-alignment-top">
		<div class="column flex-g-lg-12-12 flex-g-md-12-12 flex-g-sm-12-12">
			<div class="component-archive-feed">
				<div class="feed-items load-items padding-small-bottom-3x" data-post-type="<?= $this->postType;?>" data-term="<?= $this->term;?>" data-taxonomy="<?= $this->taxonomy;?>">
					<?php 
						if ($this->query->have_posts()) { 
							while ($this->query->have_posts()) { 
								$this->query->the_post();
								$ID = get_the_ID();
					?>
							<div class="feed-item" data-post-id="<?= $ID;?>">
								<div class="image-wrapper margin-small-bottom-1x<?php if(!has_post_thumbnail()) {echo ' no-image'; }?>">
									<a href="<?php the_permalink();?>">
										<?php if(has_post_thumbnail()) { ?>
											<?php the_post_thumbnail();?>
										<?php } else { ?>
											<img src="<?= get_field('fallback_image', 'options');?>" alt="<?= get_field('fallback_image_alt', 'options');?>" title="<?= get_field('fallback_image_alt', 'options');?>" />
										<?php } ?>
									</a>
								</div>
								<div class="feed-info margin-small-bottom-2x">
									<span class="eyebrow display-block margin-small-bottom-1x"><?php the_category(', '); ?></span>
									<h2 class="headline6 margin-small-bottom-1x"><a href="<?php the_permalink();?>"><?php the_title();?></a></h2>
									<p class="margin-small-bottom-1x"><?= excerpt(20);?></p>
									<span class="eyebrow display-block margin-small-bottom-1x"><?php the_time('F j, Y');?></span>
								</div>
							</div>
					<?php
							} //end while
						} //end if
					?>
				</div>
				<?php if($this->maxPages > 1) { ?>
					<div class="component-ctas align-center">
						<span class="button loadMore"><?= $this->loadMoreText;?></span>
					</div>
				<?php } ?>
			</div>
		</div>
	</div>
</section>
