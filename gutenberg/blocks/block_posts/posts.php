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
		'attributes' => array_merge(
			[
				'className' => [
					'type' => 'string',
					'default' => '',
				],
				'postType' => [
					'type' => 'string',
					'default' => 'post',
				],
				'categories' => [
					'type' => 'array',
					'default' => '',
				],
				'columnNumber' => [
					'type' => 'Number',
					'default' => 3,
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
					'default' => 12,
				],
				'excerptWordLimit' => [
					'type' => 'Number',
					'default' => 19,
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
	echo "<!-- post block rendered -->";

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
	$orderOptions = [
		[
			'value' => 'DESC',
			'text'  => _('Newest'),
			'selected' => $order == 'DESC'
		],
		[
			'value' => 'ASC',
			'text'  => _('Oldest'),
			'selected' => $order == 'ASC'
		],
	];
	$pagination = '';
	$selectedCategory = $_GET['category'] ?? $categories[0]['id'] ?? '';
	$permalink = get_the_permalink();

	// Sort Filter
	if ($filterActive) {
		$selectedIndex = array_search(true, array_column($orderOptions, 'selected'));

		$postFilter .= "
			<div class=\"sort-filter\">
				<label>" . __("Sort by") . "</label>
				<div class=\"dropdown\">
					<label role=\"button\" class=\"dropdown-select\" tabindex=\"0\">{$orderOptions[$selectedIndex]['text']}</label>
					<ul class=\"dropdown-list\">";
						foreach ($orderOptions as $option) {
							$postFilter .=
								"<li class=\"dropdown-option" . ($option['selected'] ? ' option-selected' : '') . "\">
									<button class=\"dropdown-button\" name=\"order\" value=\"{$option['value']}\">{$option['text']}</button>
								</li>";
						}

						$postFilter .= "
					</ul>
				</div>
				<input type=\"hidden\" name=\"category\" value=\"{$selectedCategory}\">
			</div>";
	}

	// Category Tabs
	if ( !empty( $categories ) ) {
		$selectedCategoryIndex = array_search($selectedCategory, array_column($categories, 'id'));

		$tabs .= "
		<div class=\"categories\">
			<label role=\"button\" class=\"cat-dropdown cat-button cat-{$categories[$selectedCategoryIndex]['slug']} active\" tabindex=\"0\">{$categories[$selectedCategoryIndex]['name']}</label>
			<ul class=\"cat-list\">
		";

		foreach ( $categories as $category ) {
			$active = $selectedCategory == $category['id'] ? ' active' : '';
			// style=\"width:". (100 /  count($categories)) ."%;\"
			$tabs .= "
			<li class=\"cat-item\">
				<button class=\"cat-button cat-{$category['slug']}{$active}\" name=\"category\" value=\"{$category['id']}\">{$category['name']}</button>
			</li>
			";
		}

		$tabs .= "
			</ul>
			<input type=\"hidden\" name=\"order\" value=\"{$order}\">
		</div>";
	}

	// RECENT POSTS

	$paged = get_query_var('paged')
	? get_query_var('paged')
	: 1;

	$query = [
		'posts_per_page' 	=> 	$attributes['postPerPage'],
		'post_type'			=> 	$attributes['postType'],
		'post_status' 		=> 	'publish',
		'cat' 				=> 	(int)$selectedCategory,
		'order'				=> 	$order,
		'orderby'			=>	$orderby,
		'paged' 			=> 	$paged,
	] ;

	// var_dump($query);

	$recent_posts = new \WP_Query( $query );

	// var_dump($recent_posts);
	// print_r($recent_posts->request);

	if ( !$recent_posts->have_posts() ) {
		$output = "
		<div class=\"component-archive-posts {$class}\">
			<form action=\"{$permalink}?category={$selectedCategory}\" class=\"top-bar filter-form\" method=\"get\">
				{$tabs}
				{$postFilter}
			</form>
			<p>No posts</p>
		</div>";

		return $output;
	}

	// Pagination

	$pagination .= "
		<nav class=\"pagination-nav\" role=\"navigation\" aria-label=\"Pagination Navigation\">
			<div class=\"pagination-wrapper\">" .
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
		"	</div>
		</nav>";


	$postsItems = '';

	while ( $recent_posts->have_posts() ) {
		$recent_posts -> the_post();

		$ctaLink = '';
		$thumbnail = get_post_thumbnail_id();
		$excerpt = '';
		$categories = get_the_category();
		$arrayCategories =  array();
		$displayCategories = '';

		if ($showExcerpt) {
			$excerpt = wp_trim_words( get_the_excerpt(), $attributes['excerptWordLimit'], '' );

			if (empty($excerpt)) {
				$excerpt = wp_trim_words( get_the_content(), $attributes['excerptWordLimit'], '' );
			}

			var_dump($excerpt);

			$excerpt = '<p class="post-excerpt">' . $excerpt . '</p>';
		}

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
			$ctaLink .= '<div class="cta-link">'. $ctaText .'</div>';
		}

		$separator = ' &nbsp; ';

		if (get_field('author_name')) {
			$separator = ' &nbsp;|&nbsp; ';
		}

		$postsItems .= '
			<li class="posts-item post-category-'. $categories[0]->slug .'" style="width: '. 100 / $columnNumber .'%;">
				<a class="posts-item-wrapper" href="'.get_the_permalink() .'">'.
					$thumbnail.
					'<div class="post-content">'.
						$displayCategories.
						'<h2 class="post-title">'.
							get_the_title().
						'</h2>'.
						'<span class="post-date">'.
							get_the_time('F j, Y').
							$separator.
							get_field('author_name').
						'</span>'.
						$excerpt.
						$ctaLink.
					'</div>
				</a>
			</li>';
	}

	wp_reset_postdata();

	$output = "
	<div class=\"component-archive-posts {$class}\">
		<form action=\"{$permalink}\" class=\"top-bar\" method=\"get\">
			{$tabs}
		</form>
		<form action=\"{$permalink}\" class=\"top-bar filter-form\" method=\"get\">
			{$postFilter}
		</form>
		<ul class=\"posts-items load-items\">
			{$postsItems}
		</ul>
		{$pagination}
	</div>";

	return $output;
}
