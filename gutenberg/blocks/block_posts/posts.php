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
				'filterCategories' => [
					'type' => 'array',
					'default' => '',
				],
				'columnNumber' => [
					'type' => 'Number',
					'default' => 3,
				],
				'paginationActive' => [
					'type' => 'Boolean',
					'default' => true,
				],
				'filterActive' => [
					'type' => 'Boolean',
					'default' => true,
				],
				'showExcerpt' => [
					'type' => 'Boolean',
					'default' => false,
				],
				'showCategory' => [
					'type' => 'Boolean',
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

// Server rendering for /blocks/posts
function render_posts_block($attributes) {
	$class = ' ';
	$class .= $attributes['className'];
	$class .= margin_options_classes($attributes);
	$class .= padding_options_classes($attributes);

	$categories = $attributes['categories'];
	// $filterCategories = $attributes['filterCategories'];
    $filterCategoryIds = isset($attributes['filterCategories']) ? $attributes['filterCategories'] : [];
	$showExcerpt = $attributes['showExcerpt'];
	$showCategory = $attributes['showCategory'];
	$filterActive = $attributes['filterActive'];
	$columnNumber = max(1, (int)$attributes['columnNumber']); // Ensure columnNumber is at least 1
	$ctaText = $attributes['ctaText'];
	$tabs = '';
	$postFilter = '';
	$orderby = 'date';
	$order = isset($_GET['order']) ? sanitize_text_field($_GET['order']) : 'DESC'; // Sanitize GET parameter
	$orderOptions = [
		[
			'value' => 'DESC',
			'text'  => __('Newest'),
			'selected' => $order == 'DESC'
		],
		[
			'value' => 'ASC',
			'text'  => __('Oldest'),
			'selected' => $order == 'ASC'
		],
	];
	$pagination = '';
	$paginationActive = $attributes['paginationActive'];
	$selectedCategory = isset($_GET['category']) ? (int)sanitize_text_field($_GET['category']) : ''; // Sanitize and cast to integer
	$selectedCategorySlug = '';
	
    // if (!empty($filterCategories)) {
    //     // Extract category IDs from selected filter categories
    //     foreach ($filterCategories as $category) {
    //         if (isset($category['id'])) {
    //             $filterCategoryIds[] = (int)$category['id'];
    //         }
    //     }
    // }

	// Add category filtering if filter categories are provided
	if (!empty($filterCategoryIds)) {
		$query_args['category__in'] = $filterCategoryIds;
	}

	if (!isset($GLOBALS['selectedCategorySlug'])) {
        $GLOBALS['selectedCategorySlug'] = '';
    }

	$permalink = get_the_permalink();

	// Sort Filter
	if ($filterActive) {
		$selectedIndex = array_search(true, array_column($orderOptions, 'selected'));
		if ($selectedIndex === false) $selectedIndex = 0; // Handle case where selected index is not found

		$postFilter = sprintf(
			"<div class=\"sort-filter\">
				<label>%s</label>
				<div class=\"dropdown\">
					<label role=\"button\" class=\"dropdown-select\" tabindex=\"0\">%s</label>
					<ul class=\"dropdown-list\">%s</ul>
				</div>
				<input type=\"hidden\" name=\"category\" value=\"%s\">
			</div>",
			__('Sort by'),
			esc_html($orderOptions[$selectedIndex]['text']),
			implode('', array_map(function ($option) {
				return sprintf(
					"<li class=\"dropdown-option%s\">
						<button class=\"dropdown-button\" name=\"order\" value=\"%s\">%s</button>
					</li>",
					$option['selected'] ? ' option-selected' : '',
					esc_attr($option['value']),
					esc_html($option['text'])
				);
			}, $orderOptions)),
			esc_attr($selectedCategory)
		);
	}

	// Category tabs
	if (!empty($categories)) {
		$selectedCategoryIndex = array_search($selectedCategory, array_column($categories, 'id'));

		if ($selectedCategoryIndex === false) {
			$selectedCategoryIndex = 0;
		}

		$tabs = sprintf(
			"<div class=\"categories\">
				<label role=\"button\" class=\"cat-dropdown cat-button cat-%s active\" tabindex=\"0\">%s</label>
				<ul class=\"cat-list\">%s</ul>
				<input type=\"hidden\" name=\"order\" value=\"%s\">
			</div>",
			esc_attr($categories[$selectedCategoryIndex]['slug']),
			esc_html($categories[$selectedCategoryIndex]['name']),
			implode('', array_map(function ($category) use ($selectedCategory) {
				$active = $selectedCategory == $category['id'] ? ' active' : '';

				if ($selectedCategory == $category['id']) {
					// Update global variable
					$GLOBALS['selectedCategorySlug'] = $category['slug'];
				}

				return sprintf(
					"<li class=\"cat-item\">
						<button class=\"cat-button cat-%s%s\" name=\"category\" value=\"%s\">%s</button>
					</li>",
					esc_attr($category['slug']),
					$active,
					esc_attr($category['id']),
					esc_html($category['name'])
				);
			}, $categories)),
			esc_attr($order)
		);
	}

	$paged = (int)get_query_var('paged') ?: 1; // Cast to integer

	$query = [
		'posts_per_page' => $attributes['postPerPage'],
		'post_type' => $attributes['postType'],
		'post_status' => 'publish',
		'cat' => $selectedCategory,
		'order' => $order,
		'orderby' => $orderby,
		'paged' => $paged,
	];

    // Add category filtering if filter categories are selected
    if (!empty($filterCategoryIds)) {
        $query['category__in'] = $filterCategoryIds;
    }

	$recent_posts = new \WP_Query($query);

	if (is_wp_error($recent_posts)) {
		error_log("WP_Query error: " . $recent_posts->get_error_message());
		return "Error fetching posts.";
	}

	if (!$recent_posts->have_posts()) {
		$output = sprintf(
			"<div class=\"component-archive-posts%s\">
				<form action=\"%s?category=%s\" class=\"top-bar filter-form\" method=\"get\">
					%s
					%s
				</form>
				<p>%s</p>
			</div>",
			esc_attr($class),
			esc_url($permalink),
			esc_attr($selectedCategory),
			$tabs,
			$postFilter,
			__('No posts')
		);
		return $output;
	}

	if ($paginationActive) {
		$pagination = sprintf(
			"<nav class=\"pagination-nav\" role=\"navigation\" aria-label=\"Pagination Navigation\">
				<div class=\"pagination-wrapper\">%s</div>
			</nav>",
			paginate_links([
				'base' => str_replace(999999999, '%#%', esc_url(get_pagenum_link(999999999))),
				'current' => max(1, $paged),
				'format' => '?paged=%#%',
				'end_size' => 2,
				'mid_size' => 4,
				'prev_next' => true,
				'prev_text' => '',
				'next_text' => '',
				'add_fragment' => '',
				'total' => $recent_posts->max_num_pages
			])
		);
	}

	$postsItems = '';

	while ($recent_posts->have_posts()) {
		$recent_posts->the_post();
		$ctaLink = '';
		$thumbnailId = get_post_thumbnail_id();
		$excerpt = '';
		$postCategories = get_the_category();
		$arrayCategories = [];
		$displayCategories = '';

		if ($showExcerpt) {
			$excerpt = wp_trim_words(get_the_excerpt(), $attributes['excerptWordLimit'], '');
			if (empty($excerpt)) {
				$content = get_the_content();
				$excerpt = !empty($content) ? wp_trim_words($content, $attributes['excerptWordLimit'], '') : '';
			}
			$excerpt = sprintf('<p class="post-excerpt">%s</p>', esc_html($excerpt));
		}

		if ($postCategories && $showCategory) {
			$displayCategories = sprintf(
				'<span class="category-name">%s</span>',
				implode(', ', array_map(function ($category) {
					return sprintf('<a href="%s">%s</a>', esc_url(get_category_link($category->term_id)), esc_html($category->name));
				}, $postCategories))
			);
		}

		$fallbackImage = get_field('fallback_image', 'options');
		$fallbackImageAlt = get_field('fallback_image_alt', 'options');
		$thumbnail = $thumbnailId
			? sprintf('<div class="image-wrapper">%s</div>', get_the_post_thumbnail())
			: sprintf('<div class="image-wrapper no-image"><img src="%s" alt="%s" title="%s"></div>', esc_url($fallbackImage), esc_attr($fallbackImageAlt), esc_attr($fallbackImageAlt));

		if (!empty($ctaText)) {
			$ctaLink = sprintf('<span class="cta-link">%s</span>', esc_html($ctaText));
		}

		$authorName = get_field('author_name');
		$separator = !empty($authorName) ? ' &nbsp;|&nbsp; ' : ' &nbsp; ';
		$authorName = $authorName ?: ''; // Provide a default if the field is empty

		$width = $columnNumber > 0 ? (100 / $columnNumber) : 100;
		$postsItems .= sprintf(
			'<li class="posts-item post-category-%s" style="width: %s%%;">
				<a class="posts-item-wrapper" href="%s">
					%s
					<div class="component-heading component">
						<div class="post-content">
							<div class="component-heading">
								<h2 class="post-title">%s</h2>
							</div>
							<div class="component-paragraph-wrapper">
								%s
							</div>
							<span class="post-date">%s%s%s</span>
							%s
					</div>
				</a>
			</li>',
			esc_attr($GLOBALS['selectedCategorySlug']),
			esc_attr($width),
			esc_url(get_the_permalink()),
			$thumbnail,
			// $displayCategories,
			esc_html(get_the_title()),
			$excerpt,
			esc_html(get_the_time('F j, Y')),
			$separator,
			esc_html($authorName),
			$ctaLink
		);
	}

	wp_reset_postdata();

	$output = sprintf(
		"<div class=\"component-archive-posts%s\">
			<form action=\"%s\" class=\"top-bar\" method=\"get\">%s</form>
			<form action=\"%s\" class=\"top-bar filter-form\" method=\"get\">%s</form>
			<ul class=\"posts-items load-items\">%s</ul>
			%s
		</div>",
		esc_attr($class),
		esc_url($permalink),
		$tabs,
		esc_url($permalink),
		$postFilter,
		$postsItems,
		$pagination
	);

	return $output;
}
