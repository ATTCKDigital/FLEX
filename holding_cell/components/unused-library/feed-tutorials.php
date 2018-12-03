<!-- Category Cards - Tutorials -->
<section class="component component-categories" data-component-name="Categories">
	<div class="content-wrapper">
		<h2 class="headline2 align-center">Tutorials</h2>
		<div class="category-cards align-center">
			<?php
				$args = array(
					'post_type' => 'tutorials',
					'posts_per_page' => 2,
				);
				$tutorialsQuery = new WP_Query( $args );
				if ( $tutorialsQuery->have_posts() ) {
					$maxPages = $tutorialsQuery->max_num_pages;

			?>
				<ul class="loadable" data-meta="" data-taxonomy=""  data-order="ASC"  data-orderby="title"  data-region=""  data-search=""  data-cat-exclude=""  data-category=""  data-search="" data-post-type="tutorials" data-event-time=""  data-post-parent=""  data-author=""  data-post-count="12">
					<?php 
						while ( $tutorialsQuery->have_posts() ) { $tutorialsQuery->the_post(); 
							$thumbnail = get_the_post_thumbnail();
							if($thumbnail) {
								$thumbnail = $thumbnail;
							} else {
								$thumbnail = get_template_directory_uri() . '/dist/images/signup-background.png';
							}
					?>
						<li class="category-card load-item" data-max-pages="<?= $maxPages;?>" data-post-id="<?= $post->ID;?>">
							<img src="<?= $thumbnail;?>" class="responsive-image" alt="<?= get_field('event_logo', $eventID)['title'];?>" title="<?= get_field('event_logo', $eventID)['title'];?>" />
							<div class="category-info">
								<h4 class="category-title align-left"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
								<p class="regular-text white-text align-left"><?= strip_tags( excerpt(20) ) ?></p>
							</div>
						</li>
					<?php } ?>

				</ul>
			<?php } //endif tutorials ?>
			
		</div>
	</div>
</section>