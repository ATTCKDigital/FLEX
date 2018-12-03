<?php
/**
 * Template: Category Archive
 * Description: Wordpress template for category index page
 *
 */
    get_header();

    $term = get_queried_object();

    $maxPages = $wp_query->max_num_pages;
    $count = $wp_query->post_count;

    echo Utils::render_template("inc/templates/archive-feed.php", array(
        "title"         => $term->name,
        "maxPages"      => $maxPages,
        "category"      => $term->term_id,
        "pageType"      => 'category',
        "filterType"    => 'year',
        "filterType2"    => '',
        "query"         => $wp_query,
        "postType"      => 'post',
        "count"         => $count,
        "search"        => '',
        "authorID"      => ''
    ));

    get_footer();
?>