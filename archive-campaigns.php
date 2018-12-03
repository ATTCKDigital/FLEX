<?php
/**
 * Template: Campaigns Archive
 * Description: Wordpress template for index page
 *
 */
	get_header();
	$maxPages = $wp_query->max_num_pages;
?>
	<section class="component-row padding-mobile-top-40 padding-mobile-bottom-40">
		<div class="component-row-inner pure-g component-row-standard">
			<div class="column pure-u-lg-1-1 pure-u-md-1-1 pure-u-sm-1-1">
				<div class="component component-tiles component-fade content-two-down component-tiles-archive" data-component-name="LoadMore">
					<div class="pure-g">
						<div class="column"></div>
						<div class="column pure-u-lg-6-12 pure-u-md-6-12 pure-u-sm-12-12">
							<div class="header header-tab header-tab-small">
								<div class="header-tab-inner">
									<h2 class="headline2 color-standard-white">Campaigns</h2>
								</div>
							</div>
						</div>
					</div>
					<div class="content-items pure-g feed-items" data-author="" data-post-type="campaigns" data-category="" data-search="">
						<?php 
							if (have_posts()) {
								while (have_posts()) { 
									the_post();
									$ID = get_the_ID();
						?>
							<div class="small-content-item feed-item column pure-u-lg-12-12 pure-u-md-12-12 pure-u-sm-12-12" data-post-id="<?= get_the_ID();?>">
								<div class="small-content-inner">
									<div class="small-image"><img alt="<?php the_title();?>" src="<?= get_the_post_thumbnail_url($ID, 'full');?>" title="<?php the_title();?>"></div>
									<div class="small-content">
										<h2 class="headline2-alt"><a href="<?php the_permalink();?>"><?php the_title();?></a></h2>
										<p class="margin-mobile-bottom-10 margin-tablet-landscape-bottom-20 margin-mobile-top-10 margin-tablet-landscape-top-20"><?= excerpt(30);?></p><a class="cta-link cta-link-small" href="<?php the_permalink();?>" title="Read more">Read more</a>
									</div>
								</div>
							</div>
						<?php 
								} //endwhile
							} else {
						?>
							<div class="small-content-item column pure-u-lg-12-12 pure-u-md-12-12 pure-u-sm-12-12">
								<div class="small-content-inner">
									<div class="small-content">
										<h2 class="headline2-alt">There are no campaigns</h2>
									</div>
								</div>
							</div>
						<?php } ?>
					</div>
					<div class="pure-g">
						<?php if($maxPages > 1) { ?>
							<div class="cta-tab column pure-u-lg-6-12 pure-u-md-6-12 pure-u-sm-12-12">
								<div class="cta-tab-inner">
									<span class="cta-link color-standard-white loadMore">Load more</span>
								</div>
							</div>
						<?php } ?>
					</div>
				</div>
			</div>
		</div>
	</section>
<?php
	get_footer();
?>