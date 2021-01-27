<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Feed;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;

add_action( 'init', __NAMESPACE__ . '\register_feed_block' );

/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_feed_block() {
	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/feed', [
		'attributes'	  => array_merge(
			[
				'className' => [
					'type' => 'string',
					'default' => '',
				],
				'postType' => [
					'type' => 'string',
					'default' => '',
				],
				'categories' => [
					'type' => 'array',
					'default' => '',
				],
				'columnNumber' => [
					'type' => 'Number',
					'default' => 4,
				],
				'paginationActive' => [
					'type' => 'bool',
					'default' => '',
				],
				'filterActive' => [
					'type' => 'Boolean',
					'default' => true,
				],
				'showExcerpt' => [
					'type' => 'bool',
					'default' => '',
				],
				'postPerPage' => [
					'type' => 'Number',
					'default' => 0,
				],
			],
			MARGIN_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_feed_block',
	] );
}

/**
 * Server rendering for /blocks/feed
 */
function render_feed_block($attributes) {
	$class = $attributes['className'];
	$class .= margin_options_classes($attributes);
	$class .= padding_options_classes($attributes);
	$categories = $attributes['categories'];
	$showExcerpt = $attributes['showExcerpt'];
	$filterActive = $attributes['filterActive'];
	$columnNumber = $attributes['columnNumber'];
	$tabs = '';
	$postFilter = '';
	$orderby = 'date';
	$order = $_GET['order'] ?? 'DESC';
	$pagination = '';

	// Filter
	if ($filterActive) {
		$postFilter .= "
			<div>
				<label>Sort by:</label>
				<select name=\"order\" class=\"dropdown\">
					<option value=\"ASC\" " . ($order == 'ASC' ? 'selected' : '') . ">NEW</option>
					<option value=\"DESC\" " . ($order == 'DESC' ? 'selected' : '') . ">OLD</option>
				</select>
			</div>
		";	
	}

	// Category Tabs
	if ( !empty( $categories ) ) {
		$tabs .= "
		<div class=\"categories\"> 
			<ul class=\"cat-list\">
		";

		foreach ( $categories as $category ) {
			$tabs .= "
			<li class=\"cat-item\">
				<button class=\"cat-button\" name=\"category\" value=\"{$category['id']}\">{$category['name']}</button>
			</li>
			";
		}

		$tabs .= "
			</ul>
		</div>";
	}

	// RECENT POSTS
	$selectedCategory = $_GET['category'] ?? $categories[0]['id'];
	
	$paged = get_query_var('paged')
	? get_query_var('paged')
	: 1;

	$query = [
		'posts_per_page' 	=> 	$attributes['postPerPage'],
		'post_type'				=> 	$attributes['postType'],
		'post_status' 		=> 	'publish',
		'cat' 						=> 	$selectedCategory,
		'order'						=> 	$order,
		'orderby'					=>	$orderby,
		'paged' 					=> 	$paged,
	] ;

	$recent_posts = new \WP_Query( $query );

	if ( !$recent_posts->have_posts() ) {
		$output = "
		<div class=\"component-archive-feed {$class}\">
			{$tabs}
			{$postFilter}
			<p>No posts</p>
		</div>";

		return $output;
	}

	// Pagination

	$pagination .= "
		<nav class=\"pagination-nav\" role=\"navigation\" aria-label=\"Pagination Navigation\">" .
			paginate_links([
				'base' => str_replace(999999999,
					'%#%',
					esc_url(get_pagenum_link(999999999))),
				'current' => max(1, $paged),
				'format' => '?paged=%#%',
				'end_size' => 2,
				'mid_size' => 4,
				'prev_next' => true,
				'prev_text' => '',
				'next_text' => '',
				'add_fragment' => '',
				'total' => $recent_posts->max_num_pages
			]) .
		"</nav>";


	$feedItems = '';

	while ( $recent_posts->have_posts() ) {
		$recent_posts -> the_post();

		// $postID  = get_the_ID();
		$thumbnail = get_post_thumbnail_id();
		$excerpt = $showExcerpt ? 
			'<p class="excerpt>' . wp_trim_words( get_the_content(), 60 ) . '</p>' :
			'';

		$categories = get_the_category();
		$arrayCategories =  array();

		if ($categories) {
			foreach ($categories as $category) {
				$arrayCategories[] = '<a href="/category/'.$category->slug.'">'.$category->name.'</a>';
			}
			$displayCategories = implode( ', ', $arrayCategories );;
		}

		if ($thumbnail) {
			$thumbnail = '<div class="image-wrapper margin-bottom-1x">'.get_the_post_thumbnail().'</div>';
		} else {
			$thumbnail = '<div class="image-wrapper margin-bottom-1x no-image"><img src="'.get_field('fallback_image', 'options').'" alt="'.get_field('fallback_image_alt', 'options').'" title="'.get_field('fallback_image_alt', 'options').'" /></div>';
		}
		
		$feedItems  .= '
			<div class="feed-item" style="width: '. 100 / $columnNumber .'%;">'.
				$thumbnail.
				'<div class="feed-info margin-bottom-2x">
					<span class="eyebrow display-block margin-bottom-1x">'.
						$displayCategories.
					'</span>
					<h2 class="headline6 margin-bottom-1x">'.
						get_the_title().
					'</h2>'.
					$excerpt.
					'<span class="eyebrow display-block margin-bottom-1x">'.
						get_the_time('F j, Y').
					'</span>
				</div>
			</div>';
	}

	wp_reset_postdata();

	$permalink = get_the_permalink();

	$output = "
	<div class=\"component-archive-feed {$class}\" data-component-name=\"FeedFilter\">
		<form action=\"{$permalink}\" class=\"top-bar filter-form\" method=\"get\">
			{$tabs}
			{$postFilter}
		</form>
		<div class=\"feed-items load-items padding-bottom-3x\">
			{$feedItems}
		</div>
		{$pagination}
	</div>";

	return $output;
}
