
<section class="component-archive-feed component-author-feed component component-row margin-mobile-top-40 margin-mobile-bottom-40" data-component-name="LoadMore">
	<div class="component-row-inner component-row-standard">
		<?php if($this->title){ ?>
			<div class="pure-g">
				<div class="column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12">
					<div class="header header-tab header-tab-small">
						<div class="header-tab-inner">
							<h2 class="headline2 color-standard-white"><?= $this->title;?></h2>
						</div>
					</div>
				</div>
			</div>
		<?php } ?>
		<div class="pure-g archive-wrapper">
			<div class="column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12">
			</div>
			<div class="column pure-u-lg-8-12 pure-u-md-8-12 pure-u-sm-12-12">
				<div class="component-feed">
					<ul class="feed-items" data-selection="<?= $this->authorID;?>" data-filter-type="author" data-search="" data-page-category="" data-page-type="author">
						<?php 
							if ($this->query->have_posts() ) {
								while($this->query->have_posts()) { 
									$this->query->the_post();
						?>	
							<li class="feed-item background-white<?php if(has_post_thumbnail()){ echo ' feed-item-image';} ?>" data-post-id="<?= get_the_ID();?>">
								<a href="<?php the_permalink();?>" class="full-link"></a>
								<?php if(has_post_thumbnail()){ ?>
									<div class="image-wrapper">
										<?php the_post_thumbnail('full');?>
									</div>
								<?php }?>
								<div class="feed-item-inner padding-mobile-20">
									<time class="caption margin-mobile-bottom-20"><?php the_category(' ');?></time>
									<h2 class="headline3 margin-mobile-bottom-10"><a href="<?php the_permalink();?>"><?php the_title();?></a></h2>
									<p><?= excerpt(20);?></p>
									<a href="<?php the_permalink();?>" class="cta-link cta-link-small cta-link-absolute" alt="<?php the_title();?>" title="<?php the_title();?>">Posted <?php the_time('F j, Y');?> &mdash; Read more</a>
								</div>
							</li>
						<?php 
								}//endwhile
							} //endif
						?>
					</ul>
					<?php if($this->maxPages > 1) { ?>
						<div class="cta align-left">
							<span class="loadMore button">Load more</span>
						</div>
					<?php } ?>
				</div>
			</div>

		</div>
	</div>
</section>
