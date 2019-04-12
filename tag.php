<?php
/**
 * Template: Tag Archive
 * Description: Wordpress template for a tag archive page. Copy and re-name to tag-termname.php for tag specific archives.
 *
 */
    get_header();

    $term = get_queried_object(); 
    //If archive is a tag or a tag, find out the term.
    //https://codex.wordpress.org/Function_Reference/get_queried_object

    $taxonomy = ''; //Set taxonomy if using custom tax

    $maxPages = $wp_query->max_num_pages; //Find the max number of pages for the query, necessary for "Load More"
    $pageTitle = $term->name; //Set the title of the page
    $postType = 'post'; //Set the post type

    echo Utils::render_template("components/component_archive-feed/archive-feed-header.php", array(
        "title"         => $pageTitle,
    ));

    echo Utils::render_template("components/component_archive-feed/archive-feed.php", array(
        "title"         => $pageTitle,
        "maxPages"      => $maxPages,
        "term"          => $term->term_id,
        "taxonomy"      => 'tag',
        "postType"      => $postType,
        "query"         => $wp_query,
        "loadMoreText"  => __('Show More', '_flexlayout')
    ));

    get_footer();
?>