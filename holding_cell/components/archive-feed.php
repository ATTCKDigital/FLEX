
<section class="component-archive-feed component component-row margin-mobile-top-40 margin-mobile-bottom-40" data-component-name="LoadMore">
	<div class="component-row-inner component-row-standard">
		<?php if($this->title){ ?>
			<div class="pure-g">
				<div class="column pure-u-lg-3-12 pure-u-md-3-12 pure-u-sm-12-12">
					<div class="header header-tab header-tab-small">
						<div class="header-tab-inner">
							<h2 class="headline2 color-standard-white"><?= $this->title;?></h2>
						</div>
					</div>
				</div>
			</div>
		<?php } ?>
		<div class="pure-g archive-wrapper">
			<div class="column pure-u-lg-3-12 pure-u-md-3-12 pure-u-sm-12-12">
				<div class="component-theme-white component-filter padding-mobile-20 padding-mobile-tablet-landscape-20">
					<div class="filter-header">
						<h4 class="caption margin-mobile-bottom-15">Filter</h4>
						<h6 class="caption margin-mobile-bottom-15 results"><?php if(!(is_category() || is_tag() || is_home())){ echo $this->count.' Results';}?></h6>
					</div>
					<?php if($this->filterType == 'postType') { ?>
						<?php
							//for search results page
							$args = array(
								'post_type'		 => array('post', 'press', 'expertise', 'page', 'campaigns', 'challenges'),
								'posts_per_page'	=> 999999,
								'suppress_filters'	=> 0
							);

							$postTypes = get_posts($args);

							$types = array();

							foreach ($postTypes as $postType) {
								$postID = $postType->ID;
								$type = get_post_type($postID);

								//create the display names for the post types
								if($type == 'page' || $type == 'press') {
									$niceType = 'Other';
								}

								if($type == 'post' || $type == 'campaigns' || $type == 'challenges') {
									$niceType = 'Insights';
								}

								if($type == 'expertise') {
									$niceType = 'Expertise';
								}

								//add to new array only once to create list of types
								if(!in_array($niceType, $types)){
									$types[] = $niceType;
								}

							}
							wp_reset_postdata();

							//sort array alphabetically
							sort($types);
						?>
						<div class="filter-set">
							<h5 class="filter-item filter-item-header">Content Type</h5>
							<ul class="filter-items" data-search="<?= $this->search;?>" data-filter-type="type" data-page-category="">
								<li class="filter-item filter activeFilter clearFilter" data-filter-selection="">All</li>
								<?php foreach ($types as $type) { 
										if($type == 'Insights') {
											$typeKey = 'post,campaigns,challenges';
										}

										if($type == 'Expertise') {
											$typeKey = 'expertise';
										}

										if($type == 'Other') {
											$typeKey = 'page,press';
										}
								?>
									<li class="filter-item filter" data-post-type="<?= $typeKey;?>" data-filter-selection="<?= $typeKey;?>"><?= $type;?></li>
								<?php } ?>
							</ul>
						</div>
					<?php } ?>
					<?php if($this->filterType == 'year') { ?>
						<?php

							if($this->pageType == 'category') {
								$args = array(
									'post_type'		 => $this->postType,
									'posts_per_page'	=> -1,
									'suppress_filters'	=> 0,
									'cat'				=> $this->category
								);
							} else if($this->pageType == 'tag') {
								$args = array(
									'post_type'		 => $this->postType,
									'posts_per_page'	=> -1,
									'suppress_filters'	=> 0,
									'tag_id'				=> $this->category
								);
							} else {
								$args = array(
									'post_type'		 => $this->postType,
									'posts_per_page'	=> -1,
									'suppress_filters'	=> 0,
								);
							}

							$postYears = get_posts($args);
							$dates = array();
							$newYears = array();

							foreach ($postYears as $key => $postYear) {
								$postID = $postYear->ID;
								$year = get_the_date('Y', $postID);
								$month = get_the_date('F', $postID);	

								if (!array_key_exists($year, $dates)) {
									$dates[$year] = array();
								}

								foreach ($dates as $innerKey => $value) {
									if (!in_array($month, $dates[$year])) {
										$dates[$year][] = $month;
									}
								}
							}
								
							wp_reset_postdata();
						?>
						<div class="filter-set">
							<h5 class="filter-item filter-item-header">Archive</h5>
							<ul class="filter-items" data-search="" data-page-category="<?= $this->category;?>" data-page-type="<?= $this->pageType;?>" data-filter-type="year">
								<li class="filter-item filter activeFilter clearFilter" data-filter-selection="">All</li>
								<?php 
									foreach ($dates as $year => $date) { 
										// 
								?>
									<li class="filter-item filter-item-parent" data-post-type="<?= $this->postType;?>" data-filter-selection="<?= $year;?>"><span><?= $year;?></span>
										<ul class="months">
											<?php 
												foreach ($date as $month){
													$monthNumber = date("n", strtotime($month, date('n')));
											?>
												<li class="filter-item filter" data-post-type="<?= $this->postType;?>" data-filter-selection="<?= $year.','.$monthNumber;?>"><?= $month;?></li>
											<?php } ?>
										</ul>
									</li>
								<?php } ?>
							</ul>
						</div>
					<?php } ?>

					<?php if($this->filterType == 'category') { ?>
						<?php
							$categories = get_terms( array(
								'taxonomy' 		=> 'category',
								'hide_empty'	=> true,
								'suppress_filters'	=> 0,
								'orderby'			=> 'term_id'
							) );
						?>
						<div class="filter-set">
							<h5 class="filter-item filter-item-header">Categories</h5>
							<ul class="filter-items" data-search="<?= $this->search;?>" data-page-type="<?= $this->pageType;?>" data-page-category="<?= $this->category;?>" data-filter-type="category">
								<li class="filter-item filter activeFilter clearFilter" data-filter-selection="">All</li>
								<?php foreach ($categories as $category) { ?>
									<li class="filter-item filter" data-post-type="<?= $this->postType;?>" data-filter-selection="<?= $category->term_id;?>"><?= $category->name;?></li>
								<?php } ?>
							</ul>
						</div>
					<?php } ?>

					<?php if($this->filterType2 == 'tag' || $this->filterType == 'tag') { ?>
						<?php
							$tags = get_terms( array(
								'taxonomy' 		=> 'post_tag',
								'hide_empty'	=> true,
								'suppress_filters'	=> 0
							) );
						?>
						<div class="filter-set">
							<h5 class="filter-item filter-item-header">Tags</h5>
							<ul class="filter-items" data-search="" data-page-category="<?= $this->category;?>" data-page-type="<?= $this->pageType;?>" data-filter-type="tag">
								<li class="filter-item filter activeFilter clearFilter" data-filter-selection="">All</li>
								<?php foreach ($tags as $tag) { ?>
									<li class="filter-item filter" data-post-type="<?= $this->postType;?>" data-filter-selection="<?= $tag->term_id;?>"><?= $tag->name;?></li>
								<?php } ?>
							</ul>
						</div>
					<?php } ?>

					<?php if($this->filterType2 == 'press_tag') { ?>
						<?php
							$tags = get_terms( array(
								'taxonomy' 		=> 'press_tag',
								'hide_empty'	=> true,
								'suppress_filters'	=> 0
							) );
						?>
						<div class="filter-set">
							<h5 class="filter-item filter-item-header">Tags</h5>
							<ul class="filter-items" data-search="" data-page-category="<?= $this->category;?>" data-page-type="<?= $this->pageType;?>" data-filter-type="press_tag">
								<li class="filter-item filter activeFilter clearFilter" data-filter-selection="">All</li>
								<?php foreach ($tags as $tag) { ?>
									<li class="filter-item filter" data-post-type="<?= $this->postType;?>" data-filter-selection="<?= $tag->term_id;?>"><?= $tag->name;?></li>
								<?php } ?>
							</ul>
						</div>
					<?php } ?>

				</div>
			</div>
			<div class="column pure-u-lg-8-12 pure-u-md-8-12 pure-u-sm-12-12">
				<div class="component-feed">
					<ul class="feed-items" data-selection="<?= $this->category;?>" data-filter-type="<?= $this->pageType;?>" data-search="<?= $this->search;?>" data-page-category="" data-page-type="<?= $this->pageType;?>">
						<?php 
							if ($this->query->have_posts() ) {
								while($this->query->have_posts()) { 
									$this->query->the_post();
						?>	
							<li class="feed-item background-white<?php if(has_post_thumbnail()){ echo ' feed-item-image';} ?>" data-post-id="<?= get_the_ID();?>">
								<a href="<?php the_permalink();?>" class="full-link"></a>
								<?php if(has_post_thumbnail()){ ?>
									<div class="image-wrapper">
										<?php the_post_thumbnail('full');?>
									</div>
								<?php }?>
								<div class="feed-item-inner padding-mobile-20 padding-tablet-landscape-left-40 component-theme-white padding-tablet-landscape-right-40">
									<time class="caption margin-mobile-bottom-20"><?php the_category(' ');?></time>
									<h2 class="headline3 margin-mobile-bottom-10"><a href="<?php the_permalink();?>"><?php the_title();?></a></h2>
									<p><?= excerpt(20);?></p>
									<a href="<?php the_permalink();?>" class="cta-link cta-link-small cta-link-absolute" alt="<?php the_title();?>" title="<?php the_title();?>">Posted <?php the_time('F j, Y');?> &mdash; Read more</a>
								</div>
							</li>
						<?php 
								}//endwhile
							} else { 
						?>
							<li class="feed-item load-item padding-mobile-20 padding-tablet-landscape-40 padding-tablet-landscape-left-85 component-theme-white padding-tablet-landscape-right-85" data-results-count="0"><h3 class="headline3">Sorry, there are no results.</h3></li>
						<?php } ?>
					</ul>
						<div class="cta align-left">
							<?php if($this->maxPages > 1) { ?>
								<span class="loadMore button">Load more</span>
							<?php } ?>
						</div>
				</div>
			</div>

		</div>
	</div>
</section>
