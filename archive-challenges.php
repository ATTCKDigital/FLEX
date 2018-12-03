<?php
/**
 * Template: Challenges Archive
 * Description: Wordpress template for index page
 *
 */
	get_header();
	$maxPages = $wp_query->max_num_pages;
?>
	<section class="component-row padding-mobile-top-40 padding-mobile-bottom-40">
		<div class="component-row-inner pure-g component-row-standard">
			<div class="column pure-u-lg-1-1 pure-u-md-1-1 pure-u-sm-1-1">
				<div class="component component-news component-fade component-news-large" data-component-name="LoadMore">
					<div class="pure-g">
						<div class="column pure-u-lg-1-12 pure-u-md-1-12 mobile-hidden"></div>
						<div class="column pure-u-lg-3-12 pure-u-md-3-12 pure-u-sm-12-12">
							<div class="header header-tab header-tab-small">
								<div class="header-tab-inner">
									<h2 class="headline2 color-standard-white">Challenges</h2>
								</div>
							</div>
						</div>
					</div>
					<div class="pure-g">
						<div class="column pure-u-lg-3-12 pure-u-md-3-12 mobile-hidden"></div>
						<div class="column news-items-wrapper pure-u-lg-8-12 pure-u-md-8-12 pure-u-sm-12-12">
							<ul class="news-items feed-items" data-author="" data-post-type="challenges" data-category="" data-search="">
								<?php 
									if (have_posts()) {
										while (have_posts()) { 
											the_post();
											$ID = get_the_ID();
								?>
								   <li class="feed-item news-item no-indent background-white" data-post-id="<?= get_the_ID();?>">
										 <a class="full-link" href="<?php the_permalink();?>"></a>
										 <h5 class="eyebrow margin-mobile-bottom-10"><?= get_field('challenges_header');?></h5>
										 <h3 class="headline2-alt"><?php the_title();?></h3>
									</li>
								<?php 
										} //endwhile
									} else {
								?>
									<div class="small-content-item column pure-u-lg-12-12 pure-u-md-12-12 pure-u-sm-12-12">
										<div class="small-content-inner">
											<div class="small-content">
												<h2 class="headline2-alt">There are no challenges</h2>
											</div>
										</div>
									</div>
								<?php } ?>
							</ul>
							<?php if($maxPages > 1) { ?>
								<div class="cta-tab">
									<div class="cta-tab-inner">
										<span class="cta-link color-standard-white loadMore">Load more</span>
									</div>
								</div>
							<?php } ?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
<?php
	get_footer();
?>
