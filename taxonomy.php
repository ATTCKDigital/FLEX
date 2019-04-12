<?php
/**
 * Template: Taxonomy Archive
 * Description: Wordpress template for a taxonomy archive page. Copy and re-name to taxonomy-taxonomyname-termname.php for taxonomy specific archives.
 *
 */
    get_header();

    $term = get_queried_object(); 
    //If archive is a category or a tag, find out the term.
    //https://codex.wordpress.org/Function_Reference/get_queried_object

    $taxonomy = ''; //Set taxonomy if using custom tax

    //The archive Query. Add arguments to produce the needed query.
    $args = array(
        'post_type' => 'post',
    );
    $archiveQuery = new WP_Query($args);

    $maxPages = $archiveQuery->max_num_pages; //Find the max number of pages for the query, necessary for "Load More"
    $pageTitle = __('Archive', '_flexlayout') //Set the title of the page
    $postType = 'post' //Set the post type

    echo Utils::render_template("components/component_archive-feed.php", array(
        "title"         => $pageTitle,
        "maxPages"      => $maxPages,
        "term"          => $term,
        "taxonomy"      => $taxonomy,
        "postType"      => $postType,
        "query"         => $archiveQuery,
    ));

    get_footer();
?>