<?php 
    $termID = get_queried_object()->term_id;
?>
	<!-- Blog Archive -->
	<section class="component-row component-theme-lt-gray row-text-white component" id="blogArchive" data-component-name="CategoryNav">
		<div class="component-row-inner pure-g component-alignment-top">
			<div class="column pure-u-lg-1-1 pure-u-md-1-1 pure-u-sm-1-1 component-theme-default padding-top">
				<section class="component-case-study">
					<div class="content-wrapper">
						<h1 class="headline1 align-center white-text all-caps"><?php _e( 'Blog', '_isoc' );?></h1>
						<nav class="category-nav">
							<span class="caption-small current-category"><span><?php if(is_category()) {single_cat_title();} else { echo _e( 'All posts', '_isoc' );}?></span>
								<?php 
									echo Utils::render_template("inc/templates/svg.php", array(
										"id" => "icon-toggle",
										"classes" => "mn-icon icon-toggle"
									)); 
								?>
							</span>
							<ul>
								<?php
							        if (has_nav_menu('blog-categories')) {
							            $navArgs = array(
							                'theme_location' => 'blog-categories',
							                'container' => false,
							                'menu_id' => true,
							                'echo' => false,
							                'fallback_cb' => false,
							                'link_before' => '',
							                'link_after' => '',
							                'items_wrap' => '%3$s',
							                'depth' => 0,
							            );

							            // $menu = wp_nav_menu( $navArgs );
										$menu_name = 'blog-categories';
										$locations = get_nav_menu_locations();
										$menu = wp_get_nav_menu_object($locations[$menu_name]);
										$menuItems = wp_get_nav_menu_items($menu->term_id, $navArgs);
										
										foreach ($menuItems as $menuItem) :
											$category = $menuItem->title;
											$taxID = '';
											$taxonomy = '';
											$class = '';
											
											if ($category != 'All Posts') {
												$class = '';
												$taxonomy = $menuItem->object;
												$catID = get_term_by('name', esc_attr($category), $taxonomy);
												$taxID = $catID->term_id;
											} else {
												$taxID = 'all';
												$taxonomy = 'all';
												$class = ' current-menu-item';
											}
											?>
												<li class="menu-item<?= $class;?>" data-category="<?= $taxID;?>" data-taxonomy="<?= $taxonomy;?>" data-post-type="post"><?= $category;?></li>
											<?php 
										endforeach;
							        }
							    ?>
							</ul>
						</nav>
					</div>
				</section>
			</div>
		</div>
	</section>

	<!-- Blog post component -->
	<?php
		$args = array(
			'post_type' => 'post',
			'has_password' => false,
			'posts_per_page' => 2,
			'ignore_sticky_posts' => 1,
			'cat' => $termID
		);

		$blogQuery = new WP_Query($args);
		$totalPages = $blogQuery->max_num_pages;
		
		if ($blogQuery->have_posts()) :
			?>
			<section class="component-row component-theme-stripes row-text-white padding-bottom">
				<div class="component-row-inner pure-g component-row-standard component-alignment-top">
					<div class="column  pure-u-lg-1-1 pure-u-md-1-1 pure-u-sm-1-1 component-theme-default">
						<section class="component-blog-post component-blog-post-archive ajax-loader">
							<div class="content-wrapper blog-post-items archive-items" data-list-id="1" data-post-category="<?= $termID;?>" data-post-type="post">

							<?php 
								while ($blogQuery->have_posts()) :
									$blogQuery->the_post(); 
									$ID = $post->ID;
									$author = $post->post_author;
									$authorName = get_the_author_meta('display_name', $author);
									?>
									<div class="blog-post-item archive-item pure-g" data-post-id="<?= $ID;?>" data-max-pages="<?= $totalPages;?>">
										<div class="blog-post-content pure-u-lg-3-4 pure-u-md-3-4">
											<h2 class="headline4-lower">
												<a href="<?= get_permalink($ID);?>"><?= get_the_title($ID);?></a>
											</h2>
											<span class="caption-small-light gray-text"><?= $authorName;?> &sdot; <?= get_the_time('F j', $ID);?></span>
											<div class="body-text">
												<p class="small-text">
													<?= get_the_excerpt($ID);?>
												</p>
											</div>
											<span class="caption-small-light white-text">Tags: <?= get_the_category_list( ', ', '', $ID);?></span>
											<a href="<?= get_permalink($ID);?>" class="read-more-link"><?php _e( 'Read more', '_isoc' );?></a>
										</div>
										<div class="blog-post-image pure-u-lg-1-4 pure-u-md-1-4">
											<?php the_post_thumbnail('square', ['class' => 'responsive-image']);?>
										</div>
									</div>
									<?php 
								endwhile;
							?>
							</div>
						</section>
						<?php 
							if ($totalPages > 1) : 
								?>
								<div class="align-center">
									<span class="button button-secondary component loadMore" data-component-name="LoadMore" id="loadMore"><?php _e( 'Load More', '_isoc' );?></span>
								</div>
								<?php
							endif;
						?>
					</div>
				</div>
			</section>
			<?php
		endif;

		wp_reset_query();
	?>