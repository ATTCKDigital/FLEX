<!-- Career list component -->
<?php 
	$args = array(
		'post_type' => 'careers',
		'posts_per_page' => 100,
	);
	$careerQuery = new WP_Query( $args );
?>
<section class="component component-career-list">
	<div class="content-wrapper">
		<?php if($careerQuery->have_posts()) { ?>
			<h2 class="headline5"><?php _e('Career opportunities with the Internet Society:', '_isoc');?></h2>
			<ul class="career-items">
				<?php while ($careerQuery->have_posts()) { $careerQuery->the_post(); ?>
					<li class="career-item">
						<span class="eyebrow eyebrow-regular"><?php the_time('j F Y');?></span>
						<a href="<?php the_permalink();?>" class="headline6"><?php the_title();?></a>
					</li>
				<?php } ?>
			</ul>
		<?php } else { ?>
			<h2 class="headline5">There are currently no employment opportunities with the Internet Society.</h2>
		<?php } wp_reset_query();?>
	</div>
</section>
