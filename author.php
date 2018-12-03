<?php
/**
 * Template: Author Archive
 * Description: Wordpress template for author archive page.
 *
 */
    get_header();


    $maxPages = $wp_query->max_num_pages; //Find the max number of pages for the query, necessary for "Load More"
    $authorID = get_the_author_meta('ID'); //Find the author's ID

    echo Utils::render_template("components/component_author-feed.php", array(
        "maxPages"      => $maxPages,
        "authorID"      => $authorID,
        "query"         => $wp_query, // $wp_query is the default WordPress query. It uses the posts per page set in wp-admin.
        "postType"      => 'post', //Set post type to be displayed for the author
    ));

    get_footer();
?>
