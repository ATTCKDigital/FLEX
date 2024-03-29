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
	register_block_type(
		'flexlayout/feed', [
		'attributes' => array_merge(
			[
				'className' => [
					'type' => 'string',
					'default' => '',
				],
				'excerptWordLimit' => [
					'type' => 'Number',
					'default' => 19,
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

	$recent_posts = wp_get_recent_posts( [
		'numberposts' => 3,
		'post_status' => 'publish',
	] );

	if ( empty( $recent_posts ) ) {
		return '<p>No posts</p>';
	}

	$feedItems = '';

	foreach ( $recent_posts as $post ) {
		$postID  = $post['ID'];
		$thumbnail = get_post_thumbnail_id($postID);
		$link = get_the_permalink($post['ID']);
		$excerpt = wp_trim_words( get_the_excerpt($postID), $attributes['excerptWordLimit'], '' );

		if (empty($excerpt)) {
			$excerpt = wp_trim_words( get_the_content($postID), $attributes['excerptWordLimit'], '' );
		}

		$categories = get_the_category($postID);
		$arrayCategories =  array();
		$displayCategories = '';

		if ($categories) {
			foreach ($categories as $category) {
				// Categories changed to span temporarily 
				// $arrayCategories[] = '<a href="/category/'.$category->slug.'">'.$category->name.'</a>';
				$arrayCategories[] = '<span>'.$category->name.'</span>';

			}
			$displayCategories = implode( ', ', $arrayCategories );
		}

		if ($thumbnail) {
			$thumbnail = '<div class="image-wrapper">'.get_the_post_thumbnail($postID).'</div>';
		} else {
			$thumbnail = '
			<div class="image-wrapper no-image">
				<img src="'.get_field('fallback_image', 'options').'" 
					alt="'.get_field('fallback_image_alt', 'options').'" 
					title="'.get_field('fallback_image_alt', 'options').'" 
				/>
			</div>';
		}
		
		$feedItems  .= '
			<a class="feed-item" href="'.$link.'">'.$thumbnail.'
				<div class="feed-info">
					<span class="feed-category">'.$displayCategories.'</span>
					<h2 class="headline6 feed-title">'.get_the_title($postID).'</h2>
					<span class="feed-date">'.get_the_time('F j, Y').'</span>
					<p class="feed-excerpt">'.$excerpt.'</p>
				</div>
			</a>';
	}

	$output = "<div class=\"component-archive-feed {$class}\"><div class=\"feed-items load-items padding-bottom-3x\">{$feedItems}</div>";

	return $output;
}
