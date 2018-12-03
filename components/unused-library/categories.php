<!-- Category Cards -->
<section class="component component-categories" data-component-name="Categories">
	<div class="content-wrapper">
		<?php if(get_sub_field('category_cards_title')){?><h2 class="headline2 align-center"><?= get_sub_field('category_cards_title');?></h2><?php }?>
		<div class="body-text">
			<?php if(get_sub_field('category_cards_description')){?><p class="align-center"><?= get_sub_field('category_cards_description');?></p><?php }?>
		</div>
		<div class="category-cards">
			<?php
				$terms = get_sub_field('categories');
				$regions = get_sub_field('regions');
				$cardPosts = get_sub_field('card_posts');


                $current_language = $sitepress->get_current_language();
                $default_language = $sitepress->get_default_language();
                $sitepress->switch_lang($default_language);

				if( $terms ){ 
			?>
				<ul>
					<?php 
						foreach( $terms as $term ){ 
							$ID = $term->term_id;
							$englishCategory = apply_filters( 'wpml_object_id', $ID, 'category', TRUE, 'en');
							$categoryID = 'category_'.$englishCategory;
                    
							$sitepress->switch_lang($current_language);
					?>
						<li class="category-card">
							<img src="<?= get_field('category_image', $categoryID)['sizes']['square'];?>" class="responsive-image" alt="<?= $term->name; ?> Category Image" title="<?= $term->name; ?> Category Image" />
							<div class="category-info">
								<a href="<?= get_term_link( $term ); ?>" class="category-link"><?php the_title();?></a>
								<h4 class="category-title"><?= $term->name; ?></h4>
								<p class="regular-text white-text"><?= $term->description; ?></p>
							</div>
						
						
						</li>
					<?php } ?>

				</ul>
			<?php } //endif terms ?>
			<?php
				if( $regions ){ 
			?>
				<ul>
					<?php 
						foreach( $regions as $region ){ 
							$ID = $region->term_id;

							$englishCategory = apply_filters( 'wpml_object_id', $ID, 'region_news_regions', TRUE, 'en');
							$regionID = 'region_news_regions_'.$englishCategory;

							$sitepress->switch_lang($current_language);

					?>
						<li class="category-card">
							<img src="<?= get_field('category_image', $regionID)['sizes']['square'];?>" class="responsive-image" class="responsive-image" alt="<?= $region->name; ?> category image" title="<?= $region->name; ?> category image" />
							<div class="category-info">
								<a href="<?= get_term_link( $region ); ?>" class="category-link"><?php the_title();?></a>
								<h4 class="category-title"><?= $region->name; ?></h4>
								<p class="regular-text white-text"><?= $region->description; ?></p>
							</div>
						
						
						</li>
					<?php } ?>

				</ul>
			<?php } //endif regions ?>
			<?php
				if( $cardPosts ){ 
			?>
				<ul>
					<?php 
						foreach( $cardPosts as $post ){ 
							setup_postdata($post);
							$ID = get_the_ID();
					?>
						<li class="category-card">
							<img src="<?= get_the_post_thumbnail_url($ID, 'full');?>" class="responsive-image" class="responsive-image" alt="<?= get_the_title($ID); ?> category image" title="<?= get_the_title($ID); ?> category image" />
							<div class="category-info">
								<a href="<?= get_the_permalink( $ID ); ?>" class="category-link"><?php get_the_title($ID);?></a>
								<h4 class="category-title"><?= get_the_title($ID); ?></h4>
								<p class="regular-text white-text"><?= strip_tags( excerpt(40) ); ?></p>
							</div>
						
						
						</li>
					<?php } wp_reset_postdata(); ?>

				</ul>
			<?php } //endif regions ?>

		</div>
	</div>
</section>