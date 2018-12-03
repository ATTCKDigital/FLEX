<?php
/**
 * Template Name: Press Archive
 * Description: Wordpress template for index page
 *
 */
    get_header();

    $term = get_queried_object();
    $taxonomy = '';
    $args = array(
        'post_type' => 'press',

    );
    $pressQuery = new WP_Query($args);

    $maxPages = $pressQuery->max_num_pages;
    $count = $pressQuery->post_count;

    echo Utils::render_template("inc/templates/archive-feed.php", array(
        "title"         => 'Press',
        "maxPages"      => $maxPages,
        "category"      => '',
        "pageType"      => 'press',
        "filterType"    => 'year',
        "filterType2"   => 'press_tag',
        "query"         => $pressQuery,
        "postType"      => 'press',
        "count"         => $count,
        "search"        => '',
        "authorID"      => ''
    ));

    get_footer();
?>