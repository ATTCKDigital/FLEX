<?php

namespace FLEX_LAYOUT_SYSTEM\Blocks\Posts;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;

add_action('init', __NAMESPACE__ . '\\register_posts_block');
/**
 * Register the dynamic block.
 *
 * @return void
 * @since 2.1.0
 *
 */

function register_posts_block()
{
    register_block_type('flexlayout/posts', [
        'attributes' => [
            'postType' => ['type' => 'string', 'default' => 'post'],
            'postPerPage' => ['type' => 'number', 'default' => 12],
            'order' => ['type' => 'string', 'default' => 'DESC'],
            'orderBy' => ['type' => 'string', 'default' => 'date'],
            'filterCategories' => ['type' => 'object', 'default' => []],
            'showExcerpt' => ['type' => 'boolean', 'default' => false],
            'excerptWordLimit' => ['type' => 'number', 'default' => 20],
            'columnNumber' => ['type' => 'number', 'default' => 3],
            'className' => ['type' => 'string', 'default' => ''],
            'ctaText' => ['type' => 'string', 'default' => 'Read More'],
            'showCategory' => ['type' => 'boolean', 'default' => false],
            'paginationActive' => ['type' => 'boolean', 'default' => true],
            'filterActive' => ['type' => 'boolean', 'default' => true],
            'customFields' => ['type' => 'array', 'default' => []],
            'addSeparator' => ['type' => 'boolean', 'default' => true],
            'metaKey' => ['type' => 'string', 'default' => ''],
        ],
        MARGIN_OPTIONS_ATTRIBUTES,
        PADDING_OPTIONS_ATTRIBUTES,
        'render_callback' => __NAMESPACE__ . '\\render_posts_block',
    ]);
}

function get_flexlayout_post_template($post_type, $post_id = null)
{
    $slug = $post_id ? get_post_field('post_name', $post_id) : '';
    $theme_template_paths = [
        // Look in the child theme first
        get_stylesheet_directory() . "/template-parts/cards/{$post_type}.php",
        // Fallback to the parent theme
        get_template_directory() . "/template-parts/cards/{$post_type}.php",
    ];

    foreach ($theme_template_paths as $path) {
        if (file_exists($path)) {
            if($post_type === 'post') {
            }
            return $path;
        }
    }
    return '';
}

function render_posts_block($attributes, $content, $block)
{

    $class = ' ';
    $class .= $attributes['className'];
    $class .= margin_options_classes($attributes);
    $class .= padding_options_classes($attributes);

    $post_type = $attributes['postType'];
    $paged = max(1, get_query_var('paged', 1));

    $args = apply_filters('flexlayout/posts/query_args', [
        'post_type' => $post_type,
        'post_status' => 'publish',
        'posts_per_page' => $attributes['postPerPage'],
        'paged' => $paged,
        'orderby' => $attributes['orderBy'],
        'order' => $attributes['order'],

    ], $attributes);


    if (!empty($attributes['filterCategories'])) {
        $args['category__in'] = array_map('intval', $attributes['filterCategories']);
    }
    if (!empty($attributes['metaKey'])) {
        $args['meta_key'] = $attributes['metaKey'];
    }

    $query = new \WP_Query($args);
    if (!$query->have_posts()) return '<p>No posts found.</p>';

    $output = '<div class="component-archive-posts"><div class="posts-grid flex-grid flex-12-12">';
    $template_inner_content = $block->rendered_inner_blocks ?? [];
    $template_path = get_flexlayout_post_template($post_type, get_post_field('post_name'));
    while ($query->have_posts()) {
        $query->the_post();
        $post_id = get_the_ID();
        $acf_fields = [];
        foreach ($attributes['customFields'] as $field) {
            $acf_fields[$field] = get_field($field, $post_id);
        }
        if ($template_path) {
            ob_start();
            $post = get_post($post_id);
            setup_postdata($post);
            $title = get_the_title();
            $link = get_the_permalink();
            $showExcerpt = $attributes['showExcerpt'];
            $excerpt = wp_trim_words(get_the_excerpt(), $attributes['excerptWordLimit']);
            $post_featured_image = get_the_post_thumbnail_url();
            $category = '';
            if ($attributes['showCategory']) {
                $cats = get_the_category();
                if (!empty($cats)) {
                    $category = implode(', ', wp_list_pluck($cats, 'name'));
                }
            }
            $cta = !empty($attributes['ctaText']) ? $attributes['ctaText'] : '';
            include $template_path;
            wp_reset_postdata();
            $item_html = ob_get_clean();
        } else {
            $item_html = '<a href="' . esc_url(get_the_permalink()) . '" class="default-post-template">';
            $item_html .= '<h3>' . esc_html(get_the_title()) . '</h3>';
            if ($attributes['showExcerpt']) {
                $item_html .= '<p>' . esc_html(wp_trim_words(get_the_excerpt(), $attributes['excerptWordLimit'])) . '</p>';
            }
            $item_html .= '</a>';
        }

        $output .= '<div class="posts-item" style=" flex: 0 0 calc(100% / ' . $attributes['columnNumber'] . ' - 1rem);">' . $item_html . '</div>';
        if ($attributes['addSeparator'] && $attributes['columnNumber'] === 1 && $query->current_post < ($query->post_count - 1)):
            $output .= '<hr class="component component-hr  align-center" style="width:100%;">';
        endif;
    }

    $output .= '</div>';

    if ($attributes['paginationActive']) {
        $output .= '<div class="pagination-nav">' . paginate_links([
                'total' => $query->max_num_pages,
                'current' => $paged,
                'type' => 'list'
            ]) . '</div>';
    }

    $output .= '</div>';
    wp_reset_postdata();
    return $output;
}
