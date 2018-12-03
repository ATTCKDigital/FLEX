<!-- Table component -->
<section class="component component-table">
	<div class="content-wrapper">
		<?php 
			// if select your own resources
			$resourceItems = get_sub_field('resources_table_items');

			if($resourceItems) {
		?>
			<ul class="table">
				<?php
					foreach ($resourceItems as $post) {
						setup_postdata($post);
						//allows authors to select drafts ahead of time and only display them when the draft is published
						if ( get_post_status() == 'publish' ){
				?>
					<li class="table-item">
						<h4 class="headline6"><a href="<?php the_permalink();?>"><?php the_title();?></a></h4>
						<p class="small-text"><?= strip_tags( excerpt(20) ); ?></p>
					</li>
				<?php 
						} //endif published
					} //endforeach 
					wp_reset_postdata();
				?>
			</ul>
		<?php 
			// automatic population
			} else { 
		?>
			<?php
				if($taxonomy) {
					// if the page is a region page, only show actions for that region
					$taxID = $taxonomy->term_id;
				    $args = array(
				        'post_type'   => array('resources'), 
				        'numberposts' => 6,
				        'orderby' => 'date',
				        'order' => 'DESC',
				        'suppress_filters' => 0,
				        'meta_query' => array(
							array(
								'key'     => 'hide_post',
								'compare' => 'IN',
								'value' => '0'
							),
						),
				      	'tax_query' => array(
				          array(
				            'taxonomy' => 'region_news_regions',
				            'field'    => 'term_id',
				            'terms'    => array($taxID),
				          ),
				        ),

				    );
				} else if($term) {

					$term_id = $term->term_id;

				    $args = array(
				        'post_type'   => array('resources'), 
				        'numberposts' => 6,
				        'orderby' => 'date',
				        'order' => 'DESC',
				        'suppress_filters' => 0,
				        'cat' => $term_id,

				        'meta_query' => array(
							array(
								'key'     => 'hide_post',
								'compare' => 'IN',
								'value' => '0'
							),
						),
				    );					
				} else {
				    $args = array(
				        'post_type'   => array('resources'), 
				        'numberposts' => 6,
				        'orderby' => 'date',
				        'order' => 'DESC',
				        'suppress_filters' => 0,
				        'meta_query' => array(
							array(
								'key'     => 'hide_post',
								'compare' => 'IN',
								'value' => '0'
							),
						),
				    );					
				}			

			    $resources = get_posts( $args );
			?>
			<ul class="table">
				<?php
					foreach ($resources as $post) {
						setup_postdata($post);
						
				?>
					<li class="table-item">
						<h4 class="headline6"><a href="<?php the_permalink();?>"><?php the_title();?></a></h4>
						<p class="small-text"><?= strip_tags( excerpt(20) ); ?></p>
					</li>
				<?php 
					} //endforeach 
					wp_reset_postdata();
				?>
			</ul>
		<?php } //endif ?>
	</div>
</section>

