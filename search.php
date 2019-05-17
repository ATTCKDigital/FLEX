<?php
/**
 * Template: Search results
 * Description: Wordpress template for search results
 *
 */
	get_header();

	$searchQuery = get_search_query();

	//get the search query
	$allsearch = new WP_Query("s=$s&showposts=9999");
	$key = esc_html($s, 1);

	//count the number of results
	$count = $allsearch->post_count;
	wp_reset_query();

	//get the max number of pages
	$maxPages = $wp_query->max_num_pages;
?>
<section class="component-row margin-mobile-top-40">
	<div class="component-row-inner component-row-standard">
		<div class="flex-grid">
			<div class="column pure-u-lg-4-12 pure-u-md-4-12 pure-u-sm-12-12">
				<div class="header header-tab header-tab-small">
					<div class="header-tab-inner">
						<h2 class="headline2 color-standard-white"><?php _e('Search', '_flexlayout');?></h2>
					</div>
				</div>
			</div>
		</div>      
		<div class="flex-grid component-search">
			<div class="column pure-u-lg-4-12 pure-u-md-4-12 mobile-hidden"></div>
			<div class="column pure-u-lg-7-12 pure-u-md-7-12 pure-u-sm-12-12">
				<?php 
					echo Utils::render_template("components/component_search-form.php", array(
						"searchTerm" => $searchQuery
					));
				?>
			</div>
		</div>
	</div>
</section>
<?php 
	echo Utils::render_template("inc/templates/archive-feed.php", array(
		"title"         => '',
		"maxPages"      => $maxPages,
		"category"      => '',
		"pageType"      => '',
		"filterType"    => 'postType',
		"filterType2"   => '',
		"query"         => $wp_query,
		"postType"      => 'post,press,expertise,page,campaigns,challenges',
		"count"         => $count,
		"search"        => $searchQuery,
        "authorID"      => ''
	));

?>

<?php 
	get_footer();
?>
