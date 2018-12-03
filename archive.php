<?php
/**
 * Template Name: Archive
 * Description: Wordpress template for an archive page. Copy and re-name to archive-customposttype.php for each custom post type. If no specific archive is created, this will serve as the default.
 *
 */
    get_header();

    $postType = get_queried_object(); 
    //Returns the post type.
    //https://codex.wordpress.org/Function_Reference/get_queried_object

    $taxonomy = ''; //Set taxonomy if using custom tax

    //The archive Query. Add arguments to produce the needed query.
    $args = array(
        'post_type' => 'post',
    );
    $archiveQuery = new WP_Query($args);

    $maxPages = $archiveQuery->max_num_pages; //Find the max number of pages for the query, necessary for "Load More"
    $pageTitle = 'Archive' //Set the title of the page

    echo Utils::render_template("components/component_archive-feed.php", array(
        "title"         => $pageTitle,
        "maxPages"      => $maxPages,
        "term"          => '', //leave blank
        "taxonomy"      => '', //leave blank
        "postType"      => $postType,
        "query"         => $archiveQuery,
    ));

    get_footer();
?>