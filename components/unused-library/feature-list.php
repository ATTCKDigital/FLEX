<!-- Feature list component -->
<section class="component component-feature-list">
	<div class="content-wrapper">
		<header>
			<h4 class="headline5 black-text"><?php _e( 'Featured news', '_isoc' );?></h4>
			<a href="/news" class="text-link"><?php _e( 'See all', '_isoc' );?></a>
		</header>
		<ul class="featured-items">
			<?php
				$featuredItems = get_sub_field('featured_items');
				if($featuredItems) {
					foreach ($featuredItems as $featuredItem) {
						$featuredID = $featuredItem->ID;
						//allows authors to select drafts ahead of time and only display them when the draft is published
						if ( get_post_status() == 'publish' ){
			?>
					<li class="featured-item">
						<div class="item-inner">
							<?php if(has_post_thumbnail($featuredID)) { ?>
								<div class="responsive-wrapper">
									<a href="<?= get_the_permalink($featuredID);?>"><?= get_the_post_thumbnail($featuredID, 'thumbnail', array( 'title' => get_the_title($featuredID).' Thumbnail', 'alt' => get_the_title($featuredID).' Thumbnail' ) );?><span class="sr-only"><?= get_the_title($featuredID);?></span></a>
									
								</div>
							<?php } ?>
							<div class="feature-item-info row-text-black align-left<?php if(!has_post_thumbnail($featuredID)) { ?> no-image<?php } ?>">
                                <?php 
                                    $primaryID = get_post_meta($featuredID,'_yoast_wpseo_primary_category',true);
									if($primaryID) { 
										$primaryCat = get_term( $primaryID, 'category' );
									} else {
										$primaryCat = get_the_terms($featuredID, 'category')[0];
									}

									$primarySlug = $primaryCat->slug;
									if($primarySlug) {
                                ?>
                                    <span class="eyebrow"><?= $primaryCat->name;?></span>
                                <?php } ?>
								<span class="eyebrow eyebrow-regular"><?= get_the_time('j F Y', $featuredID);?></span>
								<p class="small-text"><a href="<?= get_the_permalink($featuredID);?>"><?= get_the_title($featuredID);?></a></p>
							</div>
						</div>
							
					</li>
			<?php 	
						} //endif published
					} //endforeach

				} else {
					if($taxonomy) {
						// if the page is a region page, only show posts for that region that have "featured_post" checked off
						$taxID = $taxonomy->term_id;
					    $args = array(
					        'post_type'   => array('post'), 
					        'numberposts' => 3,
					        'orderby' => 'date',
					        'order' => 'DESC',
					        'suppress_filters' => 0,
							'meta_query' => array(
								array(
									'key'     => 'featured_post',
									'compare' => 'EXISTS',
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
					} else {
						//only show posts for that region that have "featured_post" checked off
					    $args = array(
					        'post_type'   => array('post'), 
					        'numberposts' => 3,
					        'orderby' => 'date',
					        'order' => 'DESC',
					  		'suppress_filters' => 0,
					  		'meta_query' => array(
								array(
									'key'     => 'featured_post',
									'compare' => 'EXISTS',
								),
							),
					    );					
					}			

				    $features = get_posts( $args );

				    foreach ($features as $feature) {
			?>

					<li class="featured-item">
						<div class="item-inner">
							<?php if(has_post_thumbnail($featuredID)) { ?>
								<div class="responsive-wrapper">
									<a href="<?= get_the_permalink($featuredID);?>"><?= get_the_post_thumbnail($featuredID, 'thumbnail', array( 'title' => get_the_title($featuredID).' Thumbnail', 'alt' => get_the_title($featuredID).' Thumbnail' ) );?><span class="sr-only"><?= get_the_title($featuredID);?></span></a>
									
								</div>
							<?php } ?>
							<div class="feature-item-info row-text-black align-left<?php if(!has_post_thumbnail($featuredID)) { ?> no-image<?php } ?>">
                                <?php 
                                    $primaryID = get_post_meta($featuredID,'_yoast_wpseo_primary_category',true);
									if($primaryID) { 
										$primaryCat = get_term( $primaryID, 'category' );
									} else {
										$primaryCat = get_the_terms($featuredID, 'category')[0];
									}

									$primarySlug = $primaryCat->slug;
									if($primarySlug) {
                                ?>
                                    <span class="eyebrow"><?= $primaryCat->name;?></span>
                                <?php } ?>
								<span class="eyebrow eyebrow-regular"><?= get_the_time('j F Y');?></span>
								<p class="small-text"><a href="<?= get_the_permalink($featuredID);?>"><?= get_the_title($featuredID);?></a></p>
							</div>
						</div>
					</li>
			<?php
					}// end foreach
				} //endif
			?>	
		</ul>

	</div>
</section>