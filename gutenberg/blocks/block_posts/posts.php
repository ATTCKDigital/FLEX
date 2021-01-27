<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Posts;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;

add_action( 'init', __NAMESPACE__ . '\register_posts_block' );

/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_posts_block() {
	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/posts', [
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
					'default' => false,
				],
				'showCategory' => [
					'type' => 'bool',
					'default' => false,
				],
				'ctaText' => [
					'type' => 'string',
					'default' => 'Read More',
				],
				'postPerPage' => [
					'type' => 'Number',
					'default' => 0,
				],
			],
			MARGIN_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_posts_block',
	] );
}

/**
 * Server rendering for /blocks/posts
 */
function render_posts_block($attributes) {
	$class = $attributes['className'];
	$class .= margin_options_classes($attributes);
	$class .= padding_options_classes($attributes);
	$categories = $attributes['categories'];
	$showExcerpt = $attributes['showExcerpt'];
	$showCategory = $attributes['showCategory'];
	$filterActive = $attributes['filterActive'];
	$columnNumber = $attributes['columnNumber'];
	$ctaText = $attributes['ctaText'];
	$tabs = '';
	$postFilter = '';
	$orderby = 'date';
	$order = $_GET['order'] ?? 'DESC';
	$pagination = '';
	$selectedCategory = $_GET['category'] ?? $categories[0]['id'];

	// Filter
	if ($filterActive) {
		$postFilter .= "
			<div class=\"sort-filter\">
				<label>". __("Sort by") ."</label>
				<select name=\"order\" class=\"dropdown\">
					<option value=\"ASC\" " . ($order == 'ASC' ? 'selected' : '') . ">". __("New") ."</option>
					<option value=\"DESC\" " . ($order == 'DESC' ? 'selected' : '') . ">". __("Old") ."</option>
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
			$active = $selectedCategory == $category['id'] ? ' active' : '';

			$tabs .= "
			<li class=\"cat-item cat-{$category['slug']}{$active}\" style=\"width=". (100 /  count($categories)) ."%;\">
				<button class=\"cat-button\" name=\"category\" value=\"{$category['id']}\">{$category['name']}</button>
			</li>
			";
		}

		$tabs .= "
			</ul>
		</div>";
	}

	// RECENT POSTS
	
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
		<div class=\"component-archive-posts {$class}\">
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


	$postsItems = '';

	while ( $recent_posts->have_posts() ) {
		$recent_posts -> the_post();

		$ctaLink = '';
		$thumbnail = get_post_thumbnail_id();
		$excerpt = $showExcerpt ? 
			'<p class="excerpt>' . wp_trim_words( get_the_content(), 60 ) . '</p>' :
			'';

		$categories = get_the_category();
		$arrayCategories =  array();
		$displayCategories = '';

		if ($categories && $showCategory) {
			$displayCategories .= '<span class="category-name">';
			foreach ($categories as $category) {
				$arrayCategories[] = '<a href="/category/'.$category->slug.'">'.$category->name.'</a>';
			}
			$displayCategories .= implode( ', ', $arrayCategories ) . '</span>';
		}

		if ($thumbnail) {
			$thumbnail = '<div class="image-wrapper">'.get_the_post_thumbnail().'</div>';
		} else {
			$thumbnail = '<div class="image-wrapper no-image"><img src="'.get_field('fallback_image', 'options').'" alt="'.get_field('fallback_image_alt', 'options').'" title="'.get_field('fallback_image_alt', 'options').'" /></div>';
		}

		if (!empty($ctaText)) {
			$ctaLink .= '<a class="cta-link" href="'. get_the_permalink() .'">'. $ctaText .'</a>';
		}
		
		$postsItems .= '
			<li class="posts-item post-category-'. $category->name .'" style="width: '. 100 / $columnNumber .'%;">
				<div class="posts-item-wrapper">'.
					$thumbnail.
					'<div class="post-content">'.
						$displayCategories.
						'<h2 class="post-title">'.
							get_the_title().
						'</h2>'.
						$excerpt.
						'<span class="post-date">'.
							get_the_time('F j, Y').
						'</span>'.
						$ctaLink.
					'</div>
				</div>
			</li>';
	}

	wp_reset_postdata();

	$permalink = get_the_permalink();

	$output = "
	<div class=\"component-archive-posts {$class}\" data-component-name=\"PostsFilter\">
		<form action=\"{$permalink}\" class=\"top-bar filter-form\" method=\"get\">
			{$tabs}
			{$postFilter}
		</form>
		<ul class=\"posts-items load-items\">
			{$postsItems}
		</ul>
		{$pagination}
	</div>";

	return $output;
}
