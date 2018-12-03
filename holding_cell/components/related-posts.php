<?php //Related Posts ?>
<?php 
	$args = array(
		'posts_per_page'	=> 3,
		'cat'				=> $this->catID,
		'post_type'			=> 'post',
		'post__not_in'		=> array($this->exclude),
	);

	$relatedQuery = new WP_Query($args);
	$category = get_term_by('id', $this->catID, 'category');
	$category = $category->name;

	if ($relatedQuery->have_posts() ) {
?>	
<section class="component-row" data-row-info="text_boxes">
	<div class="component-row-inner pure-g component-row-standard">
		<div class="component component-text-boxes component-fade fade-me-in faded-in">
			<div class="pure-g">
				<div class="column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12">
					<div class="header header-tab header-tab-small">
						<div class="header-tab-inner">
							<h2 class="headline2 color-standard-white">Related Insights</h2>
						</div>
					</div>
				</div>
			</div>
			<div class="pure-g">
				<?php 
					while($relatedQuery->have_posts()) { 
						$relatedQuery->the_post();
				?>
				<div class="text-box column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12 layout-three">
					<div class="text-box-inner background-white padding-mobile-20 padding-tablet-landscape-top-30 padding-tablet-landscape-bottom-30 padding-tablet-landscape-right-40 padding-tablet-landscape-left-40">
						<a class="full-link" href="<?php the_permalink();?>" target="_blank" title="<?php the_title();?>"></a>
						<div class="text-box-content">
							<h3 class="headline3 margin-mobile-bottom-15 margin-tablet-landscape-bottom-30"><a href="<?php the_permalink();?>" target="_blank" title="Read more on Thought Leadership"><?php the_title();?></a></h3>
							<p><?= excerpt(15);?></p><a class="cta-link cta-link-small" href="http://google.com" target="_blank" title="Read more on <?= $category;?>">Read more on <?= $category;?></a>
						</div>
					</div>
				</div>
				<?php } //endwhile ?>
			</div>
		</div>
	</div>
</section>
<?php } //endif ?>