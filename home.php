<?php
/**
 * Template: index page
 * Description: Wordpress template for blog index
 *
 */
    get_header();


    $maxPages = $wp_query->max_num_pages;
    $count = $wp_query->post_count;

    echo Utils::render_template("inc/templates/archive-feed.php", array(
        "title"         => get_the_title( get_option('page_for_posts', true) ),
        "maxPages"      => $maxPages,
        "category"      => '',
        "pageType"      => 'blog',
        "filterType"    => 'category',
        "filterType2"   => '',
        "query"         => $wp_query,
        "postType"      => 'post',
        "count"         => $count,
        "search"        => '',
        "authorID"      => ''
    ));

    get_footer();
?>