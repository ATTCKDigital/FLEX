<?php
/**
 * Template: index page
 * Description: Wordpress template for index page
 *
 */
	get_header();


    $maxPages = $wp_query->max_num_pages;
    $count = $wp_query->post_count;

    echo Utils::render_template("inc/templates/archive-feed.php", array(
        "title"         => get_the_title( get_option('page_for_posts', true) ),
        "maxPages"      => $maxPages,
        "category"      => '',
        "filterType"    => 'year',
        "filterType2"   => 'tag',
        "query"         => $wp_query,
        "postType"      => 'press',
        "count"         => $count,
        "search"        => '',
        "authorID"      => ''
    ));

    get_footer();
?>