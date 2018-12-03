<?php
	/**
	 * Feed Component
	 */
	$feedLayout = $globalColumn['feed_layout'];

	// Dynamic or select your own
	$feedType = $globalColumn['feed_type'];
	$feedPostType = $globalColumn['feed_content_type'];
	$feedNewsType = $globalColumn['feed_news'];
	$feedCategory = $globalColumn['feed_category'];
	$feedTag = $globalColumn['feed_tag'];
	$feedNumber = $globalColumn['number_of_items'];

	// Get values for load more config
	$feedCategoryList = '';
	$feedPostTypeList = '';
	$feedTagList = '';
	$feedNewsList = '';

	if ($feedCategory) {
		$feedCategoryList = implode(',', $feedCategory);
	}

	if ($feedTag) {
		$feedTagList = implode(',', $feedTag);
	}

	if ($feedNewsType) {
		$feedNewsList = implode(',', $feedNewsType);
	}

	if ($feedPostType) {
		$feedPostTypeList = implode(',', $feedPostType);
	}
?>
<section class="component component-feed<?= ' layout-' . $feedLayout; ?>" data-component-name="Feed">
	<div class="content-wrapper align-center">
		<div
			class="feed loadable"
			data-cat-exclude=""
			data-tag="<?= $feedTagList;?>"
			data-order="DESC"
			data-orderby="date"
			data-meta="0"
			data-post-count="<?= $feedNumber;?>"
			data-taxonomy="<?php if ($feedNewsList){ echo 'news_type'; } ?>"
			data-news-type="<?= $feedNewsList;?>"
			data-search=""
			data-category="<?= $feedCategoryList;?>"
			data-post-type="<?= $feedPostTypeList;?>">
			<?php
				if ($feedType == 'feed') {
					if ($feedPostType == 'post') {
						// Posts
						if ($feedCategory && $feedTag) {
							// If feed type is dynamic and tags AND a categories is selected
							$args = array(
								'post_type' => $feedPostType,
								'posts_per_page' => $feedNumber,
								'category__in' => $feedCategory,
								'tag__in' => $feedTag,
							);
						} elseif ($feedCategory) {
							// If feed type is dynamic AND a category is selected
							$args = array(
								'post_type' => $feedPostType,
								'posts_per_page' => $feedNumber,
								'category__in' => $feedCategory,
							);
						} elseif ($feedTag) {
							// If feed type is dynamic AND a tag is selected
							$args = array(
								'post_type' => $feedPostType,
								'posts_per_page' => $feedNumber,
								'tag__in' => $feedTag,
							);
						} else {
							// If feed type is dynamic and nothing further is selected
							$args = array(
								'post_type' => $feedPostType,
								'posts_per_page' => $feedNumber,
							);
						}
					} else {
						if ($feedNewsType) {
							// If feed type is dynamic AND a tag is selected
							$args = array(
								'post_type' => $feedPostType,
								'posts_per_page' => $feedNumber,
								'tax_query' => array(
									array(
										'taxonomy' => 'news_type',
										'field'	=> 'term_id',
										'terms'	=> $feedNewsType,
									),
								),
							);
						} else {
							// If feed type is dynamic and nothing further is selected
							$args = array(
								'post_type' => $feedPostType,
								'posts_per_page' => $feedNumber,
							);
						}
					}

					$feedQuery = new WP_Query($args);

					if ($feedQuery->have_posts()) {
						$maxPages = $feedQuery->max_num_pages;

						while ($feedQuery->have_posts()) {
							$feedQuery->the_post();

							// Post type
							$postType = get_post_type($post->ID);

							if ($feedPostType[0] == 'news') {
								$newsType = get_the_terms($post->ID, 'news_type')[0]->slug;
								if ($newsType == 'in-the-news') {
									$link = get_field('news_link');
									$target = ' target="_blank"';
								} else {
									$link = get_the_permalink($post->ID);
									$target = '';
								}
							?>
							<div class="feed-item news-item">
								<time class="uppercase sans-serif14 black-alt-text align-center"><?php the_time('F j, Y');?></time>
								<h2 class="sans-serif20 align-center nocase"><a href="<?= $link;?>" <?= $target;?>><?php the_title();?></a></h2>
								<?php if($newsType == 'in-the-news') { ?>
									<a href="<?= $link;?>" class="news-logo" <?= $target;?>><img src="<?= get_field('news_logo')['url'];?>" /></a>
								<?php } ?>
							</div>
							<?php } else { ?>
							<div class="feed-item load-item" data-max-pages="<?= $maxPages;?>" data-post-id="<?= $post->ID;?>">
								<?php if (has_post_thumbnail()) : ?>
									<a href="<?= get_the_permalink();?>" class="feed-link" style="background-image: url('<?php echo get_the_post_thumbnail_url(); ?>')" title="<?php echo get_the_title(); ?>" alt="<?php echo get_the_title(); ?> Thumbnail">
										<?php /* the_post_thumbnail( 'full', array( 'title' => get_the_title().' Thumbnail', 'alt' => get_the_title().' Thumbnail' ) ); */ ?>
									</a>
								<?php endif; ?>
								<div class="feed-item-info row-text-black align-left<?php if (!has_post_thumbnail()) { echo ' full-width';}?>">
									<h3 class="sans-serif20 align-left nocase"><a href="<?= get_the_permalink();?>"><?php the_title();?></a></h3>
									<span class="sans-serif12 align-left location"><?= get_field('location');?></span>
									<div class="paragraph_serif border-top-left">
										<p><?= strip_tags( excerpt(40) ); ?></p>
									</div>
								</div>
							</div>
							<?php
							} // endif feed type
						} // end while
							echo '</div>'; // .feed.loadable
						}
					wp_reset_query();
				} else {
					$posts = $globalColumn['feed_items'];

					foreach ($posts as $post) {
						setup_postdata($post);
						// Allows authors to select drafts ahead of time and only display them when the draft is published
						?>
						<div class="feed-item load-item" data-max-pages="<?= $maxPages;?>" data-post-id="<?= $post->ID;?>">
							<?php if (has_post_thumbnail()) { ?>
								<a href="<?= get_the_permalink();?>" class="feed-link" style="background-image: url('<?php echo get_the_post_thumbnail_url(); ?>')" title="<?php echo get_the_title(); ?>" alt="<?php echo get_the_title(); ?> Thumbnail">
									<?php /* the_post_thumbnail( 'full', array( 'title' => get_the_title().' Thumbnail', 'alt' => get_the_title().' Thumbnail' ) ); */ ?>
								</a>
							<?php } ?>
							<div class="feed-item-info row-text-black align-left<?php if (!has_post_thumbnail()) { echo ' full-width';}?>">
								<h3 class="sans-serif20 align-left nocase"><a href="<?= get_the_permalink();?>"><?php the_title();?></a></h3>
								<span class="sans-serif12 align-left location"><?= get_field('location');?></span>
								<div class="paragraph_serif border-top-left">
									<p><?= strip_tags(excerpt(40)); ?></p>
								</div>
							</div>
						</div>
						<?php
					}
					echo '</div>'; // .feed.loadable
					wp_reset_postdata();
				}
			?>
			<?php
				echo Utils::render_template("inc/templates/cta.php", array(
					"globalColumn" => $globalColumn,
					"textAlignment" => $feedLayout,
				));
			?>
	</div>
</section>
